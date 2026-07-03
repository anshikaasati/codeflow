import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy } from 'lucide-react';
import type { TraceStep } from '../../../../types';

interface TreeNode {
    id: string;
    functionName: string;
    args: Record<string, any>;
    returnValue?: any;
    children: TreeNode[];
    isCurrentlyActive: boolean;
    isCompleted: boolean;
    isCacheHit: boolean;
    callStep: number;
    returnStep?: number;
}

interface RecursionTreeVisualizerProps {
    steps: TraceStep[];
    currentStepIndex: number;
    className?: string;
}

export function reconstructRecursionTree(steps: TraceStep[], currentStepIndex: number): TreeNode[] {
    const roots: TreeNode[] = [];
    const nodeMap = new Map<string, TreeNode>();
    const activeStack: TreeNode[] = [];

    for (let stepIdx = 0; stepIdx <= currentStepIndex; stepIdx++) {
        const step = steps[stepIdx];
        if (!step || !step.stack || step.stack.length === 0) continue;

        const stack = step.stack;

        for (let depth = 0; depth < stack.length; depth++) {
            const frame = stack[depth];
            const parentKey = activeStack.slice(0, depth).map(n => n.id).join('->');
            
            // Format arguments nicely, ignoring internal variables
            const frameArgsStr = Object.entries(frame.locals || {})
                .filter(([k]) => !k.startsWith('__') && k !== 'this' && typeof k === 'string')
                .map(([k, v]) => `${k}=${v}`)
                .join(',');
            const nodeName = `${frame.function}(${frameArgsStr})`;
            const nodeKey = parentKey ? `${parentKey}->${nodeName}` : nodeName;

            if (!nodeMap.has(nodeKey)) {
                // Cache hit check: is there a completed node with the exact same name and arguments?
                const signature = `${frame.function}(${frameArgsStr})`;
                const alreadySolved = Array.from(nodeMap.values()).some(n => {
                    const childArgsStr = Object.entries(n.args)
                        .filter(([k]) => !k.startsWith('__') && k !== 'this' && typeof k === 'string')
                        .map(([k, v]) => `${k}=${v}`)
                        .join(',');
                    return `${n.functionName}(${childArgsStr})` === signature && n.isCompleted;
                });

                const explanation = step.teacherNote?.what || '';
                const isMemoizedCall = explanation.toLowerCase().includes('memo') || 
                                     explanation.toLowerCase().includes('cache') || 
                                     explanation.toLowerCase().includes('already computed');

                const newNode: TreeNode = {
                    id: nodeKey,
                    functionName: frame.function,
                    args: { ...frame.locals },
                    children: [],
                    isCurrentlyActive: false,
                    isCompleted: false,
                    isCacheHit: alreadySolved || isMemoizedCall,
                    callStep: stepIdx
                };
                nodeMap.set(nodeKey, newNode);

                if (depth === 0) {
                    roots.push(newNode);
                } else {
                    const parentNode = activeStack[depth - 1];
                    if (parentNode) {
                        parentNode.children.push(newNode);
                    }
                }
            }

            const node = nodeMap.get(nodeKey)!;
            activeStack[depth] = node;
        }

        activeStack.length = stack.length;

        for (const node of nodeMap.values()) {
            node.isCurrentlyActive = false;
        }
        if (activeStack.length > 0) {
            activeStack[activeStack.length - 1].isCurrentlyActive = true;
        }

        // Check for completions and extract return values
        for (const [, node] of nodeMap.entries()) {
            if (!activeStack.includes(node) && stepIdx >= node.callStep && !node.isCompleted) {
                node.isCompleted = true;
                node.returnStep = stepIdx;

                const returnStepObj = steps[stepIdx];
                if (returnStepObj) {
                    const expl = returnStepObj.teacherNote?.what || returnStepObj.explanation || '';
                    const returnMatch = expl.match(/Returned\s+([-\d\w]+)/i) || 
                                        expl.match(/returns\s+([-\d\w]+)/i) ||
                                        (returnStepObj.type === 'return' && expl.match(/(\d+)/));
                    if (returnMatch) {
                        node.returnValue = returnMatch[1];
                    } else if (returnStepObj.variables && 'returnValue' in returnStepObj.variables) {
                        node.returnValue = returnStepObj.variables.returnValue;
                    }
                }
            }
        }
    }

    return roots;
}

