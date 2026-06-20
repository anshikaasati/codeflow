import { IExecutor } from '../../executor.interface';
import { ExecutionTrace } from '../../../types';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { processJavaTraceVisuals } from './visuals';

export class Executor implements IExecutor {
    private getTraceRunnerPath(): string {
        // Check in dist/ first (production), fall back to src/ (development)
        const distPath = path.join(__dirname, 'trace_runner_java.py');
        if (fs.existsSync(distPath)) {
            return distPath;
        }
        // Replace /dist/ with /src/ in path
        const srcPath = distPath.replace(/[/\\]dist[/\\]/, (match) => match.replace('dist', 'src'));
        if (fs.existsSync(srcPath)) {
            return srcPath;
        }
        return distPath;
    }

    public *execute(code: string, input: string): Generator<ExecutionTrace, void, unknown> {
        // Write code to a unique temp file
        const tempFilename = `codeflow_java_${process.pid}_${Date.now()}.java`;
        const tempPath = path.join(os.tmpdir(), tempFilename);

        try {
            fs.writeFileSync(tempPath, code, 'utf-8');

            const { spawnSync } = require('child_process');
            const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';

            const result = spawnSync(
                pythonCmd,
                [this.getTraceRunnerPath(), tempPath, input || ''],
                {
                    encoding: 'utf-8',
                    maxBuffer: 10 * 1024 * 1024, // 10 MB
                    timeout: 30000               // 30 second hard timeout for JDWP
                }
            );

            if (result.error) {
                throw new Error(`Failed to execute Java trace runner: ${result.error.message}`);
            }

            if (result.status !== 0) {
                console.error(`Java trace runner exited with status ${result.status}`);
                console.error(`stderr: ${result.stderr}`);
            }

            const stdout = result.stdout;
            if (!stdout || stdout.trim().length === 0) {
                throw new Error('Java trace runner returned empty output.');
            }

            let response: any;
            try {
                response = JSON.parse(stdout);
            } catch (e: any) {
                throw new Error(`Failed to parse Java trace runner output: ${e.message}\nOutput was: ${stdout.slice(0, 500)}`);
            }

            if (!response.success) {
                const err = response.error;
                yield {
                    line: err.line || 1,
                    type: 'error',
                    stack: [],
                    heap: {},
                    output: `COMPILE ERROR: ${err.message}\nLine ${err.line || '?'}\n${err.text || ''}`,
                    explanation: `Compile Error: ${err.message}`
                };
                return;
            }

            const codeLines = code.split('\n');
            const steps: any[] = response.steps || [];

            for (const step of steps) {
                const processed = processJavaTraceVisuals(step, codeLines);
                yield processed;
            }

        } finally {
            // Clean up temp file
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
