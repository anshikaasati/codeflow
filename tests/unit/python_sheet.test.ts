import * as fs from 'fs';
import * as path from 'path';
import { Executor } from '../../backend/src/engine/languages/python/executor';

/**
 * python_sheet.test.ts
 * -------------------
 * Runs the Python tracer over every problem in the DSA sheet and verifies
 * that execution completes without errors.
 *
 * Run:  npm run test:python-sheet   (from backend/ or backend package.json)
 */

const PROBLEMS_DIR = path.join(__dirname, '../../frontend/src/data/problems');
const STEP_LIMIT = 1500;

interface TestResult {
    fileName: string;
    category: string;
    success: boolean;
    stepCount: number;
    visualizerTypes: string;
    outputSnippet: string;
    error?: string;
}

const getProblemFiles = (dir: string): string[] => {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getProblemFiles(filePath));
        } else if (file.endsWith('.ts') && file !== 'index.ts' && file !== 'types.ts') {
            results.push(filePath);
        }
    });
    return results;
};

/**
 * Extracts the Python starter code from a problem file.
 */
const extractPythonCode = (content: string): string | null => {
    const pythonBlockStart = content.search(/\bpython\s*:/);
    if (pythonBlockStart !== -1) {
        const afterPython = content.slice(pythonBlockStart);
        // Extract the template literal that follows 'starterCode:'
        const literalMatch = afterPython.match(/starterCode\s*:\s*`([\s\S]*?)`(?:\s*\n\s*\})/);
        if (literalMatch) return literalMatch[1];

        // Slightly looser fallback: take the first backtick literal after starterCode
        const looseLiteral = afterPython.match(/starterCode\s*:\s*`([\s\S]*?)`/);
        if (looseLiteral) return looseLiteral[1];
    }

    // Legacy schema fallback
    const legacyMatch = content.match(/starterCode\s*:\s*`([\s\S]*?)`/);
    return legacyMatch ? legacyMatch[1] : null;
};

const snippet = (text: string, maxLen = 60): string => {
    const flat = text.trim().replace(/\n/g, ' | ');
    return flat.length > maxLen ? flat.substring(0, maxLen) + '…' : flat || '(empty)';
};

const runPythonSheetTests = () => {
    console.log("====================================================");
    console.log("🚀 STARTING PYTHON DSA SHEET PROBLEMS TEST SUITE");
    console.log("====================================================\n");

    if (!fs.existsSync(PROBLEMS_DIR)) {
        console.error(`Error: Problems directory not found at ${PROBLEMS_DIR}`);
        process.exit(1);
    }

    const problemFiles = getProblemFiles(PROBLEMS_DIR);
    const results: TestResult[] = [];

    console.log(`Found ${problemFiles.length} problem files to test.\n`);

    for (const filePath of problemFiles) {
        const relativePath = path.relative(PROBLEMS_DIR, filePath);
        const category = path.dirname(relativePath);
        const fileName = path.basename(filePath);
        const content = fs.readFileSync(filePath, 'utf8');

        const sourceCode = extractPythonCode(content);

        if (!sourceCode) {
            console.log(`⚠️  Skip: ${relativePath} (No Python starterCode found)`);
            continue;
        }

        console.log(`🧪 [${category}] ${fileName}...`);

        try {
            const executor = new Executor();
            const generator = executor.execute(sourceCode, "");
            const traces: any[] = [];
            let steps = 0;
            let executorError: string | null = null;

            for (const trace of generator) {
                if (++steps > STEP_LIMIT) {
                    throw new Error(`Step limit exceeded (>${STEP_LIMIT} steps — possible infinite loop)`);
                }
                if (trace.type === 'error') {
                    executorError = trace.output || 'Unknown executor error';
                    break;
                }
                traces.push(trace);
            }

            if (executorError) {
                throw new Error(`Executor error: ${executorError}`);
            }

            const visualizerTypeSet = new Set<string>();
            traces.forEach(t => {
                if (t.visuals?.type) visualizerTypeSet.add(t.visuals.type);
            });
            const visualizerTypes = Array.from(visualizerTypeSet).join(', ') || 'none';

            const finalTrace = traces[traces.length - 1];
            const output = finalTrace?.output || "";

            results.push({
                fileName,
                category,
                success: true,
                stepCount: traces.length,
                visualizerTypes,
                outputSnippet: snippet(output),
            });
            console.log(`  ✅ ${traces.length} steps | Visuals: [${visualizerTypes}]\n`);

        } catch (error: any) {
            const msg = error.message || 'Unknown error';
            results.push({
                fileName,
                category,
                success: false,
                stepCount: 0,
                visualizerTypes: 'none',
                outputSnippet: 'N/A',
                error: msg,
            });
            console.error(`  ❌ Failed: ${msg}\n`);
        }
    }

    console.log("====================================================");
    console.log("📊 PYTHON SHEET TEST RESULTS SUMMARY");
    console.log("====================================================");

    const passed = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    console.log(`TOTAL PROBLEMS : ${results.length}`);
    console.log(`✅ PASSED      : ${passed.length}`);
    console.log(`❌ FAILED      : ${failed.length}\n`);

    if (failed.length > 0) {
        console.log("🚨 FAILED PROBLEMS:");
        failed.forEach(f => {
            console.log(`  - [${f.category}] ${f.fileName}`);
            console.log(`    Error: ${f.error}`);
        });
        console.log("");
    }

    console.log("====================================================");
    if (failed.length === 0) {
        console.log(`🎉 ALL ${results.length} PYTHON PROBLEMS PASSED SUCCESSFULLY!`);
        process.exit(0);
    } else {
        process.exit(1);
    }
};

runPythonSheetTests();
