import { WebSocket } from 'ws';
import { ExecutionService } from '../services/execution.service';
import { CompilerService } from '../services/compiler.service';
import { AiService } from '../services/ai.service';
import { LanguageFactory } from '../engine/language.factory';
import { TraceAdapterFactory } from '../engine/trace.adapter';
import { ExecutionRequest, ExecutionResponse, ValidationPayload } from '../types';
import { CacheService } from '../services/cache.service';
import { getFriendlyErrorMessage } from '../config/errorRegistry';
import { LoggerService } from '../services/logger.service';

export class ExecutionController {
    private executionService: ExecutionService;
    private compilerService: CompilerService;
    private aiService: AiService;

    constructor() {
        this.executionService = new ExecutionService();
        this.compilerService = new CompilerService();
        this.aiService = new AiService();
    }

    public handleMessage(ws: WebSocket, message: string) {
        try {
            const msg = JSON.parse(message);

            switch (msg.type) {
                case 'EXECUTE':
                    // This is "Simulate/Visualize"
                    this.handleExecute(ws, msg.payload);
                    break;
                case 'RUN_CODE':
                    // This is "Real Run" (Piston)
                    this.handleRunCode(ws, msg.payload);
                    break;
                case 'VALIDATE':
                    this.handleValidate(ws, msg.payload);
                    break;
                case 'EXECUTE_WITH_FIX':
                    this.handleExecuteWithFix(ws, msg.payload);
                    break;
                case 'TRACE':
                    this.handleTrace(ws, msg.payload);
                    break;
                case 'CLIENT_LOG':
                    this.handleClientLog(msg.payload);
                    break;
                default:
                    this.sendError(ws, 'Unknown message type');
            }
        } catch (e) {
            console.error('Error handling message:', e);
            this.sendError(ws, 'Invalid message format');
        }
    }

    /**
     * Handle code validation request (Phase 1 of execution)
     */
    private handleValidate(ws: WebSocket, payload: any) {
        try {
            const code = typeof payload === 'string' ? payload : payload.code || '';
            const language = payload?.language || 'cpp';

            console.log(`Validating code (${language})...`);
            
            const validator = LanguageFactory.getValidator(language);
            const validation = validator.validate(code);
            const complexity = validator.estimateComplexity(code);

            const response: ExecutionResponse = {
                type: 'VALIDATION_RESULT',
                payload: {
                    ...validation,
                    complexityWarning: complexity.warning
                } as ValidationPayload
            };

            this.safeSend(ws, response);

        } catch (e: any) {
            console.error('Validation Error:', e);
            this.sendError(ws, this.makeErrorFriendly(e.message || 'Validation failed'));
        }
    }

    private handleClientLog(payload: any) {
        const { category = 'VISUALIZATION', message = '', details = {} } = payload || {};
        LoggerService.error(category as any, `[Client Event] ${message}`, details);
    }

