export class HeuristicComplexityService {
    public static analyzeCode(code: string, language: string = 'cpp'): any {
        const detections: any[] = [];
        const timeBreakdown: any[] = [];
        const spaceBreakdown: any[] = [];
        const stepExplanations: string[] = [];

        const isPython = language === 'python';
        const isJava = language === 'java';
        const lines = code.split('\n');

        // Basic detection patterns
        let hasVector = false;
        let hasUnorderedMap = false;
        let hasUnorderedSet = false;
        let hasMap = false;
        let hasSet = false;
        let hasStack = false;
        let hasQueue = false;
        let hasPriorityQueue = false;
        let hasDeque = false;

        if (isPython) {
            hasVector = /\[.*\]|\bappend\b|\blist\b/.test(code);
            hasUnorderedMap = /\{.*\}|\bdict\b|\bseen\b|\bdict\s*\(/.test(code) && !/set\(/.test(code);
            hasUnorderedSet = /\bset\b|\bset\s*\(/.test(code);
            hasPriorityQueue = /\bheapq\b|\bheappush\b|\bheappop\b/.test(code);
            hasDeque = /\bdeque\b|\bpopleft\b/.test(code);
            hasStack = /\bappend\b/.test(code) && /\bpop\(\)/.test(code) && !hasDeque;
        } else if (isJava) {
            hasVector = /\bArrayList\s*<|\bList\s*<|int\[\]|\bArrays\b/.test(code);
            hasUnorderedMap = /\bHashMap\s*<|\bMap\s*</.test(code);
            hasUnorderedSet = /\bHashSet\s*<|\bSet\s*</.test(code);
            hasMap = /\bTreeMap\s*</.test(code);
            hasSet = /\bTreeSet\s*</.test(code);
            hasStack = /\bStack\s*<|\bDeque\s*<.*stack|new\s+Stack\s*\(/.test(code);
            hasQueue = /\bQueue\s*<|\bLinkedList\s*<|\bArrayDeque\s*</.test(code) && !/\bPriorityQueue\s*</.test(code);
            hasPriorityQueue = /\bPriorityQueue\s*</.test(code);
            hasDeque = /\bDeque\s*<|\bArrayDeque\s*</.test(code);
        } else {
            hasVector = /\bvector\s*</.test(code);
            hasUnorderedMap = /\bunordered_map\s*</.test(code);
            hasUnorderedSet = /\bunordered_set\s*</.test(code);
            hasMap = /\bmap\s*</.test(code);
            hasSet = /\bset\s*</.test(code);
            hasStack = /\bstack\s*</.test(code);
            hasQueue = /\bqueue\s*</.test(code) && !/\bpriority_queue\s*</.test(code);
            hasPriorityQueue = /\bpriority_queue\s*</.test(code);
            hasDeque = /\bdeque\s*</.test(code);
        }

        // Algorithm patterns
        const hasBinarySearch = /(\b(low|high|mid|left|right)\b.*<=.*(low|high|left|right))|(\bmid\s*=\s*.*\/.*2)|(\bmid\s*=\s*.*floor.*)|(\bmid\s*=\s*.*\/\/.*2)/.test(code);
        const hasTwoPointers = isPython
            ? /while\s+(left|l|low)\s*<\s*(right|r|high)\s*:/.test(code) && !hasBinarySearch
            : /while\s*\(\s*(left|l|low)\s*<\s*(right|r|high)\s*\)/.test(code) && !hasBinarySearch;
        const hasSlidingWindow = isPython
            ? /while\s+(right|r|i|j)\s*<\s*(n|size)\s*:/.test(code) && (hasUnorderedMap || hasUnorderedSet || /window|max|len/i.test(code)) && !hasBinarySearch && !hasTwoPointers
            : /while\s*\(\s*(right|r|i|j)\s*<\s*(n|size)\s*\)/.test(code) && (hasUnorderedMap || hasUnorderedSet || /window|max|len/i.test(code)) && !hasBinarySearch && !hasTwoPointers;
        const hasSortingCall = isPython
            ? /\bsorted\s*\(|\.sort\s*\(/.test(code)
            : isJava
                ? /\bArrays\.sort\s*\(|\bCollections\.sort\s*\(/.test(code)
                : /\bsort\s*\(/.test(code);
        
        // Custom Sorting implementation detection
        const hasSwap = isPython
            ? /temp\s*=\s*\w+\[\w+\]\s*\n\s*\w+\[\w+\]\s*=\s*\w+\[\w+\]/.test(code) || /\w+\[\w+\],\s*\w+\[\w+\]\s*=\s*\w+\[\w+\],\s*\w+\[\w+\]/.test(code)
            : /\bswap\s*\(/.test(code) || /temp\s*=\s*\w+\[\w+\];\s*\w+\[\w+\]\s*=\s*\w+\[\w+\]/.test(code);
        const loopCount = isPython
            ? (code.match(/\bfor\s+\w+\s+in\b/g) || []).length + (code.match(/\bwhile\s+/g) || []).length
            : isJava
                ? (code.match(/\bfor\s*\(/g) || []).length + (code.match(/\bwhile\s*\(/g) || []).length
                : (code.match(/\bfor\s*\(/g) || []).length + (code.match(/\bwhile\s*\(/g) || []).length;
        
        // Recursion detection
        let isRecursive = false;
        let recursiveFuncName = "";
        if (isPython) {
            const functionMatches = [...code.matchAll(/\bdef\s+(\w+)\s*\([^)]*\)\s*:/g)];
            for (const m of functionMatches) {
                const funcName = m[1];
                if (!['__init__', 'len', 'solve'].includes(funcName)) {
                    const bodyRegex = new RegExp(`\\b${funcName}\\s*\\(`);
                    const searchArea = code.substring(m.index! + m[0].length);
                    if (bodyRegex.test(searchArea)) {
                        isRecursive = true;
                        recursiveFuncName = funcName;
                        break;
                    }
                }
            }
        } else {
            // Works for both C++ and Java (both use C-style function signatures)
            const functionMatches = [...code.matchAll(/\b(\w+)\s+(\w+)\s*\([^)]*\)\s*\{/g)];
            for (const m of functionMatches) {
                const funcName = m[2];
                const skipNames = isJava
                    ? ['main', 'size', 'push', 'pop', 'peek', 'add', 'get', 'put', 'containsKey', 'offer', 'poll', 'isEmpty']
                    : ['main', 'size', 'push_back', 'pop', 'push', 'top', 'front', 'back'];
                if (!skipNames.includes(funcName)) {
                    const bodyRegex = new RegExp(`\\b${funcName}\\s*\\(`);
                    const searchArea = code.substring(m.index! + m[0].length);
                    if (bodyRegex.test(searchArea)) {
                        isRecursive = true;
                        recursiveFuncName = funcName;
                        break;
                    }
                }
            }
        }

        // Loop nesting detection
        let maxNesting = 0;
        if (isPython) {
            const nestingStack: number[] = [];
            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed.length === 0 || trimmed.startsWith('#')) continue;
                const indent = line.length - line.trimStart().length;
                
                while (nestingStack.length > 0 && indent <= nestingStack[nestingStack.length - 1]) {
                    nestingStack.pop();
                }
                
                if (/\bfor\s+\w+\s+in\b|\bwhile\s+/.test(line)) {
                    nestingStack.push(indent);
                    maxNesting = Math.max(maxNesting, nestingStack.length);
                }
            }
        } else {
            // Works for both C++ and Java
            let currentNesting = 0;
            let inLoopBlock = false;
            for (const line of lines) {
                if (/\bfor\s*\(|\bwhile\s*\(/.test(line)) {
                    currentNesting++;
                    maxNesting = Math.max(maxNesting, currentNesting);
                    inLoopBlock = true;
                }
                if (line.includes('}') && inLoopBlock) {
                    currentNesting = Math.max(0, currentNesting - 1);
                    if (currentNesting === 0) inLoopBlock = false;
                }
            }
        }

        // Establish core time & space complexities
        let timeComplexity = "O(N)";
        let spaceComplexity = "O(1)";
        let patternName = "Iteration / Linear Scan";
        let titleName = "Linear Search / Scan";
        let explanation = "The algorithm runs in linear time by traversing the input array once.";

        // Resolve Complexity Details based on heuristics
        if (hasSortingCall) {
            timeComplexity = "O(N log N)";
            spaceComplexity = "O(log N)";
            patternName = "Sorting / Divide & Conquer";
            titleName = "Standard Sorting";
            explanation = isPython
                ? "Uses Python's Timsort algorithm (via sorted() or list.sort()) which has a time complexity of O(N log N) and space complexity of O(N)."
                : isJava
                    ? "Uses Java's Arrays.sort() / Collections.sort() which runs Dual-Pivot Quicksort for primitives and TimSort for objects. Time complexity O(N log N)."
                    : "Uses C++ std::sort which is O(N log N) time complexity (Introsort, a hybrid of Quicksort, Heapsort, and Insertion Sort) and O(log N) auxiliary space.";
            
            timeBreakdown.push({ operation: isPython ? "Timsort operations" : isJava ? "Arrays.sort / Dual-Pivot Quicksort" : "std::sort operations", complexity: "O(N log N)" });
            spaceBreakdown.push({ structure: isPython ? "Timsort temp arrays" : isJava ? "Recursion stack (Quicksort)" : "Recursion call stack (quicksort)", complexity: isPython ? "O(N)" : "O(log N)" });
            
            stepExplanations.push(
                isPython
                    ? "The algorithm invokes Timsort via sorted() or list.sort()."
                    : isJava
                        ? "The algorithm invokes Arrays.sort() which uses Dual-Pivot Quicksort for primitives."
                        : "The algorithm invokes standard std::sort which internally runs Introsort.",
                "It splits the input and sorts subarrays recursively.",
                isPython
                    ? "Therefore, time complexity is O(N log N) and space complexity is O(N)."
                    : "Therefore, time complexity is O(N log N) and space complexity is O(log N)."
            );
            if (isPython) {
                spaceComplexity = "O(N)";
            }
        } else if (hasBinarySearch) {
            timeComplexity = "O(log N)";
            spaceComplexity = "O(1)";
            patternName = "Binary Search";
            titleName = "Binary Search Lookup";
            explanation = "At each step, the search range is halved, resulting in logarithmic time complexity.";
            
            timeBreakdown.push({ operation: "Range Halving", complexity: "O(log N)" });
            spaceBreakdown.push({ structure: "Iterative Pointers", complexity: "O(1)" });
            
            stepExplanations.push(
                "The search range starts at size N.",
                "In each iteration, the midpoint is checked, and the search window is cut in half (N -> N/2 -> N/4).",
                "The total number of iterations needed to reduce N to 1 is log₂ N.",
                "Therefore, the time complexity is O(log N)."
            );
            
            detections.push({
                title: "Binary Search Loop",
                detectedType: "binary_search",
                codeSnippet: isPython ? "while low <= high:" : "while(low <= high)",
                complexity: "O(log N)",
                explanation: "Dividing search space by 2 recursively or iteratively takes logarithmic operations.",
                visualTree: ["N", "↓", "N/2", "↓", "N/4", "↓", "N/8", "↓", "log N", "↓", "O(log N)"]
            });
        } else if (hasSlidingWindow) {
            timeComplexity = "O(N)";
            spaceComplexity = hasUnorderedMap || hasUnorderedSet ? "O(k)" : "O(1)";
            patternName = "Sliding Window";
            titleName = "Sliding Window Scan";
            explanation = "A dynamic window boundaries scan. Left and right pointers only move forward, ensuring linear O(N) operations.";
            
            timeBreakdown.push({ operation: "Right pointer expansion", complexity: "O(N)" });
            timeBreakdown.push({ operation: "Left pointer contraction", complexity: "O(N)" });
            timeBreakdown.push({ operation: "Total Operations", complexity: "O(N)" });
            
            if (hasUnorderedMap) {
                spaceBreakdown.push({ structure: "Frequency Map / HashMap", complexity: "O(k)" });
            } else {
                spaceBreakdown.push({ structure: "Window Variables", complexity: "O(1)" });
            }
            
            stepExplanations.push(
                "The right pointer expands the window by running at most N times.",
                "The left pointer contracts the window from behind, also moving at most N times.",
                "Since neither pointer ever backtracks, total steps are bounded by 2N.",
                "This results in a linear time complexity of O(N)."
            );

            detections.push({
                title: "Sliding Window Pointers",
                detectedType: "sliding_window",
                codeSnippet: isPython ? "while right < n:" : "while(right < n)",
                complexity: "O(N)",
                explanation: "Both pointers move monotonically from left to right. Sum of their steps is at most 2N.",
                visualTree: ["Left pointer moves ≤ N", "Right pointer moves ≤ N", "Total operations ≤ 2N", "Time = O(N)"]
            });
        } else if (hasTwoPointers) {
            timeComplexity = "O(N)";
            spaceComplexity = "O(1)";
            patternName = "Two Pointers";
            titleName = "Two Pointers Traversal";
            explanation = "Two pointers converge from ends towards the center, meeting in at most N steps.";
            
            timeBreakdown.push({ operation: "Convergence loop", complexity: "O(N)" });
            spaceBreakdown.push({ structure: "Iterative Pointers", complexity: "O(1)" });
            
            stepExplanations.push(
                "One pointer starts at index 0, the other starts at index N - 1.",
                "In each iteration, the distance between pointers decreases by at least 1.",
                "They meet in at most N iterations, leading to linear O(N) time complexity."
            );

            detections.push({
                title: "Two Pointer Loop",
                detectedType: "two_pointer",
                codeSnippet: isPython ? "while left < right:" : "while(left < right)",
                complexity: "O(N)",
                explanation: "Left and right pointers start at opposite ends and move towards each other. Total movement is bounded by N.",
                visualTree: ["Left →", "Right ←", "Total movement ≤ N"]
            });
        } else if (isRecursive) {
            const isDivideAndConquer = /mid|split|left.*right|\/2|\/\/2/.test(code) && (code.match(new RegExp(`\\b${recursiveFuncName}\\b`, 'g')) || []).length >= 2;
            if (isDivideAndConquer) {
                timeComplexity = "O(N log N)";
                spaceComplexity = "O(N)";
                patternName = "Recursion / Divide & Conquer";
                titleName = "Divide & Conquer Recursion";
                explanation = "Recursively divides problem of size N into halves and merges. Tree depth is log N, work per level is N.";
                
                timeBreakdown.push({ operation: "Subproblem splits", complexity: "O(log N) levels" });
                timeBreakdown.push({ operation: "Work per level", complexity: "O(N)" });
                timeBreakdown.push({ operation: "Total Time", complexity: "O(N log N)" });
                spaceBreakdown.push({ structure: "Recursion Stack & Aux Array", complexity: "O(N)" });
                
                stepExplanations.push(
                    "The problem of size N is halved at each recursion step, forming log N levels.",
                    "At each level of the tree, merging or processing requires N work.",
                    "Multiplying levels by work gives O(N log N) total time complexity.",
                    "Space complexity is O(N) due to the auxiliary arrays and recursion stack."
                );

                detections.push({
                    title: "Divide and Conquer Tree",
                    detectedType: "recursion",
                    codeSnippet: recursiveFuncName + "(mid)",
                    complexity: "O(N log N)",
                    explanation: "Tree of depth log N with N work per level. Highly efficient divide-and-conquer strategy.",
                    visualTree: ["Levels = log N", "Work per level = N", "Total = N log N"]
                });
            } else {
                timeComplexity = "O(N)";
                spaceComplexity = "O(N)";
                patternName = "Recursion";
                titleName = "Simple Recursion";
                explanation = "Recursively calls itself N times, using O(N) space on the call stack.";
                
                timeBreakdown.push({ operation: "Recursive Calls", complexity: "O(N)" });
                spaceBreakdown.push({ structure: "Call Stack frames", complexity: "O(N)" });
                
                stepExplanations.push(
                    "Each call creates a new stack frame on the call stack.",
                    "It goes down to a depth of N before reaching the base case and returning.",
                    "Therefore, both time and space complexity are O(N)."
                );

                detections.push({
                    title: "Recursion Call Stack",
                    detectedType: "recursion",
                    codeSnippet: recursiveFuncName + "(n-1)",
                    complexity: "O(N) Space",
                    explanation: "The depth of recursive calls matches the input size N, creating N activation records on the stack.",
                    visualTree: [recursiveFuncName + "(n)", "↓", "N stack frames", "↓", "O(N) space"]
                });
            }
        } else if (maxNesting >= 3) {
            timeComplexity = "O(N³)";
            spaceComplexity = "O(1)";
            patternName = "Triple Nested Loops";
            titleName = "Cubic Iteration";
            explanation = "Three nested loops executing N times each, resulting in O(N³) cubic time complexity.";
            
            timeBreakdown.push({ operation: "Outer Loop", complexity: "O(N)" });
            timeBreakdown.push({ operation: "Middle Loop", complexity: "O(N)" });
            timeBreakdown.push({ operation: "Inner Loop", complexity: "O(N)" });
            timeBreakdown.push({ operation: "Total Time", complexity: "O(N³)" });
            spaceBreakdown.push({ structure: "Iterators / Local vars", complexity: "O(1)" });
            
            stepExplanations.push(
                "Outer loop executes N times.",
                "For every outer iteration, the middle loop executes N times.",
                "For every middle iteration, the inner loop executes N times.",
                "Multiplying the iterations: N × N × N = N³ total operations."
            );

            detections.push({
                title: "Triple Nested Loops",
                detectedType: "loop",
                codeSnippet: isPython ? "for i in ...: for j in ...: for k in ...:" : "for(...) { for(...) { for(...) } }",
                complexity: "O(N³)",
                explanation: "Three levels of nested loops. Very expensive for large N.",
                visualTree: ["N", "×", "N", "×", "N", "=", "N³"]
            });
        } else if (maxNesting === 2) {
            timeComplexity = "O(N²)";
            spaceComplexity = "O(1)";
            patternName = "Nested Loops";
            titleName = "Quadratic Iteration";
            explanation = "Two nested loops executing N times each, resulting in O(N²) quadratic time complexity.";
            
            timeBreakdown.push({ operation: "Outer Loop", complexity: "O(N)" });
            timeBreakdown.push({ operation: "Inner Loop", complexity: "O(N)" });
            timeBreakdown.push({ operation: "Total Time", complexity: "O(N²)" });
            spaceBreakdown.push({ structure: "Iterators / Local vars", complexity: "O(1)" });
            
            stepExplanations.push(
                "Outer loop executes N times.",
                "For every outer iteration, the inner loop executes N times.",
                "Multiplying the iterations: N × N = N² total operations."
            );

            detections.push({
                title: "Nested Loops",
                detectedType: "loop",
                codeSnippet: isPython ? "for i in ...: for j in ...:" : "for(...) { for(...) }",
                complexity: "O(N²)",
                explanation: "Two levels of nested loops. Typical of brute force comparisons or nested grid scans.",
                visualTree: ["n", "×", "n", "=", "n²"]
            });
        } else if (loopCount >= 2) {
            timeComplexity = "O(N)";
            spaceComplexity = "O(1)";
            patternName = "Independent Loops";
            titleName = "Multi-Pass Linear Scan";
            explanation = "Multiple independent loops execute in sequence. Their complexities add up linearly (N + N = 2N -> O(N)).";
            
            timeBreakdown.push({ operation: "First Loop Traversal", complexity: "O(N)" });
            timeBreakdown.push({ operation: "Second Loop Traversal", complexity: "O(N)" });
            timeBreakdown.push({ operation: "Total Time", complexity: "O(N)" });
            spaceBreakdown.push({ structure: "Iterative Pointers", complexity: "O(1)" });
            
            stepExplanations.push(
                "First loop runs N times to perform initial work.",
                "Second loop runs N times independently afterwards.",
                "Total operations are O(N) + O(N) = O(2N).",
                "Simplifying Big-O: constant coefficients are dropped, yielding O(N)."
            );

            detections.push({
                title: "Independent Loops",
                detectedType: "loop",
                codeSnippet: isPython ? "for ...\nfor ..." : "for(...)\nfor(...)",
                complexity: "O(N)",
                explanation: "Sequential loops that do not nest. Complexities add rather than multiply.",
                visualTree: ["O(n) + O(n)", "↓", "O(2n)", "↓", "O(n)"]
            });
        } else {
            const hasLoop = loopCount === 1;
            timeComplexity = hasLoop ? "O(N)" : "O(1)";
            spaceComplexity = "O(1)";
            patternName = hasLoop ? "Iteration / Linear Scan" : "Constant Execution";
            titleName = hasLoop ? "Linear Traversal" : "Constant-time logic";
            explanation = hasLoop 
                ? "The algorithm traverses the input sequentially with a single loop." 
                : "The algorithm runs in constant time without any loops or recursion.";
            
            if (hasLoop) {
                timeBreakdown.push({ operation: "Loop Traversal", complexity: "O(N)" });
                spaceBreakdown.push({ structure: "Iterative variables", complexity: "O(1)" });
                stepExplanations.push(
                    "The loop starts at index 0 and advances incrementally.",
                    "It iterates exactly N times, executing O(1) constant-time operations inside.",
                    "Therefore, the overall time complexity is O(N)."
                );
                detections.push({
                    title: "Single Loop",
                    detectedType: "loop",
                    codeSnippet: isPython ? "for i in range(n):" : "for(int i=0; i<n; i++)",
                    complexity: "O(N)",
                    explanation: "Iterates through the data once. Standard traversal model.",
                    visualTree: ["for loop", "↓", "n iterations", "↓", "O(n)"]
                });
            } else {
                timeBreakdown.push({ operation: "Constant time operations", complexity: "O(1)" });
                spaceBreakdown.push({ structure: "Local variables", complexity: "O(1)" });
                stepExplanations.push(
                    "The algorithm executes a fixed set of instructions without looping.",
                    "Each operation runs in O(1) time.",
                    "Therefore, total complexity is O(1)."
                );
            }
        }

        // Add standard language container detections if present
        if (isJava) {
            if (hasVector) {
                detections.push({
                    title: "ArrayList / Array Container",
                    detectedType: "stl_container",
                    codeSnippet: "new ArrayList<>()",
                    complexity: "O(1) access",
                    explanation: "Java's dynamic array. Provides O(1) random access, O(1) amortized add/remove at end, and O(N) insert/remove in the middle."
                });
                spaceBreakdown.push({ structure: "ArrayList / Array Allocation", complexity: "O(N)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(N)";
            }
            if (hasUnorderedMap) {
                detections.push({
                    title: "HashMap (Hash Map)",
                    detectedType: "stl_container",
                    codeSnippet: "new HashMap<>()",
                    complexity: "O(1) average",
                    explanation: "Java HashMap uses a hash table internally. get(), put(), containsKey() all run in O(1) average time, O(N) worst-case on hash collision."
                });
                spaceBreakdown.push({ structure: "HashMap bucket storage", complexity: "O(k)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(k)";
            }
            if (hasUnorderedSet) {
                detections.push({
                    title: "HashSet (Hash Set)",
                    detectedType: "stl_container",
                    codeSnippet: "new HashSet<>()",
                    complexity: "O(1) average",
                    explanation: "Java HashSet stores unique elements using a hash table. add(), contains(), remove() are O(1) average time."
                });
                spaceBreakdown.push({ structure: "HashSet storage", complexity: "O(N)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(N)";
            }
            if (hasMap) {
                detections.push({
                    title: "TreeMap (Ordered Map)",
                    detectedType: "stl_container",
                    codeSnippet: "new TreeMap<>()",
                    complexity: "O(log N)",
                    explanation: "Java TreeMap is backed by a Red-Black Tree. Elements are sorted by key. get(), put(), and containsKey() take O(log N) time."
                });
                spaceBreakdown.push({ structure: "Red-Black Tree Nodes", complexity: "O(N)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(N)";
            }
            if (hasPriorityQueue) {
                detections.push({
                    title: "PriorityQueue (Heap)",
                    detectedType: "stl_container",
                    codeSnippet: "new PriorityQueue<>()",
                    complexity: "O(log N) offer/poll",
                    explanation: "Java PriorityQueue is a min-heap by default. peek() is O(1). offer() (insert) and poll() (remove min) are O(log N)."
                });
                spaceBreakdown.push({ structure: "Binary Heap array", complexity: "O(N)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(N)";
            }
            if (hasStack) {
                detections.push({
                    title: "Stack / Deque (LIFO)",
                    detectedType: "stl_container",
                    codeSnippet: "new ArrayDeque<>()",
                    complexity: "O(1) operations",
                    explanation: "Java Deque (or Stack) used as LIFO. push(), pop(), and peek() are constant-time O(1) operations."
                });
                spaceBreakdown.push({ structure: "Stack elements", complexity: "O(N)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(N)";
            }
            if (hasQueue) {
                detections.push({
                    title: "Queue / LinkedList (FIFO)",
                    detectedType: "stl_container",
                    codeSnippet: "new LinkedList<>()",
                    complexity: "O(1) operations",
                    explanation: "Java Queue (via LinkedList or ArrayDeque). offer() (enqueue) and poll() (dequeue) are O(1) operations."
                });
                spaceBreakdown.push({ structure: "Queue elements", complexity: "O(N)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(N)";
            }
        } else if (isPython) {
            if (hasVector) {
                detections.push({
                    title: "List Container",
                    detectedType: "stl_container",
                    codeSnippet: "nums = []",
                    complexity: "O(1) access",
                    explanation: "Python's dynamic array (list). Provides O(1) random access, O(1) amortized append/pop, and O(N) element insert/delete."
                });
                spaceBreakdown.push({ structure: "Dynamic List Allocation", complexity: "O(N)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(N)";
            }
            if (hasUnorderedMap) {
                detections.push({
                    title: "Dictionary (Hash Map)",
                    detectedType: "stl_container",
                    codeSnippet: "seen = {}",
                    complexity: "O(1) average",
                    explanation: "Python dictionary implemented as a hash table. Searching, inserting, and deleting items take O(1) average time."
                });
                spaceBreakdown.push({ structure: "Dictionary entry storage", complexity: "O(k)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(k)";
            }
            if (hasUnorderedSet) {
                detections.push({
                    title: "Set (Hash Set)",
                    detectedType: "stl_container",
                    codeSnippet: "s = set()",
                    complexity: "O(1) average",
                    explanation: "Python set implemented as a hash table. Maintains unique elements with O(1) average search and insert."
                });
                spaceBreakdown.push({ structure: "Set storage", complexity: "O(N)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(N)";
            }
            if (hasPriorityQueue) {
                detections.push({
                    title: "Heap Queue (heapq)",
                    detectedType: "stl_container",
                    codeSnippet: "import heapq",
                    complexity: "O(log N) push/pop",
                    explanation: "Python's binary heap implementation. Accessing the minimum element is O(1). Inserting and deleting elements take logarithmic time O(log N)."
                });
                spaceBreakdown.push({ structure: "Heap array", complexity: "O(N)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(N)";
            }
            if (hasDeque) {
                detections.push({
                    title: "Deque (Double-Ended Queue)",
                    detectedType: "stl_container",
                    codeSnippet: "from collections import deque",
                    complexity: "O(1) operations",
                    explanation: "Python's doubly-linked list queue implementation. Provides O(1) push and pop from both ends."
                });
                spaceBreakdown.push({ structure: "Deque node elements", complexity: "O(N)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(N)";
            }
            if (hasStack) {
                detections.push({
                    title: "Stack (LIFO List)",
                    detectedType: "stl_container",
                    codeSnippet: "stack.append(x)",
                    complexity: "O(1) operations",
                    explanation: "Using a standard list as a LIFO stack. Append and pop operations run in O(1) amortized time."
                });
                spaceBreakdown.push({ structure: "Stack elements", complexity: "O(N)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(N)";
            }
        } else if (!isJava) {
            if (hasVector) {
                detections.push({
                    title: "Vector Container",
                    detectedType: "stl_container",
                    codeSnippet: "vector<int> v;",
                    complexity: "O(1) access",
                    explanation: "Dynamic array container. Provides O(1) random access, O(1) amortized push_back/pop_back, and O(N) element insert/erase."
                });
                spaceBreakdown.push({ structure: "Dynamic Vector Allocation", complexity: "O(N)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(N)";
            }
            if (hasUnorderedMap) {
                detections.push({
                    title: "Unordered Map (Hash Map)",
                    detectedType: "stl_container",
                    codeSnippet: "unordered_map<int, int> mp;",
                    complexity: "O(1) average",
                    explanation: "Hash table structure. Searching, inserting, and deleting items take O(1) average time, but O(N) in the worst-case due to hash collisions."
                });
                spaceBreakdown.push({ structure: "Hash Map bucket storage", complexity: "O(k)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(k)";
            }
            if (hasUnorderedSet) {
                detections.push({
                    title: "Unordered Set (Hash Set)",
                    detectedType: "stl_container",
                    codeSnippet: "unordered_set<int> s;",
                    complexity: "O(1) average",
                    explanation: "Hash table storing unique keys. Search and insert take O(1) average time."
                });
                spaceBreakdown.push({ structure: "Hash Set storage", complexity: "O(n)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(N)";
            }
            if (hasMap) {
                detections.push({
                    title: "Map (Ordered Dictionary)",
                    detectedType: "stl_container",
                    codeSnippet: "map<int, int> mp;",
                    complexity: "O(log N)",
                    explanation: "Implemented as a Red-Black Tree. Elements are sorted, and find, insert, and delete take logarithmic time O(log N)."
                });
                spaceBreakdown.push({ structure: "Red-Black Tree Nodes", complexity: "O(n)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(N)";
            }
            if (hasSet) {
                detections.push({
                    title: "Set (Ordered Set)",
                    detectedType: "stl_container",
                    codeSnippet: "set<int> s;",
                    complexity: "O(log N)",
                    explanation: "Implemented as a Red-Black Tree. Maintains unique sorted elements. Operations take O(log N) time."
                });
                spaceBreakdown.push({ structure: "Red-Black Tree Nodes", complexity: "O(n)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(N)";
            }
            if (hasPriorityQueue) {
                detections.push({
                    title: "Priority Queue (Heap)",
                    detectedType: "stl_container",
                    codeSnippet: "priority_queue<int> pq;",
                    complexity: "O(log N) push/pop",
                    explanation: "Implemented as a binary heap. Accessing the top element is O(1). Inserting and deleting elements take logarithmic time O(log N)."
                });
                spaceBreakdown.push({ structure: "Binary Heap array", complexity: "O(n)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(N)";
            }
            if (hasStack) {
                detections.push({
                    title: "Stack (LIFO)",
                    detectedType: "stl_container",
                    codeSnippet: "stack<int> st;",
                    complexity: "O(1) operations",
                    explanation: "Last-In-First-Out adapter. Push, pop, and top are constant-time O(1) operations."
                });
                spaceBreakdown.push({ structure: "Stack elements", complexity: "O(n)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(N)";
            }
            if (hasQueue) {
                detections.push({
                    title: "Queue (FIFO)",
                    detectedType: "stl_container",
                    codeSnippet: "queue<int> q;",
                    complexity: "O(1) operations",
                    explanation: "First-In-First-Out adapter. Push (enqueue), pop (dequeue), and front are constant-time O(1) operations."
                });
                spaceBreakdown.push({ structure: "Queue elements", complexity: "O(n)" });
                if (spaceComplexity === "O(1)") spaceComplexity = "O(N)";
            }
        }

        // Space Breakdown formatting
        if (spaceBreakdown.length === 0) {
            spaceBreakdown.push({ structure: "Primitive Variables", complexity: "O(1)" });
        } else {
            const seen = new Set();
            const uniq = [];
            for (const item of spaceBreakdown) {
                if (!seen.has(item.structure)) {
                    seen.add(item.structure);
                    uniq.push(item);
                }
            }
            if (!seen.has("Variables")) {
                uniq.push({ structure: "Variables", complexity: "O(1)" });
            }
            spaceBreakdown.length = 0;
            spaceBreakdown.push(...uniq);
        }

        // Setup learningMode comparisons
        let learningMode = {
            bruteForce: { time: "O(N²)", space: "O(1)", explanation: "Nested loops checking all elements." },
            optimized: { time: "O(N)", space: "O(1)", explanation: "Linear scans or single loop algorithms." },
            improvement: "O(N²) → O(N)",
            optimizationReason: "Using sliding window or hash map instead of checking all pairs reduces time complexity to linear."
        };

        if (timeComplexity === "O(1)") {
            learningMode = {
                bruteForce: { time: "O(N)", space: "O(1)", explanation: "Sequential scan checking each item." },
                optimized: { time: "O(1)", space: "O(1)", explanation: "Direct index lookup or mathematical formulas." },
                improvement: "O(N) → O(1)",
                optimizationReason: "Mathematical formulas or lookup tables can replace iterative scans."
            };
        } else if (timeComplexity === "O(log N)") {
            learningMode = {
                bruteForce: { time: "O(N)", space: "O(1)", explanation: "Linear search checks each element one by one." },
                optimized: { time: "O(log N)", space: "O(1)", explanation: "Binary search on sorted input splits search bounds recursively." },
                improvement: "O(N) → O(log N)",
                optimizationReason: "Binary search on sorted input reduces search bounds logarithmically compared to linear search."
            };
        } else if (timeComplexity === "O(N log N)") {
            learningMode = {
                bruteForce: { time: "O(N²)", space: "O(1)", explanation: isPython ? "Nested loops checking all combinations." : "Bubble or selection sort comparing every pair." },
                optimized: { time: "O(N log N)", space: isPython ? "O(N)" : "O(log N)", explanation: isPython ? "Timsort splitting and merging runs." : "Merge sort or heapsort dividing subarrays recursively." },
                improvement: isPython ? "O(N²) → O(N log N)" : "O(N²) → O(N log N)",
                optimizationReason: isPython ? "Timsort divides sorting work recursively, making it faster than O(N²) bubble/selection sort." : "Divide and conquer structures (like Merge Sort or Quicksort) divide sorting work recursively, making it faster than O(N²) bubble/selection sort."
            };
        } else if (timeComplexity === "O(N²)") {
            learningMode = {
                bruteForce: { time: "O(N²)", space: "O(1)", explanation: "Nested loops checking all pair combinations." },
                optimized: { time: "O(N log N) / O(N)", space: "O(N)", explanation: "HashMap search or preprocessing using sorting." },
                improvement: "O(N²) → O(N)",
                optimizationReason: "Optimizing nested loops can be achieved using Hash Maps (for O(N) sum search) or Sorting first (for O(N log N) pair search)."
            };
        } else if (timeComplexity === "O(N)") {
            if (hasUnorderedMap) {
                learningMode = {
                    bruteForce: { time: "O(N²)", space: "O(1)", explanation: "Brute force checks all pairs in nested loops." },
                    optimized: { time: "O(N)", space: "O(N)", explanation: "HashMap stores visited values, making lookups constant time." },
                    improvement: "O(N²) → O(N)",
                    optimizationReason: "A Hash Map trades space for time, storing past elements to perform lookup in O(1) instead of nested linear scans."
                };
            } else if (hasTwoPointers || hasSlidingWindow) {
                learningMode = {
                    bruteForce: { time: "O(N²)", space: "O(1)", explanation: "Brute force checks all subarrays or elements using nested loops." },
                    optimized: { time: "O(N)", space: "O(1)", explanation: "Two pointers move forward without backtracking." },
                    improvement: "O(N²) → O(N)",
                    optimizationReason: "Two pointers converge/slide monotonically, ensuring elements are visited at most twice."
                };
            } else {
                learningMode = {
                    bruteForce: { time: "O(N)", space: "O(1)", explanation: "Iterating element-by-element." },
                    optimized: { time: "O(N)", space: "O(1)", explanation: "Optimal single pass iteration." },
                    improvement: "Optimal solution is active",
                    optimizationReason: "The linear time complexity is optimal for reading all elements in the input."
                };
            }
        }

        const explanationMap: Record<string, string> = {};
        lines.forEach((line: string, idx: number) => {
            const lineNum = idx + 1;
            const trimmed = line.trim();
            if (isPython) {
                if (trimmed.startsWith('for') || trimmed.startsWith('while')) {
                    explanationMap[String(lineNum)] = "Loop iterates to process inputs.";
                } else if (trimmed.includes('seen') && trimmed.includes('=')) {
                    explanationMap[String(lineNum)] = "Initializes lookup dictionary.";
                } else if (trimmed.includes('return')) {
                    explanationMap[String(lineNum)] = "Returns calculated result.";
                }
            } else if (isJava) {
                if (trimmed.startsWith('for') || trimmed.startsWith('while')) {
                    explanationMap[String(lineNum)] = "Loop iterates to process inputs.";
                } else if (trimmed.includes('HashMap') || trimmed.includes('Map<')) {
                    explanationMap[String(lineNum)] = "Initializes Java HashMap for O(1) lookups.";
                } else if (trimmed.includes('PriorityQueue')) {
                    explanationMap[String(lineNum)] = "Initializes PriorityQueue (min-heap) for O(log N) insertions.";
                } else if (trimmed.includes('return')) {
                    explanationMap[String(lineNum)] = "Returns calculated result.";
                }
            } else {
                if (trimmed.startsWith('for') || trimmed.startsWith('while')) {
                    explanationMap[String(lineNum)] = "Loop iterates to process inputs.";
                } else if (trimmed.startsWith('unordered_map') || trimmed.startsWith('map')) {
                    explanationMap[String(lineNum)] = "Initializes lookup map.";
                } else if (trimmed.includes('return')) {
                    explanationMap[String(lineNum)] = "Returns calculated result.";
                }
            }
        });

        return {
            title: titleName,
            timeComplexity,
            spaceComplexity,
            complexityExplanation: explanation,
            pattern: patternName,
            explanation: explanationMap,
            overview: `Simple heuristic check identified ${patternName} pattern.`,
            timeBreakdown,
            spaceBreakdown,
            stepExplanations,
            detections,
            learningMode
        };
    }
}
