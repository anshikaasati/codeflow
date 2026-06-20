import { ExecutionTrace, StackFrame, VisualizationHint } from '../../../types';

/**
 * Java visuals processor — mirrors processPythonTraceVisuals in logic,
 * adapted for Java variable types and naming conventions.
 */

function isTreeNode(addr: string, heap: Record<string, any>): boolean {
    if (typeof addr !== 'string' || !addr.startsWith('#')) return false;
    const node = heap[addr];
    return node && ('left' in node) && ('right' in node);
}

function isListNode(addr: string, heap: Record<string, any>): boolean {
    if (typeof addr !== 'string' || !addr.startsWith('#')) return false;
    const node = heap[addr];
    return node && ('next' in node);
}

function isTrieNode(addr: string, heap: Record<string, any>): boolean {
    if (typeof addr !== 'string' || !addr.startsWith('#')) return false;
    const node = heap[addr];
    if (!node) return false;
    const hasChildren = 'children' in node || 'child' in node || 'ch' in node;
    const hasIsWord = 'isWord' in node || 'isEndOfWord' in node || 'is_word' in node || 'endOfWord' in node || 'end' in node || 'isEnd' in node;
    return hasChildren && hasIsWord;
}

export function processJavaTraceVisuals(
    step: { line: number; type: string; event: string; stack: StackFrame[]; heap: Record<string, any>; output: string },
    codeLines: string[]
): ExecutionTrace {
    const heap = step.heap;
    const stack = step.stack;
    const topFrame = stack[stack.length - 1] || { function: 'main', locals: {} };
    const locals = topFrame.locals;

    // Merge all frames for variable resolution
    const collectAllVars = (): Record<string, any> => {
        const merged: Record<string, any> = {};
        for (const frame of stack) {
            for (const [k, v] of Object.entries(frame.locals)) {
                merged[k] = v;
            }
        }
        return merged;
    };

    const allVarsRaw = collectAllVars();
    const allVars: Record<string, any> = {};
    for (const [k, v] of Object.entries(allVarsRaw)) {
        if (typeof v === 'string' && v.startsWith('#') && heap[v] !== undefined) {
            allVars[k] = heap[v];
        } else {
            allVars[k] = v;
        }
    }

    const collectedVisuals: any[] = [];

    const POINTER_NAMES_LEFT = new Set(['i', 'left', 'l', 'low', 'lo', 'start', 'slow']);
    const POINTER_NAMES_RIGHT = new Set(['j', 'right', 'r', 'high', 'hi', 'end', 'fast']);
    const POINTER_NAMES_MID = new Set(['mid', 'middle', 'm']);
    const POINTER_NAMES_WRITE = new Set(['pos', 'k', 'write', 'wp', 'cur', 'count', 'p', 'idx']);
    const ALL_POINTER_NAMES = new Set([...POINTER_NAMES_LEFT, ...POINTER_NAMES_RIGHT, ...POINTER_NAMES_MID, ...POINTER_NAMES_WRITE]);
    const ANS_VAR_NAMES = new Set(['ans', 'result', 'res', 'maxlen', 'maxsum', 'count', 'area', 'profit', 'max', 'min', 'sum', 'ret', 'output']);
    const SYSTEM_CONSTANTS = new Set(['args', 'this']);

    // 1. Binary Tree Detection
    for (const [name, val] of Object.entries(locals)) {
        if (typeof val === 'string' && isTreeNode(val, heap)) {
            const nodes: any[] = [];
            const queue: string[] = [val];
            const visited = new Set<string>();

            const getVal = (nodeId: string) => {
                const node = heap[nodeId];
                if (!node) return '?';
                return node.val !== undefined ? node.val : (node.value !== undefined ? node.value : '?');
            };

            nodes.push({ id: val, value: getVal(val) });
            visited.add(val);

            let headIdx = 0;
            while (headIdx < queue.length) {
                const currAddr = queue[headIdx++];
                const currNode = heap[currAddr];
                if (!currNode) continue;
                if (currNode.left && isTreeNode(currNode.left, heap) && !visited.has(currNode.left)) {
                    visited.add(currNode.left);
                    nodes.push({ id: currNode.left, value: getVal(currNode.left), parentId: currAddr });
                    queue.push(currNode.left);
                }
                if (currNode.right && isTreeNode(currNode.right, heap) && !visited.has(currNode.right)) {
                    visited.add(currNode.right);
                    nodes.push({ id: currNode.right, value: getVal(currNode.right), parentId: currAddr });
                    queue.push(currNode.right);
                }
            }

            const pointers: any[] = [];
            for (const [vName, vVal] of Object.entries(allVarsRaw)) {
                if (typeof vVal === 'string' && visited.has(vVal)) {
                    const lower = vName.toLowerCase();
                    if (['root', 'curr', 'left', 'right', 'parent', 'node', 'current'].includes(lower)) {
                        const color = lower === 'root' ? '#06b6d4' :
                                      lower === 'curr' || lower === 'current' ? '#f97316' :
                                      lower === 'left' ? '#a855f7' :
                                      lower === 'right' ? '#ec4899' : '#eab308';
                        pointers.push({ name: vName, nodeId: vVal, color });
                    }
                }
            }

            collectedVisuals.push({
                type: 'tree',
                target: name,
                nodes,
                currentNodeId: val,
                activeNodes: Array.from(visited),
                visitedNodes: Array.from(visited),
                pointers
            });
        }
    }

    // 2. Trie Detection
    const processedTrieStarts = new Set<string>();
    for (const [name, val] of Object.entries(locals)) {
        if (typeof val === 'string' && isTrieNode(val, heap)) {
            if (processedTrieStarts.has(val)) continue;

            const nodes: any[] = [];
            const queue: { addr: string; parentId?: string; char: string }[] = [{ addr: val, char: 'ROOT' }];
            const visited = new Set<string>();
            visited.add(val);
            processedTrieStarts.add(val);

            let headIdx = 0;
            while (headIdx < queue.length) {
                const current = queue[headIdx++];
                const nodeObj = heap[current.addr];
                if (!nodeObj) continue;

                const isWord = !!(nodeObj.isWord || nodeObj.isEndOfWord || nodeObj.end || nodeObj.isEnd);
                nodes.push({ id: current.addr, val: current.char, isWord, parentId: current.parentId });

                const rawChildren = nodeObj.children || nodeObj.child || nodeObj.ch;
                if (rawChildren && typeof rawChildren === 'object') {
                    const entries = Array.isArray(rawChildren)
                        ? rawChildren.map((ca: string, i: number) => [String.fromCharCode(97 + i), ca])
                        : Object.entries(rawChildren);
                    for (const [char, childAddr] of entries) {
                        if (childAddr && typeof childAddr === 'string' && childAddr.startsWith('#') && !visited.has(childAddr)) {
                            visited.add(childAddr);
                            processedTrieStarts.add(childAddr);
                            queue.push({ addr: childAddr, parentId: current.addr, char: String(char) });
                        }
                    }
                }
            }

            collectedVisuals.push({ type: 'trie', target: name, nodes, pointers: [] });
        }
    }

    // 3. Linked List Detection
    const processedListStarts = new Set<string>();
    for (const [name, val] of Object.entries(locals)) {
        if (typeof val === 'string' && isListNode(val, heap)) {
            if (processedListStarts.has(val)) continue;

            const nodes: any[] = [];
            let currAddr = val;
            const visited = new Set<string>();
            let hasCycle = false;
            let cycleStartId: string | undefined;

            while (currAddr && isListNode(currAddr, heap)) {
                if (visited.has(currAddr)) { hasCycle = true; cycleStartId = currAddr; break; }
                visited.add(currAddr);
                processedListStarts.add(currAddr);
                const currNode = heap[currAddr];
                const nodeVal = currNode.val !== undefined ? currNode.val : currNode.value;
                const nextAddr = currNode.next;
                const prevAddr = currNode.prev;
                nodes.push({
                    id: currAddr,
                    value: nodeVal,
                    next: nextAddr && isListNode(nextAddr, heap) ? nextAddr : null,
                    prev: prevAddr && isListNode(prevAddr, heap) ? prevAddr : null
                });
                if (nextAddr && isListNode(nextAddr, heap)) { currAddr = nextAddr; } else { break; }
            }

            if (hasCycle && cycleStartId && nodes.length > 0) {
                nodes[nodes.length - 1].next = cycleStartId;
            }

            const POINTER_COLORS: Record<string, string> = {
                head: '#06b6d4', tail: '#3b82f6', curr: '#f97316',
                prev: '#a855f7', next: '#ec4899', slow: '#eab308', fast: '#22c55e',
                temp: '#ef4444', dummy: '#6b7280'
            };
            const pointers: any[] = [];
            for (const [vName, vVal] of Object.entries(allVarsRaw)) {
                if (typeof vVal === 'string' && visited.has(vVal)) {
                    const lower = vName.toLowerCase();
                    let color = '#06b6d4';
                    for (const [key, col] of Object.entries(POINTER_COLORS)) {
                        if (lower.includes(key)) { color = col; break; }
                    }
                    pointers.push({ name: vName, nodeId: vVal, color });
                }
            }

            collectedVisuals.push({ type: 'linked_list', target: name, nodes, pointers, hasCycle, cycleStartId });
        }
    }

    // 4. Matrix Detection (int[][], List<List<Integer>>, etc.)
    for (const [name, val] of Object.entries(allVars)) {
        if (Array.isArray(val) && val.length > 0 && val.every((row: any) => Array.isArray(row))) {
            const rowPointers: Record<string, number> = {};
            const colPointers: Record<string, number> = {};
            const numRows = val.length;
            const numCols = val[0]?.length || 0;
            for (const [vName, vVal] of Object.entries(allVars)) {
                if (typeof vVal === 'number') {
                    const lower = vName.toLowerCase();
                    if (['r', 'row', 'i'].includes(lower) && vVal >= 0 && vVal < numRows) rowPointers[vName] = vVal;
                    if (['c', 'col', 'j'].includes(lower) && vVal >= 0 && vVal < numCols) colPointers[vName] = vVal;
                }
            }
            collectedVisuals.push({ type: 'matrix', target: name, rows: numRows, cols: numCols, values: val.map((row: any[]) => [...row]), rowPointers, colPointers });
        }
    }

    // 5. Stack / Queue Detection (Java ArrayList/LinkedList used as stacks/queues)
    const STACK_NAMES = new Set(['stack', 'st', 'stk', 'myStack']);
    const QUEUE_NAMES = new Set(['queue', 'q', 'qu', 'bfsQueue', 'pq', 'deque', 'dq']);
    for (const [name, val] of Object.entries(allVars)) {
        if (Array.isArray(val)) {
            const lower = name.toLowerCase();
            const is2D = val.every((row: any) => Array.isArray(row));
            if (is2D) continue;
            if (STACK_NAMES.has(lower)) {
                collectedVisuals.push({ type: 'stack', target: name, elements: [...val], activeIndices: val.length > 0 ? [val.length - 1] : [] });
            } else if (QUEUE_NAMES.has(lower)) {
                collectedVisuals.push({ type: 'queue', target: name, elements: [...val], activeIndices: val.length > 0 ? [0] : [] });
            }
        }
    }

    // 6. HashMap / Set Detection
    for (const [name, val] of Object.entries(allVars)) {
        if (val && typeof val === 'object' && !Array.isArray(val)) {
            const isNode = ('left' in val && 'right' in val) || ('next' in val);
            if (isNode) continue;
            const entries = Object.entries(val).map(([k, v]) => ({ key: k, value: v }));
            if (entries.length === 0) continue;
            collectedVisuals.push({ type: 'hash_map', target: name, entries, activeKeys: entries.map(e => e.key) });
        }
    }

    // 7. 1D Array Detection
    for (const [name, val] of Object.entries(allVars)) {
        const isPrimitive = (el: any) => el === null || typeof el === 'number' || typeof el === 'string' || typeof el === 'boolean';
        if (Array.isArray(val) && val.length >= 0 && val.every(isPrimitive)) {
            const lower = name.toLowerCase();
            if (STACK_NAMES.has(lower) || QUEUE_NAMES.has(lower)) continue;
            const pointers: any[] = [];
            const highlightIndices: number[] = [];
            for (const [vName, vVal] of Object.entries(allVars)) {
                if (typeof vVal === 'number' && ALL_POINTER_NAMES.has(vName.toLowerCase())) {
                    if (vVal >= 0 && vVal < val.length) {
                        const lowerPtr = vName.toLowerCase();
                        const color = POINTER_NAMES_LEFT.has(lowerPtr) ? 'red' :
                                      POINTER_NAMES_RIGHT.has(lowerPtr) ? 'blue' :
                                      POINTER_NAMES_MID.has(lowerPtr) ? 'green' : 'orange';
                        pointers.push({ name: vName.toUpperCase().charAt(0), index: vVal, color, action: 'static' });
                        if (!highlightIndices.includes(vVal)) highlightIndices.push(vVal);
                    }
                }
            }
            const leftPtr = pointers.find(p => p.name === 'L' || p.name === 'I' || p.name === 'S');
            const rightPtr = pointers.find(p => p.name === 'R' || p.name === 'J');
            const windowRange: [number, number] | undefined = leftPtr && rightPtr ? [leftPtr.index, rightPtr.index] : undefined;
            collectedVisuals.push({ type: 'array_1d', target: name, values: [...val], pointers, highlightIndices, windowRange });
        }
    }

    // 8. Primitive variable cards
    for (const [name, rawVal] of Object.entries(allVarsRaw)) {
        if (SYSTEM_CONSTANTS.has(name)) continue;
        const val = allVars[name];
        if (val && typeof val === 'object') continue;
        if (Array.isArray(val)) continue;
        if (typeof val === 'number' || typeof val === 'string' || typeof val === 'boolean' || val === null) {
            const displayVal = val === null ? 'null' : val;
            collectedVisuals.push({ type: 'hash_map', target: name.toUpperCase(), entries: [{ key: name, value: displayVal }], activeKeys: [name] });
        }
    }

    // Sort by priority
    const getPriorityScore = (v: any): number => {
        if (v.type === 'array_1d') return 2;
        if (['matrix', 'tree', 'graph'].includes(v.type)) return 3;
        if (['stack', 'queue', 'deque', 'priority_queue'].includes(v.type)) return 4;
        if (v.type === 'hash_map') {
            const isPrimitive = v.entries.length === 1 && String(v.entries[0].key).toUpperCase() === v.target;
            if (isPrimitive) {
                if (ANS_VAR_NAMES.has(String(v.entries[0].key).toLowerCase())) return 8;
                if (ALL_POINTER_NAMES.has(String(v.entries[0].key).toLowerCase())) return 9;
                return 10;
            }
            return 6;
        }
        return 100;
    };
    collectedVisuals.sort((a, b) => getPriorityScore(a) - getPriorityScore(b));

    let finalVisuals: any = undefined;
    if (collectedVisuals.length > 1) {
        finalVisuals = { type: 'multi_visuals', visuals: collectedVisuals };
    } else if (collectedVisuals.length === 1) {
        finalVisuals = collectedVisuals[0];
    }

    // Generate explanation
    const lineContent = codeLines[step.line - 1]?.trim() || '';
    let what = lineContent;
    let why = 'Executes Java statement.';
    let next = 'Proceed to next statement.';

    if (lineContent.startsWith('return ') || lineContent === 'return;') {
        why = 'Returns calculated value from method.';
        next = 'Return to caller.';
    } else if (lineContent.startsWith('if ') || lineContent.startsWith('} else if') || lineContent.startsWith('else if')) {
        why = 'Condition check.';
        next = 'Enter chosen branch.';
    } else if (lineContent.startsWith('for ') || lineContent.startsWith('while ') || lineContent.startsWith('do {')) {
        why = 'Loop evaluation check.';
        next = 'Run loop body if condition is true.';
    } else if (lineContent.includes('System.out.print')) {
        why = 'Prints message to standard output.';
    } else if (lineContent.includes('new ')) {
        why = 'Creates new object instance.';
    } else if (lineContent.includes('=')) {
        why = 'Assigns value to variable.';
    }

    const explanationText = `${(step.event || 'line').toUpperCase()}: ${lineContent}`;

    const visualization: VisualizationHint = {
        nodeId: `line_${step.line}`,
        explanation: { what, why, next }
    };

    return {
        line: step.line,
        type: step.type as any,
        stack: step.stack,
        heap: step.heap,
        output: step.output,
        explanation: explanationText,
        visualization,
        visuals: finalVisuals
    };
}