export default function RecursionTreeVisualizer({
    steps,
    currentStepIndex,
    className = ''
}: RecursionTreeVisualizerProps) {
    const roots = useMemo(() => {
        return reconstructRecursionTree(steps, currentStepIndex);
    }, [steps, currentStepIndex]);

    return (
        <div className={`w-full flex flex-col items-center bg-[#0B1120]/40 border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur-md overflow-x-auto custom-scrollbar select-none min-h-[350px] justify-center ${className}`}>
            {roots.length === 0 ? (
                <div className="text-text-muted text-xs italic font-mono animate-pulse">
                    No recursion frames recorded in this step.
                </div>
            ) : (
                <div className="flex flex-col items-center w-full min-w-[max-content] py-4">
                    {roots.map(root => (
                        <TreeNodeComponent key={root.id} node={root} />
                    ))}
                </div>
            )}
        </div>
    );
}

function TreeNodeComponent({ node }: { node: TreeNode }) {
    const formattedArgs = useMemo(() => {
        return Object.entries(node.args)
            .filter(([k]) => !k.startsWith('__') && k !== 'this')
            .map(([k, v]) => `${k}=${v}`)
            .join(', ');
    }, [node.args]);

    return (
        <div className="flex flex-col items-center relative">
            {/* The Node Box */}
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className={`
                    px-4 py-2.5 rounded-xl border font-mono text-xs flex flex-col items-center shadow-lg relative min-w-[120px] transition-all duration-300
                    ${node.isCurrentlyActive 
                        ? 'border-accent-cyan bg-accent-cyan/10 text-white shadow-glow ring-2 ring-accent-cyan/30 scale-105 z-10' 
                        : node.isCacheHit
                            ? 'border-white/10 bg-slate-900/60 text-slate-500 opacity-60'
                            : node.isCompleted 
                                ? 'border-accent-green/40 bg-accent-green/5 text-text-primary' 
                                : 'border-border-subtle bg-bg-panel/80 text-text-secondary'}
                `}
            >
                {/* Active Pulsing Indicator */}
                {node.isCurrentlyActive && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-cyan"></span>
                    </span>
                )}

                {/* Function signature */}
                <span className="font-bold text-[11px] tracking-tight flex items-center gap-1">
                    {node.functionName}
                    <span className="opacity-60 font-medium">({formattedArgs})</span>
                </span>

                {/* Return Value / Cache Hit Status */}
                {node.isCacheHit ? (
                    <span className="mt-1 text-[8px] font-black uppercase tracking-wider bg-white/5 border border-white/10 px-1 py-0.5 rounded text-accent-yellow flex items-center gap-0.5 animate-pulse">
                        <Sparkles size={8} /> Cache Hit
                    </span>
                ) : node.isCompleted && node.returnValue !== undefined ? (
                    <span className="mt-1 text-[10px] font-bold text-accent-green flex items-center gap-0.5">
                        <Trophy size={9} /> return {node.returnValue}
                    </span>
                ) : node.isCompleted ? (
                    <span className="mt-1 text-[9px] text-text-muted italic">
                        returned
                    </span>
                ) : (
                    <span className="mt-1 text-[9px] text-accent-cyan/70 font-semibold animate-pulse">
                        executing...
                    </span>
                )}
            </motion.div>

            {/* Render children recursively */}
            {node.children.length > 0 && (
                <div className="flex flex-col items-center mt-6 relative">
                    {/* Vertically downward connector line from parent to horizontal bar */}
                    <div className="w-[1.5px] h-6 bg-border-subtle absolute -top-6 left-1/2 -translate-x-1/2" />

                    {/* Horizontal connecting bar spanning across all child nodes */}
                    {node.children.length > 1 && (
                        <div className="h-[1.5px] bg-border-subtle absolute top-0"
                             style={{
                                 left: 'calc(50% / ' + node.children.length + ')',
                                 right: 'calc(50% / ' + node.children.length + ')',
                                 width: 'calc(100% - (100% / ' + node.children.length + '))'
                             }}
                        />
                    )}

                    {/* Child boxes container */}
                    <div className="flex gap-10 pt-6">
                        {node.children.map((child) => (
                            <div key={child.id} className="relative">
                                {/* Vertical connection line above this specific child */}
                                <div className="w-[1.5px] h-6 bg-border-subtle absolute -top-6 left-1/2 -translate-x-1/2" />
                                <TreeNodeComponent node={child} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