    /**
     * Handle trace generation request for Blackboard-style visualization
     */
    private async handleTrace(ws: WebSocket, payload: any) {
        const start = Date.now();
        const language = payload?.language || 'cpp';
        try {
            const code = typeof payload === 'string' ? payload : payload.code || '';
            const input = typeof payload === 'object' ? (payload.input || '') : '';

            const userId = payload?.userId;
            const problemId = payload?.problemId;
            if (userId) {
                const { User } = require('../models/User');
                const { DailyProgress } = require('../models/DailyProgress');
                const user = await User.findOne({ firebaseUid: userId });
                if (user) {
                    const plan = user.subscriptionPlan || 'free';
                    const limit = plan === 'free' ? 10 : plan === 'pro' ? 100 : 9999;
                    const todayStr = new Date().toISOString().split('T')[0];
                    let progressToday = await DailyProgress.findOne({ userId, date: todayStr });
                    if (!progressToday) {
                        progressToday = new DailyProgress({
                            userId,
                            date: todayStr,
                            solvedCount: 0,
                            tracesCount: 0,
                            revisionsCount: 0,
                            aiRequestsCount: 0
                        });
                        await progressToday.save();
                    }
                    if (progressToday.tracesCount >= limit) {
                        this.sendError(ws, `Daily Trace quota exceeded (${progressToday.tracesCount}/${limit}). Upgrade your plan to visualize more algorithms!`);
                        return;
                    }
                }
                const { DashboardController } = require('./dashboard.controller');
                DashboardController.recordTraceUsage(userId, problemId).catch((err: any) => {
                    console.error('Failed to record trace usage:', err);
                });
            }

            console.log(`Generating deterministic execution trace for ${language}...`);

            // First validate the code
            const validator = LanguageFactory.getValidator(language);
            const validation = validator.validate(code);

            if (!validation.isValid) {
                // Send validation result with fix option
                if (validation.canAutoFix && validation.fixedCode) {
                    this.safeSend(ws, {
                        type: 'TRACE_VALIDATION_NEEDED',
                        payload: {
                            ...validation,
                            message: 'Code needs fixing before we can trace it'
                        }
                    });
                } else {
                    const errorMessages = validation.issues
                        .filter((i: any) => i.severity === 'error')
                        .map((i: any) => i.beginnerMessage)
                        .join('\n\n');
                    this.sendError(ws, errorMessages || 'Code has errors that cannot be automatically fixed.');
                }
                return;
            }

            const traceCacheKey = CacheService.getCacheKey('trace', language, code, input);
            const cachedTrace = CacheService.traceCache.get(traceCacheKey);
            if (cachedTrace) {
                console.log(`[Cache Hit] Trace result found for ${language}`);
                this.safeSend(ws, {
                    type: 'TRACE_RESULT',
                    payload: cachedTrace
                });
                return;
            }

            // Deterministic trace simulation and parallel AI analysis
            const [traces, analysis] = await Promise.all([
                (async () => {
                    const executor = LanguageFactory.getExecutor(language);
                    const generator = executor.execute(code, input);
                    const list: any[] = [];
                    let stepLimit = 0;
                    for (const trace of generator) {
                        list.push(trace);
                        if (stepLimit++ > 2000) {
                            break;
                        }
                    }
                    return list;
                })(),
                this.aiService.analyzeCode(code, language)
            ]);

            const codeLines = code.split('\n');
            const adapter = TraceAdapterFactory.getAdapter(language);
            const traceSteps = traces.map((t, idx) => adapter.adapt(t, idx, codeLines));

            const traceResult = {
                success: true,
                steps: traceSteps,
                totalSteps: traceSteps.length,
                output: traces[traces.length - 1]?.output || '',
                analysis
            };

            // Cache the trace result
            CacheService.traceCache.set(traceCacheKey, traceResult);

            LoggerService.info('TRACE', `Trace generation succeeded for ${language} in ${Date.now() - start}ms`, {
                codeLength: code.length,
                steps: traceSteps.length
            });

            this.safeSend(ws, {
                type: 'TRACE_RESULT',
                payload: traceResult
            });

        } catch (e: any) {
            LoggerService.error('TRACE', `Trace generation failed for ${language}: ${e.message}`, {
                error: e.stack
            });
            console.error('Trace Error:', e);
            this.sendError(ws, this.makeErrorFriendly(e.message || 'Trace generation failed'));
        }
    }

    /**
     * Handle execution with auto-fixed code (after user permission)
     */
    private async handleExecuteWithFix(ws: WebSocket, payload: any) {
        try {
            const originalCode = payload.originalCode || '';
            const fixedCode = payload.fixedCode || '';
            const input = payload.input || '';
            const language = payload.language || 'cpp';

            console.log('Executing with user-approved fixes...');

            // Execute the fixed code
            const result = await this.executionService.execute(fixedCode, input, language);

            // Include info that this used fixed code
            const response: ExecutionResponse = {
                type: 'EXECUTION_RESULT',
                payload: {
                    ...result,
                    usedFixedCode: true,
                    originalCode
                } as any
            };

            this.safeSend(ws, response);

        } catch (e: any) {
            console.error('Execution Error (fixed code):', e);
            this.sendError(ws, this.makeErrorFriendly(e.message || 'Execution failed'));
        }
    }

    /**
     * Handle "Run Code" request (Real Execution via Piston)
     */
    private async handleRunCode(ws: WebSocket, payload: any) {
        try {
            const code = payload.code || '';
            const input = payload.input || '';
            const language = payload.language || 'cpp';

            console.log(`Running code (${language}) via CompilerService...`);

            // Execute via Piston
            const result = await this.compilerService.execute(language, code, input);

            const response: ExecutionResponse = {
                type: 'RUN_RESULT',
                payload: result
            };

            this.safeSend(ws, response);

        } catch (e: any) {
            console.error('Run Code Error:', e);
            this.sendError(ws, `Failed to run code: ${e.message}`);
        }
    }

