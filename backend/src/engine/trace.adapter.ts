import { ExecutionTrace } from '../types';
import { normalizeLanguage } from './language.registry';

export interface ITraceAdapter {
    adapt(trace: ExecutionTrace, idx: number, codeLines: string[]): any;
}

export class CppTraceAdapter implements ITraceAdapter {
    public adapt(t: ExecutionTrace, idx: number, codeLines: string[]): any {
        const topFrame = t.stack.length > 0 ? t.stack[t.stack.length - 1] : { locals: {} };
        const rawVars = { ...topFrame.locals };
        const variables: Record<string, any> = {};
        
        // Dereference heap pointers
        for (const [k, v] of Object.entries(rawVars)) {
            if (typeof v === 'string' && v.startsWith('#') && t.heap && t.heap[v] !== undefined) {
                variables[k] = t.heap[v];
            } else {
                variables[k] = v;
            }
        }

        return {
            step: idx + 1,
            line: t.line,
            lineContent: codeLines[t.line - 1]?.trim() || '',
            variables,
            visuals: t.visuals,
            assignmentDetail: t.assignmentDetail,
            teacherNote: {
                what: t.visualization?.explanation.what || t.explanation || '',
                why: t.visualization?.explanation.why || '',
                next: t.visualization?.explanation.next || ''
            },
            type: t.type === 'definition' ? 'assignment' : (t.type as any)
        };
    }
}

export class PythonTraceAdapter implements ITraceAdapter {
    public adapt(t: ExecutionTrace, idx: number, codeLines: string[]): any {
        const topFrame = t.stack.length > 0 ? t.stack[t.stack.length - 1] : { locals: {} };
        const rawVars = { ...topFrame.locals };
        const variables: Record<string, any> = {};
        
        // Dereference heap pointers
        for (const [k, v] of Object.entries(rawVars)) {
            if (typeof v === 'string' && v.startsWith('#') && t.heap && t.heap[v] !== undefined) {
                variables[k] = t.heap[v];
            } else {
                variables[k] = v;
            }
        }

        return {
            step: idx + 1,
            line: t.line,
            lineContent: codeLines[t.line - 1]?.trim() || '',
            variables,
            visuals: t.visuals,
            assignmentDetail: t.assignmentDetail,
            teacherNote: {
                what: t.visualization?.explanation.what || t.explanation || '',
                why: t.visualization?.explanation.why || '',
                next: t.visualization?.explanation.next || ''
            },
            type: t.type === 'definition' ? 'assignment' : (t.type as any)
        };
    }
}

export class JavaTraceAdapter implements ITraceAdapter {
    public adapt(t: ExecutionTrace, idx: number, codeLines: string[]): any {
        const topFrame = t.stack.length > 0 ? t.stack[t.stack.length - 1] : { locals: {} };
        const rawVars = { ...topFrame.locals };
        const variables: Record<string, any> = {};
        
        // Dereference heap pointers
        for (const [k, v] of Object.entries(rawVars)) {
            if (typeof v === 'string' && v.startsWith('#') && t.heap && t.heap[v] !== undefined) {
                variables[k] = t.heap[v];
            } else {
                variables[k] = v;
            }
        }

        return {
            step: idx + 1,
            line: t.line,
            lineContent: codeLines[t.line - 1]?.trim() || '',
            variables,
            visuals: t.visuals,
            assignmentDetail: t.assignmentDetail,
            teacherNote: {
                what: t.visualization?.explanation.what || t.explanation || '',
                why: t.visualization?.explanation.why || '',
                next: t.visualization?.explanation.next || ''
            },
            type: t.type === 'definition' ? 'assignment' : (t.type as any)
        };
    }
}

export class TraceAdapterFactory {
    public static getAdapter(language: string): ITraceAdapter {
        const lang = normalizeLanguage(language);
        if (lang === 'python') {
            return new PythonTraceAdapter();
        } else if (lang === 'cpp') {
            return new CppTraceAdapter();
        } else if (lang === 'java') {
            return new JavaTraceAdapter();
        }
        // Fallback to CppTraceAdapter
        return new CppTraceAdapter();
    }
}
