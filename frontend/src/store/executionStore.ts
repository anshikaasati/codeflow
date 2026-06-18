import { create } from 'zustand';
import type { ExecutionTrace, AlgorithmAnalysis, FlowchartData, TraceStep, TraceResult, PatternInfo, RunResult } from '../types';
import { TraceEngineClient } from '../features/visualizer/services/TraceEngineClient';
import { useLanguageStore } from './languageStore';

// Validation types (matching backend)
export interface ValidationIssue {
    type: 'syntax' | 'missing_main' | 'missing_header' | 'infinite_loop' | 'infinite_recursion' | 'undefined_behavior' | 'runtime_risk';
    severity: 'error' | 'warning' | 'info';
    line?: number;
    message: string;
    beginnerMessage: string;
    canFix: boolean;
}

export interface FixExplanation {
    whatWasWrong: string;
    whyItBlocked: string;
    whatWasChanged: string;
    originalSnippet?: string;
    fixedSnippet?: string;
}

export interface ValidationResult {
    isValid: boolean;
    canAutoFix: boolean;
    issues: ValidationIssue[];
    fixedCode?: string;
    fixExplanations?: FixExplanation[];
    complexityWarning?: string;
}

interface ExecutionState {
    code: string;
    traces: ExecutionTrace[];
    analysis: AlgorithmAnalysis | null;
    flowchart: string | FlowchartData | null;
    currentStepIndex: number;
    isPlaying: boolean;
    speed: number;
    isConnected: boolean;
    error: string | null;
    input: string;

    // Validation state
    validationPhase: 'idle' | 'validating' | 'awaiting_permission' | 'executing';
    validationResult: ValidationResult | null;
    showFixDialog: boolean;

    // Blackboard-style trace state
    traceSteps: TraceStep[];
    currentPattern: PatternInfo | null;
    traceMode: boolean;  // true = show blackboard visualizer, false = show flowchart
    traceOutput: string;

    // Real Run State
    runOutput: RunResult | null;

    setCode: (code: string) => void;
    setInput: (input: string) => void;
    connect: () => void;
    runCode: () => void; // Existing Visualize
    executeRealCode: () => void; // New Real Run
    nextStep: () => void;
    prevStep: () => void;
    setStep: (step: number) => void;
    togglePlay: () => void;
    setSpeed: (ms: number) => void;
    reset: () => void;

    // Validation actions
    acceptFix: () => void;
    rejectFix: () => void;
    dismissValidation: () => void;

    // Trace actions
    requestTrace: () => void;
    setTraceMode: (enabled: boolean) => void;
}

