import { ValidationResult, ValidationIssue, FixExplanation } from '../../../services/validation.service';

export class JavaValidator {
    /**
     * Validate Java code and return syntax issues, infinite loop risks, and warnings.
     */
    public validate(code: string): ValidationResult {
        const issues: ValidationIssue[] = [];

        // 1. Basic empty check
        if (!code || code.trim().length === 0) {
            issues.push({
                type: 'syntax',
                severity: 'error',
                message: 'Empty code provided',
                beginnerMessage: 'There\'s no code to run! Please write some Java code first.',
                canFix: false
            });
            return { isValid: false, canAutoFix: false, issues };
        }

        // 2. Bracket and Parentheses balance check
        this.checkBalancedBrackets(code, issues);

        // 3. Main method checking
        this.checkMainMethod(code, issues);

        // 4. Infinite loop risk checking
        this.detectInfiniteLoopRisks(code, issues);

        const hasErrors = issues.some(i => i.severity === 'error');
        const canAutoFix = issues.some(i => i.canFix);

        return {
            isValid: !hasErrors,
            canAutoFix,
            issues
        };
    }

    private checkBalancedBrackets(code: string, issues: ValidationIssue[]): void {
        const stack: { char: string; line: number; col: number }[] = [];
        const lines = code.split('\n');
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            for (let j = 0; j < line.length; j++) {
                const char = line[j];
                if (char === '{' || char === '(' || char === '[') {
                    stack.push({ char, line: i + 1, col: j + 1 });
                } else if (char === '}' || char === ')' || char === ']') {
                    const top = stack.pop();
                    if (!top) {
                        issues.push({
                            type: 'syntax',
                            severity: 'error',
                            line: i + 1,
                            message: `Unmatched closing bracket '${char}'`,
                            beginnerMessage: `Oops! Found an extra closing '${char}' on line ${i + 1} that doesn't match any opening bracket. Check your braces carefully!`,
                            canFix: false
                        });
                        return;
                    }
                    
                    const matches = (top.char === '{' && char === '}') ||
                                    (top.char === '(' && char === ')') ||
                                    (top.char === '[' && char === ']');
                    if (!matches) {
                        issues.push({
                            type: 'syntax',
                            severity: 'error',
                            line: i + 1,
                            message: `Mismatch: opened '${top.char}' but closed '${char}'`,
                            beginnerMessage: `Oops! Mismatched bracket on line ${i + 1}. You opened a '${top.char}' on line ${top.line} but tried to close it with a '${char}'.`,
                            canFix: false
                        });
                        return;
                    }
                }
            }
        }
        
        if (stack.length > 0) {
            const unclosed = stack.pop()!;
            issues.push({
                type: 'syntax',
                severity: 'error',
                line: unclosed.line,
                message: `Unclosed bracket '${unclosed.char}'`,
                beginnerMessage: `Oops! The opening '${unclosed.char}' on line ${unclosed.line} is never closed. Make sure to close every bracket or parenthesis!`,
                canFix: false
            });
        }
    }

    private checkMainMethod(code: string, issues: ValidationIssue[]): void {
        const hasMain = /\bpublic\s+static\s+void\s+main\s*\(\s*String\b/.test(code) ||
                        /\bstatic\s+public\s+void\s+main\s*\(\s*String\b/.test(code) ||
                        /\bpublic\s+static\s+void\s+main\s*\(/.test(code);
        if (!hasMain) {
            issues.push({
                type: 'missing_main',
                severity: 'error',
                message: 'No main method found',
                beginnerMessage: 'A runnable Java program needs a main method. Add: public static void main(String[] args) { ... } inside your Main class.',
                canFix: false
            });
        }
    }

    private detectInfiniteLoopRisks(code: string, issues: ValidationIssue[]): void {
        const whileTruePattern = /\bwhile\s*\(\s*(true|1)\s*\)/g;
        let match;
        while ((match = whileTruePattern.exec(code)) !== null) {
            const index = match.index;
            const context = code.substring(index, Math.min(index + 300, code.length));
            if (!context.includes('break') && !context.includes('return')) {
                const line = code.substring(0, index).split('\n').length;
                issues.push({
                    type: 'infinite_loop',
                    severity: 'warning',
                    line,
                    message: 'Potential infinite loop detected',
                    beginnerMessage: `The "while(true)" loop on line ${line} has no obvious exit condition. Make sure to add a "break" or "return" inside it to prevent running forever!`,
                    canFix: false
                });
            }
        }

        const forPattern = /\bfor\s*\(\s*;\s*;\s*\)/g;
        while ((match = forPattern.exec(code)) !== null) {
            const index = match.index;
            const context = code.substring(index, Math.min(index + 300, code.length));
            if (!context.includes('break') && !context.includes('return')) {
                const line = code.substring(0, index).split('\n').length;
                issues.push({
                    type: 'infinite_loop',
                    severity: 'warning',
                    line,
                    message: 'Potential infinite loop detected (for(;;))',
                    beginnerMessage: `The "for(;;)" loop on line ${line} has no exit condition. Make sure to add a "break" or "return" statement!`,
                    canFix: false
                });
            }
        }
    }

    /**
     * Complexity estimator helper (matches C++ version logic)
     */
    public estimateComplexity(code: string): { safe: boolean; estimatedSteps: number; warning?: string } {
        const loopCount = (code.match(/\b(for|while)\s*\(/g) || []).length;
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