    /**
     * Main execution handler - now includes validation phase
     */
    private async handleExecute(ws: WebSocket, payload: any) {
        try {
            let code = "";
            let input = "";
            let language = "cpp";

            if (typeof payload === 'string') {
                code = payload;
            } else {
                code = payload.code || "";
                input = payload.input || "";
                language = payload.language || "cpp";
            }

            const userId = payload?.userId;
            const problemId = payload?.problemId;
            if (userId) {
                const { DashboardController } = require('./dashboard.controller');
                DashboardController.recordTraceUsage(userId, problemId).catch((err: any) => {
                    console.error('Failed to record trace usage:', err);
                });
            }

            console.log(`Executing code (${language}) length: ${code.length}`);

            // PHASE 1: Validate code first
            const validator = LanguageFactory.getValidator(language);
            const validation = validator.validate(code);

            if (!validation.isValid) {
                // Code has errors - check if auto-fixable
                if (validation.canAutoFix && validation.fixedCode) {
                    // Send validation result asking for permission
                    const response: ExecutionResponse = {
                        type: 'VALIDATION_RESULT',
                        payload: {
                            ...validation,
                            complexityWarning: validator.estimateComplexity(code).warning
                        } as ValidationPayload
                    };
                    this.safeSend(ws, response);
                    return;
                } else {
                    // Cannot auto-fix - send detailed error
                    const errorMessages = validation.issues
                        .filter((i: any) => i.severity === 'error')
                        .map((i: any) => i.beginnerMessage)
                        .join('\n\n');

                    this.sendError(ws, errorMessages || 'Code has errors that cannot be automatically fixed.');
                    return;
                }
            }

            // PHASE 2: Check for warnings (infinite loop, etc.)
            const warnings = validation.issues.filter((i: any) => i.severity === 'warning');
            if (warnings.length > 0) {
                console.log('Execution warnings:', warnings.map((w: any) => w.message));
            }

            // PHASE 3: Execute code
            const result = await this.executionService.execute(code, input, language);

            const response: ExecutionResponse = {
                type: 'EXECUTION_RESULT',
                payload: result
            };

            this.safeSend(ws, response);

        } catch (e: any) {
            console.error('Execution Error:', e);
            this.sendError(ws, this.makeErrorFriendly(e.message || 'Execution failed'));
        }
    }

    private sendError(ws: WebSocket, message: string) {
        const response: ExecutionResponse = {
            type: 'ERROR',
            payload: message
        };
        this.safeSend(ws, response);
    }

    private safeSend(ws: WebSocket, data: any) {
        if (ws.readyState === WebSocket.OPEN) {
            try {
                ws.send(JSON.stringify(data));
            } catch (e) {
                console.error('Error sending message:', e);
            }
        }
    }

    private makeErrorFriendly(error: string): string {
        const friendly = getFriendlyErrorMessage(error);
        if (friendly !== error) return friendly;

        // Syntax errors
        if (error.includes('Expected')) {
            if (error.includes("';'")) {
                return "Oops! It looks like you forgot a semicolon (;) at the end of a line. In C++, most statements need to end with a semicolon.";
            }
            if (error.includes("')'")) {
                return "There's a missing closing parenthesis ')'. Every '(' needs a matching ')'.";
            }
            if (error.includes("'}'")) {
                return "There's a missing closing brace '}'. Every '{' needs a matching '}'.";
            }
        }

        // Runtime errors
        if (error.includes('main') && error.includes('not defined')) {
            return "Your code needs a main() function - that's where C++ programs start running. Try adding: int main() { ... }";
        }

        if (error.includes('Undefined variable')) {
            const varMatch = error.match(/Undefined variable '(\w+)'/);
            if (varMatch) {
                return `You're using "${varMatch[1]}" but haven't created it yet. Variables need to be declared before you use them, like: int ${varMatch[1]} = 0;`;
            }
        }

        if (error.includes('Input stream exhausted')) {
            return "The program tried to read input, but there wasn't enough input provided. Make sure to add input values in the 'Input / Test Case' box below.";
        }

        // Default: return original but softened
        return `Something went wrong: ${error}\n\nDon't worry! This is a learning opportunity. Check your code carefully and try again.`;
    }
}

