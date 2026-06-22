import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import DynamicBackground from '../components/DynamicBackground';
import { API_URL } from '../config/api';
import { 
    CheckCircle2, Play, 
    BookOpen, Lock, RefreshCw, BarChart2
} from 'lucide-react';


interface RoadmapProblem {
    id: string;
    title: string;
    category: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    isCompleted: boolean;
}

interface RoadmapData {
    id: string;
    name: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    completionPercentage: number;
    readinessMetric: number;
    problems: RoadmapProblem[];
}

export default function LearningRoadmaps() {
    const { user, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const [roadmaps, setRoadmaps] = useState<RoadmapData[]>([]);
    const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>('beginner');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRoadmaps = async () => {
            setIsLoading(true);
            try {
                const token = user ? await user.getIdToken() : null;
                const headers: Record<string, string> = {
                    'Content-Type': 'application/json'
                };
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                const res = await fetch(`${API_URL}/api/dashboard/roadmaps`, {
                    headers
                });

                if (res.status === 401) {
                    // Previews for unauthenticated users
                    setRoadmaps(STATIC_PREVIEWS);
                } else if (res.ok) {
                    const data = await res.json();
                    setRoadmaps(data);
                } else {
                    throw new Error('Failed to fetch roadmaps');
                }
            } catch (err: any) {
                console.error(err);
                setRoadmaps(STATIC_PREVIEWS);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRoadmaps();
    }, [user]);

    const selectedRoadmap = roadmaps.find(r => r.id === selectedRoadmapId) || roadmaps[0];

    return (
        <div className="min-h-screen pt-[100px] px-6 pb-12 bg-transparent text-text-primary relative overflow-x-hidden">
            <DynamicBackground />

            {/* Ambient Background Glows */}
            <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-primary/5 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] left-[-10%] w-[35%] h-[35%] bg-secondary/5 blur-[130px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 space-y-8">
                
                {/* Header */}
                <div className="text-left space-y-2">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        <BookOpen className="text-primary" />
                        Interview Prep Roadmaps
                    </h1>
                    <p className="text-sm text-text-muted font-mono max-w-2xl">
                        Accelerate your coding preparation with curated roadmap tracks mapped to top tech companies.
                    </p>
                </div>

                {!isAuthenticated && (
                    <div className="liquid-glass-card rounded-2xl p-6 border border-yellow-500/10 bg-yellow-500/5 text-left flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Lock size={16} className="text-yellow-400" />
                                Track Your Progress
                            </h3>
                            <p className="text-xs text-text-secondary leading-relaxed font-mono">
                                Sign in or create an account to record your completed problems, track your readiness metrics, and unlock badges.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/')}
                            className="px-5 py-2.5 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 hover:text-yellow-300 border border-yellow-500/30 rounded-xl text-xs font-black uppercase tracking-wider transition-all self-start md:self-auto shrink-0"
                        >
                            Log In / Register
                        </button>
                    </div>
                )}

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-text-muted gap-3">
                        <RefreshCw className="animate-spin text-primary" size={32} />
                        <span className="text-sm font-bold tracking-widest uppercase font-mono">Loading roadmaps...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* LEFT COLUMN: Roadmap Selectors */}
                        <div className="lg:col-span-1 space-y-4">
                            <h3 className="text-xs font-black uppercase text-text-muted tracking-wider font-mono text-left pl-2">Select a Track</h3>
                            <div className="space-y-3">
                                {roadmaps.map(roadmap => (
                                    <div
                                        key={roadmap.id}
                                        onClick={() => setSelectedRoadmapId(roadmap.id)}
                                        className={`group liquid-glass-card rounded-xl p-5 border text-left cursor-pointer transition-all ${
                                            selectedRoadmapId === roadmap.id
                                                ? 'border-primary/50 bg-primary/5'
                                                : 'border-white/5 hover:border-white/20'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start gap-2 mb-2">
                                            <h4 className="text-sm font-extrabold text-white group-hover:text-primary transition-colors">
                                                {roadmap.name}
                                            </h4>
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider font-mono ${
                                                roadmap.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                roadmap.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                'bg-red-500/10 text-red-400 border border-red-500/20'
                                            }`}>
                                                {roadmap.difficulty}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-text-secondary line-clamp-2 leading-relaxed mb-4 font-mono">
                                            {roadmap.description}
                                        </p>

                                        {/* Progress bars */}
                                        <div className="space-y-2 border-t border-white/5 pt-3">
                                            <div className="flex justify-between text-[9px] font-bold font-mono text-text-muted">
                                                <span>Completion</span>
                                                <span className="text-white">{roadmap.completionPercentage}%</span>
                                            </div>
                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-primary" 
                                                    style={{ width: `${roadmap.completionPercentage}%` }} 
                                                />
                                            </div>

                                            <div className="flex justify-between text-[9px] font-bold font-mono text-text-muted pt-1">
                                                <span>Readiness</span>
                                                <span className="text-[#ffc01e]">{roadmap.readinessMetric}%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Node Grid / Path */}
                        <div className="lg:col-span-2 space-y-6">
                            {selectedRoadmap && (
                                <div className="liquid-glass-card rounded-2xl p-6 sm:p-8 border border-white/5 text-left space-y-6">
                                    {/* Selected Roadmap Stats Header */}
                                    <div className="border-b border-white/5 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="space-y-1">
                                            <h2 className="text-xl font-extrabold text-white tracking-tight">
                                                {selectedRoadmap.name} Node Path
                                            </h2>
                                            <p className="text-xs text-text-secondary leading-relaxed font-mono">
                                                {selectedRoadmap.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl px-5 py-3 shrink-0">
                                            <div className="text-center font-mono">
                                                <span className="text-xs text-text-muted block font-bold uppercase tracking-wider">Solved</span>
                                                <span className="text-lg font-black text-white">
                                                    {selectedRoadmap.problems.filter(p => p.isCompleted).length} / {selectedRoadmap.problems.length}
                                                </span>
                                            </div>
                                            <div className="w-px h-8 bg-white/10" />
                                            <div className="text-center font-mono">
                                                <span className="text-xs text-[#ffc01e] block font-bold uppercase tracking-wider flex items-center gap-1">
                                                    <BarChart2 size={12} />
                                                    Readiness
                                                </span>
                                                <span className="text-lg font-black text-[#ffc01e]">
                                                    {selectedRoadmap.readinessMetric}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* The Stepped Node List */}
                                    <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
                                        {selectedRoadmap.problems.map((problem, idx) => (
                                            <div 
                                                key={problem.id}
                                                className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white/5 border border-white/5 hover:border-[#3e3e3e] rounded-2xl transition-all group cursor-pointer"
                                                onClick={() => navigate(`/workspace?problemId=${problem.id}`)}
                                            >
                                                {/* Node Indicator Dot */}
                                                <div className="absolute left-[-21px] sm:left-[-25px] top-[22px] sm:top-1/2 sm:-translate-y-1/2 z-10">
                                                    {problem.isCompleted ? (
                                                        <div className="w-[12px] h-[12px] rounded-full bg-green-500 border-2 border-bg-panel shadow-[0_0_8px_rgba(34,197,94,0.5)] flex items-center justify-center" />
                                                    ) : (
                                                        <div className="w-[12px] h-[12px] rounded-full bg-white/10 border-2 border-bg-panel group-hover:bg-primary transition-colors" />
                                                    )}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                        <span className="text-[10px] font-black text-text-muted font-mono">
                                                            STEP {idx + 1}
                                                        </span>
                                                        <span className={`px-2 py-0.2 rounded text-[7px] font-black uppercase tracking-wider font-mono ${
                                                            problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                            problem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                            'bg-red-500/10 text-red-400 border border-red-500/20'
                                                        }`}>
                                                            {problem.difficulty}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-sm font-extrabold text-white group-hover:text-primary transition-colors truncate">
                                                        {problem.title}
                                                    </h4>
                                                    <p className="text-[10px] text-text-muted font-mono mt-0.5">
                                                        {problem.category}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                                                    {problem.isCompleted && (
                                                        <span className="text-[10px] text-green-400 font-bold font-mono flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-xl">
                                                            <CheckCircle2 size={12} />
                                                            SOLVED
                                                        </span>
                                                    )}
                                                    <button className="p-2.5 rounded-xl bg-white/5 group-hover:bg-primary group-hover:text-white transition-all text-text-muted flex items-center justify-center">
                                                        <Play size={14} fill="currentColor" className="ml-0.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}

const STATIC_PREVIEWS: RoadmapData[] = [
    {
        id: 'beginner',
        name: 'Beginner Core',
        description: 'Master core array manipulation, search basics, and linear lists.',
        difficulty: 'Easy',
        completionPercentage: 0,
        readinessMetric: 0,
        problems: [
            { id: 'reverse-array', title: 'Reverse Array', category: 'Arrays & Hashing', difficulty: 'Easy', isCompleted: false },
            { id: 'find-minimum-and-maximum-in-array', title: 'Find Min Max', category: 'Arrays & Hashing', difficulty: 'Easy', isCompleted: false },
            { id: 'contains-duplicate', title: 'Contains Duplicate', category: 'Arrays & Hashing', difficulty: 'Easy', isCompleted: false },
            { id: 'two-sum', title: 'Two Sum', category: 'Arrays & Hashing', difficulty: 'Easy', isCompleted: false },
            { id: 'valid-parentheses', title: 'Valid Parentheses', category: 'Stack', difficulty: 'Easy', isCompleted: false },
            { id: 'reverse-linked-list', title: 'Reverse Linked List', category: 'Linked List', difficulty: 'Easy', isCompleted: false },
            { id: 'binary-search', title: 'Binary Search', category: 'Binary Search', difficulty: 'Easy', isCompleted: false }
        ]
    },
    {
        id: 'faang',
        name: 'FAANG Premium',
        description: 'Tackle the standard interview patterns required by top-tier tech firms.',
        difficulty: 'Medium',
        completionPercentage: 0,
        readinessMetric: 0,
        problems: [
            { id: 'two-sum', title: 'Two Sum', category: 'Arrays & Hashing', difficulty: 'Easy', isCompleted: false },
            { id: 'valid-parentheses', title: 'Valid Parentheses', category: 'Stack', difficulty: 'Easy', isCompleted: false },
            { id: 'reverse-linked-list', title: 'Reverse Linked List', category: 'Linked List', difficulty: 'Easy', isCompleted: false },
            { id: 'binary-search', title: 'Binary Search', category: 'Binary Search', difficulty: 'Easy', isCompleted: false },
            { id: 'invert-binary-tree', title: 'Invert Binary Tree', category: 'Trees', difficulty: 'Easy', isCompleted: false },
            { id: 'koko-eating-bananas', title: 'Koko Eating Bananas', category: 'Binary Search', difficulty: 'Medium', isCompleted: false },
            { id: 'longest-consecutive-sequence', title: 'Longest Consecutive Sequence', category: 'Arrays & Hashing', difficulty: 'Medium', isCompleted: false },
            { id: 'group-anagrams', title: 'Group Anagrams', category: 'Arrays & Hashing', difficulty: 'Medium', isCompleted: false }
        ]
    },
    {
        id: 'amazon',
        name: 'Amazon Ultimate',
        description: 'Focused path covering matrix simulation, window algorithms, and trees.',
        difficulty: 'Medium',
        completionPercentage: 0,
        readinessMetric: 0,
        problems: [
            { id: 'two-sum', title: 'Two Sum', category: 'Arrays & Hashing', difficulty: 'Easy', isCompleted: false },
            { id: 'group-anagrams', title: 'Group Anagrams', category: 'Arrays & Hashing', difficulty: 'Medium', isCompleted: false },
            { id: 'rotate-array', title: 'Rotate Array', category: 'Arrays & Hashing', difficulty: 'Medium', isCompleted: false },
            { id: 'spiral-matrix', title: 'Spiral Matrix', category: 'Arrays & Hashing', difficulty: 'Medium', isCompleted: false },
            { id: 'valid-parentheses', title: 'Valid Parentheses', category: 'Stack', difficulty: 'Easy', isCompleted: false },
            { id: 'invert-binary-tree', title: 'Invert Binary Tree', category: 'Trees', difficulty: 'Easy', isCompleted: false },
            { id: 'koko-eating-bananas', title: 'Koko Eating Bananas', category: 'Binary Search', difficulty: 'Medium', isCompleted: false }
        ]
    },
    {
        id: 'google',
        name: 'Google Advanced',
        description: 'Deep dive into complex search spaces, multi-dimensional array problems, and backtracking.',
        difficulty: 'Hard',
        completionPercentage: 0,
        readinessMetric: 0,
        problems: [
            { id: 'longest-consecutive-sequence', title: 'Longest Consecutive Sequence', category: 'Arrays & Hashing', difficulty: 'Medium', isCompleted: false },
            { id: 'search-in-rotated-sorted-array', title: 'Search in Rotated Sorted Array', category: 'Binary Search', difficulty: 'Medium', isCompleted: false },
            { id: 'median-of-two-sorted-arrays', title: 'Median of Two Sorted Arrays', category: 'Binary Search', difficulty: 'Hard', isCompleted: false },
            { id: 'word-search', title: 'Word Search', category: 'Backtracking', difficulty: 'Medium', isCompleted: false },
            { id: 'n-queens', title: 'N-Queens', category: 'Backtracking', difficulty: 'Hard', isCompleted: false }
        ]
    },
    {
        id: 'thirtyDays',
        name: '30-Day Blitz',
        description: 'Compact roadmap designed to review high-impact patterns in 30 days.',
        difficulty: 'Easy',
        completionPercentage: 0,
        readinessMetric: 0,
        problems: [
            { id: 'contains-duplicate', title: 'Contains Duplicate', category: 'Arrays & Hashing', difficulty: 'Easy', isCompleted: false },
            { id: 'valid-anagram', title: 'Valid Anagram', category: 'Arrays & Hashing', difficulty: 'Easy', isCompleted: false },
            { id: 'two-sum', title: 'Two Sum', category: 'Arrays & Hashing', difficulty: 'Easy', isCompleted: false },
            { id: 'valid-parentheses', title: 'Valid Parentheses', category: 'Stack', difficulty: 'Easy', isCompleted: false },
            { id: 'binary-search', title: 'Binary Search', category: 'Binary Search', difficulty: 'Easy', isCompleted: false },
            { id: 'reverse-linked-list', title: 'Reverse Linked List', category: 'Linked List', difficulty: 'Easy', isCompleted: false },
            { id: 'invert-binary-tree', title: 'Invert Binary Tree', category: 'Trees', difficulty: 'Easy', isCompleted: false }
        ]
    },
    {
        id: 'sixtyDays',
        name: '60-Day Comprehensive',
        description: 'Exhaustive interview prep program covering medium-to-hard challenges.',
        difficulty: 'Hard',
        completionPercentage: 0,
        readinessMetric: 0,
        problems: [
            { id: 'contains-duplicate', title: 'Contains Duplicate', category: 'Arrays & Hashing', difficulty: 'Easy', isCompleted: false },
            { id: 'valid-anagram', title: 'Valid Anagram', category: 'Arrays & Hashing', difficulty: 'Easy', isCompleted: false },
            { id: 'two-sum', title: 'Two Sum', category: 'Arrays & Hashing', difficulty: 'Easy', isCompleted: false },
            { id: 'valid-parentheses', title: 'Valid Parentheses', category: 'Stack', difficulty: 'Easy', isCompleted: false },
            { id: 'binary-search', title: 'Binary Search', category: 'Binary Search', difficulty: 'Easy', isCompleted: false },
            { id: 'reverse-linked-list', title: 'Reverse Linked List', category: 'Linked List', difficulty: 'Easy', isCompleted: false },
            { id: 'invert-binary-tree', title: 'Invert Binary Tree', category: 'Trees', difficulty: 'Easy', isCompleted: false },
            { id: 'longest-consecutive-sequence', title: 'Longest Consecutive Sequence', category: 'Arrays & Hashing', difficulty: 'Medium', isCompleted: false },
            { id: 'group-anagrams', title: 'Group Anagrams', category: 'Arrays & Hashing', difficulty: 'Medium', isCompleted: false },
            { id: 'koko-eating-bananas', title: 'Koko Eating Bananas', category: 'Binary Search', difficulty: 'Medium', isCompleted: false },
            { id: 'word-search', title: 'Word Search', category: 'Backtracking', difficulty: 'Medium', isCompleted: false }
        ]
    }
];