export const useExecutionStore = create<ExecutionState>((set, get) => {
    let intervalId: any = null;
    const initialLanguage = (localStorage.getItem('codeflow_preferred_language') as 'cpp' | 'python') || 'cpp';

    return {
        code: initialLanguage === 'python'
            ? `class Solution:\n    def solve(self):\n        # Write your code here\n        pass\n\nif __name__ == "__main__":\n    sol = Solution()\n    print(sol.solve())\n`
            : `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
        traces: [],
        analysis: null,
        flowchart: null,
        currentStepIndex: -1,
        isPlaying: false,
        speed: 500,
        isConnected: false,
        error: null,
        input: "",

        // Validation state
        validationPhase: 'idle',
        validationResult: null,
        showFixDialog: false,

        // Trace state
        traceSteps: [],
        currentPattern: null,
        traceMode: true,  // Default to blackboard mode
        traceOutput: "",

        runOutput: null,

        setCode: (code) => set({ code }),
        setInput: (input) => set({ input }),

        connect: () => {
            const client = TraceEngineClient.getInstance();
            if (client.isConnected()) return;

            client.connect(
                (msg) => {
                    if (msg.type === 'EXECUTION_RESULT') {
                        const { traces, analysis, flowchart } = msg.payload;
                        set({
                            traces,
                            analysis,
                            flowchart,
                            currentStepIndex: 0,
                            isPlaying: true,
                            error: null,
                            validationPhase: 'idle',
                            showFixDialog: false
                        });
                        // Start playback immediately
                        if (intervalId) clearInterval(intervalId);
                        intervalId = setInterval(() => {
                            get().nextStep();
                        }, get().speed);

                    } else if (msg.type === 'VALIDATION_RESULT') {
                        // Code has issues - show validation dialog
                        const validation = msg.payload as ValidationResult;
                        set({
                            validationResult: validation,
                            validationPhase: validation.canAutoFix ? 'awaiting_permission' : 'idle',
                            showFixDialog: validation.canAutoFix && !validation.isValid,
                            error: validation.isValid ? null :
                                validation.issues.filter(i => i.severity === 'error')
                                    .map(i => i.beginnerMessage).join('\n\n')
                        });

                    } else if (msg.type === 'ERROR') {
                        set({
                            error: msg.payload,
                            isPlaying: false,
                            validationPhase: 'idle'
                        });
                    } else if (msg.type === 'TRACE_RESULT') {
                        // Handle blackboard-style trace result
                        const traceResult = msg.payload as TraceResult;
                        if (traceResult.success) {
                            set({
                                traceSteps: traceResult.steps,
                                currentPattern: traceResult.pattern || null,
                                traceOutput: traceResult.output || "",
                                analysis: traceResult.analysis || null,
                                currentStepIndex: 0,
                                isPlaying: true,
                                error: null,
                                validationPhase: 'idle',
                                showFixDialog: false
                            });
                            // Start playback
                            if (intervalId) clearInterval(intervalId);
                            intervalId = setInterval(() => {
                                get().nextStep();
                            }, get().speed);
                        } else {
                            set({
                                error: traceResult.error || 'Trace generation failed',
                                isPlaying: false
                            });
                        }
                    } else if (msg.type === 'TRACE_VALIDATION_NEEDED') {
                        // Code needs fixing before trace
                        const validation = msg.payload as ValidationResult;
                        set({
                            validationResult: validation,
                            validationPhase: 'awaiting_permission',
                            showFixDialog: true
                        });
                    } else if (msg.type === 'RUN_RESULT') {
                        set({
                            runOutput: msg.payload,
                            error: null
                        });
                    }
                },
                () => {
                    set({ isConnected: true, error: null });
                    console.log('Connected to Backend');
                },
                () => {
                    set({ isConnected: false });
                    console.log('Disconnected');
                },
                (err) => {
                    console.error('WebSocket connection error:', err);
                    set({ isConnected: false, error: 'Connection error' });
                }
            );
        },

        runCode: () => {
            const { code, input } = get();
            const client = TraceEngineClient.getInstance();
            if (!client.isConnected()) {
                set({ error: 'Not connected to server' });
                return;
            }
            set({
                traces: [],
                currentStepIndex: -1,
                error: null,
                validationPhase: 'validating',
                validationResult: null,
                showFixDialog: false
            });
            client.send('EXECUTE', { code, input, language: useLanguageStore.getState().currentLanguage });
        },

        executeRealCode: () => {
            const { code, input } = get();
            const client = TraceEngineClient.getInstance();
            if (!client.isConnected()) {
                set({ error: 'Not connected to server' });
                return;
            }
            set({
                runOutput: null,
                error: null,
                isPlaying: false
            });
            client.send('RUN_CODE', { code, input, language: useLanguageStore.getState().currentLanguage });
        },

        acceptFix: () => {
            const { validationResult, input } = get();
            const client = TraceEngineClient.getInstance();
            if (!client.isConnected() || !validationResult?.fixedCode) {
                set({ error: 'Cannot apply fix' });
                return;
            }

            set({
                validationPhase: 'executing',
                showFixDialog: false
            });

            client.send('EXECUTE_WITH_FIX', {
                originalCode: get().code,
                fixedCode: validationResult.fixedCode,
                input,
                language: useLanguageStore.getState().currentLanguage
            });
        },

        rejectFix: () => {
            set({
                showFixDialog: false,
                validationPhase: 'idle',
                error: 'Execution cancelled. Please fix the code manually.'
            });
        },

        dismissValidation: () => {
            set({
                showFixDialog: false,
                validationPhase: 'idle',
                validationResult: null
            });
        },

        nextStep: () => {
            const { currentStepIndex, traces, traceSteps, traceMode } = get();
            const stepsArray = traceMode ? traceSteps : traces;
            if (currentStepIndex < stepsArray.length - 1) {
                set({ currentStepIndex: currentStepIndex + 1 });
            } else {
                set({ isPlaying: false });
                clearInterval(intervalId);
            }
        },

        prevStep: () => {
            const { currentStepIndex } = get();
            if (currentStepIndex > 0) {
                set({ currentStepIndex: currentStepIndex - 1 });
            }
        },

        setStep: (step) => set({ currentStepIndex: step }),

        togglePlay: () => {
            const { isPlaying, speed } = get();
            if (isPlaying) {
                clearInterval(intervalId);
                set({ isPlaying: false });
            } else {
                set({ isPlaying: true });
                intervalId = setInterval(() => {
                    get().nextStep();
                }, speed);
            }
        },

        setSpeed: (speed) => {
            set({ speed });
            const { isPlaying } = get();
            if (isPlaying) {
                clearInterval(intervalId);
                intervalId = setInterval(() => {
                    get().nextStep();
                }, speed);
            }
        },

        reset: () => {
            clearInterval(intervalId);
            set({
                traces: [],
                traceSteps: [],
                analysis: null,
                flowchart: null,
                currentPattern: null,
                currentStepIndex: -1,
                isPlaying: false,
                error: null,
                validationPhase: 'idle',
                validationResult: null,
                showFixDialog: false,
                traceOutput: "",
                runOutput: null
            });
        },

        requestTrace: () => {
            const { code, input, traceMode } = get();
            const client = TraceEngineClient.getInstance();
            if (!client.isConnected()) {
                set({ error: 'Not connected to server' });
                return;
            }

            // If in Flowchart mode, run the legacy execution (User Request)
            if (!traceMode) {
                get().runCode();
                return;
            }

            set({
                traceSteps: [],
                currentStepIndex: -1,
                error: null,
                validationPhase: 'validating',
                validationResult: null,
                showFixDialog: false
            });
            client.send('TRACE', { code, input, language: useLanguageStore.getState().currentLanguage });
        },

        setTraceMode: (enabled) => set({ traceMode: enabled })
    };
});
