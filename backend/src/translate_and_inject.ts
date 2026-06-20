import * as fs from 'fs';
import * as path from 'path';
import Groq from 'groq-sdk';
import { CompilerService } from './services/compiler.service';
import * as dotenv from 'dotenv';

// Load env variables from backend
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const problemsDir = 'c:/Users/asati/OneDrive/Documents/Padhai Stuff/Projects/CODE Visualizer/frontend/src/data/problems';
const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
    console.error("Missing GROQ_API_KEY in backend/.env!");
    process.exit(1);
}

const groq = new Groq({ apiKey });
const compilerService = new CompilerService();

// Helper to wait
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to clean and extract Java code from model response
function cleanJavaCode(rawCode: string): string {
    let code = rawCode;
    // Strip thinking process
    code = code.replace(/<think>[\s\S]*?<\/think>/gi, '');
    
    // Check if there is a markdown code block
    const match = code.match(/```java([\s\S]*?)```/i);
    if (match) {
        return match[1].trim();
    }
    
    // If no code block, clean up start/end backticks
    code = code.replace(/^```java\s*/i, '').replace(/```\s*$/, '').trim();
    
    // Strip any leading conversational text by finding the first java keyword
    const javaKeywords = ['import ', 'class ', 'public class ', 'interface ', '@SuppressWarnings'];
    let firstKeywordIndex = -1;
    for (const kw of javaKeywords) {
        const idx = code.indexOf(kw);
        if (idx !== -1 && (firstKeywordIndex === -1 || idx < firstKeywordIndex)) {
            firstKeywordIndex = idx;
        }
    }
    if (firstKeywordIndex !== -1) {
        code = code.substring(firstKeywordIndex).trim();
    }
    
    return code;
}

// Helper to ask Groq for translation with retry logic
async function translateCodeWithRetry(cppCode: string, pythonCode: string, filename: string): Promise<string> {
    const prompt = `
Translate the following C++ code into Java:

C++ Code:
${cppCode}

Requirements:
1. One self-contained file with public class Main containing main() implementing C++ main logic, and package-private class Solution (or Trie/MinStack etc.).
2. Define any custom node classes (ListNode, TreeNode, Node) as package-private top-level classes.
3. Use proper generics and avoid any warnings (e.g. use @SuppressWarnings("unchecked") where needed).
4. Main class is the ONLY public class. Must compile and run on Java 21+.
5. Your response must contain EXACTLY one markdown code block starting with \`\`\`java and ending with \`\`\`. Do not write any natural language introduction, remarks, or explanations outside or inside this code block. All code must be fully within this single block.
`;

    let attempts = 5;
    let delay = 2000;
    let modelName = "qwen/qwen3-32b";
    while (attempts > 0) {
        try {
            const completion = await groq.chat.completions.create({
                messages: [{ role: 'user', content: prompt }],
                model: modelName,
                temperature: 0.1,
                max_tokens: 1536
            });

            let javaCode = completion.choices[0]?.message?.content || "";
            return cleanJavaCode(javaCode);
        } catch (error: any) {
            attempts--;
            console.warn(`Groq API error (attempts remaining: ${attempts}): ${error.message}`);
            if (error.message && (error.message.includes('rate_limit_exceeded') || error.message.includes('limit reached') || error.message.includes('429') || error.message.includes('Request too large') || error.message.includes('413'))) {
                console.warn("⚠️ Rate limit reached. Sleeping 60 seconds to clear window...");
                await sleep(60000);
                if (modelName === "qwen/qwen3-32b") {
                    console.warn("⚠️ Falling back to Llama 3.1 8B Instant...");
                    modelName = "llama-3.1-8b-instant";
                } else {
                    console.warn("⚠️ Falling back to Qwen 32B...");
                    modelName = "qwen/qwen3-32b";
                }
            }
            if (attempts === 0) throw error;
            await sleep(delay);
            delay *= 2; // exponential backoff
        }
    }
    throw new Error("Failed to translate code after multiple retries");
}

// Ask Groq to fix compilation errors with retry logic
async function refineCodeWithRetry(javaCode: string, compileError: string): Promise<string> {
    const truncatedError = compileError.length > 2000 ? compileError.substring(0, 2000) + "\n... [TRUNCATED] ..." : compileError;
    const prompt = `
The following Java code failed to compile:

Java Code:
\`\`\`java
${javaCode}
\`\`\`

Compilation Error:
\`\`\`
${truncatedError}
\`\`\`

Please fix the compilation error and return the corrected complete Java code.
Make sure to avoid any compiler warnings (such as unchecked conversions). Use generics properly or annotate with @SuppressWarnings("unchecked") if needed.
Your response must contain EXACTLY one markdown code block starting with \`\`\`java and ending with \`\`\`. Do not write any natural language introduction, remarks, or explanations outside or inside this code block. All code must be fully within this single block.
`;

    let attempts = 3;
    let delay = 2000;
    let modelName = "qwen/qwen3-32b";
    while (attempts > 0) {
        try {
            const completion = await groq.chat.completions.create({
                messages: [{ role: 'user', content: prompt }],
                model: modelName,
                temperature: 0.1,
                max_tokens: 1536
            });

            let fixedCode = completion.choices[0]?.message?.content || "";
            return cleanJavaCode(fixedCode);
        } catch (error: any) {
            attempts--;
            console.warn(`Groq API error during refinement (attempts remaining: ${attempts}): ${error.message}`);
            if (error.message && (error.message.includes('rate_limit_exceeded') || error.message.includes('limit reached') || error.message.includes('429') || error.message.includes('Request too large') || error.message.includes('413'))) {
                console.warn("⚠️ Rate limit reached. Sleeping 60 seconds to clear window...");
                await sleep(60000);
                if (modelName === "qwen/qwen3-32b") {
                    console.warn("⚠️ Falling back to Llama 3.1 8B Instant...");
                    modelName = "llama-3.1-8b-instant";
                } else {
                    console.warn("⚠️ Falling back to Qwen 32B...");
                    modelName = "qwen/qwen3-32b";
                }
            }
            if (attempts === 0) throw error;
            await sleep(delay);
            delay *= 2;
        }
    }
    throw new Error("Failed to refine code after multiple retries");
}

