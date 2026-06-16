import * as fs from 'fs';
import * as path from 'path';
import * as vm from 'vm';
import { Executor as CppExecutor } from '../engine/languages/cpp/executor';
import { Executor as PythonExecutor } from '../engine/languages/python/executor';

const problemsDir = path.resolve(__dirname, '../../../frontend/src/data/problems');

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

async function run() {
    console.log("====================================================");
    console.log("🚀 STARTING E2E MULTI-LANGUAGE VALIDATION TEST RUNNER");
    console.log("====================================================\n");

    const files = getProblemFiles(problemsDir);
    console.log(`Found ${files.length} total problem files.\n`);

    // Group files by category
    const categoryMap: Record<string, string[]> = {};
    for (const file of files) {
        const relativePath = path.relative(problemsDir, file);
        const category = path.dirname(relativePath);
        if (!categoryMap[category]) {
            categoryMap[category] = [];
        }
        categoryMap[category].push(file);
    }

    const categories = Object.keys(categoryMap);
    console.log(`Grouped into ${categories.length} categories: ${categories.join(', ')}\n`);

    const cppExecutor = new CppExecutor();
    const pythonExecutor = new PythonExecutor();

    let totalPassed = 0;
    let totalFailed = 0;
    const failures: { file: string; lang: string; error: string }[] = [];

    // Test a subset of problems per category (up to 3 per category to keep it fast but comprehensive)
    for (const category of categories) {
        console.log(`----------------------------------------------------`);
        console.log(`📁 Category: ${category.toUpperCase()}`);
        console.log(`----------------------------------------------------`);

        const problemFiles = categoryMap[category];
        // Pick up to 3 problems (Easy, Medium, Hard if possible)
        // Sort them just so we get a consistent pick
        problemFiles.sort();
        const selectedFiles = problemFiles.slice(0, Math.min(problemFiles.length, 3));

        for (const file of selectedFiles) {
            const base = path.basename(file);
            console.log(`🧪 Testing: ${base}`);

            try {
                const problem = loadProblemFile(file);
                if (!problem || !problem.languages) {
                    throw new Error("Missing languages section in problem definition.");
                }

                // 1. Test C++
                const cppCode = problem.languages.cpp?.starterCode;
                if (!cppCode) {
                    throw new Error("Missing C++ starter code");
                }

                console.log("  - Running C++...");
                const cppGenerator = cppExecutor.execute(cppCode, "");
                let cppSteps = 0;
                let cppHasError = false;
                for (const trace of cppGenerator) {
                    cppSteps++;
                    if (trace.type === 'error') {
                        cppHasError = true;
                        throw new Error(`C++ Runtime/Syntax error: ${trace.output}`);
                    }
                    if (cppSteps > 1000) {
                        break;
                    }
                }
                console.log(`    ✅ C++ execution OK! Steps generated: ${cppSteps}`);

                // 2. Test Python
                const pythonCode = problem.languages.python?.starterCode;
                if (!pythonCode) {
                    throw new Error("Missing Python starter code");
                }

                console.log("  - Running Python...");
                const pythonGenerator = pythonExecutor.execute(pythonCode, "");
                let pythonSteps = 0;
                let pythonHasError = false;
                for (const trace of pythonGenerator) {
                    pythonSteps++;
                    if (trace.type === 'error') {
                        pythonHasError = true;
                        throw new Error(`Python Runtime/Syntax error: ${trace.output}`);
                    }
                    if (pythonSteps > 1000) {
                        break;
                    }
                }
                console.log(`    ✅ Python execution OK! Steps generated: ${pythonSteps}`);

                totalPassed++;
            } catch (err: any) {
                totalFailed++;
                console.error(`  ❌ FAILED: ${err.message}`);
                failures.push({
                    file: base,
                    lang: err.message.includes('Python') ? 'Python' : 'C++',
                    error: err.message
                });
            }
        }
        console.log();
    }

    console.log("====================================================");
    console.log("📊 MULTI-LANGUAGE TEST RESULTS SUMMARY");
    console.log("====================================================");
    console.log(`TOTAL PROBLEMS TESTED: ${totalPassed + totalFailed}`);
    console.log(`✅ PASSED: ${totalPassed}`);
    console.log(`❌ FAILED: ${totalFailed}\n`);

    if (totalFailed > 0) {
        console.log("🚨 DETAILED FAILURES:");
        for (const f of failures) {
            console.log(`- Problem: ${f.file} (${f.lang})`);
            console.log(`  Error: ${f.error}`);
        }
        process.exit(1);
    } else {
        console.log("🎉 ALL SELECTED PROBLEMS PASSED BOTH C++ AND PYTHON RUNTIME CHECKS!");
        process.exit(0);
    }
}

run();
