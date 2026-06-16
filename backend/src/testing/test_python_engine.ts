import { Executor as PythonExecutor } from '../engine/languages/python/executor';
import { PythonValidator } from '../engine/languages/python/validator';
import { AiService } from '../services/ai.service';
import * as assert from 'assert';

async function runTests() {
    console.log("====================================================");
    console.log("🚀 STARTING PYTHON ENGINE AUTOMATED TEST SUITE");
    console.log("====================================================\n");

    let failed = 0;

    // Test Helper
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
    await test("Python Syntax Validator - Valid Code", () => {
        const validator = new PythonValidator();
        const code = `
def add(a, b):
    return a + b

print(add(2, 3))
`;
        const res = validator.validate(code);
        assert.strictEqual(res.isValid, true, "Valid code should pass validation");
        assert.strictEqual(res.issues.length, 0, "Valid code should have no issues");
    });

    await test("Python Syntax Validator - Broken Code (Colon)", () => {
        const validator = new PythonValidator();
        const code = `
def add(a, b)
    return a + b
`;
        const res = validator.validate(code);
        assert.strictEqual(res.isValid, false, "Code missing a colon should be invalid");
        assert.strictEqual(res.canAutoFix, true, "Missing colons should be autofixable");
        assert.ok(res.fixedCode?.includes("def add(a, b):"), "Autofix should add a colon");
    });

    await test("Python Syntax Validator - Broken Code (Indentation)", () => {
        const validator = new PythonValidator();
        const code = `
def add(a, b):
return a + b
`;
        const res = validator.validate(code);
        assert.strictEqual(res.isValid, false, "Code with bad indentation should be invalid");
        assert.strictEqual(res.canAutoFix, false, "Indentation errors should not be autofixable");
        assert.ok(res.issues.some((i: any) => i.beginnerMessage.includes("Indentation error")), "Should report a user-friendly indentation error message");
    });

    await test("Python Syntax Validator - Infinite Loop Warning", () => {
        const validator = new PythonValidator();
        const code = `
while True:
    print("running")
`;
        const res = validator.validate(code);
        assert.strictEqual(res.isValid, true, "Infinite loop risk is a warning, so code is still valid");
        assert.ok(res.issues.some((i: any) => i.type === 'infinite_loop' && i.severity === 'warning'), "Should warn about potential infinite loops");
    });

    // 2. Executor / Trace Runner Tests
    await test("Python Executor - Simple Iteration & Variables", () => {
        const executor = new PythonExecutor();
        const code = `
nums = [1, 2, 3]
total = 0
for x in nums:
    total += x
print("Total:", total)
`;
        const generator = executor.execute(code, "");
        const traces = Array.from(generator);

        assert.ok(traces.length > 0, "Should generate steps");
        
        // Find the final step
        const finalTrace = traces[traces.length - 1];
        assert.strictEqual(finalTrace.output?.trim(), "Total: 6", "Execution stdout should match");
        
        // Verify list visualization hint
        const firstVisual = traces.find(t => t.visuals !== undefined);
        assert.ok(firstVisual, "Should generate visuals for the list");
        assert.strictEqual(firstVisual?.visuals?.type, "array_1d", "List should map to 1D Array visualization");
    });

    await test("Python Executor - Linked List Visuals Mapping", () => {
        const executor = new PythonExecutor();
        const code = `
class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None

head = ListNode(1)
head.next = ListNode(2)
curr = head
while curr:
    curr = curr.next
`;
        const generator = executor.execute(code, "");
        const traces = Array.from(generator);
        
        assert.ok(traces.length > 0, "Should generate steps");
        
        // Find trace with linked list visuals that has at least 2 nodes
        const linkedListTrace = traces.find(t => t.visuals && t.visuals.type === 'linked_list' && t.visuals.nodes.length >= 2);
        assert.ok(linkedListTrace, "Should detect and map linked list visuals");
        
        const llVisuals = linkedListTrace?.visuals;
        assert.ok(llVisuals.nodes.length >= 2, "Visuals should capture ListNode allocations");
        assert.ok(llVisuals.nodes[0].next, "Next pointer should be set");
    });

    await test("Python Executor - Binary Tree Visuals Mapping", () => {
        const executor = new PythonExecutor();
        const code = `
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

root = TreeNode(10)
root.left = TreeNode(5)
root.right = TreeNode(15)
`;
        const generator = executor.execute(code, "");
        const traces = Array.from(generator);
        
        assert.ok(traces.length > 0, "Should generate steps");
        
        // Find trace with tree visuals that has at least 3 nodes
        const treeTrace = traces.find(t => t.visuals && t.visuals.type === 'tree' && t.visuals.nodes.length >= 3);
        assert.ok(treeTrace, "Should detect and map tree visuals");
        
        const treeVisuals = treeTrace?.visuals;
        assert.ok(treeVisuals.nodes.length >= 3, "Should capture 3 allocated tree nodes");
    });

    // 3. Complexity Heuristic Analyzer Tests
    await test("Heuristic Complexity Analysis - Linear List Loop", async () => {
        const aiService = new AiService();
        const code = `
nums = [1, 2, 3, 4, 5]
seen = {}
for i in range(len(nums)):
    seen[nums[i]] = i
`;
        const analysis = (aiService as any).heuristicAnalyze(code, 'python');
        
        assert.strictEqual(analysis.timeComplexity, "O(N)", "Heuristic should identify O(N) time complexity");
        assert.strictEqual(analysis.spaceComplexity, "O(N)", "Heuristic space complexity should identify O(N) due to input list");
        assert.strictEqual(analysis.pattern, "Iteration / Linear Scan", "Should identify linear scan pattern");
        
        const dictDetection = analysis.detections.find((d: any) => d.title.includes("Dictionary"));
        assert.ok(dictDetection, "Should detect Python Dictionary container");
    });

    await test("Heuristic Complexity Analysis - Nested Loops", async () => {
        const aiService = new AiService();
        const code = `
for i in range(n):
    for j in range(n):
        print(i, j)
`;
        const analysis = (aiService as any).heuristicAnalyze(code, 'python');
        assert.strictEqual(analysis.timeComplexity, "O(N²)", "Heuristic should identify O(N²) for nested loops");
    });

    await test("Heuristic Complexity Analysis - Binary Search", async () => {
        const aiService = new AiService();
        const code = `
low = 0
high = len(arr) - 1
while low <= high:
    mid = (low + high) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        low = mid + 1
    else:
        high = mid - 1
`;
        const analysis = (aiService as any).heuristicAnalyze(code, 'python');
        assert.strictEqual(analysis.timeComplexity, "O(log N)", "Heuristic should identify O(log N) for binary search");
    });

    // Summary
    console.log("====================================================");
    console.log("📊 AUTOMATED TEST RESULTS SUMMARY");
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
    console.error("Unhanded rejection:", e);
    process.exit(1);
});
