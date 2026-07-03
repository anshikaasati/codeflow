import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
    ArrowLeft, Play, Code2, BookOpen, Layers, CheckCircle2,
    Compass, Sparkles, Clock, HardDrive, Share2
} from 'lucide-react';
import { problemsMap, problemsList } from '../data/problems/index';
import type { ProblemDefinition } from '../data/problems/index';
import DynamicBackground from '../components/DynamicBackground';

export default function PublicProblem() {
    const { problemId, category } = useParams<{ problemId?: string; category?: string }>();
    const navigate = useNavigate();
    
    const [problem, setProblem] = useState<ProblemDefinition | null>(null);
    const [activeLang, setActiveLang] = useState<'cpp' | 'python'>('cpp');
    const [activeApproach, setActiveApproach] = useState<'brute' | 'better' | 'optimal'>('optimal');

    useEffect(() => {
        const id = problemId || category;
        if (id && problemsMap[id]) {
            setProblem(problemsMap[id]);
        } else {
            setProblem(null);
        }
    }, [problemId, category]);

    // SEO Dynamic Injection
    useEffect(() => {
        if (!problem) return;
        
        // Tab title
        document.title = `${problem.title} - Visual Solution & Complexity | CodeFlow`;

        // Meta Description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', `Learn how to solve ${problem.title} (${problem.difficulty}) with visual trace animations, step-by-step executions, and complexity analysis (Brute Force, Better, and Optimal solutions in C++ & Python).`);

        // OG Tags
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (!ogTitle) {
            ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            document.head.appendChild(ogTitle);
        }
        ogTitle.setAttribute('content', `${problem.title} - Step-by-Step Algorithm Visualization | CodeFlow`);

        let ogDesc = document.querySelector('meta[property="og:description"]');
        if (!ogDesc) {
            ogDesc = document.createElement('meta');
            ogDesc.setAttribute('property', 'og:description');
            document.head.appendChild(ogDesc);
        }
        ogDesc.setAttribute('content', `Master ${problem.title} visually on CodeFlow. Watch pointers move and memory variables update in real-time.`);

        // JSON-LD Structured Data
        const schemaId = 'seo-schema-problem';
        let schemaScript = document.getElementById(schemaId) as HTMLScriptElement;
        if (!schemaScript) {
            schemaScript = document.createElement('script');
            schemaScript.id = schemaId;
            schemaScript.type = 'application/ld+json';
            document.head.appendChild(schemaScript);
        }
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "name": `${problem.title} DSA Visual Solution`,
            "headline": `Solving ${problem.title} Visually`,
            "description": `Interactive walk-through, complexity profiles, and C++/Python solutions for Leetcode: ${problem.title}.`,
            "about": {
                "@type": "Thing",
                "name": problem.category
            },
            "educationalLevel": problem.difficulty,
            "publisher": {
                "@type": "Organization",
                "name": "CodeFlow"
            }
        };
        schemaScript.textContent = JSON.stringify(schemaData);

        return () => {
            if (schemaScript) {
                schemaScript.remove();
            }
        };
    }, [problem]);

    if (!problem) {
        return (
            <div className="min-h-screen pt-[100px] flex flex-col items-center justify-center p-6 text-center">
                <DynamicBackground />
                <div className="glass-morphism border border-white/5 rounded-2xl p-8 max-w-md shadow-2xl">
                    <BookOpen size={48} className="text-red-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Problem Not Found</h3>
                    <p className="text-sm text-text-muted mb-6 leading-relaxed">
                        We couldn't locate a problem matching ID "{problemId}".
                    </p>
                    <button 
                        onClick={() => navigate('/sheet')} 
                        className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-bold tracking-widest uppercase active:scale-95 transition-all"
                    >
                        Back to Problem Sheet
                    </button>
                </div>
            </div>
        );
    }

    const langData = problem.languages?.[activeLang];
    const bruteSol = langData?.bruteSolution;
    const betterSol = langData?.betterSolution;
    const optimalSol = langData?.optimalSolution;

    const currentSolution = 
        activeApproach === 'brute' ? bruteSol :
        activeApproach === 'better' ? betterSol : optimalSol;

    const difficultyColors = {
        Easy: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        Medium: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
        Hard: 'bg-rose-500/10 border-rose-500/30 text-rose-400'
    };

    // Find related problems (same category or sharing patterns)
    const relatedProblems = problemsList
        .filter(p => p.id !== problem.id && (
            p.category === problem.category || 
            (p.patterns && p.patterns.some(pat => problem.patterns?.includes(pat)))
        ))
        .slice(0, 4);

    return (
        <div className="min-h-screen pt-[100px] px-6 pb-12 bg-transparent text-text-primary relative overflow-x-hidden">
            <DynamicBackground />
            
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Back Button */}
                <button 
                    onClick={() => navigate('/sheet')}
                    className="flex items-center gap-2 text-text-secondary hover:text-white transition-all text-xs font-bold font-mono mb-6 group cursor-pointer"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Curriculum Sheet
                </button>

                {/* Main Problem Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2.5">
                            <span className="text-[10px] font-black uppercase bg-primary/10 border border-primary/20 text-primary px-2.5 py-0.5 rounded-[4px] tracking-wider font-mono">
                                {problem.category}
                            </span>
                            <span className={`text-[10px] font-black uppercase border px-2.5 py-0.5 rounded-[4px] tracking-wider font-mono ${difficultyColors[problem.difficulty]}`}>
                                {problem.difficulty}
                            </span>
                            {problem.patterns?.map((p, idx) => (
                                <span key={idx} className="text-[10px] font-black uppercase bg-white/5 border border-white/10 text-text-muted px-2 py-0.5 rounded-[4px] tracking-wider font-mono">
                                    #{p}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none">
                            {problem.title}
                        </h1>
                    </div>
                    
                    <div>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                alert('Public solution link copied to clipboard!');
                            }}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl text-xs font-bold text-text-secondary hover:text-white active:scale-95 transition-all cursor-pointer"
                        >
                            <Share2 size={13} />
                            Share Link
                        </button>
                    </div>
                </div>

                {/* Main Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Panel: Problem description, examples, constraints (7 cols) */}
                    <div className="lg:col-span-7 space-y-6">
                        
                        {/* Description Card */}
                        <div className="glass-morphism border border-white/5 rounded-2xl p-6 sm:p-8 shadow-xl">
                            <h3 className="text-lg font-black flex items-center gap-2 mb-4 text-white">
                                <BookOpen size={18} className="text-primary" />
                                Problem Statement
                            </h3>
                            <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap font-sans">
                                {problem.description}
                            </div>
                        </div>

                        {/* Examples Card */}
                        {problem.examples && problem.examples.length > 0 && (
                            <div className="glass-morphism border border-white/5 rounded-2xl p-6 sm:p-8 shadow-xl">
                                <h3 className="text-lg font-black flex items-center gap-2 mb-4 text-white">
                                    <Sparkles size={18} className="text-secondary" />
                                    Examples
                                </h3>
                                <div className="space-y-4">
                                    {problem.examples.map((ex, idx) => (
                                        <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
                                            <span className="text-[10px] font-black uppercase text-text-muted tracking-wider block font-mono">Example {idx + 1}</span>
                                            <div className="text-xs font-mono text-text-secondary space-y-1">
                                                <div><span className="text-primary font-bold">Input:</span> <span className="text-white">{ex.input}</span></div>
                                                <div><span className="text-primary font-bold">Output:</span> <span className="text-white">{ex.output}</span></div>
                                                {ex.explanation && (
                                                    <div className="mt-1 text-text-muted italic"><span className="text-primary font-bold not-italic">Explanation:</span> {ex.explanation}</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Constraints Card */}
                        {problem.constraints && problem.constraints.length > 0 && (
                            <div className="glass-morphism border border-white/5 rounded-2xl p-6 sm:p-8 shadow-xl">
                                <h3 className="text-lg font-black flex items-center gap-2 mb-4 text-white">
                                    <Layers size={18} className="text-amber-400" />
                                    Constraints
                                </h3>
                                <ul className="space-y-2">
                                    {problem.constraints.map((c, idx) => (
                                        <li key={idx} className="flex gap-3 text-xs text-text-secondary leading-relaxed font-mono">
                                            <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                                            <span>{c}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Related Problems Card */}
                        {relatedProblems.length > 0 && (
                            <div className="glass-morphism border border-white/5 rounded-2xl p-6 sm:p-8 shadow-xl">
                                <h3 className="text-lg font-black flex items-center gap-2 mb-4 text-white">
                                    <Compass size={18} className="text-emerald-400" />
                                    Related Problems
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {relatedProblems.map((p) => (
                                        <Link 
                                            key={p.id} 
                                            to={`/problems/${p.id}`}
                                            className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl transition-all group flex flex-col justify-between"
                                        >
                                            <span className="text-xs font-bold text-white group-hover:text-primary transition-colors">{p.title}</span>
                                            <div className="flex justify-between items-center mt-2 text-[10px] font-mono text-text-muted">
                                                <span>{p.category}</span>
                                                <span className={p.difficulty === 'Easy' ? 'text-emerald-400' : p.difficulty === 'Medium' ? 'text-amber-400' : 'text-rose-400'}>{p.difficulty}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Right Panel: Approach selection, complexities, code, static preview (5 cols) */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* Visualization Preview Card */}
                        <div className="glass-morphism border border-white/5 rounded-2xl p-6 sm:p-8 shadow-xl text-center relative overflow-hidden group">
                            {/* Decorative background visual graph effect */}
                            <div className="absolute inset-0 bg-transparent flex items-center justify-center opacity-10 pointer-events-none">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <circle cx="20" cy="50" r="4" fill="var(--primary)" />
                                    <circle cx="50" cy="30" r="4" fill="var(--secondary)" />
                                    <circle cx="50" cy="70" r="4" fill="var(--secondary)" />
                                    <circle cx="80" cy="50" r="4" fill="var(--primary)" />
                                    <line x1="20" y1="50" x2="50" y2="30" stroke="white" strokeWidth="0.5" />
                                    <line x1="20" y1="50" x2="50" y2="70" stroke="white" strokeWidth="0.5" />
                                    <line x1="50" y1="30" x2="80" y2="50" stroke="white" strokeWidth="0.5" />
                                    <line x1="50" y1="70" x2="80" y2="50" stroke="white" strokeWidth="0.5" />
                                </svg>
                            </div>
                            
                            <h3 className="text-xs font-black uppercase text-text-muted tracking-widest mb-4 font-mono">Interactive Trace Engine</h3>
                            <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                                See memory states, pointers, and variables update step-by-step with visual representation.
                            </p>
                            
                            {/* Premium Replay / Visualize Button */}
                            <button
                                onClick={() => navigate(`/workspace?id=${problem.id}`)}
                                className="w-full py-3.5 bg-primary hover:bg-primary/95 text-white rounded-xl text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2.5 shadow-lg shadow-primary/25 active:scale-95 transition-all cursor-pointer relative z-10"
                            >
                                <Play size={14} fill="currentColor" />
                                Visualize Execution Flow
                            </button>
                        </div>
                        
                        {/* Approach Tabs & Complexity Box */}
                        <div className="glass-morphism border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col">
                            
                            {/* Language Selector */}
                            <div className="flex border-b border-white/5 mb-6">
                                {(['cpp', 'python'] as const).map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => setActiveLang(lang)}
                                        className={`flex-1 pb-3 text-xs font-black uppercase tracking-widest transition-all relative cursor-pointer ${
                                            activeLang === lang ? 'text-white' : 'text-text-muted hover:text-text-secondary'
                                        }`}
                                    >
                                        {lang === 'cpp' ? 'C++' : 'Python'}
                                        {activeLang === lang && (
                                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Approach Tabs */}
                            <div className="grid grid-cols-3 gap-2 mb-6">
                                {(['brute', 'better', 'optimal'] as const).map((app) => {
                                    const appSol = app === 'brute' ? bruteSol : app === 'better' ? betterSol : optimalSol;
                                    const isDisabled = !appSol;
                                    return (
                                        <button
                                            key={app}
                                            disabled={isDisabled}
                                            onClick={() => setActiveApproach(app)}
                                            className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border active:scale-95 transition-all cursor-pointer ${
                                                isDisabled 
                                                    ? 'opacity-20 cursor-not-allowed border-transparent text-text-muted' 
                                                    : activeApproach === app
                                                    ? 'bg-primary/10 border-primary/30 text-primary'
                                                    : 'bg-white/5 border-white/5 text-text-muted hover:text-text-secondary hover:border-white/10'
                                            }`}
                                        >
                                            {app === 'brute' ? 'Brute' : app === 'better' ? 'Better' : 'Optimal'}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Complexity Badges */}
                            {currentSolution ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center gap-3">
                                            <Clock size={16} className="text-primary shrink-0" />
                                            <div>
                                                <span className="text-[9px] font-black uppercase text-text-muted tracking-wider block font-mono">Time Complexity</span>
                                                <span className="text-sm font-black font-mono text-white">{currentSolution.timeComplexity}</span>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center gap-3">
                                            <HardDrive size={16} className="text-secondary shrink-0" />
                                            <div>
                                                <span className="text-[9px] font-black uppercase text-text-muted tracking-wider block font-mono">Space Complexity</span>
                                                <span className="text-sm font-black font-mono text-white">{currentSolution.spaceComplexity}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Approach description explanation */}
                                    <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-1.5">
                                        <span className="text-[9px] font-black uppercase text-text-muted tracking-wider block font-mono">Methodology</span>
                                        <p className="text-xs text-text-secondary leading-relaxed font-sans">{currentSolution.approach}</p>
                                    </div>

                                    {/* Read-Only Solution Code */}
                                    <div className="rounded-xl border border-white/5 overflow-hidden flex flex-col">
                                        <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/5 flex items-center gap-2 shrink-0">
                                            <Code2 size={13} className="text-primary" />
                                            <span className="text-[9px] font-bold text-text-secondary tracking-wider font-mono">
                                                Source Code ({activeLang === 'cpp' ? 'C++' : 'Python'})
                                            </span>
                                        </div>
                                        <pre className="p-4 bg-[#070913] text-[11px] font-mono text-text-secondary overflow-x-auto max-h-[350px] leading-relaxed select-all">
                                            <code>{currentSolution.code}</code>
                                        </pre>
                                    </div>

                                </div>
                            ) : (
                                <div className="text-center p-8 text-text-muted font-mono text-xs italic">
                                    No approach details configured for this language.
                                </div>
                            )}

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
