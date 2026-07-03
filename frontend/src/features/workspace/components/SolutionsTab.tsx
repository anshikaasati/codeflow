import { useState } from 'react';
import { AlertCircle, Code2, Copy, Check, BookOpen, Zap, Layers, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SolutionApproach } from '../../../data/problems/types';
import { useLanguageStore } from '../../../store/languageStore';

interface SolutionsTabProps {
    problem: any;
    currentLanguage: string;
    onLoadCode: (code: string) => void;
}

const APPROACHES = [
    { key: 'brute', label: 'Brute Force' },
    { key: 'better', label: 'Better' },
    { key: 'optimal', label: 'Optimal' }
] as const;

function getCompleteCode(starterCode: string, solutionCode: string, lang: string): string {
    if (lang === 'cpp') {
        if (solutionCode.includes('main(') || solutionCode.includes('main (')) {
            return solutionCode;
        }
        const lines = starterCode.split('\n');
        let mainIndex = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('int main') || lines[i].includes('void main')) {
                mainIndex = i;
                break;
            }
        }
        let mainPart = "";
        if (mainIndex !== -1) {
            mainPart = "\n\n" + lines.slice(mainIndex).join('\n');
        }
        const headers: string[] = [];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('#include') || line.startsWith('using namespace')) {
                if (!solutionCode.includes(line)) {
                    headers.push(lines[i]);
                }
            }
        }
        return headers.join('\n') + (headers.length > 0 ? '\n\n' : '') + solutionCode + mainPart;
    } else if (lang === 'python') {
        if (solutionCode.includes('__main__') || solutionCode.includes('__name__')) {
            return solutionCode;
        }
        const lines = starterCode.split('\n');
        let mainIndex = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('__main__') || lines[i].includes('__name__')) {
                mainIndex = i;
                break;
            }
        }
        let mainPart = "";
        if (mainIndex !== -1) {
            mainPart = "\n\n" + lines.slice(mainIndex).join('\n');
        }
        const imports: string[] = [];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('import ') || line.startsWith('from ')) {
                if (!solutionCode.includes(line)) {
                    imports.push(lines[i]);
                }
            }
        }
        return imports.join('\n') + (imports.length > 0 ? '\n\n' : '') + solutionCode + mainPart;
    }
    return solutionCode;
}

