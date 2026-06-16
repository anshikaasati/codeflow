import { useEffect, useState, useRef, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useExecutionStore } from '../store/executionStore';
import { useVisualizationStore } from '../store/visualizationStore';
import type { SavedVisualization } from '../store/visualizationStore';
import CodeEditor from '../features/visualizer/components/CodeEditor';
import { useThemeStore } from '../store/themeStore';
import WhiteboardPanel from '../features/visualizer/components/panels/WhiteboardPanel';
import FixPermissionDialog from '../components/dialogs/FixPermissionDialog';
import ImportProblemDialog from '../features/workspace/components/ImportProblemDialog';
import SaveVisualizationDialog from '../features/workspace/components/SaveVisualizationDialog';
import GitHubImportDialog from '../features/workspace/components/GitHubImportDialog';
import ComplexityInfo from '../features/workspace/components/ComplexityInfo';
import ProblemDescription from '../features/workspace/components/ProblemDescription';
import SlidingConsole from '../features/workspace/components/SlidingConsole';
import FeedbackModal from '../components/FeedbackModal';
import AuthModal from '../features/auth/components/AuthModal';
import { problemsList } from '../data/problems/index';
import { useProgressStore } from '../store/progressStore';
import { useAuthStore } from '../store/authStore';
import { 
    Play, Pause, SkipBack, SkipForward, RotateCcw, 
    ChevronLeft, ChevronRight, Sparkles, ChevronDown, 
    ChevronUp, Code2, Save, Github, BookOpen, 
    Zap, Terminal, Layers, MousePointer2,
    Maximize2, Minimize2, Menu, Search, CheckCircle, Trophy,
    Cpu, LogOut, LayoutDashboard, Settings, Newspaper, Brain,
    Star, FileText, Bookmark, Edit3, User, Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DynamicBackground from '../components/DynamicBackground';
import { API_URL } from '../config/api';

interface ProblemData {
    id: string;
    title: string;
    description?: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    topicTags?: string[];
    category?: string;
    examples?: {
        input: string;
        output: string;
        explanation?: string;
    }[];
    constraints?: string[];
    starterCode: { cpp: string; python: string };
    source: 'LeetCode' | 'Custom' | 'SWE180';
    url?: string;
    starterCodePython?: string;
}

const generatePythonStarterCode = (_problem?: any) => {
    return `class Solution:\n    def solve(self):\n        # Write your code here\n        pass\n\nif __name__ == "__main__":\n    sol = Solution()\n    print(sol.solve())\n`;
};

interface DropdownItemProps {
    to?: string;
    onClick?: () => void;
    icon: React.ElementType;
    label: string;
    description?: string;
    danger?: boolean;
    accent?: boolean;
}

function DropdownItem({ to, onClick, icon: Icon, label, description, danger, accent }: DropdownItemProps) {
    const colorClass = danger
        ? 'text-accent-red hover:bg-accent-red/10 hover:text-accent-red'
        : accent
        ? 'text-primary hover:bg-primary/10 hover:text-primary'
        : 'text-text-secondary hover:text-white hover:bg-white/5';

    const content = (
        <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all cursor-pointer ${colorClass}`}>
            <Icon size={17} className="flex-shrink-0" />
            <div>
                <p className="text-sm font-bold leading-none">{label}</p>
                {description && <p className="text-[11px] text-text-muted mt-0.5">{description}</p>}
            </div>
        </div>
    );

    if (to) {
        return <Link to={to} onClick={onClick}>{content}</Link>;
    }
    return <button className="w-full text-left" onClick={onClick}>{content}</button>;
}

function getStepCategory(step: any): { category: 'traversal' | 'success' | 'fail' | 'decision'; colorClass: string; borderClass: string; bgClass: string; iconColor: string } {
    const text = (step.teacherNote?.what || step.teacherNote?.why || '').toLowerCase();
    const type = step.type;
    
    if (text.includes('reject') || text.includes('fail') || text.includes('invalid') || text.includes('not-found') || text.includes('not found') || text.includes('out of bounds') || text.includes('mismatch') || text.includes('false')) {
        return {
            category: 'fail',
            colorClass: 'text-accent-red',
            borderClass: 'border-accent-red/30',
            bgClass: 'bg-accent-red/5',
            iconColor: '#ef4444'
        };
    }
    
    if (text.includes('success') || text.includes('found') || text.includes('match') || text.includes('complete') || text.includes('true') || type === 'return') {
        return {
            category: 'success',
            colorClass: 'text-accent-green',
            borderClass: 'border-accent-green/30',
            bgClass: 'bg-accent-green/5',
            iconColor: '#10b981'
        };
    }
    
    if (type === 'condition' || type === 'comparison') {
        return {
            category: 'decision',
            colorClass: 'text-accent-orange',
            borderClass: 'border-accent-orange/30',
            bgClass: 'bg-accent-orange/5',
            iconColor: '#eab308'
        };
    }
    
    return {
        category: 'traversal',
        colorClass: 'text-primary',
        borderClass: 'border-primary/30',
        bgClass: 'bg-primary/5',
        iconColor: 'var(--primary)'
    };
}

const complexityMap: Record<string, { time: string; space: string; bestTime: string; bestSpace: string }> = {
    'two-sum': { time: 'O(N^2) / O(N)', space: 'O(1) / O(N)', bestTime: 'O(N)', bestSpace: 'O(N)' },
    'contains-duplicate': { time: 'O(N^2) / O(N log N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(N)' },
    'valid-anagram': { time: 'O(N log N)', space: 'O(1) / O(N)', bestTime: 'O(N)', bestSpace: 'O(1)' },
    'group-anagrams': { time: 'O(N * K log K)', space: 'O(N * K)', bestTime: 'O(N * K)', bestSpace: 'O(N * K)' },
    'longest-consecutive-sequence': { time: 'O(N log N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(N)' },
    'two-sum-ii-input-array-is-sorted': { time: 'O(N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(1)' },
    'valid-palindrome': { time: 'O(N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(1)' },
    'container-with-most-water': { time: 'O(N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(1)' },
    'trapping-rain-water': { time: 'O(N)', space: 'O(N)', bestTime: 'O(N)', bestSpace: 'O(1)' },
    'best-time-to-buy-and-sell-stock': { time: 'O(N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(1)' },
    'longest-substring-without-repeating-characters': { time: 'O(N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(min(M, N))' },
    'longest-repeating-character-replacement': { time: 'O(N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(26)' },
    'minimum-window-substring': { time: 'O(N + M)', space: 'O(1)', bestTime: 'O(N + M)', bestSpace: 'O(1)' },
    'valid-parentheses': { time: 'O(N)', space: 'O(N)', bestTime: 'O(N)', bestSpace: 'O(N)' },
    'min-stack': { time: 'O(1) all ops', space: 'O(N)', bestTime: 'O(1)', bestSpace: 'O(N)' },
    'evaluate-reverse-polish-notation': { time: 'O(N)', space: 'O(N)', bestTime: 'O(N)', bestSpace: 'O(N)' },
    'generate-parentheses': { time: 'O(4^N / sqrt(N))', space: 'O(4^N / sqrt(N))', bestTime: 'O(4^N / sqrt(N))', bestSpace: 'O(4^N / sqrt(N))' },
    'daily-temperatures': { time: 'O(N)', space: 'O(N)', bestTime: 'O(N)', bestSpace: 'O(N)' },
    'car-fleet': { time: 'O(N log N)', space: 'O(N)', bestTime: 'O(N log N)', bestSpace: 'O(N)' },
    'largest-rectangle-in-histogram': { time: 'O(N)', space: 'O(N)', bestTime: 'O(N)', bestSpace: 'O(N)' },
    'binary-search': { time: 'O(log N)', space: 'O(1)', bestTime: 'O(log N)', bestSpace: 'O(1)' },
    'search-a-2d-matrix': { time: 'O(log(M * N))', space: 'O(1)', bestTime: 'O(log(M * N))', bestSpace: 'O(1)' },
    'koko-eating-bananas': { time: 'O(N log M)', space: 'O(1)', bestTime: 'O(N log M)', bestSpace: 'O(1)' },
    'find-minimum-in-rotated-sorted-array': { time: 'O(log N)', space: 'O(1)', bestTime: 'O(log N)', bestSpace: 'O(1)' },
    'search-in-rotated-sorted-array': { time: 'O(log N)', space: 'O(1)', bestTime: 'O(log N)', bestSpace: 'O(1)' },
    'time-based-key-value-store': { time: 'O(log N) get, O(1) set', space: 'O(N)', bestTime: 'O(log N)', bestSpace: 'O(N)' },
    'median-of-two-sorted-arrays': { time: 'O(log(min(N, M)))', space: 'O(1)', bestTime: 'O(log(min(N, M)))', bestSpace: 'O(1)' },
    'reverse-linked-list': { time: 'O(N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(1)' },
    'merge-two-sorted-lists': { time: 'O(N + M)', space: 'O(1)', bestTime: 'O(N + M)', bestSpace: 'O(1)' },
    'reorder-list': { time: 'O(N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(1)' },
    'remove-nth-node-from-end-of-list': { time: 'O(N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(1)' },
    'copy-list-with-random-pointer': { time: 'O(N)', space: 'O(N)', bestTime: 'O(N)', bestSpace: 'O(N)' },
    'add-two-numbers': { time: 'O(max(N, M))', space: 'O(max(N, M))', bestTime: 'O(max(N, M))', bestSpace: 'O(max(N, M))' },
    'linked-list-cycle': { time: 'O(N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(1)' },
    'find-the-duplicate-number': { time: 'O(N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(1)' },
    'lru-cache': { time: 'O(1) all ops', space: 'O(C)', bestTime: 'O(1)', bestSpace: 'O(C)' },
    'merge-k-sorted-lists': { time: 'O(N log K)', space: 'O(1) or O(K)', bestTime: 'O(N log K)', bestSpace: 'O(1)' },
    'reverse-nodes-in-k-group': { time: 'O(N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(1)' },
    'invert-binary-tree': { time: 'O(N)', space: 'O(H) / O(N)', bestTime: 'O(N)', bestSpace: 'O(H)' },
    'maximum-depth-of-binary-tree': { time: 'O(N)', space: 'O(H)', bestTime: 'O(N)', bestSpace: 'O(H)' },
    'diameter-of-binary-tree': { time: 'O(N)', space: 'O(H)', bestTime: 'O(N)', bestSpace: 'O(H)' },
    'balanced-binary-tree': { time: 'O(N)', space: 'O(H)', bestTime: 'O(N)', bestSpace: 'O(H)' },
    'same-tree': { time: 'O(N)', space: 'O(H)', bestTime: 'O(N)', bestSpace: 'O(H)' },
    'subtree-of-another-tree': { time: 'O(N * M)', space: 'O(H)', bestTime: 'O(N * M)', bestSpace: 'O(H)' },
    'lowest-common-ancestor-of-a-binary-search-tree': { time: 'O(H)', space: 'O(H)', bestTime: 'O(H)', bestSpace: 'O(H)' },
    'binary-tree-level-order-traversal': { time: 'O(N)', space: 'O(N)', bestTime: 'O(N)', bestSpace: 'O(N)' },
    'binary-tree-right-side-view': { time: 'O(N)', space: 'O(H)', bestTime: 'O(N)', bestSpace: 'O(H)' },
    'count-good-nodes-in-binary-tree': { time: 'O(N)', space: 'O(H)', bestTime: 'O(N)', bestSpace: 'O(H)' },
    'validate-binary-search-tree': { time: 'O(N)', space: 'O(H)', bestTime: 'O(N)', bestSpace: 'O(H)' },
    'kth-smallest-element-in-a-bst': { time: 'O(N)', space: 'O(H)', bestTime: 'O(N)', bestSpace: 'O(H)' },
    'construct-binary-tree-from-preorder-and-inorder-traversal': { time: 'O(N)', space: 'O(N)', bestTime: 'O(N)', bestSpace: 'O(N)' },
    'binary-tree-maximum-path-sum': { time: 'O(N)', space: 'O(H)', bestTime: 'O(N)', bestSpace: 'O(H)' },
    'serialize-and-deserialize-binary-tree': { time: 'O(N)', space: 'O(N)', bestTime: 'O(N)', bestSpace: 'O(N)' },
    'k-closest-points-to-origin': { time: 'O(N log K)', space: 'O(K)', bestTime: 'O(N)', bestSpace: 'O(N)' },
    'task-scheduler': { time: 'O(N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(1)' },
    'design-twitter': { time: 'O(N log K)', space: 'O(U + T)', bestTime: 'O(N log K)', bestSpace: 'O(U + T)' },
    'find-median-from-data-stream': { time: 'O(log N) add, O(1) find', space: 'O(N)', bestTime: 'O(log N)', bestSpace: 'O(N)' },
    'subsets': { time: 'O(N * 2^N)', space: 'O(N)', bestTime: 'O(N * 2^N)', bestSpace: 'O(N)' },
    'combination-sum': { time: 'O(2^T)', space: 'O(T)', bestTime: 'O(2^T)', bestSpace: 'O(T)' },
    'permutations': { time: 'O(N * N!)', space: 'O(N!)', bestTime: 'O(N * N!)', bestSpace: 'O(N!)' },
    'subsets-ii': { time: 'O(N * 2^N)', space: 'O(N)', bestTime: 'O(N * 2^N)', bestSpace: 'O(N)' },
    'combination-sum-ii': { time: 'O(2^N)', space: 'O(N)', bestTime: 'O(2^N)', bestSpace: 'O(N)' },
    'word-search': { time: 'O(N * M * 4^L)', space: 'O(L)', bestTime: 'O(N * M * 4^L)', bestSpace: 'O(L)' },
    'palindrome-partitioning': { time: 'O(N * 2^N)', space: 'O(N)', bestTime: 'O(N * 2^N)', bestSpace: 'O(N)' },
    'letter-combinations-of-a-phone-number': { time: 'O(N * 4^N)', space: 'O(N)', bestTime: 'O(N * 4^N)', bestSpace: 'O(N)' },
    'n-queens': { time: 'O(N!)', space: 'O(N^2)', bestTime: 'O(N!)', bestSpace: 'O(N^2)' },
    'climbing-stairs': { time: 'O(N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(1)' },
    'min-cost-climbing-stairs': { time: 'O(N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(1)' },
    'house-robber': { time: 'O(N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(1)' },
    'house-robber-ii': { time: 'O(N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(1)' },
    'longest-palindromic-substring': { time: 'O(N^2)', space: 'O(1)', bestTime: 'O(N^2) or O(N)', bestSpace: 'O(1)' },
    'palindromic-substrings': { time: 'O(N^2)', space: 'O(1)', bestTime: 'O(N^2)', bestSpace: 'O(1)' },
    'decode-ways': { time: 'O(N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(1)' },
    'coin-change': { time: 'O(N * A)', space: 'O(A)', bestTime: 'O(N * A)', bestSpace: 'O(A)' },
    'maximum-product-subarray': { time: 'O(N)', space: 'O(1)', bestTime: 'O(N)', bestSpace: 'O(1)' },
    'word-break': { time: 'O(N^3)', space: 'O(N)', bestTime: 'O(N^3) or O(N^2)', bestSpace: 'O(N)' },
    'longest-increasing-subsequence': { time: 'O(N^2) / O(N log N)', space: 'O(N)', bestTime: 'O(N log N)', bestSpace: 'O(N)' },
};

export default function ProblemWorkspace() {
    const {
        connect, reset, executeRealCode, error, setCode, code,
        requestTrace, nextStep, prevStep, togglePlay, isPlaying,
        currentStepIndex, traceSteps, traces,
        currentPattern, speed, setSpeed, analysis,
        language, setLanguage
    } = useExecutionStore();

    const { setTheme } = useThemeStore();
    const { user, logout } = useAuthStore();
    
    // Profile and Lang Dropdown states
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [streak, setStreak] = useState<number>(() => Number(localStorage.getItem('cf_streak') || '3'));

    useEffect(() => {
        const fetchStreak = async () => {
            if (!user) return;
            try {
                const token = await user.getIdToken();
                const res = await fetch(`${API_URL}/api/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await res.json();
                if (data?.stats && typeof data.stats.streak === 'number') {
                    setStreak(data.stats.streak);
                    localStorage.setItem('cf_streak', String(data.stats.streak));
                }
            } catch (err) {
                console.error("Failed to load dashboard stats in workspace:", err);
            }
        };
        fetchStreak();
    }, [user]);

    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const langDropdownRef = useRef<HTMLDivElement>(null);

    // Complexity hover preview state
    const [isComplexityHovered, setIsComplexityHovered] = useState(false);

    // Dropdown click outside listener
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
                setLangDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const [activeTab, setActiveTab] = useState<'description' | 'editor'>('editor');
    const [leftPanelOpen, setLeftPanelOpen] = useState(true);
    const [consoleOpen, setConsoleOpen] = useState(false);
    const [complexityOpen, setComplexityOpen] = useState(false);
    const [isImportOpen, setIsImportOpen] = useState(false);
    const [isSaveOpen, setIsSaveOpen] = useState(false);
    const [isGithubImportOpen, setIsGithubImportOpen] = useState(false);
    const [problemDetails, setProblemDetails] = useState<ProblemData | null>(null);
    const [logicPanelOpen, setLogicPanelOpen] = useState(true);
    const [isCanvasFullscreen, setIsCanvasFullscreen] = useState(false);
    const [loadedVis, setLoadedVis] = useState<SavedVisualization | null>(null);
    
    const location = useLocation();
    const [dsaDrawerOpen, setDsaDrawerOpen] = useState(false);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

    useEffect(() => {
        if (traceSteps && traceSteps.length > 0 && currentStepIndex === traceSteps.length - 1) {
            const alreadySubmitted = sessionStorage.getItem('cf_feedback_submitted') === 'true';
            const shownThisSession = sessionStorage.getItem('cf_feedback_shown') === 'true';
            if (!alreadySubmitted && !shownThisSession) {
                const timer = setTimeout(() => {
                    setIsFeedbackOpen(true);
                    sessionStorage.setItem('cf_feedback_shown', 'true');
                }, 1000);
                return () => clearTimeout(timer);
            }
        }
    }, [currentStepIndex, traceSteps?.length]);
    const hasAutoImported = useRef(false);
    const isLoadingProblem = useRef(false);
    const isHandlingLanguageChange = useRef(false);
    const currentProblemIdRef = useRef<string | null>(null);
    const fetchVisualizationById = useVisualizationStore(s => s.fetchVisualizationById);
    
    /**
     * Returns `draft` if it is syntactically consistent with `lang`.
     * If the draft appears to be the wrong language (e.g. C++ code saved
     * under the python key), it clears the corrupt localStorage entry and
     * returns `starterCode` instead.
     */
    const sanitizeDraftCode = (
        draft: string | null,
        lang: 'cpp' | 'python',
        starterCode: string,
        localStorageKey: string
    ): string => {
        if (!draft) return starterCode;
        const CPP_SIGNALS = /vector\s*<|cout\s*<<|#include\s*<|int\s+main\s*\(|push_back\(|nullptr|std::/;
        const PY_SIGNALS  = /^\s*(def |class |import |from |print\()/m;
        if (lang === 'python' && CPP_SIGNALS.test(draft)) {
            console.warn(`[sanitizeDraftCode] C++ code detected in python draft for key "${localStorageKey}". Resetting to starter code.`);
            localStorage.removeItem(localStorageKey);
            return starterCode;
        }
        if (lang === 'cpp' && PY_SIGNALS.test(draft) && !CPP_SIGNALS.test(draft)) {
            console.warn(`[sanitizeDraftCode] Python code detected in cpp draft for key "${localStorageKey}". Resetting to starter code.`);
            localStorage.removeItem(localStorageKey);
            return starterCode;
        }
        return draft;
    };

    const fetchUserSolutionDrafts = async (problemId: string) => {
        if (!user) return null;
        try {
            const token = await user.getIdToken();
            const res = await fetch(`${API_URL}/api/solutions/${problemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data?.success && data.drafts) {
                return data.drafts;
            }
        } catch (err) {
            console.error("Failed to fetch user solution drafts:", err);
        }
        return null;
    };

    const saveUserSolutionDraft = async (problemId: string, lang: string, currentCode: string) => {
        if (!user || !currentCode) return;
        try {
            const token = await user.getIdToken();
            await fetch(`${API_URL}/api/solutions/${problemId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    language: lang,
                    code: currentCode
                })
            });
        } catch (err) {
            console.error("Failed to save user solution draft to db:", err);
        }
    };

    const loadProblem = async (problem: any) => {
        isLoadingProblem.current = true;
        currentProblemIdRef.current = problem.id;
        try {
            reset();
            setLoadedVis(null);
            // Clear vid from URL search params to prevent reload sync bugs
            const params = new URLSearchParams(window.location.search);
            if (params.has('vid')) {
                window.history.replaceState({}, '', window.location.pathname);
            }
            
            const cppCode = problem.languages?.cpp?.starterCode || problem.starterCode || '';
            const pythonCode = problem.languages?.python?.starterCode || problem.starterCodePython || generatePythonStarterCode(problem);

            // Restore per-problem language preference, defaulting to cpp
            const savedLang = (localStorage.getItem(`codeflow_lang_${problem.id}`) as 'cpp' | 'python') || 'cpp';
            if (savedLang !== language) {
                setLanguage(savedLang);
            }
            
            const rawSaved = localStorage.getItem(`codeflow_saved_code_${problem.id}_${savedLang}`) ||
                             localStorage.getItem(`codeflow_saved_code_${problem.id}`);
            const starterForLang = savedLang === 'cpp' ? cppCode : pythonCode;
            const saved = sanitizeDraftCode(
                rawSaved,
                savedLang,
                starterForLang,
                `codeflow_saved_code_${problem.id}_${savedLang}`
            );
            setCode(saved);
            
            setProblemDetails({
                id: problem.id,
                title: problem.title,
                difficulty: problem.difficulty,
                category: problem.category,
                starterCode: { cpp: cppCode, python: pythonCode },
                description: problem.description,
                examples: problem.examples,
                constraints: problem.constraints,
                source: 'SWE180',
                url: problem.url,
            });

            if (user) {
                const dbDrafts = await fetchUserSolutionDrafts(problem.id);
                if (currentProblemIdRef.current === problem.id && dbDrafts) {
                    for (const [lang, draftCode] of Object.entries(dbDrafts)) {
                        localStorage.setItem(`codeflow_saved_code_${problem.id}_${lang}`, draftCode as string);
                    }
                    const rawActiveDraft = dbDrafts[savedLang] as string | undefined;
                    if (rawActiveDraft) {
                        const starterForLang = savedLang === 'cpp' ? cppCode : pythonCode;
                        const sanitized = sanitizeDraftCode(
                            rawActiveDraft,
                            savedLang,
                            starterForLang,
                            `codeflow_saved_code_${problem.id}_${savedLang}`
                        );
                        setCode(sanitized);
                    }
                }
            }
            
            setActiveTab('description');
        } finally {
            isLoadingProblem.current = false;
        }
    };

    const handleLanguageChange = async (newLang: 'cpp' | 'python') => {
        if (newLang === language) return;
        
        isHandlingLanguageChange.current = true;
        try {
            // Save current draft locally
            if (problemDetails?.id && code) {
                localStorage.setItem(`codeflow_saved_code_${problemDetails.id}_${language}`, code);
            }
            
            // Update store language and persist per-problem preference immediately
            setLanguage(newLang);
            if (problemDetails?.id) {
                localStorage.setItem(`codeflow_lang_${problemDetails.id}`, newLang);
            }
            
            // Load target draft or fallback code
            if (problemDetails) {
                const rawSaved = localStorage.getItem(`codeflow_saved_code_${problemDetails.id}_${newLang}`);
                const starterCode = newLang === 'cpp'
                    ? problemDetails.starterCode.cpp
                    : (problemDetails.starterCode.python || generatePythonStarterCode(problemDetails));
                const sanitized = sanitizeDraftCode(
                    rawSaved,
                    newLang,
                    starterCode,
                    `codeflow_saved_code_${problemDetails.id}_${newLang}`
                );
                setCode(sanitized);
            }

            // Save current draft to cloud
            if (problemDetails?.id && code && user) {
                await saveUserSolutionDraft(problemDetails.id, language, code);
            }

            // Save selected language to user profile database if logged in
            if (user) {
                try {
                    const token = await user.getIdToken();
                    await fetch(`${API_URL}/api/profile`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            selectedLanguage: newLang
                        })
                    });
                } catch (err) {
                    console.error("Failed to sync language preference to profile:", err);
                }
            }
        } finally {
            isHandlingLanguageChange.current = false;
        }
    };

    // Load visualization if vid param is present
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const vid = params.get('vid');
        if (vid) {
            fetchVisualizationById(vid).then(vis => {
                setLoadedVis(vis);
                setCode(vis.code);
                useExecutionStore.getState().setInput(vis.settings?.input || "");
                useExecutionStore.getState().setSpeed(vis.settings?.speed !== undefined ? vis.settings.speed : 500);
                
                // Load trace steps directly into store
                const steps = vis.traceSteps || [];
                if (steps.length > 0) {
                    useExecutionStore.setState({
                        traceSteps: steps,
                        traces: steps,
                        currentStepIndex: 0,
                        isPlaying: false,
                        traceMode: true
                    });
                }
                
                if (vis.metadata?.problemDetails) {
                    setProblemDetails(vis.metadata.problemDetails);
                } else {
                    setProblemDetails({
                        id: 'custom-playground',
                        title: vis.title,
                        difficulty: 'Medium',
                        starterCode: { cpp: vis.code, python: '' },
                        source: 'Custom'
                    });
                }
                
                setActiveTab('editor');
            }).catch(err => {
                console.error("Failed to load visualization:", err);
            });
        }
    }, [location.search, fetchVisualizationById, setCode]);

    const stepsArray = traceSteps.length > 0 ? traceSteps : traces;
    const hasSteps = stepsArray.length > 0;
    const currentTraceStep = stepsArray[currentStepIndex];

    // Resizable panel states
    const [leftPanelWidth, setLeftPanelWidth] = useState(() => {
        const saved = localStorage.getItem('codeflow_workspace_left_width');
        return saved ? Number(saved) : 440;
    });
    const [bottomPanelHeight, setBottomPanelHeight] = useState(() => {
        const saved = localStorage.getItem('codeflow_workspace_bottom_height');
        return saved ? Number(saved) : 220;
    });
    const [isDraggingLeft, setIsDraggingLeft] = useState(false);
    const [isDraggingBottom, setIsDraggingBottom] = useState(false);

    // Scrubber hover state
    const [scrubberHoverIndex, setScrubberHoverIndex] = useState<number | null>(null);
    const [scrubberHoverX, setScrubberHoverX] = useState<number>(0);
    const scrubberRef = useRef<HTMLDivElement>(null);

    // Search cmd states
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    // Drag handlers
    const startResizeLeft = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDraggingLeft(true);
        const startX = e.clientX;
        const startWidth = leftPanelWidth;
        const doDrag = (moveEvent: MouseEvent) => {
            const newWidth = Math.max(280, Math.min(800, startWidth + (moveEvent.clientX - startX)));
            setLeftPanelWidth(newWidth);
            localStorage.setItem('codeflow_workspace_left_width', newWidth.toString());
        };
        const stopDrag = () => {
            setIsDraggingLeft(false);
            document.removeEventListener('mousemove', doDrag);
            document.removeEventListener('mouseup', stopDrag);
        };
        document.addEventListener('mousemove', doDrag);
        document.addEventListener('mouseup', stopDrag);
    };

    const startResizeBottom = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDraggingBottom(true);
        const startY = e.clientY;
        const startHeight = bottomPanelHeight;
        const doDrag = (moveEvent: MouseEvent) => {
            const newHeight = Math.max(120, Math.min(600, startHeight - (moveEvent.clientY - startY)));
            setBottomPanelHeight(newHeight);
            localStorage.setItem('codeflow_workspace_bottom_height', newHeight.toString());
        };
        const stopDrag = () => {
            setIsDraggingBottom(false);
            document.removeEventListener('mousemove', doDrag);
            document.removeEventListener('mouseup', stopDrag);
        };
        document.addEventListener('mousemove', doDrag);
        document.addEventListener('mouseup', stopDrag);
    };

    // Scrubber handlers
    const handleScrubberMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!scrubberRef.current || stepsArray.length === 0) return;
        const rect = scrubberRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const index = Math.round(percentage * (stepsArray.length - 1));
        setScrubberHoverIndex(index);
        setScrubberHoverX(x);
    };

    const handleScrubberMouseLeave = () => {
        setScrubberHoverIndex(null);
    };

    const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!scrubberRef.current || stepsArray.length === 0) return;
        const rect = scrubberRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const index = Math.round(percentage * (stepsArray.length - 1));
        useExecutionStore.getState().setStep(index);
    };

    // Keyboard global Ctrl+K command search shortcut
    useEffect(() => {
        const handleSearchShortcut = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setSearchOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleSearchShortcut);
        return () => window.removeEventListener('keydown', handleSearchShortcut);
    }, []);

    // Autofocus input field on Ctrl+K search opening
    useEffect(() => {
        if (searchOpen) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [searchOpen]);

    // Command overlay lists
    const commandItems = useMemo(() => {
        const items = [];
        
        items.push({
            id: 'cmd-trace',
            type: 'command',
            title: 'Generate Trace Simulation',
            description: 'Validates code and triggers a live whiteboard simulation',
            shortcut: 'Ctrl + Enter',
            category: 'Actions',
            action: () => { requestTrace(); setSearchOpen(false); }
        });
        items.push({
            id: 'cmd-play',
            type: 'command',
            title: isPlaying ? 'Pause Playback' : 'Play Trace Playback',
            description: 'Toggles playback of step-by-step tracing',
            shortcut: 'Space',
            category: 'Actions',
            action: () => { togglePlay(); setSearchOpen(false); }
        });
        items.push({
            id: 'cmd-reset',
            type: 'command',
            title: 'Reset Simulation',
            description: 'Clears active steps and outputs',
            category: 'Actions',
            action: () => { reset(); setSearchOpen(false); }
        });
        items.push({
            id: 'cmd-toggle-left',
            type: 'command',
            title: leftPanelOpen ? 'Collapse Left Panel' : 'Expand Left Panel',
            description: 'Toggles sidebar problem description & editor',
            category: 'View',
            action: () => { setLeftPanelOpen(prev => !prev); setSearchOpen(false); }
        });
        items.push({
            id: 'cmd-toggle-console',
            type: 'command',
            title: consoleOpen ? 'Close Running Console' : 'Open Running Console',
            description: 'Toggles standard bottom input/output console',
            category: 'View',
            action: () => { setConsoleOpen(prev => !prev); setSearchOpen(false); }
        });
        items.push({
            id: 'cmd-toggle-fullscreen',
            type: 'command',
            title: isCanvasFullscreen ? 'Exit Fullscreen Canvas' : 'Enter Fullscreen Canvas',
            description: 'Toggles visual canvas size expansion',
            shortcut: 'F',
            category: 'View',
            action: () => { setIsCanvasFullscreen(prev => !prev); setSearchOpen(false); }
        });
        
        problemsList.forEach(problem => {
            items.push({
                id: `prob-${problem.id}`,
                type: 'problem',
                title: problem.title,
                description: `${problem.category} • ${problem.difficulty}`,
                category: 'Problems',
                action: () => {
                    loadProblem(problem);
                    setSearchOpen(false);
                }
            });
        });

        return items;
    }, [isPlaying, leftPanelOpen, consoleOpen, isCanvasFullscreen, requestTrace, togglePlay, reset, setLeftPanelOpen, setConsoleOpen, setIsCanvasFullscreen, setTheme, problemsList]);

    const filteredCommandItems = useMemo(() => {
        if (!searchQuery) return commandItems;
        const q = searchQuery.toLowerCase();
        return commandItems.filter(item => 
            item.title.toLowerCase().includes(q) || 
            item.description.toLowerCase().includes(q) ||
            (item.category && item.category.toLowerCase().includes(q))
        );
    }, [searchQuery, commandItems]);

    useEffect(() => {
        if (selectedIndex >= filteredCommandItems.length) {
            setSelectedIndex(Math.max(0, filteredCommandItems.length - 1));
        }
    }, [filteredCommandItems, selectedIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!searchOpen) return;
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredCommandItems.length));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredCommandItems.length) % Math.max(1, filteredCommandItems.length));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredCommandItems[selectedIndex]) {
                    filteredCommandItems[selectedIndex].action();
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                setSearchOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [searchOpen, filteredCommandItems, selectedIndex]);



    useEffect(() => { connect(); }, [connect]);

    useEffect(() => {
        const problemData = location.state?.problemData || problemsList[0];
        if (problemData && !hasAutoImported.current) {
            hasAutoImported.current = true;
            isLoadingProblem.current = true;
            currentProblemIdRef.current = problemData.id;
            
            const cppCode = problemData.languages?.cpp?.starterCode || problemData.starterCode?.cpp || problemData.starterCode || '';
            const pythonCode = problemData.languages?.python?.starterCode || problemData.starterCode?.python || problemData.starterCodePython || generatePythonStarterCode(problemData);

            // Restore per-problem language preference, defaulting to cpp
            const savedLang = (localStorage.getItem(`codeflow_lang_${problemData.id}`) as 'cpp' | 'python') || 'cpp';
            if (savedLang !== language) {
                setLanguage(savedLang);
            }
            
            const saved = localStorage.getItem(`codeflow_saved_code_${problemData.id}_${savedLang}`) || 
                          localStorage.getItem(`codeflow_saved_code_${problemData.id}`);
            
            setCode(saved || (savedLang === 'cpp' ? cppCode : pythonCode));
            
            setProblemDetails({
                ...problemData,
                starterCode: { cpp: cppCode, python: pythonCode }
            });
            if (!saved) setActiveTab('description');

            if (user) {
                fetchUserSolutionDrafts(problemData.id).then(dbDrafts => {
                    if (currentProblemIdRef.current === problemData.id && dbDrafts) {
                        for (const [lang, draftCode] of Object.entries(dbDrafts)) {
                            localStorage.setItem(`codeflow_saved_code_${problemData.id}_${lang}`, draftCode as string);
                        }
                        const rawActiveDraft2 = dbDrafts[savedLang] as string | undefined;
                        if (rawActiveDraft2) {
                            const starterForLang2 = savedLang === 'cpp'
                                ? (problemData.languages?.cpp?.starterCode || problemData.starterCode || '')
                                : (problemData.languages?.python?.starterCode || problemData.starterCodePython || '');
                            const sanitized2 = sanitizeDraftCode(
                                rawActiveDraft2,
                                savedLang,
                                starterForLang2,
                                `codeflow_saved_code_${problemData.id}_${savedLang}`
                            );
                            setCode(sanitized2);
                        }
                    }
                }).finally(() => {
                    isLoadingProblem.current = false;
                });
            } else {
                isLoadingProblem.current = false;
            }
        }
    }, [location, setCode, setLanguage, user]);

    // Sync editor code when language changes
    const prevLanguageRef = useRef(language);
    useEffect(() => {
        if (!problemDetails) return;
        if (isLoadingProblem.current) return;
        if (isHandlingLanguageChange.current) {
            prevLanguageRef.current = language;
            return;
        }
        
        const prevLang = prevLanguageRef.current;
        if (prevLang !== language) {
            localStorage.setItem(`codeflow_saved_code_${problemDetails.id}_${prevLang}`, code);
            prevLanguageRef.current = language;
            
            const saved = localStorage.getItem(`codeflow_saved_code_${problemDetails.id}_${language}`);
            const starterCode = language === 'cpp'
                ? problemDetails.starterCode.cpp
                : (problemDetails.starterCode.python || generatePythonStarterCode(problemDetails));
            setCode(saved || starterCode);
        }
    }, [language, problemDetails, setCode]);

    // Auto-save code on change (local & cloud)
    useEffect(() => {
        if (!problemDetails?.id || !code) return;
        
        // Save to localStorage immediately
        localStorage.setItem(`codeflow_saved_code_${problemDetails.id}_${language}`, code);
        
        // Save to cloud drafts debounced by 2 seconds
        if (user) {
            const delayDebounce = setTimeout(() => {
                saveUserSolutionDraft(problemDetails.id, language, code);
            }, 2000);
            return () => clearTimeout(delayDebounce);
        }
    }, [code, language, problemDetails, user]);

    // Keyboard shortcuts for fullscreen
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            if (e.key.toLowerCase() === 'f') {
                setIsCanvasFullscreen(true);
            } else if (e.key === 'Escape') {
                setIsCanvasFullscreen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Auto-popup auth modal in workspace if logged out
    useEffect(() => {
        if (!user) {
            setIsAuthOpen(true);
        }
    }, [user]);

    const speedMultiplier = (1050 - speed) / 500;
    const speedLabel = speedMultiplier.toFixed(1) + 'x';

    const renderPlaybackControls = () => {
        return (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[95%] max-w-[760px]">
                <div className="liquid-glass-card bg-surface/85 backdrop-blur-xl border border-border-subtle shadow-2xl rounded-2xl px-6 py-3 flex items-center justify-between gap-6 select-none">
                    {/* Left Section: Playback buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={prevStep}
                            disabled={!hasSteps || currentStepIndex <= 0}
                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface border border-border-subtle text-text-secondary hover:text-text-primary hover:border-primary disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                            title="Previous Step"
                        >
                            <SkipBack size={16} />
                        </button>
                        <button
                            onClick={togglePlay}
                            disabled={!hasSteps}
                            className={`group relative w-24 h-9 flex items-center justify-center gap-1.5 rounded-xl font-black text-[9px] tracking-widest transition-all disabled:opacity-20 disabled:cursor-not-allowed border overflow-hidden active:scale-95 ${
                                isPlaying
                                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 hover:bg-amber-500/20'
                                    : 'bg-primary/10 border-primary/40 text-primary hover:bg-primary/20'
                            }`}
                        >
                            {isPlaying ? <><Pause size={14} fill="currentColor" /> PAUSE</> : <><Play size={14} fill="currentColor" /> PLAY</>}
                        </button>
                        <button
                            onClick={nextStep}
                            disabled={!hasSteps || currentStepIndex >= stepsArray.length - 1}
                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface border border-border-subtle text-text-secondary hover:text-text-primary hover:border-primary disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                            title="Next Step"
                        >
                            <SkipForward size={16} />
                        </button>
                        <button
                            onClick={reset}
                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface border border-border-subtle text-text-secondary hover:text-accent-red hover:border-accent-red transition-all shadow-md active:scale-95"
                            title="Reset Visualization"
                        >
                            <RotateCcw size={16} />
                        </button>
                    </div>

                    {/* Center Section: YouTube Scrubber Step Progression */}
                    <div className="flex-1 flex items-center gap-4 min-w-0">
                        {hasSteps ? (
                            <div className="flex-1 flex flex-col gap-1 relative">
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Step Progression</span>
                                    <span className="text-[9px] font-black text-primary font-mono">{currentStepIndex + 1} / {stepsArray.length}</span>
                                </div>
                                <div 
                                    ref={scrubberRef}
                                    onMouseMove={handleScrubberMouseMove}
                                    onMouseLeave={handleScrubberMouseLeave}
                                    onClick={handleScrubberClick}
                                    className="relative h-2.5 rounded-full bg-border-subtle cursor-pointer group flex items-center"
                                >
                                    {/* Continuous gray tracker line */}
                                    <div className="absolute inset-x-0 h-1.5 rounded-full bg-white/10 group-hover:h-2 transition-all duration-200" />
                                    
                                    {/* Filled progress bar */}
                                    <div
                                        className="absolute left-0 h-1.5 group-hover:h-2 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-100 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                                        style={{ width: `${stepsArray.length > 1 ? (currentStepIndex / (stepsArray.length - 1)) * 100 : 0}%` }}
                                    />
                                    
                                    {/* Scrubber handle knob */}
                                    <div
                                        className="absolute w-3 h-3 rounded-full bg-white shadow-xl transition-all duration-100 border border-primary opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 z-20 pointer-events-none"
                                        style={{ 
                                            left: `${stepsArray.length > 1 ? (currentStepIndex / (stepsArray.length - 1)) * 100 : 0}%`, 
                                            transform: 'translate(-50%, -50%)',
                                            top: '50%'
                                        }}
                                    />

                                    {/* Hover Preview Tooltip Card */}
                                    <AnimatePresence>
                                        {scrubberHoverIndex !== null && stepsArray[scrubberHoverIndex] && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -5, scale: 0.95 }}
                                                animate={{ opacity: 1, y: -10, scale: 1 }}
                                                exit={{ opacity: 0, y: -5, scale: 0.95 }}
                                                className="absolute bottom-6 bg-surface/95 backdrop-blur-md border border-border-subtle rounded-xl p-3 shadow-2xl z-50 pointer-events-none max-w-[280px] w-64 text-left flex flex-col gap-1.5"
                                                style={{ 
                                                    left: `${scrubberHoverX}px`, 
                                                    transform: 'translateX(-50%)' 
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[9px] font-black text-primary font-mono uppercase">Step {scrubberHoverIndex + 1}</span>
                                                    <span className="text-[9px] font-bold text-text-muted font-mono">Line {(stepsArray[scrubberHoverIndex] as any).line}</span>
                                                </div>
                                                <div className="text-[10px] font-mono text-accent-cyan font-bold truncate">
                                                    {(stepsArray[scrubberHoverIndex] as any).lineContent || ''}
                                                </div>
                                                <div className="text-[10px] text-text-secondary leading-snug font-medium line-clamp-2">
                                                    {(stepsArray[scrubberHoverIndex] as any).teacherNote?.what || (stepsArray[scrubberHoverIndex] as any).explanation || 'Traversing...'}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col gap-1.5 opacity-30">
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Awaiting Trace</span>
                                </div>
                                <div className="h-1 rounded-full bg-border-subtle" />
                            </div>
                        )}
                    </div>

                    {/* Right Section: Speed Controls */}
                    <div className="flex items-center gap-4 shrink-0 border-l border-border-subtle pl-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between px-1">
                                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Speed</span>
                                <span className="text-[9px] font-black text-accent-cyan font-mono">{speedLabel}</span>
                            </div>
                            <div className="relative w-24">
                                <input
                                    type="range"
                                    min={50}
                                    max={1000}
                                    step={50}
                                    value={1050 - speed}
                                    onChange={e => setSpeed(1050 - Number(e.target.value))}
                                    className="w-full h-1 appearance-none bg-border-subtle rounded-full cursor-pointer
                                               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 
                                               [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full 
                                               [&::-webkit-slider-thumb]:bg-accent-cyan [&::-webkit-slider-thumb]:cursor-pointer
                                               [&::-webkit-slider-thumb]:shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (!user) {
        return (
            <div className="h-screen w-screen flex flex-col bg-transparent text-text-primary relative overflow-hidden font-sans">
                <DynamicBackground />
                
                {/* Slim Header */}
                <header className="flex-none h-14 bg-bg-header backdrop-blur-md border-b border-border-subtle flex items-center justify-between px-6 z-40 shrink-0">
                    <Link to="/" className="flex items-center gap-3 group shrink-0">
                        <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-all duration-300">
                            <Cpu size={20} className="text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-base leading-none tracking-tighter text-white">
                                Code<span className="text-primary">Flow</span>
                            </span>
                            <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted font-bold leading-none mt-0.5">Visualizer</span>
                        </div>
                    </Link>
                    
                    <button
                        onClick={() => setIsAuthOpen(true)}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary hover:text-white text-primary text-xs font-black tracking-wide transition-all active:scale-95 shadow-md shadow-primary/5 shrink-0"
                    >
                        <User size={14} />
                        <span>Sign In</span>
                    </button>
                </header>

                {/* Locked Workspace Content */}
                <div className="flex-1 flex items-center justify-center relative z-10 p-6">
                    <div className="absolute inset-0 bg-black/40 blur-[100px] pointer-events-none" />
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-md w-full liquid-glass-card border border-white/10 p-8 text-center space-y-6 shadow-2xl relative"
                    >
                        <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(123,116,209,0.2)]">
                            <Lock size={30} className="animate-pulse text-primary" />
                        </div>
                        
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black tracking-tight text-white">Workspace Locked</h2>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                The CodeFlow interactive workspace is encrypted and restricted to members. Please sign in or create an account to write, execute, and visualize C++ algorithms.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 pt-2">
                            <button
                                onClick={() => setIsAuthOpen(true)}
                                className="w-full py-3 bg-primary text-white text-sm font-black rounded-xl hover:shadow-lg hover:shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <User size={16} />
                                Sign In / Register
                            </button>
                            <Link 
                                to="/"
                                className="w-full py-3 bg-surface border border-border-subtle hover:border-text-muted text-text-secondary hover:text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center"
                            >
                                Return to Home
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <AuthModal
                    isOpen={isAuthOpen}
                    onClose={() => setIsAuthOpen(false)}
                />
            </div>
        );
    }

    return (
        <div className="h-screen w-screen flex flex-col bg-transparent overflow-hidden font-sans text-text-primary">

            {/* ── PREMIUM HEADER ─────────────────────────────────────────── */}
            <header className="flex-none h-14 bg-bg-header backdrop-blur-md border-b border-border-subtle flex items-center justify-between px-6 z-40 shrink-0">
                <div className="flex items-center gap-6">
                    <Link to="/" className="flex items-center gap-3 group shrink-0">
                        <motion.div 
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg shadow-primary/20 transition-all duration-300"
                        >
                            <Cpu size={20} className="text-white" />
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="font-bold text-base leading-none tracking-tighter text-white">
                                Code<span className="text-primary">Flow</span>
                            </span>
                            <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted font-bold leading-none mt-0.5">Visualizer</span>
                        </div>
                    </Link>

                    <div className="h-6 w-px bg-border-subtle" />

                    {/* Language Selector Dropdown */}
                    <div className="relative" ref={langDropdownRef}>
                        <button 
                            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border-subtle hover:border-primary transition-all text-[11px] font-bold text-text-secondary hover:text-text-primary group cursor-pointer"
                        >
                            <Layers size={14} className="text-primary group-hover:scale-110 transition-transform" />
                            {language === 'cpp' ? '🚀 C++' : '🐍 Python'}
                            <ChevronDown size={14} className={`transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {langDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                    className="absolute left-0 mt-2 w-56 bg-surface/95 backdrop-blur-2xl border border-white/10 rounded-xl p-1.5 shadow-2xl z-[60]"
                                >
                                    <div className="px-3 py-1.5 text-[8px] font-black text-text-muted uppercase tracking-wider">
                                        Language Support
                                    </div>
                                    {[
                                        { id: 'cpp', name: '🚀 C++', active: true },
                                        { id: 'python', name: '🐍 Python', active: true },
                                        { id: 'java', name: 'Coming Soon: ☕ Java', active: false },
                                        { id: 'javascript', name: 'Coming Soon: ⚡ JS', active: false },
                                        { id: 'typescript', name: 'Coming Soon: 🟦 TS', active: false },
                                        { id: 'go', name: 'Coming Soon: 🐹 Go', active: false },
                                        { id: 'rust', name: 'Coming Soon: 🦀 Rust', active: false },
                                        { id: 'csharp', name: 'Coming Soon: 💜 C#', active: false },
                                        { id: 'kotlin', name: 'Coming Soon: 🎯 Kotlin', active: false }
                                    ].map((lang) => (
                                        <button
                                            key={lang.id}
                                            disabled={!lang.active}
                                            onClick={() => {
                                                if (lang.active) {
                                                    handleLanguageChange(lang.id as any);
                                                }
                                                setLangDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-all flex items-center justify-between ${
                                                !lang.active ? 'opacity-40 cursor-not-allowed text-text-muted' : 'hover:bg-white/5 cursor-pointer'
                                            } ${
                                                lang.id === language ? 'text-primary font-bold bg-primary/10' : 'text-text-secondary hover:text-white'
                                            }`}
                                        >
                                            <span>{lang.name}</span>
                                            {lang.id === language && <CheckCircle size={12} className="text-primary" />}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Complexity Hover Tooltip Trigger */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setIsComplexityHovered(true)}
                        onMouseLeave={() => setIsComplexityHovered(false)}
                    >
                        <button 
                            onClick={() => setComplexityOpen(true)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 hover:border-primary/50 transition-all text-[11px] font-black text-primary hover:text-text-primary group"
                        >
                            <Zap size={14} className="group-hover:animate-pulse" />
                            COMPLEXITY
                        </button>
                        
                        <AnimatePresence>
                            {isComplexityHovered && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                    className="absolute left-0 mt-2 w-72 bg-surface/95 backdrop-blur-2xl border border-white/10 rounded-xl p-4 shadow-2xl z-[60]"
                                >
                                    <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2">
                                        <Zap size={14} className="text-primary animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-wider text-white">Complexity Preview</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-[8px] font-black text-text-muted uppercase tracking-wider block">Time Complexity</span>
                                            <span className="font-mono text-xs font-black text-accent-cyan">
                                                {analysis?.timeComplexity || complexityMap[problemDetails?.id || '']?.time || 'O(N) (Estimated)'}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-[8px] font-black text-text-muted uppercase tracking-wider block">Space Complexity</span>
                                            <span className="font-mono text-xs font-black text-accent-purple">
                                                {analysis?.spaceComplexity || complexityMap[problemDetails?.id || '']?.space || 'O(1) (Estimated)'}
                                            </span>
                                        </div>
                                        {problemDetails && (
                                            <div className="pt-2 border-t border-white/5 flex justify-between text-[9px] font-bold text-text-muted">
                                                <span>Pattern:</span>
                                                <span className="text-text-secondary">{problemDetails.category || 'General DSA'}</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsGithubImportOpen(true)}
                            className="p-2.5 text-text-muted hover:text-text-primary bg-surface border border-border-subtle hover:border-border-active rounded-xl transition-all"
                            title="Import from GitHub"
                        >
                            <Github size={20} />
                        </button>
                        <button
                            onClick={() => setIsSaveOpen(true)}
                            className="p-2.5 text-primary hover:text-white bg-primary/10 border border-primary/30 hover:border-primary rounded-xl transition-all shadow-lg shadow-primary/5"
                            title="Save Visualization"
                        >
                            <Save size={20} />
                        </button>
                    </div>

                    {/* Profile Dropdown Section */}
                    {user ? (
                        <div className="relative shrink-0 flex items-center" ref={dropdownRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 p-1 pr-1 sm:pr-2 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10 group cursor-pointer"
                            >
                                <div className="relative">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-white/10 object-cover" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-black text-white">
                                            {(user.displayName || user.email || 'U')[0].toUpperCase()}
                                        </div>
                                    )}
                                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-bg-main rounded-full" />
                                </div>
                                <ChevronDown size={12} className={`text-text-muted group-hover:text-white transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-14 w-64 bg-surface/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl z-[60] top-0"
                                    >
                                        {/* User Info */}
                                        <div className="px-4 py-3 mb-1 text-left border-b border-white/5">
                                            <div className="flex items-center gap-3">
                                                {user.photoURL ? (
                                                    <img src={user.photoURL} alt="Avatar" className="w-9 h-9 rounded-xl object-cover border border-white/10" />
                                                ) : (
                                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-xs">
                                                        {(user.displayName || user.email || 'U')[0].toUpperCase()}
                                                    </div>
                                                )}
                                                <div className="min-w-0 text-left">
                                                    <div className="flex items-center gap-1.5">
                                                        <p className="text-white font-bold text-sm truncate">{user.displayName || 'User'}</p>
                                                        <Link to="/profile-settings" onClick={() => setIsProfileOpen(false)} className="text-text-muted hover:text-primary transition-colors shrink-0" title="Edit Profile">
                                                            <Edit3 size={13} />
                                                        </Link>
                                                    </div>
                                                    <p className="text-text-muted text-xs truncate">{user.email}</p>
                                                </div>
                                            </div>
                                            
                                            {/* Premium Streak Widget */}
                                            <div className="mt-3 flex items-center gap-2.5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl px-3 py-1.5">
                                                <span className="text-base select-none">🔥</span>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-amber-400 leading-none">{streak} DAY STREAK</span>
                                                    <span className="text-[8px] text-text-muted leading-none mt-0.5">Keep practicing to level up</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-1 space-y-0.5 text-left">
                                            <DropdownItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" description="Your visualizations & stats" onClick={() => setIsProfileOpen(false)} />
                                            <DropdownItem to="/dashboard" icon={BookOpen} label="Saved Visualizations" onClick={() => setIsProfileOpen(false)} />
                                            <DropdownItem to="/sheet" icon={Star} label="Learning Progress" description="Track DSA topics" onClick={() => setIsProfileOpen(false)} />
                                            <DropdownItem to="/blog" icon={Newspaper} label="Blog" description="Insights & interview experiences" onClick={() => setIsProfileOpen(false)} />
                                            <DropdownItem to="/algorithm" icon={Brain} label="Algorithm Guide" description="Master core patterns" onClick={() => setIsProfileOpen(false)} />
                                        </div>

                                        <div className="border-t border-white/5 mt-1 pt-1 space-y-0.5 text-left">
                                            <DropdownItem to="/docs" icon={FileText} label="Documentation" onClick={() => setIsProfileOpen(false)} />
                                            <DropdownItem to="/contact" icon={Bookmark} label="Feedback & Suggestions" onClick={() => setIsProfileOpen(false)} />
                                            <DropdownItem to="/profile-settings" icon={Settings} label="Settings" description="Theme & preferences" onClick={() => setIsProfileOpen(false)} />
                                        </div>

                                        <div className="border-t border-white/5 mt-1 pt-1 text-left">
                                            <DropdownItem
                                                icon={LogOut}
                                                label="Sign Out"
                                                danger
                                                onClick={async () => {
                                                    setIsProfileOpen(false);
                                                    await logout();
                                                }}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsAuthOpen(true)}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary hover:text-white text-primary text-xs font-black tracking-wide transition-all active:scale-95 shadow-md shadow-primary/5 shrink-0"
                        >
                            <User size={14} />
                            <span>Sign In</span>
                        </button>
                    )}
                </div>
            </header>

            {/* ── MAIN WORKSPACE ─────────────────────────────────────────── */}
            <div className="flex flex-1 overflow-hidden min-h-0 relative">
                
                {/* ── LEFT PANEL: Tabs + Content ─────────────────────────── */}
                <div 
                    className={`flex flex-col shrink-0 bg-bg-panel/75 backdrop-blur-xl border-r border-border-subtle relative ${
                        leftPanelOpen ? '' : 'overflow-hidden opacity-0'
                    } ${isDraggingLeft ? '' : 'transition-[width] duration-300'}`}
                    style={{ width: leftPanelOpen ? `${leftPanelWidth}px` : '0px' }}
                >
                    {leftPanelOpen && (
                        <div 
                            onMouseDown={startResizeLeft}
                            className="absolute top-0 bottom-0 -right-0.5 w-1.5 cursor-ew-resize hover:bg-primary/50 transition-colors z-40 flex items-center justify-center group"
                        >
                            <div className="w-0.5 h-16 bg-border-subtle group-hover:bg-primary rounded-full" />
                        </div>
                    )}
                    {/* Tabs */}
                    <div className="flex items-center p-1.5 bg-surface border-b border-border-subtle gap-1.5">
                        {/* Three line component which opens DSA sheet */}
                        <button 
                            onClick={() => setDsaDrawerOpen(true)}
                            className="p-2 rounded-lg bg-surface border border-border-subtle text-text-muted hover:text-text-primary hover:bg-border-subtle/10 transition-all active:scale-95 shrink-0 flex items-center justify-center"
                            title="Open DSA Sheet"
                        >
                            <Menu size={14} />
                        </button>
                        
                        <button 
                            onClick={() => setActiveTab('description')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                                activeTab === 'description' 
                                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                : 'text-text-muted hover:text-text-primary hover:bg-border-subtle/10'
                            }`}
                        >
                            <BookOpen size={14} />
                            Description
                        </button>
                        <button 
                            onClick={() => setActiveTab('editor')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                                activeTab === 'editor' 
                                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                : 'text-text-muted hover:text-text-primary hover:bg-border-subtle/10'
                            }`}
                        >
                            <Code2 size={14} />
                            Editor
                        </button>
                    </div>

                    <div className="flex-1 relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            {activeTab === 'description' && (
                                <motion.div 
                                    key="desc"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="h-full"
                                >
                                    <ProblemDescription problem={problemDetails} />
                                </motion.div>
                            )}
                            {activeTab === 'editor' && (
                                <motion.div 
                                    key="editor"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="h-full flex flex-col relative"
                                >
                                    <div className="flex items-center justify-between px-6 py-3 border-b border-border-subtle shrink-0 bg-surface/10">
                                        <div className="flex items-center gap-2.5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em] flex-wrap">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            <span> {problemDetails ? problemDetails.title : 'Playground (Untitled)'}</span>
                                            {problemDetails && (
                                                <span className={`px-1.5 py-0.5 rounded-[4px] text-[9px] font-black uppercase tracking-tighter normal-case shrink-0 ${
                                                    problemDetails.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                    problemDetails.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                    'bg-red-500/10 text-red-400 border border-red-500/20'
                                                }`}>
                                                    {problemDetails.difficulty}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {/* Segmented language switcher */}
                                            <div className="flex items-center bg-slate-950/40 border border-white/5 rounded-lg p-0.5 text-[9px] font-black tracking-widest uppercase">
                                                                <button
                                                    onClick={() => handleLanguageChange('cpp')}
                                                    className={`px-3 py-1 rounded-md transition-all duration-200 cursor-pointer ${
                                                        language === 'cpp'
                                                            ? 'bg-primary/25 border border-primary/20 text-primary shadow-glow'
                                                            : 'text-text-muted hover:text-white'
                                                    }`}
                                                >
                                                    C++
                                                </button>
                                                <button
                                                    onClick={() => handleLanguageChange('python')}
                                                    className={`px-3 py-1 rounded-md transition-all duration-200 cursor-pointer ${
                                                        language === 'python'
                                                            ? 'bg-accent-cyan/25 border border-accent-cyan/20 text-accent-cyan shadow-glow'
                                                            : 'text-text-muted hover:text-white'
                                                    }`}
                                                >
                                                    Python
                                                </button>
                                            </div>

                                            <button
                                                onClick={requestTrace}
                                                className="group relative flex items-center gap-2 px-4 py-1.5 rounded-lg bg-secondary/10 border border-secondary/30 text-secondary hover:text-text-primary hover:border-secondary transition-all text-[10px] font-black overflow-hidden cursor-pointer"
                                            >
                                                <div className="absolute inset-0 bg-secondary/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                                                <Sparkles size={12} className="relative z-10" />
                                                <span className="relative z-10">GENERATE TRACE</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex-1 relative">
                                        <CodeEditor />
                                        <AnimatePresence>
                                            {error && (
                                                <motion.div 
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-md z-20 flex items-center gap-3"
                                                >
                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                                    <span className="text-[11px] font-bold text-red-400 leading-tight">{error}</span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <SlidingConsole 
                                        isOpen={consoleOpen} 
                                        onToggle={() => setConsoleOpen(!consoleOpen)} 
                                        onRun={executeRealCode}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* ── PANEL TOGGLE ─────────────────────────────────────── */}
                <button
                    onClick={() => setLeftPanelOpen(v => !v)}
                    className="flex-none self-stretch w-4 bg-surface/10 border-r border-border-subtle hover:bg-surface/20 flex items-center justify-center text-text-muted hover:text-primary transition-all group z-30"
                    title={leftPanelOpen ? 'Collapse Panel' : 'Expand Panel'}
                >
                    <div className="w-px h-12 bg-border-subtle group-hover:bg-primary transition-colors" />
                    <div className="absolute flex flex-col gap-1 items-center">
                        {leftPanelOpen ? <ChevronLeft size={10} /> : <ChevronRight size={10} />}
                    </div>
                </button>

                {/* ── RIGHT PANEL: Visualizer ─────────────────────────────── */}
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-transparent relative">
                    
                    <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

                    <div className="flex items-center justify-between px-8 py-3 border-b border-border-subtle bg-surface/30 shrink-0 z-10">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <MousePointer2 size={14} className="text-text-muted" />
                                <span className="font-black text-text-muted uppercase tracking-[0.2em] text-[10px]">Canvas Visualizer</span>
                            </div>
                            
                            {hasSteps && currentTraceStep && (
                                <>
                                    <div className="h-4 w-px bg-border-subtle" />
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary font-black font-mono text-[11px] tracking-tight">
                                            {currentStepIndex + 1} <span className="text-text-muted font-medium mx-1">/</span> {stepsArray.length}
                                        </span>
                                        {currentPattern && (
                                            <span className="px-2 py-0.5 rounded-[4px] text-[9px] font-black uppercase tracking-tighter border border-border-subtle"
                                                style={{ color: currentPattern.color, borderColor: currentPattern.color + '44', backgroundColor: currentPattern.color + '15' }}>
                                                {currentPattern.name}
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setIsCanvasFullscreen(true)}
                                className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-border-subtle/10 transition-all group"
                                title="Fullscreen (F)"
                            >
                                <Maximize2 size={16} className="group-hover:scale-110 transition-transform" />
                            </button>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border-subtle text-[10px] font-bold text-text-muted">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                LIVE SYNC
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 min-h-0 overflow-hidden relative z-0 bg-transparent">
                        <WhiteboardPanel />
                        {renderPlaybackControls()}
                    </div>

                    <motion.div 
                        animate={{ height: logicPanelOpen ? bottomPanelHeight : 44 }}
                        transition={isDraggingBottom ? { duration: 0 } : undefined}
                        className="border-t border-border-subtle shrink-0 flex flex-col bg-bg-panel/75 backdrop-blur-xl z-20 overflow-hidden relative"
                    >
                        {logicPanelOpen && (
                            <div 
                                onMouseDown={startResizeBottom}
                                className="absolute top-0 left-0 right-0 h-1.5 cursor-ns-resize hover:bg-primary/50 transition-colors z-30 flex items-center justify-center group"
                            >
                                <div className="w-16 h-0.5 bg-border-subtle group-hover:bg-primary rounded-full" />
                            </div>
                        )}

                        <div
                            className="flex items-center justify-between px-8 cursor-pointer h-11 shrink-0 hover:bg-border-subtle/20 transition-colors select-none pt-1"
                            onClick={() => setLogicPanelOpen(v => !v)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-accent-cyan animate-ping opacity-50" />
                                </div>
                                <span className="text-[10px] font-black text-accent-cyan uppercase tracking-[0.2em]">Execution Trace Logic</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[9px] font-black px-2 py-0.5 bg-surface text-text-secondary rounded border border-border-subtle tracking-widest uppercase">
                                    {logicPanelOpen ? 'Collapse' : 'Expand Details'}
                                </span>
                                {logicPanelOpen ? <ChevronDown size={16} className="text-text-muted"/> : <ChevronUp size={16} className="text-text-muted"/>}
                            </div>
                        </div>

                        <AnimatePresence>
                            {logicPanelOpen && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 pt-2"
                                >
                                    {hasSteps && currentTraceStep ? (() => {
                                        const currentStep = currentTraceStep as any;
                                        const stepInfo = getStepCategory(currentStep);
                                        const isDP = problemDetails?.category?.toLowerCase().includes('dynamic programming') || 
                                                     problemDetails?.topicTags?.some(t => t.toLowerCase().includes('dynamic programming')) ||
                                                     (currentStep.variables && ('dp' in currentStep.variables || 'memo' in currentStep.variables));
                                        const isRecursion = problemDetails?.category?.toLowerCase().includes('backtracking') || 
                                                            problemDetails?.category?.toLowerCase().includes('recursion') ||
                                                            currentStep.visuals?.type === 'call_stack';
                                        
                                        return (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-stretch pb-4">
                                                {/* Left card: What's Happening */}
                                                <div className={`p-4 rounded-xl border ${stepInfo.borderClass} ${stepInfo.bgClass} flex flex-col gap-2`}>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-1.5 h-3 rounded-full" style={{ backgroundColor: stepInfo.iconColor }} />
                                                            <span className="text-[9px] font-black uppercase tracking-widest text-text-primary">What's Happening</span>
                                                        </div>
                                                        <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/5 border border-white/10 ${stepInfo.colorClass}`}>
                                                            {stepInfo.category}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs font-bold text-text-primary leading-relaxed font-mono whitespace-pre-wrap flex-1">
                                                        {currentStep.teacherNote?.what || currentStep.explanation || ''}
                                                    </p>
                                                </div>

                                                {/* Middle card: Why it matters */}
                                                <div className="p-4 rounded-xl border border-border-subtle bg-surface/20 flex flex-col gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-1.5 h-3 rounded-full bg-secondary" />
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-text-primary">Step Detail</span>
                                                    </div>
                                                    <p className="text-xs font-medium text-text-secondary leading-relaxed font-mono flex-1">
                                                        {currentStep.teacherNote?.why || 'Analyzing algorithm execution path.'}
                                                    </p>
                                                    {currentStep.teacherNote?.next && (
                                                        <div className="pt-2 border-t border-border-subtle/50 text-[10px] text-text-muted font-medium">
                                                            <span className="font-black text-text-secondary text-[8px] uppercase tracking-wider block mb-0.5">Next Action</span>
                                                            {currentStep.teacherNote.next}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Right card: Variables Status OR DP/Recursion float */}
                                                {isDP || isRecursion ? (
                                                    <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex flex-col gap-2 relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 blur-xl rounded-full" />
                                                        <div className="flex items-center justify-between z-10">
                                                            <div className="flex items-center gap-2">
                                                                <Trophy size={14} className="text-primary animate-pulse" />
                                                                <span className="text-[9px] font-black uppercase tracking-widest text-text-primary">
                                                                    {isDP ? 'DP Cache / Table State' : 'Recursion Call Depth'}
                                                                </span>
                                                            </div>
                                                            <span className="text-[8px] font-black uppercase tracking-widest bg-primary/20 text-primary px-1.5 py-0.5 rounded">
                                                                {isDP ? 'MEMOIZED' : 'STACK'}
                                                            </span>
                                                        </div>
                                                        
                                                        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pt-1 z-10">
                                                            {isDP ? (
                                                                <div className="space-y-2">
                                                                    <div className="text-[10px] text-text-secondary font-medium leading-relaxed">
                                                                        Memoization cache stores intermediate answers to avoid recalculations.
                                                                    </div>
                                                                    {/* Render variables representing memoized table */}
                                                                    {(() => {
                                                                        const dpVar = currentStep.variables?.dp || currentStep.variables?.memo || currentStep.variables?.memoMap || null;
                                                                        if (dpVar && typeof dpVar === 'object') {
                                                                            if (Array.isArray(dpVar)) {
                                                                                return (
                                                                                    <div className="flex flex-wrap gap-1 mt-1 font-mono text-[9px]">
                                                                                        {dpVar.map((val: any, idx: number) => {
                                                                                            const isSolved = val !== -1 && val !== null && val !== undefined;
                                                                                            return (
                                                                                                <div 
                                                                                                    key={idx} 
                                                                                                    className={`px-2 py-1 rounded border text-center transition-all ${
                                                                                                        isSolved 
                                                                                                        ? 'bg-accent-green/10 border-accent-green/30 text-accent-green font-bold' 
                                                                                                        : 'bg-surface border-border-subtle text-text-muted'
                                                                                                    }`}
                                                                                                >
                                                                                                    dp[{idx}] = {val === -1 || val === null ? '∞' : val}
                                                                                                </div>
                                                                                            );
                                                                                        })}
                                                                                    </div>
                                                                                );
                                                                            } else {
                                                                                return (
                                                                                    <div className="grid grid-cols-2 gap-1 mt-1 font-mono text-[9px]">
                                                                                        {Object.entries(dpVar).map(([key, val]) => (
                                                                                            <div key={key} className="px-2 py-1 rounded border bg-accent-green/5 border-accent-green/20 text-text-primary flex justify-between">
                                                                                                <span className="text-text-muted">{key}:</span>
                                                                                                <span className="text-accent-green font-bold">{String(val)}</span>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        }
                                                                        
                                                                        // Fallback, scan standard variables
                                                                        return (
                                                                            <div className="text-[9px] font-mono p-2 bg-surface rounded border border-border-subtle space-y-1">
                                                                                {Object.entries(currentStep.variables || {})
                                                                                    .filter(([k]) => !k.startsWith('__'))
                                                                                    .slice(0, 4)
                                                                                    .map(([k, v]) => (
                                                                                        <div key={k} className="flex justify-between">
                                                                                            <span className="text-text-muted">{k}:</span>
                                                                                            <span className="text-primary font-bold">{JSON.stringify(v)}</span>
                                                                                        </div>
                                                                                    ))}
                                                                            </div>
                                                                        );
                                                                    })()}
                                                                </div>
                                                            ) : (
                                                                <div className="space-y-2">
                                                                    {currentStep.visuals?.type === 'call_stack' ? (
                                                                        <div className="flex flex-col gap-1 font-mono text-[9px] max-h-[100px] overflow-y-auto pr-1">
                                                                            {currentStep.visuals.frames.map((frame: any, idx: number) => {
                                                                                const isActive = idx === currentStep.visuals.activeFrame;
                                                                                return (
                                                                                    <div 
                                                                                        key={idx} 
                                                                                        className={`p-1.5 rounded border transition-all ${
                                                                                            isActive 
                                                                                            ? 'bg-accent-purple/10 border-accent-purple/30 text-accent-purple font-bold' 
                                                                                            : 'bg-surface border-border-subtle text-text-muted'
                                                                                        }`}
                                                                                    >
                                                                                        {frame.functionName}({Object.entries(frame.args || {}).map(([k, v]) => `${k}=${v}`).join(', ')})
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    ) : (
                                                                        <div className="text-[10px] text-text-secondary leading-relaxed font-medium">
                                                                            Active recursion calls trace frames. Call Stack depth is: <span className="font-mono text-primary font-black">{currentStep.variables?.depth || 1}</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="p-4 rounded-xl border border-border-subtle bg-surface/20 flex flex-col gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-1.5 h-3 rounded-full bg-accent-cyan" />
                                                            <span className="text-[9px] font-black uppercase tracking-widest text-text-primary">Variables Status</span>
                                                        </div>
                                                        <div className="flex-1 overflow-y-auto custom-scrollbar font-mono text-[10px] space-y-1">
                                                            {Object.entries(currentStep.variables || {})
                                                                .filter(([key]) => !key.startsWith('__'))
                                                                .map(([key, val]) => (
                                                                    <div key={key} className="flex justify-between py-0.5 border-b border-border-subtle/30 last:border-0">
                                                                        <span className="text-text-muted">{key}</span>
                                                                        <span className="text-text-primary font-bold">{JSON.stringify(val)}</span>
                                                                    </div>
                                                                ))
                                                            }
                                                            {Object.keys(currentStep.variables || {}).length === 0 && (
                                                                <div className="text-[10px] text-text-muted italic py-2 text-center">No active local variables</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })() : (
                                        <div className="flex flex-col items-center justify-center py-4 space-y-3 opacity-50 h-full">
                                            <Terminal size={24} className="text-text-muted" />
                                            <p className="text-[11px] font-black text-text-muted uppercase tracking-widest">
                                                Awaiting execution trace...
                                            </p>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            {/* ── FULLSCREEN CANVAS OVERLAY ────────────────────────────── */}
            <AnimatePresence>
                {isCanvasFullscreen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-bg-main"
                    >
                        {/* Canvas fills background */}
                        <div className="w-full h-full relative z-0">
                            <WhiteboardPanel />
                            {renderPlaybackControls()}
                        </div>

                        {/* Controls on top with very high z-index */}
                        <div className="absolute top-6 right-6 z-[300] flex items-center gap-3">
                            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] bg-bg-panel/90 px-4 py-2 rounded-xl border border-border-subtle backdrop-blur-xl shadow-2xl">
                                Fullscreen Mode (Esc to Exit)
                            </span>
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setIsCanvasFullscreen(false);
                                }}
                                className="p-4 text-white bg-primary hover:bg-primary/90 border border-primary/20 rounded-2xl transition-all shadow-2xl shadow-primary/40 cursor-pointer active:scale-95 z-[310]"
                                title="Exit Fullscreen (Esc)"
                            >
                                <Minimize2 size={28} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Dialogs */}
            <FixPermissionDialog />
            <FeedbackModal
                isOpen={isFeedbackOpen}
                onClose={() => setIsFeedbackOpen(false)}
                topicViewed={problemDetails?.title || 'Algorithm Workspace'}
            />
            <ComplexityInfo 
                isOpen={complexityOpen} 
                onClose={() => setComplexityOpen(false)} 
            />
            <ImportProblemDialog
                isOpen={isImportOpen}
                onClose={() => setIsImportOpen(false)}
                onImportSuccess={(data) => setProblemDetails(data)}
            />
            <SaveVisualizationDialog
                isOpen={isSaveOpen}
                onClose={() => setIsSaveOpen(false)}
                loadedVis={loadedVis}
                onSaveSuccess={(updatedVis) => {
                    setLoadedVis(updatedVis);
                    if (updatedVis && updatedVis._id) {
                        const params = new URLSearchParams(window.location.search);
                        if (params.get('vid') !== updatedVis._id) {
                            window.history.replaceState(null, '', `${window.location.pathname}?vid=${updatedVis._id}`);
                        }
                    }
                }}
            />
            <GitHubImportDialog
                isOpen={isGithubImportOpen}
                onClose={() => setIsGithubImportOpen(false)}
            />
            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
            />

            {/* Sliding Drawer for DSA Sheet */}
            <AnimatePresence>
                {dsaDrawerOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDsaDrawerOpen(false)}
                            className="fixed inset-0 bg-black/60 z-[150] backdrop-blur-sm"
                        />
                        
                        {/* Sliding Panel */}
                        <motion.div 
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-[440px] max-w-[90%] bg-bg-panel/95 backdrop-blur-2xl border-r border-border-subtle z-[160] flex flex-col shadow-2xl overflow-hidden text-text-primary"
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle shrink-0">
                                <div className="flex items-center gap-2">
                                    <Trophy size={18} className="text-primary animate-pulse" />
                                    <span className="font-black text-sm uppercase tracking-wider text-text-primary">DSA Sheet Explorer</span>
                                </div>
                                <button 
                                    onClick={() => setDsaDrawerOpen(false)}
                                    className="p-2 rounded-lg hover:bg-surface border border-transparent hover:border-border-subtle text-text-muted hover:text-text-primary transition-all active:scale-95 flex items-center justify-center"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                            </div>
                            
                            {/* Drawer Content */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                                <CuratedSheetDrawerContent onSelectProblem={(problem) => {
                                    loadProblem(problem);
                                    setDsaDrawerOpen(false);
                                }} />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Global Search Command Center Modal (Ctrl+K) */}
            <AnimatePresence>
                {searchOpen && (
                    <div 
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setSearchOpen(false);
                            }
                        }}
                        className="fixed inset-0 z-[190] bg-black/60 backdrop-blur-md flex items-start justify-center pt-24"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="relative w-full max-w-2xl bg-surface/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col max-h-[500px]"
                        >
                            {/* Search bar */}
                            <div className="relative flex items-center gap-3 px-3 py-2 bg-white/5 border border-white/10 rounded-xl mb-4 group focus-within:border-primary/50 transition-colors">
                                <Search size={18} className="text-text-muted group-focus-within:text-primary transition-colors" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Search problems, commands, or toggle themes... (Ctrl+K)"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setSelectedIndex(0);
                                    }}
                                    className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none border-none focus:ring-0"
                                />
                                <span className="text-[10px] font-black text-text-muted bg-white/5 border border-white/10 px-2 py-0.5 rounded tracking-widest uppercase shrink-0">
                                    ESC
                                </span>
                            </div>

                            {/* Filtered list with grouping */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-1">
                                {(() => {
                                    const categories = ['Actions', 'View', 'Themes', 'Problems'];
                                    
                                    const renderedCategories = categories.map(cat => {
                                        const itemsInCat = filteredCommandItems.filter(item => item.category === cat);
                                        if (itemsInCat.length === 0) return null;
                                        
                                        return (
                                            <div key={cat} className="space-y-1">
                                                <div className="px-3 text-[9px] font-black text-text-muted uppercase tracking-widest">
                                                    {cat}
                                                </div>
                                                <div className="space-y-0.5">
                                                    {itemsInCat.map(item => {
                                                        const currentFlatIdx = filteredCommandItems.findIndex(i => i.id === item.id);
                                                        const isSelected = currentFlatIdx === selectedIndex;
                                                        
                                                        return (
                                                            <div
                                                                key={item.id}
                                                                onClick={() => item.action()}
                                                                className={`px-3 py-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                                                                    isSelected 
                                                                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                                                    : 'hover:bg-white/5 text-text-secondary hover:text-text-primary'
                                                                }`}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    {item.type === 'command' ? (
                                                                        <Cpu size={14} className={isSelected ? 'text-white' : 'text-primary'} />
                                                                    ) : (
                                                                        <BookOpen size={14} className={isSelected ? 'text-white' : 'text-secondary'} />
                                                                    )}
                                                                    <div className="text-left">
                                                                        <p className="text-xs font-bold leading-none">{item.title}</p>
                                                                        <p className={`text-[10px] mt-0.5 leading-none ${isSelected ? 'text-white/70' : 'text-text-muted'}`}>
                                                                            {item.description}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                {item.shortcut && (
                                                                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                                                                        isSelected 
                                                                        ? 'bg-white/20 border-white/20 text-white' 
                                                                        : 'bg-white/5 border-white/10 text-text-muted'
                                                                    }`}>
                                                                        {item.shortcut}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    });

                                    if (filteredCommandItems.length === 0) {
                                        return (
                                            <div className="text-center py-8 text-xs text-text-muted">
                                                No commands or problems match your search.
                                            </div>
                                        );
                                    }

                                    return renderedCategories;
                                })()}
                            </div>
                            
                            {/* Command footer */}
                            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-text-muted font-bold px-1 uppercase tracking-wider">
                                <div className="flex items-center gap-2">
                                    <span>↑↓ Nav</span>
                                    <span>•</span>
                                    <span>⏎ Select</span>
                                </div>
                                <span>{filteredCommandItems.length} results</span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Transparent drag shield to capture mouse events smoothly during resizing */}
            {(isDraggingLeft || isDraggingBottom) && (
                <div 
                    className="fixed inset-0 z-[9999] bg-transparent select-none pointer-events-auto" 
                    style={{ cursor: isDraggingLeft ? 'ew-resize' : 'ns-resize' }} 
                />
            )}
        </div>
    );
}

function CuratedSheetDrawerContent({ onSelectProblem }: { onSelectProblem: (p: any) => void }) {
    const { user } = useAuthStore();
    const { completed, toggleCompletion } = useProgressStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
    
    // Stable list of unique categories
    const categories = useMemo(() => {
        return Array.from(new Set((problemsList || []).map(p => p.category || 'Uncategorized')));
    }, []);

    const [selectedCategory, setSelectedCategory] = useState<string>(categories[0] || '');

    const categoriesStats = useMemo(() => {
        const stats: Record<string, { total: number; completedCount: number; percent: number }> = {};
        
        (problemsList || []).forEach(problem => {
            const cat = problem.category || 'Uncategorized';
            if (!stats[cat]) {
                stats[cat] = { total: 0, completedCount: 0, percent: 0 };
            }
            stats[cat].total += 1;
            if (completed[problem.id]) {
                stats[cat].completedCount += 1;
            }
        });

        Object.keys(stats).forEach(cat => {
            const s = stats[cat];
            s.percent = s.total > 0 ? Math.round((s.completedCount / s.total) * 100) : 0;
        });

        return stats;
    }, [completed]);

    const filteredProblems = useMemo(() => {
        const catProblems = (problemsList || []).filter(p => (p.category || 'Uncategorized') === selectedCategory);
        return catProblems.filter(problem => {
            const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = activeFilter === 'All' || problem.difficulty === activeFilter;
            return matchesSearch && matchesFilter;
        });
    }, [selectedCategory, searchQuery, activeFilter]);

    return (
        <div className="space-y-6">
            {/* Category selection dropdown */}
            <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-wider block">Category</label>
                <div className="relative">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full bg-surface border border-border-subtle rounded-xl py-3 px-4 text-sm text-text-primary focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer appearance-none"
                    >
                        {categories.map(cat => {
                            const stats = categoriesStats[cat] || { total: 0, completedCount: 0, percent: 0 };
                            return (
                                <option key={cat} value={cat} className="bg-bg-panel text-text-primary">
                                    {cat} ({stats.completedCount}/{stats.total} completed)
                                </option>
                            );
                        })}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                        <ChevronDown size={16} />
                    </div>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="space-y-3">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={16} />
                    <input 
                        type="text"
                        placeholder="Search problems..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-surface border border-border-subtle rounded-xl py-2.5 pl-10 pr-4 text-xs text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                </div>
                
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {(['All', 'Easy', 'Medium', 'Hard'] as const).map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-3 py-1.5 rounded-lg font-bold text-[10px] transition-all shrink-0 ${
                                activeFilter === filter 
                                ? 'bg-primary text-white border border-primary' 
                                : 'bg-surface text-text-secondary hover:text-text-primary hover:bg-border-subtle/20 border border-border-subtle'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Problems List */}
            <div className="space-y-2.5">
                {filteredProblems.map((problem) => (
                    <div 
                        key={problem.id} 
                        onClick={() => onSelectProblem(problem)}
                        className="group liquid-glass-card hover:border-primary/50 transition-all duration-300 relative overflow-hidden border border-border-subtle p-4 flex flex-col justify-between h-32 cursor-pointer bg-surface/20"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2.5 min-w-0">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleCompletion(problem.id, user);
                                    }}
                                    className={`mt-0.5 relative w-5 h-5 rounded flex items-center justify-center transition-all duration-300 border-2 shrink-0 ${
                                        completed[problem.id] 
                                        ? 'bg-primary/20 border-primary text-primary shadow-[0_0_8px_rgba(123,116,209,0.3)]' 
                                        : 'border-border-subtle text-transparent hover:border-text-muted'
                                    }`}
                                >
                                    <CheckCircle size={12} className={completed[problem.id] ? "scale-100" : "scale-0"} />
                                </button>
                                
                                <div className="min-w-0">
                                    <h4 className={`text-sm font-black tracking-tight leading-snug transition-all duration-300 ${
                                        completed[problem.id] 
                                        ? 'text-text-muted line-through opacity-50' 
                                        : 'text-text-primary group-hover:text-primary'
                                    }`}>
                                        {problem.title}
                                    </h4>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto">
                            <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                                problem.difficulty === 'Easy' ? 'border-green-500/30 text-green-400 bg-green-500/5' :
                                problem.difficulty === 'Medium' ? 'border-orange-500/30 text-orange-400 bg-orange-500/5' :
                                'border-red-500/30 text-red-400 bg-red-500/5'
                            }`}>
                                {problem.difficulty}
                            </span>

                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-1 text-[9px] font-black text-white bg-primary px-3 py-1.5 rounded-md transition-all shadow-md shadow-primary/20 opacity-0 group-hover:opacity-100"
                            >
                                <Play size={8} fill="currentColor" /> 
                                <span>Visualize</span>
                                <ChevronRight size={8} />
                            </motion.button>
                        </div>
                    </div>
                ))}

                {filteredProblems.length === 0 && (
                    <div className="text-center py-10 border border-border-subtle rounded-2xl bg-surface/10">
                        <p className="text-xs text-text-muted">No matches found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