// Function to process a single problem file
async function processProblemFile(relativeFilePath: string) {
    const filePath = path.join(problemsDir, relativeFilePath);
    console.log(`\n==================================================`);
    console.log(`Processing: ${relativeFilePath}`);
    console.log(`==================================================`);

    if (!fs.existsSync(filePath)) {
        console.error(`File does not exist: ${filePath}`);
        return false;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if Java code is already integrated
    if (/java\s*:\s*\{/.test(content)) {
        console.log("Java starter code already exists. Skipping.");
        return true;
    }

    // Extract C++ starter code
    const cppMatch = content.match(/cpp:\s*\{\s*starterCode:\s*`([\s\S]*?)`\s*\}/);
    if (!cppMatch) {
        console.error("Could not find C++ starter code!");
        return false;
    }
    const cppCode = cppMatch[1];

    // Extract Python starter code
    const pythonMatch = content.match(/python:\s*\{\s*starterCode:\s*`([\s\S]*?)`\s*\}/);
    if (!pythonMatch) {
        console.error("Could not find Python starter code!");
        return false;
    }
    const pythonCode = pythonMatch[1];

    // Translate to Java
    let javaCode = "";
    try {
        javaCode = await translateCodeWithRetry(cppCode, pythonCode, path.basename(filePath));
    } catch (e: any) {
        console.error(`Translation call failed: ${e.message}`);
        return false;
    }

    if (!javaCode) {
        console.error("Translation returned empty code!");
        return false;
    }

    // Validate compilation
    console.log("Testing compilation & execution...");
    let result = await compilerService.execute('java', javaCode);

    if (result.code !== 0) {
        console.warn(`Compilation failed. Error:\n${result.stderr || result.output}`);
        console.log("Attempting self-correction...");
        try {
            javaCode = await refineCodeWithRetry(javaCode, result.stderr || result.output);
            console.log("Testing refined code...");
            result = await compilerService.execute('java', javaCode);
        } catch (refineErr: any) {
            console.error(`Refinement failed: ${refineErr.message}`);
            return false;
        }
    }

    if (result.code !== 0) {
        console.error(`Refined compilation failed too. Skipping file. Error:\n${result.stderr || result.output}`);
        return false;
    }

    console.log("✅ Code compiled and ran successfully!");
    console.log("Output:\n" + result.stdout.trim());

    // Inject Java code into problem file
    // We insert it after the python block
    const pythonBlockRegex = /(python:\s*\{\s*starterCode:\s*`[\s\S]*?`\s*\})/;
    const parts = content.split(pythonBlockRegex);

    if (parts.length < 3) {
        console.error("Error splitting file content by Python block!");
        return false;
    }

    // Construct the new content
    const javaBlock = `,\n    java: {\n      starterCode: \`${javaCode.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`\n    }`;
    const newContent = parts[0] + parts[1] + javaBlock + parts[2];

    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`🎉 Successfully integrated Java starter code for ${relativeFilePath}!`);
    return true;
}

// Function to scan problems directory recursively
function getMissingJavaProblems(dir: string): string[] {
    const categories = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());
    const missing: string[] = [];

    categories.forEach(cat => {
        const catDir = path.join(dir, cat);
        const files = fs.readdirSync(catDir).filter(f => f.endsWith('.ts'));
        
        files.forEach(file => {
            const filePath = path.join(catDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            if (!/java\s*:\s*\{/.test(content)) {
                missing.push(`${cat}/${file}`);
            }
        });
    });

    return missing;
}

// Main runner function
async function run() {
    console.log("Scanning problems folder for missing Java starter codes...");
    const missingList = getMissingJavaProblems(problemsDir);
    console.log(`Found ${missingList.length} files missing Java code.`);

    if (missingList.length === 0) {
        console.log("All problems have Java starter code! Nothing to do.");
        return;
    }

    // Process all of them in a controlled loop
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < missingList.length; i++) {
        const relPath = missingList[i];
        console.log(`\nProgress: ${i + 1}/${missingList.length} (${successCount} succeeded, ${failCount} failed)`);
        try {
            const ok = await processProblemFile(relPath);
            if (ok) {
                successCount++;
            } else {
                failCount++;
            }
            // Sleep 10 seconds between files to avoid rate limits
            await sleep(10000);
        } catch (err: any) {
            failCount++;
            console.error(`Error processing ${relPath}: ${err.message}`);
            await sleep(5000); // sleep longer on failure
        }
    }

    console.log(`\n==================================================`);
    console.log(`TRANSLATION RUN COMPLETE`);
    console.log(`Succeeded: ${successCount}`);
    console.log(`Failed: ${failCount}`);
    console.log(`==================================================`);
}

run().catch(e => {
    console.error("Unhandled execution error:", e);
});
