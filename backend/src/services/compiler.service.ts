import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export interface RunResult {
    stdout: string;
    stderr: string;
    output: string; // Combined
    code: number;   // Exit code
    signal: string | null;
}

export class CompilerService {
    /**
     * Compile and execute code.
     * Tries local execution first, then falls back to Piston (if whitelisted) and Wandbox.
     */
    public async execute(language: string, source: string, stdin: string = ""): Promise<RunResult> {
        const lang = language.toLowerCase();

        // 1. Try local execution first for supported languages
        if (lang === 'python') {
            try {
                console.log('Attempting local Python execution...');
                return this.executePythonLocally(source, stdin);
            } catch (localErr: any) {
                console.warn(`Local Python execution failed: ${localErr.message}. Falling back to Wandbox...`);
            }
        } else if (lang === 'cpp' || lang === 'c++') {
            try {
                console.log('Attempting local C++ execution...');
                return this.executeCppLocally(source, stdin);
            } catch (localErr: any) {
                console.warn(`Local C++ execution failed: ${localErr.message}. Falling back to Wandbox...`);
            }
        } else if (lang === 'javascript' || lang === 'js') {
            try {
                console.log('Attempting local JavaScript execution...');
                return this.executeJavascriptLocally(source, stdin);
            } catch (localErr: any) {
                console.warn(`Local JavaScript execution failed: ${localErr.message}. Falling back to Wandbox...`);
            }
        }

        // 2. If Piston API token is configured, try Piston
        if (process.env.PISTON_API_TOKEN) {
            try {
                return await this.executePiston(language, source, stdin);
            } catch (pistonErr: any) {
                console.warn(`Piston failed (${pistonErr.message}), falling back to Wandbox...`);
            }
        }

        // 3. Try Wandbox with retries (up to 3 times, with 1.5s delay)
        const maxAttempts = 3;
        let lastError: any = null;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await this.executeWandbox(language, source, stdin);
            } catch (wandboxErr: any) {
                lastError = wandboxErr;
                console.warn(`Wandbox attempt ${attempt} failed: ${wandboxErr.message}`);
                
                if (attempt < maxAttempts) {
                    await new Promise(resolve => setTimeout(resolve, 1500));
                }
            }
        }

        // All attempts failed, return user-friendly error message
        console.error("Execution failed after all attempts:", lastError?.message || "Unknown error");
        
        let friendlyMessage = "Execution temporarily unavailable. Please try running your code again.";
        if (lastError && lastError.message) {
            const errStr = lastError.message;
            if (
                errStr.includes('OCI runtime') ||
                errStr.includes('crun') ||
                errStr.includes('clone') ||
                errStr.includes('Resource temporarily unavailable')
            ) {
                friendlyMessage = "The execution server is currently busy. Please wait a moment and try again.";
            } else {
                friendlyMessage = `Execution error: ${errStr}`;
            }
        }

        return {
            stdout: "",
            stderr: friendlyMessage,
            output: friendlyMessage,
            code: -1,
            signal: null
        };
    }

    private executePythonLocally(source: string, stdin: string): RunResult {
        const { spawnSync } = require('child_process');
        const tempFilename = `codeflow_run_${process.pid}_${Date.now()}.py`;
        const tempPath = path.join(os.tmpdir(), tempFilename);
        
        try {
            fs.writeFileSync(tempPath, source, 'utf-8');
            
            const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
            const result = spawnSync(pythonCmd, [tempPath], {
                input: stdin || '',
                encoding: 'utf-8',
                timeout: 10000,
                maxBuffer: 10 * 1024 * 1024
            });

            if (result.error) {
                if ((result.error as any).code === 'ETIMEDOUT') {
                    return {
                        stdout: '',
                        stderr: 'Execution timed out (10s limit exceeded)',
                        output: 'Execution timed out (10s limit exceeded)',
                        code: -1,
                        signal: 'SIGTERM'
                    };
                }
                throw result.error;
            }

            return {
                stdout: result.stdout || '',
                stderr: result.stderr || '',
                output: (result.stderr ? result.stderr + '\n' : '') + (result.stdout || ''),
                code: result.status ?? 0,
                signal: result.signal || null
            };
        } finally {
            try {
                if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
            } catch (e) {
                console.error(`Error deleting temp file ${tempPath}:`, e);
            }
        }
    }

    private executeCppLocally(source: string, stdin: string): RunResult {
        const { spawnSync } = require('child_process');
        const tempBase = `codeflow_run_${process.pid}_${Date.now()}`;
        const tempCpp = path.join(os.tmpdir(), `${tempBase}.cpp`);
        const tempExe = path.join(os.tmpdir(), process.platform === 'win32' ? `${tempBase}.exe` : tempBase);
        
        try {
            fs.writeFileSync(tempCpp, source, 'utf-8');
            
            // Try compiling with g++
            let compiler = 'g++';
            let compileResult = spawnSync(compiler, ['-O3', '-static', '-std=c++17', tempCpp, '-o', tempExe], {
                encoding: 'utf-8',
                timeout: 15000
            });
            
            // If g++ is missing, try clang++
            if (compileResult.error && (compileResult.error as any).code === 'ENOENT') {
                compiler = 'clang++';
                compileResult = spawnSync(compiler, ['-O3', '-static', '-std=c++17', tempCpp, '-o', tempExe], {
                    encoding: 'utf-8',
                    timeout: 15000
                });
            }

            // If compiler command is not found at all
            if (compileResult.error) {
                throw compileResult.error;
            }
            
            // If compilation output has errors
            if (compileResult.status !== 0) {
                const errStr = compileResult.stderr || '';
                if (
                    errStr.includes('collect2') ||
                    errStr.includes('ld returned') ||
                    errStr.includes('Access is denied') ||
                    errStr.includes('Permission denied')
                ) {
                    throw new Error(`Local compiler toolchain error: ${errStr}`);
                }
                return {
                    stdout: '',
                    stderr: errStr || 'Compilation failed',
                    output: `COMPILATION ERROR:\n${errStr || 'Compilation failed'}`,
                    code: compileResult.status ?? 1,
                    signal: null
                };
            }
            
            // Run the executable
            const runResult = spawnSync(tempExe, [], {
                input: stdin || '',
                encoding: 'utf-8',
                timeout: 10000,
                maxBuffer: 10 * 1024 * 1024
            });

            if (runResult.error) {
                if ((runResult.error as any).code === 'ETIMEDOUT') {
                    return {
                        stdout: '',
                        stderr: 'Execution timed out (10s limit exceeded)',
                        output: 'Execution timed out (10s limit exceeded)',
                        code: -1,
                        signal: 'SIGTERM'
                    };
                }
                throw runResult.error;
            }

            return {
                stdout: runResult.stdout || '',
                stderr: runResult.stderr || '',
                output: (runResult.stderr ? runResult.stderr + '\n' : '') + (runResult.stdout || ''),
                code: runResult.status ?? 0,
                signal: runResult.signal || null
            };

        } finally {
            try {
                if (fs.existsSync(tempCpp)) fs.unlinkSync(tempCpp);
                if (fs.existsSync(tempExe)) fs.unlinkSync(tempExe);
            } catch (e) {
                console.error('Error cleaning up local C++ files:', e);
            }
        }
    }

    private executeJavascriptLocally(source: string, stdin: string): RunResult {
        const { spawnSync } = require('child_process');
        const tempFilename = `codeflow_run_${process.pid}_${Date.now()}.js`;
        const tempPath = path.join(os.tmpdir(), tempFilename);
        
        try {
            fs.writeFileSync(tempPath, source, 'utf-8');
            
            const result = spawnSync('node', [tempPath], {
                input: stdin || '',
                encoding: 'utf-8',
                timeout: 10000,
                maxBuffer: 10 * 1024 * 1024
            });

            if (result.error) {
                if ((result.error as any).code === 'ETIMEDOUT') {
                    return {
                        stdout: '',
                        stderr: 'Execution timed out (10s limit exceeded)',
                        output: 'Execution timed out (10s limit exceeded)',
                        code: -1,
                        signal: 'SIGTERM'
                    };
                }
                throw result.error;
            }

            return {
                stdout: result.stdout || '',
                stderr: result.stderr || '',
                output: (result.stderr ? result.stderr + '\n' : '') + (result.stdout || ''),
                code: result.status ?? 0,
                signal: result.signal || null
            };
        } finally {
            try {
                if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
            } catch (e) {
                console.error(`Error deleting temp file ${tempPath}:`, e);
            }
        }
    }

    // ─── Wandbox ─────────────────────────────────────────────────────────────

    private async executeWandbox(language: string, source: string, stdin: string): Promise<RunResult> {
        const langMap: Record<string, string> = {
            'cpp': 'gcc-head',
            'c++': 'gcc-head',
            'c': 'gcc-head-c',
            'python': 'cpython-head',
            'javascript': 'nodejs-head',
            'typescript': 'typescript-head'
        };

        const compiler = langMap[language.toLowerCase()];
        if (!compiler) {
            throw new Error(`Unsupported language: ${language}`);
        }

        const payload: any = {
            compiler,
            code: source,
            stdin: stdin || ''
        };

        if (compiler === 'gcc-head') {
            payload.options = 'warning,gnu++17';
        }

        const response = await axios.post('https://wandbox.org/api/compile.json', payload, {
            timeout: 15000
        });
        const data = response.data;

        // Check for OCI / container runtime errors in the response body
        const compilerErr: string = data.compiler_error || '';
        const programErr: string = data.program_error || '';
        if (
            compilerErr.includes('OCI runtime') ||
            compilerErr.includes('crun') ||
            compilerErr.includes('Resource temporarily unavailable') ||
            programErr.includes('OCI runtime') ||
            programErr.includes('crun')
        ) {
            throw new Error(`Wandbox OCI runtime error: ${compilerErr || programErr}`);
        }

        if (data.compiler_error) {
            return {
                stdout: data.compiler_message || "",
                stderr: data.compiler_error,
                output: `COMPILATION ERROR:\n${data.compiler_error}`,
                code: 1,
                signal: null
            };
        }

        const statusCode = parseInt(data.status);

        return {
            stdout: data.program_message || "",
            stderr: data.program_error || "",
            output: (data.program_error ? data.program_error + '\n' : '') + (data.program_message || ''),
            code: isNaN(statusCode) ? -1 : statusCode,
            signal: data.signal || null
        };
    }

    // ─── Piston ──────────────────────────────────────────────────────────────

    private async executePiston(language: string, source: string, stdin: string): Promise<RunResult> {
        // Piston language + version map (latest stable)
        const pistonLangMap: Record<string, { language: string; version: string; filename: string }> = {
            'cpp':        { language: 'c++',        version: '10.2.0',   filename: 'main.cpp'  },
            'c++':        { language: 'c++',        version: '10.2.0',   filename: 'main.cpp'  },
            'c':          { language: 'c',          version: '10.2.0',   filename: 'main.c'    },
            'python':     { language: 'python',     version: '3.10.0',   filename: 'main.py'   },
            'javascript': { language: 'javascript', version: '18.15.0',  filename: 'main.js'   },
            'typescript': { language: 'typescript', version: '5.0.3',    filename: 'main.ts'   },
        };

        const lang = pistonLangMap[language.toLowerCase()];
        if (!lang) {
            throw new Error(`Unsupported language for Piston: ${language}`);
        }

        const payload = {
            language: lang.language,
            version: lang.version,
            files: [{ name: lang.filename, content: source }],
            stdin: stdin || '',
            args: []
        };

        const headers: Record<string, string> = {};
        if (process.env.PISTON_API_TOKEN) {
            headers['Authorization'] = process.env.PISTON_API_TOKEN;
        }

        const response = await axios.post('https://emkc.org/api/v2/piston/execute', payload, {
            timeout: 20000,
            headers
        });
        const data = response.data;
        const run = data.run || {};
        const compile = data.compile || {};

        // Compilation error (for compiled languages)
        if (compile.stderr && compile.code !== 0) {
            return {
                stdout: compile.stdout || "",
                stderr: compile.stderr,
                output: `COMPILATION ERROR:\n${compile.stderr}`,
                code: compile.code ?? 1,
                signal: compile.signal || null
            };
        }

        const stdout = run.stdout || "";
        const stderr = run.stderr || "";
        return {
            stdout,
            stderr,
            output: (stderr ? stderr + '\n' : '') + stdout,
            code: run.code ?? 0,
            signal: run.signal || null
        };
    }
}
