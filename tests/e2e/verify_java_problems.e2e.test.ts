import * as fs from 'fs';
import * as path from 'path';
import * as vm from 'vm';
import { CompilerService } from '../../backend/src/services/compiler.service';
import * as assert from 'assert';

const problemsDir = path.resolve(__dirname, '../../frontend/src/data/problems');

function loadProblemFile(file: string): any {
    const content = fs.readFileSync(file, 'utf-8');
    let jsCode = content
        .replace(/import\s+type\s+\{\s*ProblemDefinition\s*\}\s+from\s+['"][^'"]+['"]\s*;?/g, '')
        .replace(/export\s+default\s+problem\s*;?/g, '')
        .replace(/const\s+problem\s*:\s*ProblemDefinition\s*=/, 'const problem =');
        
    jsCode = jsCode + '\n; problem;';
    const context = {};
    vm.createContext(context);
    return vm.runInContext(jsCode, context);
}

async function run() {
    console.log("====================================================");
    console.log("🚀 STARTING E2E JAVA WORKSPACE RUNNER VERIFICATION");
    console.log("====================================================\n");

    const targetProblems = [
        { file: 'arrays-hashing/two-sum.ts', expected: '[0, 1]' },
        { file: 'arrays-hashing/contains-duplicate.ts', expected: 'true\nfalse' },
        { file: 'arrays-hashing/valid-anagram.ts', expected: 'true\nfalse' },
        { file: 'arrays-hashing/pascals-triangle.ts', expected: '1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1' },
        { file: 'binary-search/binary-search.ts', expected: '4\n-1' },
        { file: 'intervals/meeting-rooms.ts', expected: 'false\ntrue' },
        { file: 'trie/implement-trie-prefix-tree.ts', expected: 'true\nfalse\ntrue' },
        { file: 'bit-manipulation/counting-bits.ts', expected: '0 1 1 2 1 2' },
        { file: 'sliding-window/best-time-to-buy-and-sell-stock.ts', expected: '5' },
        { file: 'stack/valid-parentheses.ts', expected: 'true\nfalse\ntrue' },
        { file: 'two-pointers/valid-palindrome.ts', expected: 'true\nfalse' },
        { file: 'linked-list/reverse-linked-list.ts', expected: '5 -> 4 -> 3 -> 2 -> 1' },
        { file: 'trees/invert-binary-tree.ts', expected: '4 7 2 9 6 3 1' },
        { file: 'heap/last-stone-weight.ts', expected: '1' },
        { file: 'backtracking/combination-sum.ts', expected: '2 2 3\n7' },
        { file: 'dynamic-programming/climbing-stairs.ts', expected: '2\n3\n8' },
        { file: 'graphs/flood-fill.ts', expected: '2 2 2\n2 2 0\n2 0 1' },
        { file: 'sorting/bubble-sort.ts', expected: '1 2 5 8 9' }
    ];

    const compilerService = new CompilerService();
    let passed = 0;

    for (const target of targetProblems) {
        const filePath = path.join(problemsDir, target.file);
        const base = path.basename(filePath);
        console.log(`🧪 Verifying Workspace Java Execution for: ${base}`);

        try {
            const problem = loadProblemFile(filePath);
            const javaCode = problem.languages.java?.starterCode;
            
            assert.ok(javaCode, "Missing Java starter code in problem definition");
            
            console.log("  - Compiling & Running Java starter code...");
            const result = await compilerService.execute('java', javaCode);
            
            console.log("  - Exit Code:", result.code);
            console.log("  - Output:\n" + result.stdout.trim() + "\n");
            
            assert.strictEqual(result.code, 0, "Execution should succeed");
            
            // Clean outputs for comparison by splitting into lines and trimming trailing spaces
            const cleanStdout = result.stdout
                .replace(/\r\n/g, '\n')
                .split('\n')
                .map(line => line.trimEnd())
                .join('\n')
                .trim();
            const cleanExpected = target.expected
                .replace(/\r\n/g, '\n')
                .split('\n')
                .map(line => line.trimEnd())
                .join('\n')
                .trim();
            
            assert.ok(cleanStdout.includes(cleanExpected), `Output does not match expected. Expected to contain:\n${cleanExpected}\n\nGot:\n${cleanStdout}`);
            console.log(`  ✅ Passed: ${base} execution verified successfully!\n`);
            passed++;
        } catch (err: any) {
            console.error(`  ❌ FAILED: ${err.message}\n`);
        }
    }

    console.log("====================================================");
    console.log("📊 JAVA WORKSPACE TEST RESULTS SUMMARY");
    console.log("====================================================");
    console.log(`TOTAL PROBLEMS TESTED: ${targetProblems.length}`);
    console.log(`✅ PASSED: ${passed}`);
    console.log(`❌ FAILED: ${targetProblems.length - passed}\n`);

    if (passed === targetProblems.length) {
        console.log("🎉 ALL TARGET PROBLEMS PASSED JAVA WORKSPACE RUNTIME VERIFICATION!");
        process.exit(0);
    } else {
        process.exit(1);
    }
}

run().catch(e => {
    console.error("Unhandled error:", e);
    process.exit(1);
});
