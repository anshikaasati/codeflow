import { CompilerService } from '../../backend/src/services/compiler.service';
import * as assert from 'assert';

async function runTests() {
    console.log("====================================================");
    console.log("🚀 STARTING JAVA COMPILER AUTOMATED TEST SUITE");
    console.log("====================================================\n");

    const compilerService = new CompilerService();

    const code = `
    public class Main {
        public static void main(String[] args) {
            System.out.println("Hello from CodeFlow Java compiler!");
        }
    }
    `;

    try {
        console.log("Testing Java execution...");
        const result = await compilerService.execute('java', code);
        console.log("Status Code:", result.code);
        console.log("Stdout:", result.stdout);
        console.log("Stderr:", result.stderr);
        
        assert.strictEqual(result.code, 0, "Execution should succeed");
        assert.ok(result.stdout.includes("Hello from CodeFlow Java compiler!"), "Output should contain greeting");
        console.log("\n✅ Java compilation & execution passed!");
        process.exit(0);
    } catch (e: any) {
        console.error("\n❌ Java execution failed:", e.stack || e.message);
        process.exit(1);
    }
}

runTests().catch(e => {
    console.error("Unhandled error:", e);
    process.exit(1);
});