export default function SolutionsTab({ problem, currentLanguage, onLoadCode }: SolutionsTabProps) {
    const [activeApproach, setActiveApproach] = useState<'brute' | 'better' | 'optimal'>('optimal');
    const [copied, setCopied] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);

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
    const starterCode = langDef?.starterCode || '';
    
    // Retrieve solution approach data
    const approachData: SolutionApproach | null = langDef
        ? (activeApproach === 'brute'
            ? langDef.bruteSolution
            : activeApproach === 'better'
                ? langDef.betterSolution
                : langDef.optimalSolution) || null
        : null;

    const completeCode = approachData
        ? getCompleteCode(starterCode, approachData.code, currentLanguage)
        : '';

    const handleCopy = () => {
        if (!completeCode) return;
        navigator.clipboard.writeText(completeCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!approachData) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-text-muted p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-surface border border-border-subtle flex items-center justify-center">
                    <AlertCircle size={32} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-text-primary">No Solutions Available</h3>
                    <p className="text-sm">No solutions found for this language and approach combination.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto custom-scrollbar flex flex-col select-text relative">
            <div className="flex-1 p-5 space-y-5">
                {/* Approach Selector */}
                <div className="flex p-1 bg-surface/60 border border-border-subtle rounded-xl relative shrink-0">
                    {APPROACHES.map(item => {
                        const isActive = activeApproach === item.key;
                        return (
                            <button
                                key={item.key}
                                onClick={() => setActiveApproach(item.key)}
                                className={`flex-1 relative py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-colors z-10 cursor-pointer ${
                                    isActive ? 'text-white' : 'text-text-muted hover:text-text-primary'
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeApproachBg"
                                        className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-lg shadow-sm"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                                {item.label}
                            </button>
                        );
                    })}
                </div>

                {/* Animated Approach Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeApproach}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="space-y-5"
                    >
                        {/* Approach Explanation */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-primary">
                                <BookOpen size={14} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] font-mono">Approach</span>
                            </div>
                            <p className="text-[12px] text-text-secondary leading-relaxed bg-surface/50 border border-border-subtle/30 rounded-xl p-4 whitespace-pre-wrap">
                                {approachData.approach}
                            </p>
                        </div>

                        {/* Complexity Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-amber-400">
                                    <Zap size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] font-mono">Time Complexity</span>
                                </div>
                                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 font-mono text-sm font-black text-amber-400 text-center">
                                    {approachData.timeComplexity}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-accent-cyan">
                                    <Layers size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] font-mono">Space Complexity</span>
                                </div>
                                <div className="p-4 rounded-xl bg-accent-cyan/5 border border-accent-cyan/15 font-mono text-sm font-black text-accent-cyan text-center">
                                    {approachData.spaceComplexity}
                                </div>
                            </div>
                        </div>

                        {/* Code Viewer */}
                        <div className="space-y-2.5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-text-muted">
                                    <Code2 size={12} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] font-mono">Solution Code</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-1.5 text-[9px] font-black uppercase text-text-muted hover:text-text-primary transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/5 cursor-pointer"
                                    >
                                        {copied ? (
                                            <><Check size={11} className="text-emerald-400" /> Copied</>
                                        ) : (
                                            <><Copy size={11} /> Copy</>
                                        )}
                                    </button>

                                    {/* Language Switcher Dropdown */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                                            className="flex items-center gap-1.5 text-[9px] font-black uppercase text-text-muted hover:text-text-primary transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/5 cursor-pointer"
                                        >
                                            {currentLanguage === 'cpp' ? 'C++' : 'Python'}
                                            <ChevronDown size={11} className={`transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        
                                        <AnimatePresence>
                                            {langDropdownOpen && (
                                                <>
                                                    <div 
                                                        className="fixed inset-0 z-50 cursor-default" 
                                                        onClick={() => setLangDropdownOpen(false)}
                                                    />
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                                        className="absolute right-0 mt-1 w-28 bg-surface/95 backdrop-blur-2xl border border-white/10 rounded-xl p-1 shadow-2xl z-[60]"
                                                    >
                                                        {(['cpp', 'python'] as const).map(lang => (
                                                            <button
                                                                key={lang}
                                                                onClick={() => {
                                                                    useLanguageStore.getState().setCurrentLanguage(lang);
                                                                    setLangDropdownOpen(false);
                                                                }}
                                                                className={`w-full text-left px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all flex items-center justify-between cursor-pointer ${
                                                                    lang === currentLanguage 
                                                                        ? 'text-primary bg-primary/10 font-bold' 
                                                                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                                                                }`}
                                                            >
                                                                <span>{lang === 'cpp' ? 'C++' : 'Python'}</span>
                                                                {lang === currentLanguage && <Check size={10} className="text-primary" />}
                                                            </button>
                                                        ))}
                                                    </motion.div>
                                                </>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                            <pre className="rounded-xl bg-surface border border-border-subtle p-4 font-mono text-[11px] text-text-primary overflow-auto max-h-[350px] whitespace-pre custom-scrollbar leading-relaxed">
                                <code>{completeCode}</code>
                            </pre>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Sticky Load into Editor CTA */}
            <div className="sticky bottom-0 p-4 pt-2 bg-gradient-to-t from-bg-panel via-bg-panel/95 to-transparent z-20">
                <button
                    onClick={() => onLoadCode(completeCode)}
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                    <Code2 size={14} />
                    Load {activeApproach === 'brute' ? 'Brute Force' : activeApproach === 'better' ? 'Better' : 'Optimal'} Solution into Editor
                </button>
            </div>
        </div>
    );
}
