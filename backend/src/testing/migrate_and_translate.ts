import * as fs from 'fs';
import * as path from 'path';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import * as vm from 'vm';

// Load env
const backendDir = path.resolve(__dirname, '../..');
dotenv.config({ path: path.join(backendDir, '.env') });

const groqApiKey = process.env.GROQ_API_KEY;
if (!groqApiKey) {
    console.error("CRITICAL: GROQ_API_KEY is not defined in backend/.env!");
    process.exit(1);
}

const groq = new Groq({ apiKey: groqApiKey });

// Root problems dir (in frontend)
const problemsDir = path.resolve(__dirname, '../../../frontend/src/data/problems');

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function getProblemFiles(dir: string, files: string[] = []): string[] {
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const name = path.join(dir, file);
        if (fs.statSync(name).isDirectory()) {
            getProblemFiles(name, files);
        } else if (file.endsWith('.ts') && file !== 'index.ts' && file !== 'types.ts') {
            files.push(name);
        }
    }
    return files;
}

function loadProblemFile(file: string): any {
    const content = fs.readFileSync(file, 'utf-8');
    
    // Transform TypeScript to simple evaluable JS by stripping types
    let jsCode = content
        .replace(/import\s+type\s+\{\s*ProblemDefinition\s*\}\s+from\s+['"][^'"]+['"]\s*;?/g, '')
        .replace(/export\s+default\s+problem\s*;?/g, '')
        .replace(/const\s+problem\s*:\s*ProblemDefinition\s*=/, 'const problem =');
        
    jsCode = jsCode + '\n; problem;'; // return problem variable
    
    const context = {};
    vm.createContext(context);
    return vm.runInContext(jsCode, context);
}

function generatePythonFallback(title: string, cppCode: string): string {
    // Extraction heuristic
    let methodName = 'solve';
    let args = 'self';
    
    const solutionBlock = cppCode.match(/class\s+Solution\s*\{[\s\S]*?\};/);
    if (solutionBlock) {
        const methods = solutionBlock[0].match(/(\w+[\w<>,&\s\*]+)\s+(\w+)\s*\(([^)]*)\)/);
        if (methods) {
            methodName = methods[2];
            const rawArgs = methods[3].split(',');
            const pyArgs = ['self'];
            for (const arg of rawArgs) {
                const parts = arg.trim().split(/\s+/);
                if (parts.length >= 2) {
                    const name = parts[parts.length - 1].replace(/[&*]/g, '');
                    if (name && name !== 'const') {
                        pyArgs.push(name);
                    }
                }
            }
            args = pyArgs.join(', ');
        }
    }
    
    return `class Solution:
    def ${methodName}(${args}):
        # Fallback skeleton generated for ${title}
        pass

if __name__ == "__main__":
    sol = Solution()
    print("Fallback execution check")
`;
}

async function translateToPythonWithModel(title: string, cppCode: string, model: string): Promise<string> {
    const prompt = `Translate the following C++ solution for the problem "${title}" into a self-contained Python 3 starter code.
Requirements:
1. Ensure the Python code implements the exact same class and method signatures.
2. Include a driver block \`if __name__ == '__main__':\` that initializes the Solution class, sets up the same input/test cases as seen in the C++ \`main()\`, runs it, and prints the result, matching the C++ output format as closely as possible.
3. Keep the code clean, well-structured, and typed (using \`from typing import List, Optional, Dict\` if needed).
4. Return ONLY the raw Python code. Do not wrap the code in backticks or markdown code blocks (e.g. do not wrap in \`\`\`python ... \`\`\`), and do not include any explanatory text outside the code.

C++ Starter Code:
${cppCode}`;

    const completion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: model,
        temperature: 0.1,
        max_tokens: 4096
    });

    let response = (completion.choices[0]?.message?.content || "").trim();
    
    if (response.startsWith("```")) {
        const lines = response.split('\n');
        if (lines[0].startsWith("```")) {
            lines.shift();
        }
        if (lines[lines.length - 1].startsWith("```")) {
            lines.pop();
        }
        response = lines.join('\n').trim();
    }
    return response;
}

async function translateToPython(title: string, cppCode: string): Promise<string> {
    const models = ["llama-3.1-8b-instant", "mixtral-8x7b-32768"];
    
    for (let i = 0; i < models.length; i++) {
        const model = models[i];
        try {
            console.log(`    Trying model: ${model}...`);
            const code = await translateToPythonWithModel(title, cppCode, model);
            if (code && code.trim().length > 0) {
                return code;
            }
        } catch (e: any) {
            console.warn(`    Failed with model ${model}: ${e.message}`);
            if (i < models.length - 1) {
                console.log(`    Waiting 3 seconds before trying next model...`);
                await delay(3000);
            }
        }
    }
    
    console.warn(`    All models failed for ${title}. Falling back to skeleton generation.`);
    return generatePythonFallback(title, cppCode);
}

function generateFileContent(problem: any): string {
    const cppCode = problem.languages?.cpp?.starterCode || problem.starterCode || '';
    const pythonCode = problem.languages?.python?.starterCode || problem.starterCodePython || '';

    if (!cppCode) {
        throw new Error(`C++ starter code is empty for problem ID: ${problem.id}`);
    }
    if (!pythonCode) {
        throw new Error(`Python starter code is empty for problem ID: ${problem.id}`);
    }

    return `import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: ${JSON.stringify(problem.id)},
  title: ${JSON.stringify(problem.title)},
  difficulty: ${JSON.stringify(problem.difficulty)},
  category: ${JSON.stringify(problem.category)},
  url: ${JSON.stringify(problem.url)},
  description: ${JSON.stringify(problem.description || '')},
  examples: ${JSON.stringify(problem.examples || [], null, 2)},
  constraints: ${JSON.stringify(problem.constraints || [], null, 2)},
  languages: {
    cpp: {
      starterCode: \`${cppCode.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`
    },
    python: {
      starterCode: \`${pythonCode.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`
    }
  }
};

export default problem;
`;
}

async function run() {
    console.log("Auditing problems directory...");
    const files = getProblemFiles(problemsDir);
    console.log(`Found ${files.length} problem files.`);

    let migrated = 0;
    let translated = 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const base = path.basename(file);
        console.log(`[${i + 1}/${files.length}] Processing ${base}...`);

        try {
            const problem = loadProblemFile(file);

            if (!problem || !problem.id) {
                console.warn(`  Skipping: default export is not a problem object in ${base}`);
                continue;
            }

            // Determine starter codes
            let cppCode = problem.languages?.cpp?.starterCode || problem.starterCode;
            let pythonCode = problem.languages?.python?.starterCode || problem.starterCodePython;

            let isAlreadyMigrated = !!(problem.languages && problem.languages.cpp && problem.languages.python);

            if (!pythonCode) {
                console.log(`  Translating C++ starter code to Python for: "${problem.title}"...`);
                pythonCode = await translateToPython(problem.title, cppCode);
                translated++;
                // Add rate limit buffer
                await delay(1500);
            }

            if (!problem.languages) {
                problem.languages = {};
            }
            problem.languages.cpp = { starterCode: cppCode };
            problem.languages.python = { starterCode: pythonCode };

            // Generate file content and write back
            const newContent = generateFileContent(problem);
            fs.writeFileSync(file, newContent, 'utf-8');
            migrated++;
        } catch (err: any) {
            console.error(`  Error processing ${base}:`, err.message);
        }
    }

    console.log(`\nMigration completed successfully!`);
    console.log(`Total files migrated/updated: ${migrated}`);
    console.log(`Total Python codes generated: ${translated}`);
}

run();
