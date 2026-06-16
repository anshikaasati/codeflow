import * as fs from 'fs';
import * as path from 'path';
import * as vm from 'vm';

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
    let jsCode = content
        .replace(/import\s+type\s+\{\s*ProblemDefinition\s*\}\s+from\s+['"][^'"]+['"]\s*;?/g, '')
        .replace(/export\s+default\s+problem\s*;?/g, '')
        .replace(/const\s+problem\s*:\s*ProblemDefinition\s*=/, 'const problem =');
    jsCode = jsCode + '\n; problem;';
    if (file.includes('contains-duplicate.ts')) {
        console.log("Transformed jsCode of contains-duplicate.ts:");
        console.log(jsCode);
    }
    const context = {};
    vm.createContext(context);
    return vm.runInContext(jsCode, context);
}

function run() {
    const files = getProblemFiles(problemsDir);
    let withPython = 0;
    let withoutPython = 0;
    let newSchema = 0;
    let oldSchema = 0;
    const missingPythonList: string[] = [];

    for (const file of files) {
        try {
            const problem = loadProblemFile(file);
            const hasLanguages = !!(problem.languages && problem.languages.cpp);
            if (hasLanguages) {
                newSchema++;
            } else {
                oldSchema++;
            }

            const pythonCode = problem.languages?.python?.starterCode || problem.starterCodePython;
            if (pythonCode) {
                withPython++;
            } else {
                withoutPython++;
                missingPythonList.push(problem.title || path.basename(file));
            }
        } catch (e: any) {
            console.error(`Error loading ${path.basename(file)}:`, e.message);
        }
    }

    console.log(`Audit Summary:`);
    console.log(`Total problems: ${files.length}`);
    console.log(`New Schema: ${newSchema}`);
    console.log(`Old Schema: ${oldSchema}`);
    console.log(`With Python: ${withPython}`);
    console.log(`Without Python: ${withoutPython}`);
    console.log(`Missing Python list length: ${missingPythonList.length}`);
    if (missingPythonList.length > 0) {
        console.log(`First 10 missing Python:`, missingPythonList.slice(0, 10));
    }
}

run();
