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
        "id": "beginner",
        "name": "Beginner Core",
        "description": "Master arrays, strings, hashing, linked lists, stacks, queues, basic trees, recursion and binary search.",
        "difficulty": "Easy",
        "completionPercentage": 0,
        "readinessMetric": 0,
        "problems": [
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "valid-anagram",
                "title": "Valid Anagram",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "two-sum",
                "title": "Two Sum",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "remove-duplicates-from-sorted-array",
                "title": "Remove Duplicates from Sorted Array",
                "category": "Two Pointers",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "remove-element",
                "title": "Remove Element",
                "category": "Two Pointers",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "valid-palindrome",
                "title": "Valid Palindrome",
                "category": "Two Pointers",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "is-subsequence",
                "title": "Is Subsequence",
                "category": "Two Pointers",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "majority-element",
                "title": "Majority Element",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "binary-search",
                "title": "Binary Search",
                "category": "Binary Search",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "search-insert-position",
                "title": "Search Insert Position",
                "category": "Binary Search",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "guess-number-higher-or-lower",
                "title": "Guess Number Higher or Lower",
                "category": "Binary Search",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "sqrtx",
                "title": "Sqrt(x)",
                "category": "Binary Search",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "peak-index-in-a-mountain-array",
                "title": "Peak Index in a Mountain Array",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "reverse-linked-list",
                "title": "Reverse Linked List",
                "category": "Linked List",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "middle-of-the-linked-list",
                "title": "Middle Of The Linked List",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "merge-two-sorted-lists",
                "title": "Merge Two Sorted Lists",
                "category": "Linked List",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "linked-list-cycle",
                "title": "Linked List Cycle",
                "category": "Linked List",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "remove-linked-list-elements",
                "title": "Remove Linked List Elements",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "delete-node-in-a-linked-list",
                "title": "Delete Node In A Linked List",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "palindrome-linked-list",
                "title": "Palindrome Linked List",
                "category": "Linked List",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "valid-parentheses",
                "title": "Valid Parentheses",
                "category": "Stack",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "implement-stack-using-queues",
                "title": "Implement Stack Using Queues",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "implement-queue-using-stacks",
                "title": "Implement Queue Using Stacks",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "baseball-game",
                "title": "Baseball Game",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "backspace-string-compare",
                "title": "Backspace String Compare",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "next-greater-element-i",
                "title": "Next Greater Element I",
                "category": "Stack",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "min-stack",
                "title": "Min Stack",
                "category": "Stack",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "maximum-depth-of-binary-tree",
                "title": "Maximum Depth of Binary Tree",
                "category": "Trees",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "same-tree",
                "title": "Same Tree",
                "category": "Trees",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "invert-binary-tree",
                "title": "Invert Binary Tree",
                "category": "Trees",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "symmetric-tree",
                "title": "Symmetric Tree",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "path-sum",
                "title": "Path Sum",
                "category": "Trees",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "balanced-binary-tree",
                "title": "Balanced Binary Tree",
                "category": "Trees",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "fibonacci-number",
                "title": "Fibonacci Number",
                "category": "Dynamic Programming",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "climbing-stairs",
                "title": "Climbing Stairs",
                "category": "Dynamic Programming",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "pascals-triangle",
                "title": "Pascal",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "powx-n",
                "title": "Powx N",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "find-minimum-and-maximum-in-array",
                "title": "Find Minimum and Maximum in Array",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "move-zeroes",
                "title": "Move Zeroes",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "reverse-array",
                "title": "Reverse Array",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "single-number",
                "title": "Single Number",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "arranging-coins",
                "title": "Arranging Coins",
                "category": "Binary Search",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "first-bad-version",
                "title": "First Bad Version",
                "category": "Binary Search",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "valid-perfect-square",
                "title": "Valid Perfect Square",
                "category": "Binary Search",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "counting-bits",
                "title": "Counting Bits",
                "category": "Bit Manipulation",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "missing-number",
                "title": "Missing Number",
                "category": "Bit Manipulation",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "number-of-1-bits",
                "title": "Number of 1 Bits",
                "category": "Bit Manipulation",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "power-of-two",
                "title": "Power of Two",
                "category": "Bit Manipulation",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "reverse-bits",
                "title": "Reverse Bits",
                "category": "Bit Manipulation",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "min-cost-climbing-stairs",
                "title": "Min Cost Climbing Stairs",
                "category": "Dynamic Programming",
                "difficulty": "Easy",
                "isCompleted": false
            }
        ]
    },
    {
        "id": "faang",
        "name": "FAANG Premium",
        "description": "Master the interview patterns repeatedly asked by Meta, Google, Amazon, Microsoft and Apple.",
        "difficulty": "Medium",
        "completionPercentage": 0,
        "readinessMetric": 0,
        "problems": [
            {
                "id": "top-k-frequent-elements",
                "title": "Top K Frequent Elements",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "product-of-array-except-self",
                "title": "Product of Array Except Self",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "encode-and-decode-strings",
                "title": "Encode And Decode Strings",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "longest-consecutive-sequence",
                "title": "Longest Consecutive Sequence",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "group-anagrams",
                "title": "Group Anagrams",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "majority-element-ii",
                "title": "Majority Element Ii",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "container-with-most-water",
                "title": "Container With Most Water",
                "category": "Two Pointers",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "3sum",
                "title": "3Sum",
                "category": "Two Pointers",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "4sum",
                "title": "4Sum",
                "category": "Two Pointers",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "sort-colors",
                "title": "Sort Colors",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "trapping-rain-water",
                "title": "Trapping Rain Water",
                "category": "Two Pointers",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "best-time-to-buy-and-sell-stock",
                "title": "Best Time to Buy and Sell Stock",
                "category": "Sliding Window",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "longest-substring-without-repeating-characters",
                "title": "Longest Substring Without Repeating Characters",
                "category": "Sliding Window",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "longest-repeating-character-replacement",
                "title": "Longest Repeating Character Replacement",
                "category": "Sliding Window",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "permutation-in-string",
                "title": "Permutation in String",
                "category": "Sliding Window",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "minimum-window-substring",
                "title": "Minimum Window Substring",
                "category": "Sliding Window",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "sliding-window-maximum",
                "title": "Sliding Window Maximum",
                "category": "Sliding Window",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "search-in-rotated-sorted-array",
                "title": "Search in Rotated Sorted Array",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "find-minimum-in-rotated-sorted-array",
                "title": "Find Minimum in Rotated Sorted Array",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "koko-eating-bananas",
                "title": "Koko Eating Bananas",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "capacity-to-ship-packages-within-d-days",
                "title": "Capacity To Ship Packages Within D Days",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "median-of-two-sorted-arrays",
                "title": "Median of Two Sorted Arrays",
                "category": "Binary Search",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "add-two-numbers",
                "title": "Add Two Numbers",
                "category": "Linked List",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "reorder-list",
                "title": "Reorder List",
                "category": "Linked List",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "copy-list-with-random-pointer",
                "title": "Copy List with Random Pointer",
                "category": "Linked List",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "lru-cache",
                "title": "LRU Cache",
                "category": "Linked List",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "remove-nth-node-from-end-of-list",
                "title": "Remove Nth Node From End of List",
                "category": "Linked List",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "reverse-nodes-in-k-group",
                "title": "Reverse Nodes In K Group",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "daily-temperatures",
                "title": "Daily Temperatures",
                "category": "Stack",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "car-fleet",
                "title": "Car Fleet",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "evaluate-reverse-polish-notation",
                "title": "Evaluate Reverse Polish Notation",
                "category": "Stack",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "largest-rectangle-in-histogram",
                "title": "Largest Rectangle in Histogram",
                "category": "Stack",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "binary-tree-level-order-traversal",
                "title": "Binary Tree Level Order Traversal",
                "category": "Trees",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "lowest-common-ancestor-of-a-binary-search-tree",
                "title": "Lowest Common Ancestor of a BST",
                "category": "Trees",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "binary-tree-right-side-view",
                "title": "Binary Tree Right Side View",
                "category": "Trees",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "diameter-of-binary-tree",
                "title": "Diameter of Binary Tree",
                "category": "Trees",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "serialize-and-deserialize-binary-tree",
                "title": "Serialize and Deserialize Binary Tree",
                "category": "Trees",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "validate-binary-search-tree",
                "title": "Validate Binary Search Tree",
                "category": "Trees",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "kth-smallest-element-in-a-bst",
                "title": "Kth Smallest Element in a BST",
                "category": "Trees",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "k-closest-points-to-origin",
                "title": "K Closest Points to Origin",
                "category": "Heap / Priority Queue",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "last-stone-weight",
                "title": "Last Stone Weight",
                "category": "Heap / Priority Queue",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "task-scheduler",
                "title": "Task Scheduler",
                "category": "Heap / Priority Queue",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "find-median-from-data-stream",
                "title": "Find Median from Data Stream",
                "category": "Heap / Priority Queue",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "number-of-islands",
                "title": "Number of Islands",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "clone-graph",
                "title": "Clone Graph",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "rotting-oranges",
                "title": "Rotting Oranges",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "pacific-atlantic-water-flow",
                "title": "Pacific Atlantic Water Flow",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "course-schedule",
                "title": "Course Schedule",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "subsets",
                "title": "Subsets",
                "category": "Backtracking",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "combination-sum",
                "title": "Combination Sum",
                "category": "Backtracking",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "combination-sum-ii",
                "title": "Combination Sum II",
                "category": "Backtracking",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "permutations",
                "title": "Permutations",
                "category": "Backtracking",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "letter-combinations-of-a-phone-number",
                "title": "Letter Combinations of a Phone Number",
                "category": "Backtracking",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "generate-parentheses",
                "title": "Generate Parentheses",
                "category": "Stack",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "implement-trie-prefix-tree",
                "title": "Implement Trie (Prefix Tree)",
                "category": "Trie",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "design-add-and-search-words-data-structure",
                "title": "Design Add and Search Words Data Structure",
                "category": "Trie",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "word-search-ii",
                "title": "Word Search II",
                "category": "Trie",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "house-robber",
                "title": "House Robber",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "house-robber-ii",
                "title": "House Robber II",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "coin-change",
                "title": "Coin Change",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "partition-equal-subset-sum",
                "title": "Partition Equal Subset Sum",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "longest-increasing-subsequence",
                "title": "Longest Increasing Subsequence",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "decode-ways",
                "title": "Decode Ways",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "unique-paths",
                "title": "Unique Paths",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "interleaving-string",
                "title": "Interleaving String",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "jump-game",
                "title": "Jump Game",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "longest-common-subsequence",
                "title": "Longest Common Subsequence",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "longest-palindromic-substring",
                "title": "Longest Palindromic Substring",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "maximal-square",
                "title": "Maximal Square",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "maximum-product-subarray",
                "title": "Maximum Product Subarray",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "minimum-path-sum",
                "title": "Minimum Path Sum",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "palindromic-substrings",
                "title": "Palindromic Substrings",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "target-sum",
                "title": "Target Sum",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "word-break",
                "title": "Word Break",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "find-all-duplicates-in-an-array",
                "title": "Find All Duplicates in an Array",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "next-permutation",
                "title": "Next Permutation",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "rotate-array",
                "title": "Rotate Array",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "set-matrix-zeroes",
                "title": "Set Matrix Zeroes",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "spiral-matrix",
                "title": "Spiral Matrix",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "palindrome-partitioning",
                "title": "Palindrome Partitioning",
                "category": "Backtracking",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "subsets-ii",
                "title": "Subsets II",
                "category": "Backtracking",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "word-search",
                "title": "Word Search",
                "category": "Backtracking",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "find-first-and-last-position-of-element-in-sorted-array",
                "title": "Find First and Last Position of Element in Sorted Array",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "find-peak-element",
                "title": "Find Peak Element",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "peak-index-in-a-mountain-array",
                "title": "Peak Index in a Mountain Array",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "search-a-2d-matrix",
                "title": "Search a 2D Matrix",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "single-element-in-a-sorted-array",
                "title": "Single Element in a Sorted Array",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "maximum-xor-of-two-numbers-in-an-array",
                "title": "Maximum XOR of Two Numbers in an Array",
                "category": "Bit Manipulation",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "single-number-ii",
                "title": "Single Number II",
                "category": "Bit Manipulation",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "sum-of-two-integers",
                "title": "Sum of Two Integers",
                "category": "Bit Manipulation",
                "difficulty": "Medium",
                "isCompleted": false
            }
        ]
    },
    {
        "id": "amazon",
        "name": "Amazon Ultimate",
        "description": "Focus on Amazon OA + SDE interview patterns covering matrix, window, trees, and graphs.",
        "difficulty": "Medium",
        "completionPercentage": 0,
        "readinessMetric": 0,
        "problems": [
            {
                "id": "spiral-matrix",
                "title": "Spiral Matrix",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "set-matrix-zeroes",
                "title": "Set Matrix Zeroes",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "rotate-image",
                "title": "Rotate Image",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "game-of-life",
                "title": "Game Of Life",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "search-a-2d-matrix",
                "title": "Search a 2D Matrix",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "minimum-size-subarray-sum",
                "title": "Minimum Size Subarray Sum",
                "category": "Sliding Window",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "fruit-into-baskets",
                "title": "Fruit Into Baskets",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "maximum-average-subarray-i",
                "title": "Maximum Average Subarray I",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "longest-ones",
                "title": "Longest Ones",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "max-consecutive-ones-iii",
                "title": "Max Consecutive Ones III",
                "category": "Sliding Window",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "binary-tree-zigzag-level-order-traversal",
                "title": "Binary Tree Zigzag Level Order Traversal",
                "category": "Trees",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "binary-tree-vertical-order-traversal",
                "title": "Binary Tree Vertical Order Traversal",
                "category": "Trees",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "path-sum",
                "title": "Path Sum",
                "category": "Trees",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "binary-tree-maximum-path-sum",
                "title": "Binary Tree Maximum Path Sum",
                "category": "Trees",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "flatten-binary-tree-to-linked-list",
                "title": "Flatten Binary Tree to Linked List",
                "category": "Trees",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "number-of-provinces",
                "title": "Number Of Provinces",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "surrounded-regions",
                "title": "Surrounded Regions",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "word-ladder",
                "title": "Word Ladder",
                "category": "Graphs",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "open-the-lock",
                "title": "Open The Lock",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "network-delay-time",
                "title": "Network Delay Time",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "cheapest-flights-within-k-stops",
                "title": "Cheapest Flights Within K Stops",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "reconstruct-itinerary",
                "title": "Reconstruct Itinerary",
                "category": "Graphs",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "alien-dictionary",
                "title": "Alien Dictionary",
                "category": "Graphs",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "merge-k-sorted-lists",
                "title": "Merge k Sorted Lists",
                "category": "Heap / Priority Queue",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "top-k-frequent-words",
                "title": "Top K Frequent Words",
                "category": "Heap / Priority Queue",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "kth-largest-element-in-an-array",
                "title": "Kth Largest Element in an Array",
                "category": "Heap / Priority Queue",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "ipo",
                "title": "IPO",
                "category": "Heap / Priority Queue",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "merge-intervals",
                "title": "Merge Intervals",
                "category": "Intervals",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "insert-interval",
                "title": "Insert Interval",
                "category": "Intervals",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "non-overlapping-intervals",
                "title": "Non-overlapping Intervals",
                "category": "Intervals",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "meeting-rooms",
                "title": "Meeting Rooms",
                "category": "Intervals",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "jump-game",
                "title": "Jump Game",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "gas-station",
                "title": "Gas Station",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "partition-labels",
                "title": "Partition Labels",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "word-break",
                "title": "Word Break",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "target-sum",
                "title": "Target Sum",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "longest-common-subsequence",
                "title": "Longest Common Subsequence",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "edit-distance",
                "title": "Edit Distance",
                "category": "Dynamic Programming",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "clone-graph",
                "title": "Clone Graph",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "course-schedule",
                "title": "Course Schedule",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "graph-valid-tree",
                "title": "Graph Valid Tree",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "max-area-of-island",
                "title": "Max Area of Island",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "min-cost-to-connect-all-points",
                "title": "Min Cost to Connect All Points",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "number-of-connected-components-in-an-undirected-graph",
                "title": "Number of Connected Components in an Undirected Graph",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "number-of-islands",
                "title": "Number of Islands",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "pacific-atlantic-water-flow",
                "title": "Pacific Atlantic Water Flow",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "redundant-connection",
                "title": "Redundant Connection",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "rotting-oranges",
                "title": "Rotting Oranges",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "find-all-duplicates-in-an-array",
                "title": "Find All Duplicates in an Array",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "group-anagrams",
                "title": "Group Anagrams",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "longest-consecutive-sequence",
                "title": "Longest Consecutive Sequence",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "next-permutation",
                "title": "Next Permutation",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "product-of-array-except-self",
                "title": "Product of Array Except Self",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "rotate-array",
                "title": "Rotate Array",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "sort-colors",
                "title": "Sort Colors",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "top-k-frequent-elements",
                "title": "Top K Frequent Elements",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "combination-sum-ii",
                "title": "Combination Sum II",
                "category": "Backtracking",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "combination-sum",
                "title": "Combination Sum",
                "category": "Backtracking",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "letter-combinations-of-a-phone-number",
                "title": "Letter Combinations of a Phone Number",
                "category": "Backtracking",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "palindrome-partitioning",
                "title": "Palindrome Partitioning",
                "category": "Backtracking",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "permutations",
                "title": "Permutations",
                "category": "Backtracking",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "subsets-ii",
                "title": "Subsets II",
                "category": "Backtracking",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "subsets",
                "title": "Subsets",
                "category": "Backtracking",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "word-search",
                "title": "Word Search",
                "category": "Backtracking",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "capacity-to-ship-packages-within-d-days",
                "title": "Capacity To Ship Packages Within D Days",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "find-first-and-last-position-of-element-in-sorted-array",
                "title": "Find First and Last Position of Element in Sorted Array",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "find-minimum-in-rotated-sorted-array",
                "title": "Find Minimum in Rotated Sorted Array",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "find-peak-element",
                "title": "Find Peak Element",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "koko-eating-bananas",
                "title": "Koko Eating Bananas",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "peak-index-in-a-mountain-array",
                "title": "Peak Index in a Mountain Array",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "search-in-rotated-sorted-array",
                "title": "Search in Rotated Sorted Array",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "single-element-in-a-sorted-array",
                "title": "Single Element in a Sorted Array",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "maximum-xor-of-two-numbers-in-an-array",
                "title": "Maximum XOR of Two Numbers in an Array",
                "category": "Bit Manipulation",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "single-number-ii",
                "title": "Single Number II",
                "category": "Bit Manipulation",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "sum-of-two-integers",
                "title": "Sum of Two Integers",
                "category": "Bit Manipulation",
                "difficulty": "Medium",
                "isCompleted": false
            }
        ]
    },
    {
        "id": "google",
        "name": "Google Advanced",
        "description": "Prepare for Google's harder algorithmic rounds involving advanced graphs, trees, union-find, and DP.",
        "difficulty": "Hard",
        "completionPercentage": 0,
        "readinessMetric": 0,
        "problems": [
            {
                "id": "alien-dictionary",
                "title": "Alien Dictionary",
                "category": "Graphs",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "redundant-connection",
                "title": "Redundant Connection",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "critical-connections-in-a-network",
                "title": "Critical Connections In A Network",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "min-cost-to-connect-all-points",
                "title": "Min Cost to Connect All Points",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "swim-in-rising-water",
                "title": "Swim in Rising Water",
                "category": "Graphs",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "reconstruct-itinerary",
                "title": "Reconstruct Itinerary",
                "category": "Graphs",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "recover-binary-search-tree",
                "title": "Recover Binary Search Tree",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "binary-tree-cameras",
                "title": "Binary Tree Cameras",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "count-complete-tree-nodes",
                "title": "Count Complete Tree Nodes",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "all-nodes-distance-k-in-binary-tree",
                "title": "All Nodes Distance K In Binary Tree",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "maximum-width-of-binary-tree",
                "title": "Maximum Width Of Binary Tree",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "range-sum-query-mutable",
                "title": "Range Sum Query Mutable",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "count-of-smaller-numbers-after-self",
                "title": "Count Of Smaller Numbers After Self",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "falling-squares",
                "title": "Falling Squares",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "number-of-connected-components-in-an-undirected-graph",
                "title": "Number of Connected Components in an Undirected Graph",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "accounts-merge",
                "title": "Accounts Merge",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "graph-valid-tree",
                "title": "Graph Valid Tree",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "n-queens-ii",
                "title": "N-Queens II",
                "category": "Backtracking",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "sudoku-solver",
                "title": "Sudoku Solver",
                "category": "Backtracking",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "word-search-ii",
                "title": "Word Search II",
                "category": "Trie",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "expression-add-operators",
                "title": "Expression Add Operators",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "burst-balloons",
                "title": "Burst Balloons",
                "category": "Dynamic Programming",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "cherry-pickup",
                "title": "Cherry Pickup",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "distinct-subsequences",
                "title": "Distinct Subsequences",
                "category": "Dynamic Programming",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "regular-expression-matching",
                "title": "Regular Expression Matching",
                "category": "Dynamic Programming",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "wildcard-matching",
                "title": "Wildcard Matching",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "longest-palindromic-subsequence",
                "title": "Longest Palindromic Subsequence",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "stone-game",
                "title": "Stone Game",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "split-array-largest-sum",
                "title": "Split Array Largest Sum",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "minimize-max-distance-to-gas-station",
                "title": "Minimize Max Distance To Gas Station",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "find-k-th-smallest-pair-distance",
                "title": "Find K Th Smallest Pair Distance",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "candy",
                "title": "Candy",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "queue-reconstruction-by-height",
                "title": "Queue Reconstruction By Height",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "hand-of-straights",
                "title": "Hand Of Straights",
                "category": "Unknown",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "word-ladder",
                "title": "Word Ladder",
                "category": "Graphs",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "n-queens",
                "title": "N-Queens",
                "category": "Backtracking",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "median-of-two-sorted-arrays",
                "title": "Median of Two Sorted Arrays",
                "category": "Binary Search",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "edit-distance",
                "title": "Edit Distance",
                "category": "Dynamic Programming",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "longest-increasing-path-in-a-matrix",
                "title": "Longest Increasing Path in a Matrix",
                "category": "Dynamic Programming",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "find-median-from-data-stream",
                "title": "Find Median from Data Stream",
                "category": "Heap / Priority Queue",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "ipo",
                "title": "IPO",
                "category": "Heap / Priority Queue",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "merge-k-sorted-lists",
                "title": "Merge k Sorted Lists",
                "category": "Heap / Priority Queue",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "lfu-cache",
                "title": "LFU Cache",
                "category": "Linked List",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "minimum-window-substring",
                "title": "Minimum Window Substring",
                "category": "Sliding Window",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "sliding-window-maximum",
                "title": "Sliding Window Maximum",
                "category": "Sliding Window",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "largest-rectangle-in-histogram",
                "title": "Largest Rectangle in Histogram",
                "category": "Stack",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "binary-tree-maximum-path-sum",
                "title": "Binary Tree Maximum Path Sum",
                "category": "Trees",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "serialize-and-deserialize-binary-tree",
                "title": "Serialize and Deserialize Binary Tree",
                "category": "Trees",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "trapping-rain-water",
                "title": "Trapping Rain Water",
                "category": "Two Pointers",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            }
        ]
    },
    {
        "id": "thirtyDays",
        "name": "30-Day Blitz",
        "description": "One high-impact interview problem every day for 30 days.",
        "difficulty": "Medium",
        "completionPercentage": 0,
        "readinessMetric": 0,
        "problems": [
            {
                "id": "two-sum",
                "title": "Two Sum",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "valid-anagram",
                "title": "Valid Anagram",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "product-of-array-except-self",
                "title": "Product of Array Except Self",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "group-anagrams",
                "title": "Group Anagrams",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "top-k-frequent-elements",
                "title": "Top K Frequent Elements",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "longest-consecutive-sequence",
                "title": "Longest Consecutive Sequence",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "valid-parentheses",
                "title": "Valid Parentheses",
                "category": "Stack",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "binary-search",
                "title": "Binary Search",
                "category": "Binary Search",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "search-in-rotated-sorted-array",
                "title": "Search in Rotated Sorted Array",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "container-with-most-water",
                "title": "Container With Most Water",
                "category": "Two Pointers",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "3sum",
                "title": "3Sum",
                "category": "Two Pointers",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "best-time-to-buy-and-sell-stock",
                "title": "Best Time to Buy and Sell Stock",
                "category": "Sliding Window",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "longest-substring-without-repeating-characters",
                "title": "Longest Substring Without Repeating Characters",
                "category": "Sliding Window",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "merge-intervals",
                "title": "Merge Intervals",
                "category": "Intervals",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "insert-interval",
                "title": "Insert Interval",
                "category": "Intervals",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "number-of-islands",
                "title": "Number of Islands",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "clone-graph",
                "title": "Clone Graph",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "course-schedule",
                "title": "Course Schedule",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "house-robber",
                "title": "House Robber",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "coin-change",
                "title": "Coin Change",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "kth-smallest-element-in-a-bst",
                "title": "Kth Smallest Element in a BST",
                "category": "Trees",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "lowest-common-ancestor-of-a-binary-search-tree",
                "title": "Lowest Common Ancestor of a BST",
                "category": "Trees",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "combination-sum",
                "title": "Combination Sum",
                "category": "Backtracking",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "subsets",
                "title": "Subsets",
                "category": "Backtracking",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "generate-parentheses",
                "title": "Generate Parentheses",
                "category": "Stack",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "lru-cache",
                "title": "LRU Cache",
                "category": "Linked List",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "find-median-from-data-stream",
                "title": "Find Median from Data Stream",
                "category": "Heap / Priority Queue",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "word-break",
                "title": "Word Break",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "longest-increasing-subsequence",
                "title": "Longest Increasing Subsequence",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            }
        ]
    },
    {
        "id": "sixtyDays",
        "name": "60-Day Comprehensive",
        "description": "Complete interview preparation from beginner to advanced over 60 days.",
        "difficulty": "Hard",
        "completionPercentage": 0,
        "readinessMetric": 0,
        "problems": [
            {
                "id": "contains-duplicate",
                "title": "Contains Duplicate",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "3sum",
                "title": "3Sum",
                "category": "Two Pointers",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "best-time-to-buy-and-sell-stock",
                "title": "Best Time to Buy and Sell Stock",
                "category": "Sliding Window",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "arranging-coins",
                "title": "Arranging Coins",
                "category": "Binary Search",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "add-two-numbers",
                "title": "Add Two Numbers",
                "category": "Linked List",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "asteroid-collision",
                "title": "Asteroid Collision",
                "category": "Stack",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "balanced-binary-tree",
                "title": "Balanced Binary Tree",
                "category": "Trees",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "alien-dictionary",
                "title": "Alien Dictionary",
                "category": "Graphs",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "find-k-pairs-with-smallest-sums",
                "title": "Find K Pairs with Smallest Sums",
                "category": "Heap",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "burst-balloons",
                "title": "Burst Balloons",
                "category": "Dynamic Programming",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "design-add-and-search-words-data-structure",
                "title": "Design Add and Search Words Data Structure",
                "category": "Trie",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "counting-bits",
                "title": "Counting Bits",
                "category": "Bit Manipulation",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "find-all-duplicates-in-an-array",
                "title": "Find All Duplicates in an Array",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "4sum",
                "title": "4Sum",
                "category": "Two Pointers",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "find-all-anagrams-in-a-string",
                "title": "Find All Anagrams in a String",
                "category": "Sliding Window",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "binary-search",
                "title": "Binary Search",
                "category": "Binary Search",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "copy-list-with-random-pointer",
                "title": "Copy List with Random Pointer",
                "category": "Linked List",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "daily-temperatures",
                "title": "Daily Temperatures",
                "category": "Stack",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "binary-tree-level-order-traversal",
                "title": "Binary Tree Level Order Traversal",
                "category": "Trees",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "clone-graph",
                "title": "Clone Graph",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "climbing-stairs",
                "title": "Climbing Stairs",
                "category": "Dynamic Programming",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "implement-trie-prefix-tree",
                "title": "Implement Trie (Prefix Tree)",
                "category": "Trie",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "maximum-xor-of-two-numbers-in-an-array",
                "title": "Maximum XOR of Two Numbers in an Array",
                "category": "Bit Manipulation",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "find-minimum-and-maximum-in-array",
                "title": "Find Minimum and Maximum in Array",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "container-with-most-water",
                "title": "Container With Most Water",
                "category": "Two Pointers",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "longest-repeating-character-replacement",
                "title": "Longest Repeating Character Replacement",
                "category": "Sliding Window",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "capacity-to-ship-packages-within-d-days",
                "title": "Capacity To Ship Packages Within D Days",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "intersection-of-two-linked-lists",
                "title": "Intersection of Two Linked Lists",
                "category": "Linked List",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "decode-string",
                "title": "Decode String",
                "category": "Stack",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "binary-tree-maximum-path-sum",
                "title": "Binary Tree Maximum Path Sum",
                "category": "Trees",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "course-schedule",
                "title": "Course Schedule",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "coin-change",
                "title": "Coin Change",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "replace-words",
                "title": "Replace Words",
                "category": "Trie",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "missing-number",
                "title": "Missing Number",
                "category": "Bit Manipulation",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "group-anagrams",
                "title": "Group Anagrams",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "is-subsequence",
                "title": "Is Subsequence",
                "category": "Two Pointers",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "longest-substring-without-repeating-characters",
                "title": "Longest Substring Without Repeating Characters",
                "category": "Sliding Window",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "find-first-and-last-position-of-element-in-sorted-array",
                "title": "Find First and Last Position of Element in Sorted Array",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "lfu-cache",
                "title": "LFU Cache",
                "category": "Linked List",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "evaluate-reverse-polish-notation",
                "title": "Evaluate Reverse Polish Notation",
                "category": "Stack",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "binary-tree-right-side-view",
                "title": "Binary Tree Right Side View",
                "category": "Trees",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "find-if-path-exists-in-graph",
                "title": "Find if Path Exists in Graph",
                "category": "Graphs",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "decode-ways",
                "title": "Decode Ways",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "search-suggestions-system",
                "title": "Search Suggestions System",
                "category": "Trie",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "number-of-1-bits",
                "title": "Number of 1 Bits",
                "category": "Bit Manipulation",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "longest-consecutive-sequence",
                "title": "Longest Consecutive Sequence",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "remove-duplicates-from-sorted-array",
                "title": "Remove Duplicates from Sorted Array",
                "category": "Two Pointers",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "max-consecutive-ones-iii",
                "title": "Max Consecutive Ones III",
                "category": "Sliding Window",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "find-minimum-in-rotated-sorted-array",
                "title": "Find Minimum in Rotated Sorted Array",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "linked-list-cycle",
                "title": "Linked List Cycle",
                "category": "Linked List",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "generate-parentheses",
                "title": "Generate Parentheses",
                "category": "Stack",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "binary-tree-vertical-order-traversal",
                "title": "Binary Tree Vertical Order Traversal",
                "category": "Trees",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "flood-fill",
                "title": "Flood Fill",
                "category": "Graphs",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "distinct-subsequences",
                "title": "Distinct Subsequences",
                "category": "Dynamic Programming",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "word-search-ii",
                "title": "Word Search II",
                "category": "Trie",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "power-of-two",
                "title": "Power of Two",
                "category": "Bit Manipulation",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "majority-element",
                "title": "Majority Element",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "remove-element",
                "title": "Remove Element",
                "category": "Two Pointers",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "minimum-size-subarray-sum",
                "title": "Minimum Size Subarray Sum",
                "category": "Sliding Window",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "find-peak-element",
                "title": "Find Peak Element",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "lru-cache",
                "title": "LRU Cache",
                "category": "Linked List",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "largest-rectangle-in-histogram",
                "title": "Largest Rectangle in Histogram",
                "category": "Stack",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "binary-tree-zigzag-level-order-traversal",
                "title": "Binary Tree Zigzag Level Order Traversal",
                "category": "Trees",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "graph-valid-tree",
                "title": "Graph Valid Tree",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "edit-distance",
                "title": "Edit Distance",
                "category": "Dynamic Programming",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "reverse-bits",
                "title": "Reverse Bits",
                "category": "Bit Manipulation",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "move-zeroes",
                "title": "Move Zeroes",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "shortest-unsorted-continuous-subarray",
                "title": "Shortest Unsorted Continuous Subarray",
                "category": "Two Pointers",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "minimum-window-substring",
                "title": "Minimum Window Substring",
                "category": "Sliding Window",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "first-bad-version",
                "title": "First Bad Version",
                "category": "Binary Search",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "merge-two-sorted-lists",
                "title": "Merge Two Sorted Lists",
                "category": "Linked List",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "min-stack",
                "title": "Min Stack",
                "category": "Stack",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "construct-binary-tree-from-preorder-and-inorder-traversal",
                "title": "Construct Binary Tree from Preorder and Inorder Traversal",
                "category": "Trees",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "max-area-of-island",
                "title": "Max Area of Island",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "fibonacci-number",
                "title": "Fibonacci Number",
                "category": "Dynamic Programming",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "single-number-ii",
                "title": "Single Number II",
                "category": "Bit Manipulation",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "next-permutation",
                "title": "Next Permutation",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "squares-of-a-sorted-array",
                "title": "Squares of a Sorted Array",
                "category": "Two Pointers",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "permutation-in-string",
                "title": "Permutation in String",
                "category": "Sliding Window",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "guess-number-higher-or-lower",
                "title": "Guess Number Higher or Lower",
                "category": "Binary Search",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "palindrome-linked-list",
                "title": "Palindrome Linked List",
                "category": "Linked List",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "next-greater-element-i",
                "title": "Next Greater Element I",
                "category": "Stack",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "count-good-nodes-in-binary-tree",
                "title": "Count Good Nodes in Binary Tree",
                "category": "Trees",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "min-cost-to-connect-all-points",
                "title": "Min Cost to Connect All Points",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "house-robber-ii",
                "title": "House Robber II",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "sum-of-two-integers",
                "title": "Sum of Two Integers",
                "category": "Bit Manipulation",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "pascals-triangle",
                "title": "Pascal",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "trapping-rain-water",
                "title": "Trapping Rain Water",
                "category": "Two Pointers",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "sliding-window-maximum",
                "title": "Sliding Window Maximum",
                "category": "Sliding Window",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "koko-eating-bananas",
                "title": "Koko Eating Bananas",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "remove-nth-node-from-end-of-list",
                "title": "Remove Nth Node From End of List",
                "category": "Linked List",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "remove-k-digits",
                "title": "Remove K Digits",
                "category": "Stack",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "diameter-of-binary-tree",
                "title": "Diameter of Binary Tree",
                "category": "Trees",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "network-delay-time",
                "title": "Network Delay Time",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "house-robber",
                "title": "House Robber",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "product-of-array-except-self",
                "title": "Product of Array Except Self",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "two-sum-ii-input-array-is-sorted",
                "title": "Two Sum II - Input Array Is Sorted",
                "category": "Two Pointers",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "subarray-product-less-than-k",
                "title": "Subarray Product Less Than K",
                "category": "Sliding Window",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "median-of-two-sorted-arrays",
                "title": "Median of Two Sorted Arrays",
                "category": "Binary Search",
                "difficulty": "Hard",
                "isCompleted": false
            },
            {
                "id": "reorder-list",
                "title": "Reorder List",
                "category": "Linked List",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "valid-parentheses",
                "title": "Valid Parentheses",
                "category": "Stack",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "flatten-binary-tree-to-linked-list",
                "title": "Flatten Binary Tree to Linked List",
                "category": "Trees",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "number-of-connected-components-in-an-undirected-graph",
                "title": "Number of Connected Components in an Undirected Graph",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "interleaving-string",
                "title": "Interleaving String",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "reverse-array",
                "title": "Reverse Array",
                "category": "Arrays & Hashing",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "valid-palindrome",
                "title": "Valid Palindrome",
                "category": "Two Pointers",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "peak-index-in-a-mountain-array",
                "title": "Peak Index in a Mountain Array",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "reverse-linked-list",
                "title": "Reverse Linked List",
                "category": "Linked List",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "invert-binary-tree",
                "title": "Invert Binary Tree",
                "category": "Trees",
                "difficulty": "Easy",
                "isCompleted": false
            },
            {
                "id": "number-of-islands",
                "title": "Number of Islands",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "jump-game",
                "title": "Jump Game",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "rotate-array",
                "title": "Rotate Array",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "search-a-2d-matrix",
                "title": "Search a 2D Matrix",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "sort-list",
                "title": "Sort List",
                "category": "Linked List",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "kth-smallest-element-in-a-bst",
                "title": "Kth Smallest Element in a BST",
                "category": "Trees",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "pacific-atlantic-water-flow",
                "title": "Pacific Atlantic Water Flow",
                "category": "Graphs",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "longest-common-subsequence",
                "title": "Longest Common Subsequence",
                "category": "Dynamic Programming",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "set-matrix-zeroes",
                "title": "Set Matrix Zeroes",
                "category": "Arrays & Hashing",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "search-in-rotated-sorted-array",
                "title": "Search in Rotated Sorted Array",
                "category": "Binary Search",
                "difficulty": "Medium",
                "isCompleted": false
            },
            {
                "id": "lowest-common-ancestor-of-a-binary-search-tree",
                "title": "Lowest Common Ancestor of a BST",
                "category": "Trees",
                "difficulty": "Medium",
                "isCompleted": false
            }
        ]
    }
];
