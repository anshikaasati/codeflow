import { BookOpen, Info, AlertCircle, Code, ListFilter } from 'lucide-react';

interface ProblemDescriptionProps {
    problem: {
        id: string;
        title: string;
        description?: string;
        difficulty: string;
        topicTags?: string[];
        patterns?: string[];
        examples?: {
            input: string;
            output: string;
            explanation?: string;
        }[];
        constraints?: string[];
        category?: string;
    } | null;
    showHints?: boolean;
}

export function getProblemHints(problemId: string, category: string, patterns: string[]): string[] {
    const defaultHints = [
        "Read the constraints carefully; they often hint at the required time complexity.",
        "Consider using a Two Pointer or Sliding Window approach to optimize time complexity.",
        "Think about intermediate states and how they transition. Can you reuse results via DP or caching?"
    ];
    if (problemId === 'contains-duplicate') {
        return [
            "A brute force approach compares every element with every other element, taking O(N^2) time.",
            "Can we sort the array first? If we sort, duplicates will end up adjacent to each other. This takes O(N log N) time.",
            "To solve it in O(N) time, use a Hash Set (unordered_set in C++ or set in Python) to keep track of elements you have already seen. If you see a number again, return true."
        ];
    }
    if (problemId === 'two-sum') {
        return [
            "Brute force checks every pair of numbers, which takes O(N^2) time.",
            "Can we search for the complement (target - nums[i]) in O(1) time? Think about using a Hash Map (unordered_map in C++ or dict in Python).",
            "Traverse the array once. For each number, calculate its complement. If the complement is already in your Hash Map, you've found the target! Otherwise, insert the current number and its index."
        ];
    }
    const catLower = (category || '').toLowerCase();
    if (catLower.includes('tree')) {
        return [
            "Trees are naturally recursive structures. Think about DFS (Preorder, Inorder, Postorder) or BFS (Level Order).",
            "For recursion, define your base cases first (e.g. if root is null, return a default value).",
            "Consider what information you need to bubble up from the left subtree and the right subtree."
        ];
    }
    if (catLower.includes('graph')) {
        return [
            "Use an adjacency list representation for the graph.",
            "DFS is great for checking connectivity or cycles. BFS is perfect for finding the shortest path in unweighted graphs.",
            "Keep track of visited nodes to avoid infinite cycles in cyclic graphs."
        ];
    }
    if (catLower.includes('dp') || catLower.includes('dynamic')) {
        return [
            "Start by identifying the subproblems. How can you define the state (e.g. dp[i])?",
            "Write down the recurrence relation. How does dp[i] relate to dp[i-1], dp[i-2], etc.?",
            "Implement top-down memoization first, then convert it to bottom-up tabular DP to optimize space if needed."
        ];
    }
    return defaultHints;
}

export default function ProblemDescription({ problem, showHints }: ProblemDescriptionProps) {
    if (!problem) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-text-muted p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-surface border border-border-subtle flex items-center justify-center">
                    <Info size={32} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-text-primary">No Problem Selected</h3>
                    <p className="text-sm">Select a problem from the DSA Sheet to view its description and constraints.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto custom-scrollbar p-6 space-y-8 select-text">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                        problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                        problem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                        {problem.difficulty}
                    </span>
                    <div className="flex-1 h-px bg-border-subtle" />
                </div>
                <h1 className="text-2xl font-black text-text-primary tracking-tight leading-tight">
                    {problem.title}
                </h1>
            </div>

            {/* Tags / Patterns */}
            {((problem.topicTags && problem.topicTags.length > 0) || (problem.patterns && problem.patterns.length > 0)) && (
                <div className="flex flex-wrap gap-2">
                    {problem.topicTags?.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-surface border border-border-subtle text-[11px] font-bold text-text-secondary hover:text-text-primary hover:border-primary transition-all cursor-default">
                            {tag}
                        </span>
                    ))}
                    {problem.patterns?.map(pattern => (
                        <span key={pattern} className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary hover:text-primary-hover hover:border-primary transition-all cursor-default">
                            {pattern}
                        </span>
                    ))}
                </div>
            )}

            {/* Description Body */}
            <div className="space-y-10 pb-10">
                {/* Problem Statement */}
                <section>
                    <div className="flex items-center gap-2 mb-4 text-primary">
                        <BookOpen size={18} />
                        <h3 className="text-xs font-black uppercase tracking-[0.2em]">Problem Statement</h3>
                    </div>
                    <div className="text-text-secondary leading-relaxed text-[13px] space-y-4">
                        {problem.description ? (
                            problem.description.split('\n\n').map((para, i) => (
                                <p key={i}>{para}</p>
                            ))
                        ) : (
                            <p className="italic">No description provided for this problem.</p>
                        )}
                    </div>
                </section>

                {/* Examples */}
                {problem.examples && problem.examples.length > 0 && (
                    <section>
                        <div className="flex items-center gap-2 mb-5 text-secondary">
                            <Code size={18} />
                            <h3 className="text-xs font-black uppercase tracking-[0.2em]">Examples</h3>
                        </div>
                        <div className="space-y-6">
                            {problem.examples.map((example, i) => (
                                <div key={i} className="space-y-3">
                                    <h4 className="text-[10px] font-black text-text-muted uppercase tracking-widest">Example {i + 1}</h4>
                                    <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-3 font-mono text-[12px]">
                                        <div>
                                            <span className="text-secondary font-bold mr-2">Input:</span>
                                            <span className="text-text-primary">{example.input}</span>
                                        </div>
                                        <div>
                                            <span className="text-accent-green font-bold mr-2">Output:</span>
                                            <span className="text-text-primary">{example.output}</span>
                                        </div>
                                        {example.explanation && (
                                            <div>
                                                <span className="text-text-muted font-bold mr-2">Explanation:</span>
                                                <span className="text-text-secondary italic">{example.explanation}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Constraints */}
                {problem.constraints && problem.constraints.length > 0 && (
                    <section>
                        <div className="flex items-center gap-2 mb-4 text-accent-cyan">
                            <ListFilter size={18} />
                            <h3 className="text-xs font-black uppercase tracking-[0.2em]">Constraints</h3>
                        </div>
                        <ul className="space-y-2.5">
                            {problem.constraints.map((constraint, i) => (
                                <li key={i} className="flex items-start gap-3 text-[12px] text-text-secondary">
                                    <div className="mt-1.5 w-1 h-1 rounded-full bg-accent-cyan shrink-0" />
                                    <code className="bg-border-subtle px-1.5 py-0.5 rounded text-accent-cyan">{constraint}</code>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Guided Learning Hints */}
                {showHints && problem && (
                    <section className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 space-y-4">
                        <div className="flex items-center gap-2 text-amber-400">
                            <AlertCircle size={18} />
                            <h3 className="text-xs font-black uppercase tracking-[0.2em]">Guided Learning Hints</h3>
                        </div>
                        <ul className="space-y-3">
                            {getProblemHints(problem.id, problem.category || '', problem.patterns || []).map((hint, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-[12px] text-text-secondary leading-relaxed animate-fade-in">
                                    <span className="font-bold text-amber-400 shrink-0">{idx + 1}.</span>
                                    <span>{hint}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Pro Tip */}
                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                        <AlertCircle size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Pro Tip</span>
                    </div>
                    <p className="text-[12px] text-text-muted leading-relaxed">
                        Use the <span className="text-primary font-bold">TRACE</span> button to visualize how your code executes step-by-step. This is extremely helpful for debugging recursive logic and pointer manipulations.
                    </p>
                </div>
            </div>
        </div>
    );
}
