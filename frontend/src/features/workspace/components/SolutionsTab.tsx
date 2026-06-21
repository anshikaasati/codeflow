import { useState } from 'react';
import { AlertCircle, Code2, Copy, Check, Brain, Cpu } from 'lucide-react';

interface SolutionVersion {
    title: 'Brute Force' | 'Better' | 'Optimal';
    description?: string;
    code: string;
    timeComplexity: string;
    spaceComplexity: string;
}

interface SolutionsTabProps {
    problem: {
        id: string;
        title: string;
        languages?: Record<string, {
            starterCode: string;
            solutionCode?: string;
            solutions?: SolutionVersion[];
        }>;
    } | null;
    currentLanguage: string;
    onLoadCode: (code: string) => void;
}

export default function SolutionsTab({ problem, currentLanguage, onLoadCode }: SolutionsTabProps) {
    const [copied, setCopied] = useState(false);

    if (!problem) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-text-muted p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-surface border border-border-subtle flex items-center justify-center">
                    <AlertCircle size={32} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-text-primary">No Problem Selected</h3>
                    <p className="text-sm">Select a problem to view available solutions.</p>
                </div>
            </div>
        );
    }

    const langDef = problem.languages?.[currentLanguage];
    const availableSolutions = langDef?.solutions || [];
    const defaultSolution = langDef?.solutionCode;

    // Determine what versions are available
    let versions: SolutionVersion[] = [];
    if (availableSolutions.length > 0) {
        versions = availableSolutions;
    } else if (defaultSolution) {
        // Fallback for problems with single solutionCode
        versions = [
            {
                title: 'Optimal',
                description: 'Default verified solution for this problem.',
                code: defaultSolution,
                timeComplexity: 'O(N) (Estimated)',
                spaceComplexity: 'O(1) (Estimated)'
            }
        ];
    }

    const [activeVersionIdx, setActiveVersionIdx] = useState(0);
    const activeVersion = versions[activeVersionIdx];

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (versions.length === 0) {
        return (
            <div className="h-full overflow-y-auto custom-scrollbar p-6 space-y-6 select-text">
                <div className="flex items-center gap-2 text-primary">
                    <Brain size={18} />
                    <h3 className="text-xs font-black uppercase tracking-[0.2em]">Solution Explanations</h3>
                </div>
                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                        <AlertCircle size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Solutions In Progress</span>
                    </div>
                    <p className="text-[12px] text-text-muted leading-relaxed">
                        Flagship solution comparisons are currently being populated for this problem. You can use the <span className="text-primary font-bold">AI TUTOR</span> chat widget to generate custom explanations and solution variants right now!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto custom-scrollbar p-6 space-y-6 select-text flex flex-col justify-between">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary">
                        <Brain size={18} />
                        <h3 className="text-xs font-black uppercase tracking-[0.2em]">Solution Engine</h3>
                    </div>
                </div>

                {/* Toggles */}
                {versions.length > 1 && (
                    <div className="flex bg-surface border border-border-subtle p-1 rounded-xl">
                        {versions.map((ver, idx) => {
                            const isActive = activeVersionIdx === idx;
                            return (
                                <button
                                    key={ver.title}
                                    onClick={() => setActiveVersionIdx(idx)}
                                    className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                                        isActive
                                            ? 'bg-primary text-white shadow'
                                            : 'text-text-muted hover:text-text-primary'
                                    }`}
                                >
                                    {ver.title}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Selected Version Detail */}
                {activeVersion && (
                    <div className="space-y-5">
                        {/* Time & Space Complexity Badges */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                                <div>
                                    <span className="text-[9px] font-black text-text-muted uppercase tracking-wider block font-mono">Time Complexity</span>
                                    <span className={`text-xs font-extrabold ${
                                        activeVersion.title === 'Optimal' ? 'text-green-400' :
                                        activeVersion.title === 'Better' ? 'text-amber-400' : 'text-red-400'
                                    } font-mono`}>
                                        {activeVersion.timeComplexity}
                                    </span>
                                </div>
                                <Cpu size={16} className="text-text-muted opacity-40" />
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                                <div>
                                    <span className="text-[9px] font-black text-text-muted uppercase tracking-wider block font-mono">Space Complexity</span>
                                    <span className="text-xs font-extrabold text-accent-cyan font-mono">
                                        {activeVersion.spaceComplexity}
                                    </span>
                                </div>
                                <Code2 size={16} className="text-text-muted opacity-40" />
                            </div>
                        </div>

                        {/* Explanation */}
                        {activeVersion.description && (
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-black text-text-muted uppercase tracking-widest font-mono">Approach</h4>
                                <p className="text-[12px] text-text-secondary leading-relaxed bg-surface/50 border border-border-subtle/30 rounded-xl p-4">
                                    {activeVersion.description}
                                </p>
                            </div>
                        )}

                        {/* Code Container */}
                        <div className="space-y-2 flex-1 min-h-[250px] flex flex-col">
                            <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-black text-text-muted uppercase tracking-widest font-mono">Solution Code</h4>
                                <button
                                    onClick={() => handleCopy(activeVersion.code)}
                                    className="flex items-center gap-1.5 text-[10px] font-black uppercase text-text-muted hover:text-text-primary transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/5"
                                >
                                    {copied ? (
                                        <>
                                            <Check size={12} className="text-green-400" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={12} />
                                            Copy Code
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="flex-1 rounded-xl bg-surface border border-border-subtle p-4 font-mono text-[11px] text-text-primary overflow-auto max-h-[350px] relative select-text whitespace-pre custom-scrollbar">
                                {activeVersion.code}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Load Code Action Button */}
            {activeVersion && (
                <button
                    onClick={() => onLoadCode(activeVersion.code)}
                    className="w-full mt-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center justify-center gap-2"
                >
                    <Code2 size={14} />
                    Load Solution into Editor
                </button>
            )}
        </div>
    );
}
