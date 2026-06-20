import { Executor as JavaExecutor } from '../../backend/src/engine/languages/java/executor';
import * as assert from 'assert';
import { execSync } from 'child_process';

// ─────────────────────────────────────────────────────────────────────────────
// Environment check — skip trace tests if Java is not installed locally
// ─────────────────────────────────────────────────────────────────────────────
let javaAvailable = false;
try {
    execSync('java -version', { stdio: 'ignore' });
    javaAvailable = true;
} catch {
    javaAvailable = false;
}

async function runTests() {
    console.log("====================================================");
    console.log("🚀 STARTING JAVA TRACE ENGINE AUTOMATED TEST SUITE");
    console.log("====================================================\n");

    if (!javaAvailable) {
        console.warn("⚠️  Java not found on PATH — running in no-JVM mode.");
        console.warn("   JDWP tracing will be unavailable; executor will emit graceful error traces.");
        console.warn("   These tests will verify graceful degradation only.\n");
    }

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

    const collectTraces = (code: string, input: string = '') => {
        const executor = new JavaExecutor();
        const gen = executor.execute(code, input);
        const traces = [];
        for (const trace of gen) {
            traces.push(trace);
        }
        return traces;
    };

    // ─── Test 1: Executor returns at least 1 step (graceful or real) ─────────
    await test("Java Trace - Executor always returns at least 1 step", () => {
        const code = `
class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
`.trim();
        const traces = collectTraces(code);
        console.log(`   → Got ${traces.length} trace steps`);
        assert.ok(traces.length >= 1, `Expected at least 1 trace step, got ${traces.length}`);
        if (!javaAvailable) {
            console.log('   → (No Java: step may be an error/fallback trace — OK)');
        } else {
            assert.ok(!traces.some(t => t.type === 'error'), "With Java available, no step should be error type");
        }
    });

    // ─── Test 2: Compile error is handled gracefully ──────────────────────────
    await test("Java Trace - Compile error emits a single error trace", () => {
        const code = `
class Main {
    public static void main(String[] args) {
        int x = ;  // syntax error
    }
}
`.trim();
        const traces = collectTraces(code);
        console.log(`   → Got ${traces.length} trace steps`);
        assert.ok(traces.length >= 1, "Expected at least 1 trace step for compile error");
        if (javaAvailable) {
            assert.strictEqual(traces[0].type, 'error', "First trace should be an error when Java is available");
        }
    });

    // ─── Test 3: Trace has required structure ─────────────────────────────────
    await test("Java Trace - Each step has required fields (line, type, stack, heap)", () => {
        const code = `
class Main {
    public static void main(String[] args) {
        int a = 1;
        int b = 2;
        int c = a + b;
        System.out.println(c);
    }
}
`.trim();
        const traces = collectTraces(code);
        console.log(`   → Got ${traces.length} trace steps`);
        assert.ok(traces.length >= 1, "Expected at least 1 step");
        for (const trace of traces) {
            assert.ok(typeof trace.line === 'number', `trace.line must be a number (got ${typeof trace.line})`);
            assert.ok(typeof trace.type === 'string', `trace.type must be a string (got ${typeof trace.type})`);
            assert.ok(Array.isArray(trace.stack), "trace.stack must be an array");
            assert.ok(trace.heap !== null && typeof trace.heap === 'object', "trace.heap must be an object");
        }
    });

    // ─── Test 4: Loop tracing (Java available only) ───────────────────────────
    if (javaAvailable) {
        await test("Java Trace - For-loop produces multiple steps", () => {
            const code = `
class Main {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 0; i < 5; i++) {
            sum += i;
        }
        System.out.println(sum);
    }
}
`.trim();
            const traces = collectTraces(code);
            console.log(`   → Got ${traces.length} trace steps`);
            assert.ok(traces.length >= 3, `Expected at least 3 steps for a loop, got ${traces.length}`);
        });
    } else {
        console.log("⏭️  Skipping: Java Trace - For-loop produces multiple steps (Java not available)\n");
    }

    // ─── Test 5: Two Sum class structure ─────────────────────────────────────
    await test("Java Trace - Two Sum class structure runs without throwing", () => {
        const code = `
import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}

class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] result = sol.twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println(result[0] + ", " + result[1]);
    }
}
`.trim();
        // Should not throw — executor must never throw, only yield error traces
        let threw = false;
        try {
            const traces = collectTraces(code);
            console.log(`   → Got ${traces.length} trace steps`);
            assert.ok(traces.length >= 1, "Expected at least 1 trace step");
        } catch {
            threw = true;
        }
        assert.ok(!threw, "Executor must not throw — it should yield error traces instead");
    });

    // ─── Test 6: Visualization hints ─────────────────────────────────────────
    await test("Java Trace - Steps have visualization field attached", () => {
        const code = `
class Main {
    public static void main(String[] args) {
        int x = 42;
        System.out.println(x);
    }
}
`.trim();
        const traces = collectTraces(code);
        console.log(`   → ${traces.filter(t => t.visualization).length}/${traces.length} steps have visualization`);
        assert.ok(traces.length >= 1, "Should have at least 1 step");
        // Non-error steps should have visualization hints
        const nonErrorSteps = traces.filter(t => t.type !== 'error');
        if (nonErrorSteps.length > 0) {
            assert.ok(nonErrorSteps[0].visualization !== undefined, "Non-error steps should have visualization");
        }
    });

    // ─── Summary ──────────────────────────────────────────────────────────────
    console.log("====================================================");
    if (failed === 0) {
        console.log(`✅ ALL JAVA TRACE TESTS PASSED`);
    } else {
        console.log(`❌ ${failed} TEST(S) FAILED`);
    }
    if (!javaAvailable) {
        console.log("   Note: Java not available locally. Full JDWP trace tests skipped.");
        console.log("   Deploy to a JVM-enabled server to validate full trace output.");
    }
    console.log("====================================================");
    process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(e => {
    console.error("Test runner crashed:", e);
    process.exit(1);
});
