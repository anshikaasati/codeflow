import { JavaValidator } from '../../backend/src/engine/languages/java/validator';
import * as assert from 'assert';

async function runTests() {
    console.log("====================================================");
    console.log("🚀 STARTING JAVA VALIDATOR AUTOMATED TEST SUITE");
    console.log("====================================================\n");

    let failed = 0;

    const test = async (name: string, fn: () => Promise<void> | void) => {
        try {
            console.log(`🧪 Running test: ${name}...`);
            await fn();
            console.log(`✅ Passed: ${name}\n`);
        } catch (e: any) {
            console.error(`❌ Failed: ${name}`);
            console.error(e.stack || e.message);
            console.log();
            failed++;
        }
    };

    // 1. Validator Tests
    await test("Java Validator - Valid Code", () => {
        const validator = new JavaValidator();
        const code = `
        public class Main {
            public static void main(String[] args) {
                System.out.println("Hello, World!");
            }
        }
        `;
        const res = validator.validate(code);
        assert.strictEqual(res.isValid, true, "Valid code should pass validation");
        assert.strictEqual(res.issues.length, 0, "Valid code should have no issues");
    });

    await test("Java Validator - Missing Main method", () => {
        const validator = new JavaValidator();
        const code = `
        public class Main {
            public void test() {}
        }
        `;
        const res = validator.validate(code);
        assert.strictEqual(res.isValid, false, "Code missing main method should fail validation");
        assert.ok(res.issues.some(i => i.type === 'missing_main'), "Should identify missing main method");
    });

    await test("Java Validator - Unbalanced Braces", () => {
        const validator = new JavaValidator();
        const code = `
        public class Main {
            public static void main(String[] args) {
                System.out.println("Hello");
            
        }
        `;
        const res = validator.validate(code);
        assert.strictEqual(res.isValid, false, "Code with unbalanced braces should fail validation");
        assert.ok(res.issues.some(i => i.message.includes("Unclosed bracket")), "Should report unclosed bracket");
        assert.strictEqual(res.issues[0].line, 2, "Unclosed bracket should report opening line (line 2)");
    });

    await test("Java Validator - Extra Closing Bracket", () => {
        const validator = new JavaValidator();
        const code = `
        public class Main {
            public static void main(String[] args) {
                System.out.println("Hello");
            }
        } }
        `;
        const res = validator.validate(code);
        assert.strictEqual(res.isValid, false, "Code with extra closing brace should fail validation");
        assert.ok(res.issues.some(i => i.message.includes("Unmatched closing bracket")), "Should report extra closing bracket");
    });

    await test("Java Validator - Mismatched Bracket Types", () => {
        const validator = new JavaValidator();
        const code = `
        public class Main {
            public static void main(String[] args) [
                System.out.println("Hello");
            }
        }
        `;
        const res = validator.validate(code);
        assert.strictEqual(res.isValid, false, "Mismatched brackets should fail validation");
        assert.ok(res.issues.some(i => i.message.includes("Mismatch")), "Should report mismatched bracket type");
    });

    await test("Java Validator - Infinite Loop warning", () => {
        const validator = new JavaValidator();
        const code = `
        public class Main {
            public static void main(String[] args) {
                while(true) {
                    System.out.println("Loop");
                }
            }
        }
        `;
        const res = validator.validate(code);
        assert.strictEqual(res.isValid, true, "Infinite loop is a warning, so code is valid");
        assert.ok(res.issues.some(i => i.type === 'infinite_loop' && i.severity === 'warning'), "Should warn about infinite loops");
    });

    // Summary
    console.log("====================================================");
    console.log("📊 JAVA VALIDATOR TEST RESULTS SUMMARY");
    console.log("====================================================");
    if (failed === 0) {
        console.log("🎉 ALL TESTS PASSED SUCCESSFULLY!");
        process.exit(0);
    } else {
        console.error(`🚨 FAILED: ${failed} tests failed!`);
        process.exit(1);
    }
}

runTests().catch(e => {
    console.error("Unhandled rejection:", e);
    process.exit(1);
});
