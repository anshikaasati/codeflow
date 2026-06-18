import { spawnSync } from 'child_process';
import { ValidationResult, ValidationIssue, FixExplanation } from '../../../services/validation.service';

export class PythonValidator {
    /**
     * Validate Python code and return syntax issues, infinite loop risks, and warnings.
     */
    public validate(code: string): ValidationResult {
        const issues: ValidationIssue[] = [];

        // 1. Basic empty check
        if (!code || code.trim().length === 0) {
            issues.push({
                type: 'syntax',
                severity: 'error',
                message: 'Empty code provided',
                beginnerMessage: 'There\'s no code to run! Please write some Python code first.',
                canFix: false
            });
            return { isValid: false, canAutoFix: false, issues };
        }

        // 2. Syntax validation via Python compiler
        const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
        const compileScript = `
import sys
import json
try:
    compile(sys.stdin.read(), '<string>', 'exec')
    print(json.dumps({"valid": True}))
except SyntaxError as e:
    print(json.dumps({
        "valid": False,
        "message": e.msg,
        "line": e.lineno,
        "offset": e.offset,
        "text": e.text
    }))
`;

        const result = spawnSync(pythonCmd, ['-c', compileScript], {
            input: code,
            encoding: 'utf-8'
        });

        if (result.status === 0 && result.stdout) {
            try {
                const parse = JSON.parse(result.stdout.trim());
                if (!parse.valid) {
                    issues.push({
                        type: 'syntax',
                        severity: 'error',
                        line: parse.line || undefined,
                        message: parse.message,
                        beginnerMessage: this.makeSyntaxErrorFriendly(parse.message, parse.line),
                        canFix: this.canAutoFix(parse.message)
                    });
                }
            } catch (e) {
                console.error("Failed to parse validator result:", e);
            }
        }

        // 3. Detect infinite loop risks
        this.detectInfiniteLoopRisks(code, issues);

        const hasErrors = issues.some(i => i.severity === 'error');
        const canAutoFix = issues.some(i => i.canFix);

        let fixedCode: string | undefined;
        let fixExplanations: FixExplanation[] | undefined;

        if (canAutoFix && hasErrors) {
            const fixResult = this.generateFixes(code, issues);
            fixedCode = fixResult.fixedCode;
            fixExplanations = fixResult.explanations;
        }

        return {
            isValid: !hasErrors,
            canAutoFix,
            issues,
            fixedCode,
            fixExplanations
        };
    }

    private makeSyntaxErrorFriendly(msg: string, line?: number): string {
        const lineText = line ? ` on line ${line}` : '';
        if (msg.includes("expected ':'") || msg.includes("expected colon")) {
            return `Oops! You forgot a colon (:)${lineText}. In Python, statements like if, for, while, and def must end with a colon.`;
        }
        if (msg.includes("expected an indented block") || msg.includes("unexpected indent") || msg.includes("unindent does not match")) {
            return `Indentation error detected${lineText}. Python relies strictly on consistent spacing (spaces or tabs) to define code blocks. Make sure your lines are aligned correctly!`;
        }
        if (msg.includes("was never closed") || msg.includes("unclosed parenthesis")) {
            return `A bracket or parenthesis is missing its closing match${lineText}. Check all your brackets are balanced.`;
        }
        return `Syntax error found${lineText}: ${msg}. Check this line carefully for typos or formatting mistakes.`;
    }

    private canAutoFix(msg: string): boolean {
        return msg.includes("expected ':'") || msg.includes("expected colon");
    }

    private generateFixes(code: string, issues: ValidationIssue[]): { fixedCode: string; explanations: FixExplanation[] } {
        const lines = code.split('\n');
        const explanations: FixExplanation[] = [];

        for (const issue of issues) {
            if (issue.canFix && issue.line) {
                const idx = issue.line - 1;
                const originalLine = lines[idx];
                
                // Auto-append colon
                if (originalLine && !originalLine.trim().endsWith(':')) {
                    lines[idx] = originalLine + ':';
                    explanations.push({
                        whatWasWrong: `Missing colon (:) on line ${issue.line}`,
                        whyItBlocked: 'Python statements (if/while/for/def) require a colon at the end to declare code blocks.',
                        whatWasChanged: `Added a colon (:) to the end of the statement.`,
                        originalSnippet: originalLine.trim(),
                        fixedSnippet: lines[idx].trim()
                    });
                }
            }
        }

        return {
            fixedCode: lines.join('\n'),
            explanations
        };
    }

    private detectInfiniteLoopRisks(code: string, issues: ValidationIssue[]): void {
        // Heuristic to check while True / while 1 loops
        const lines = code.split('\n');
        lines.forEach((line, idx) => {
            if (/while\s+(True|1)\s*:/i.test(line)) {
                // Check if loop block contains break or return statement
                // We'll search subsequent lines with greater indentation
                const lineIndent = line.search(/\S/);
                let hasExit = false;
                
                for (let j = idx + 1; j < lines.length; j++) {
                    const nextLine = lines[j];
                    if (nextLine.trim().length === 0) continue;
                    
                    const nextIndent = nextLine.search(/\S/);
                    if (nextIndent <= lineIndent) {
                        // Exited loop indentation block
                        break;
                    }
                    if (/\b(break|return)\b/.test(nextLine)) {
                        hasExit = true;
                        break;
                    }
                }

                if (!hasExit) {
                    issues.push({
                        type: 'infinite_loop',
                        severity: 'warning',
                        line: idx + 1,
                        message: 'Potential infinite loop detected',
                        beginnerMessage: `The "while True" loop on line ${idx + 1} has no exit condition. It will run forever unless you add a "break" or "return" inside the loop!`,
                        canFix: false
                    });
                }
            }
        });
    }

    /**
     * Complexity estimator helper (matches C++ version logic)
     */
    public estimateComplexity(code: string): { safe: boolean; estimatedSteps: number; warning?: string } {
        // Count for / while loops
        const loopCount = (code.match(/\bfor\s+\w+\s+in\b|\bwhile\s+/g) || []).length;
        const estimatedSteps = Math.pow(10, loopCount || 1);

        return {
            safe: estimatedSteps < 10000,
            estimatedSteps,
            warning: estimatedSteps > 10000 ?
                `This code might take a while to run (estimated ${estimatedSteps} steps). For visualization, I'll limit execution to 2000 steps.` :
                undefined
        };
    }
}
