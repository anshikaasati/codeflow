// Python execution and trace types

export interface PythonTraceStep {
    line: number;
    event: 'line' | 'call' | 'return' | 'exception';
    locals: Record<string, any>;
    globals: Record<string, any>;
    heap: Record<string, any>;
    stdout: string;
    exception?: {
        type: string;
        message: string;
    };
}
