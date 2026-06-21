import { IExecutor } from '../../executor.interface';
import { ExecutionTrace } from '../../../types';
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { processPythonTraceVisuals } from './visuals';

export class Executor implements IExecutor {
    private getTraceRunnerPath(): string {
        const distPath = path.join(__dirname, 'trace_runner.py');
        if (fs.existsSync(distPath)) {
            return distPath;
        }
        const srcPath = distPath.replace(/[/\\]dist[/\\]/, (match) => match.replace('dist', 'src'));
        if (fs.existsSync(srcPath)) {
            return srcPath;
        }
        return distPath;
    }

    public *execute(code: string, input: string): Generator<ExecutionTrace, void, unknown> {
        // Create unique temporary file for user code
        const tempFilename = `codeflow_py_${process.pid}_${Date.now()}.py`;
        const tempPath = path.join(os.tmpdir(), tempFilename);
        
        try {
            // Write code to temp file
            fs.writeFileSync(tempPath, code, 'utf-8');

            // Spawn python subprocess synchronously or capture output
            // Let's run python as a child process and await its output synchronously
            // Wait, we need it to block and get the entire JSON before yielding.
            // Since we are inside a generator function, we can execute the process using execFileSync
            // or spawnSync which are blocking and return buffers! This is perfect for simple generator flow!
            const { spawnSync } = require('child_process');
            
            const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
            const result = spawnSync(pythonCmd, [this.getTraceRunnerPath(), tempPath, input || ""], {
                encoding: 'utf-8',
                timeout: 5000,
                maxBuffer: 10 * 1024 * 1024 // 10MB limit
            });

            if (result.error) {
                if ((result.error as any).code === 'ETIMEDOUT') {
                    throw new Error("Trace generation timed out (possible infinite loop or deep recursion).");
                }
                throw new Error(`Failed to execute Python trace runner: ${result.error.message}`);
            }

            if (result.status !== 0) {
                console.error(`Subprocess exited with status ${result.status}`);
                console.error(`stderr: ${result.stderr}`);
            }

            const stdout = result.stdout;
            if (!stdout || stdout.trim().length === 0) {
                throw new Error("Python trace runner returned empty output.");
            }

            let response;
            try {
                response = JSON.parse(stdout);
            } catch (e: any) {
                throw new Error(`Failed to parse trace runner output: ${e.message}\nOutput was: ${stdout}`);
            }

            if (!response.success) {
                const err = response.error;
                yield {
                    line: err.line || 1,
                    type: 'error',
                    stack: [],
                    heap: {},
                    output: `SYNTAX ERROR: ${err.message}\nLine ${err.line}, offset ${err.offset}\n${err.text || ''}`,
                    explanation: `Syntax Error: ${err.message}`
                };
                return;
            }

            const codeLines = code.split('\n');
            const steps = response.steps || [];

            for (const step of steps) {
                // Post-process visuals and explanations
                const processed = processPythonTraceVisuals(step, codeLines);
                yield processed;
            }

        } finally {
            // Cleanup the temporary file
            try {
                if (fs.existsSync(tempPath)) {
                    fs.unlinkSync(tempPath);
                }
            } catch (e) {
                console.error(`Error deleting temp file ${tempPath}:`, e);
            }
        }
    }
}
