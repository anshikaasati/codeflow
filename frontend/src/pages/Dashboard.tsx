import { useEffect, useState, useMemo } from 'react';
import { useAuthStore } from '../store/authStore';
import { useVisualizationStore } from '../store/visualizationStore';
import type { SavedVisualization } from '../store/visualizationStore';
import { useNavigate } from 'react-router-dom';
import { useLearningStore } from '../store/learningStore';
import { useProgressStore } from '../store/progressStore';
import { problemsList } from '../data/problems/index';
import DynamicBackground from '../components/DynamicBackground';
import { API_URL } from '../config/api';
import { 
    Github, Linkedin, Link as LinkIcon, Award, Zap, Calendar, 
    Search, ArrowUpDown, Trash2, Edit3, AlertCircle, 
    RefreshCw, Clock, X, Play, Code2, Star, Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DayCell {
    date: string;
    count: number;
}
type GridCell = DayCell | null;

interface MonthGrid {
    monthName: string;
    year: number;
    columns: GridCell[][];
}

const generateMonthGrids = (realData: any[]) => {
    const now = new Date();
    const activityMap = new Map<string, number>();
    if (Array.isArray(realData)) {
        realData.forEach(item => {
            if (item && item.date) {
                activityMap.set(item.date, item.count || 0);
            }
        });
    }

    const monthGrids: MonthGrid[] = [];
    // Generate last 12 months (including current month)
    for (let i = 11; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const year = d.getFullYear();
        const monthIdx = d.getMonth();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthName = monthNames[monthIdx];

        const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
        const isCurrentMonth = (year === now.getFullYear() && monthIdx === now.getMonth());
        const dayLimit = isCurrentMonth ? now.getDate() : daysInMonth;
        const startDayOfWeek = new Date(year, monthIdx, 1).getDay();

        const columns: GridCell[][] = [];
        let currentColumn: GridCell[] = Array(7).fill(null);
        columns.push(currentColumn);

        let day = 1;
        // First column setup
        for (let row = startDayOfWeek; row < 7; row++) {
            if (day <= dayLimit) {
                const monthStr = String(monthIdx + 1).padStart(2, '0');
                const dayStr = String(day).padStart(2, '0');
                const dateStr = `${year}-${monthStr}-${dayStr}`;
                const count = activityMap.get(dateStr) || 0;
                currentColumn[row] = { date: dateStr, count };
                day++;
            }
        }

        // Middle and end columns
        while (day <= dayLimit) {
            currentColumn = Array(7).fill(null);
            columns.push(currentColumn);
            for (let row = 0; row < 7; row++) {
                if (day <= dayLimit) {
                    const monthStr = String(monthIdx + 1).padStart(2, '0');
                    const dayStr = String(day).padStart(2, '0');
                    const dateStr = `${year}-${monthStr}-${dayStr}`;
                    const count = activityMap.get(dateStr) || 0;
                    currentColumn[row] = { date: dateStr, count };
                    day++;
                }
            }
        }

        monthGrids.push({ monthName, year, columns });
    }
    return monthGrids;
};

export default function Dashboard() {
    const { user } = useAuthStore();
    const { 
        visualizations, fetchUserVisualizations, isLoading: isVisLoading, error: visError,
        updateVisualization, deleteVisualization 
    } = useVisualizationStore();
    const navigate = useNavigate();
    const { completed } = useProgressStore();
    const { profile, fetchLearningProfile, dashboardStats, fetchDashboardStats } = useLearningStore();

    // State for search and sort on playgrounds
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'updatedAt' | 'createdAtNewest' | 'createdAtOldest' | 'nameAZ' | 'nameZA' | 'favorites'>('updatedAt');

    // Recommendation states
    const [recommendation, setRecommendation] = useState<{
        problemId: string;
        title: string;
        category: string;
        difficulty: string;
        reason: string;
    } | null>(null);
    const [recLoading, setRecLoading] = useState(false);

    // Dynamic user profile fields
    const [bio, setBio] = useState(() => localStorage.getItem('cf_bio') || '');
    const [githubUrl, setGithubUrl] = useState(() => localStorage.getItem('cf_github') || '');
    const [linkedinUrl, setLinkedinUrl] = useState(() => localStorage.getItem('cf_linkedin') || '');
    const [portfolioUrl, setPortfolioUrl] = useState(() => localStorage.getItem('cf_portfolio') || '');
    const [avatarUrl, setAvatarUrl] = useState(() => localStorage.getItem('cf_avatar') || user?.photoURL || '');
    const [gender, setGender] = useState(() => localStorage.getItem('cf_gender') || '');
    const [location, setLocation] = useState(() => localStorage.getItem('cf_location') || '');
    const [birthday, setBirthday] = useState(() => localStorage.getItem('cf_birthday') || '');
    const [xUrl, setXUrl] = useState(() => localStorage.getItem('cf_x') || '');
    const [work, setWork] = useState(() => localStorage.getItem('cf_work') || '');
    const [education, setEducation] = useState(() => localStorage.getItem('cf_education') || '');
    const [skills, setSkills] = useState(() => localStorage.getItem('cf_skills') || '');

    // Derived dashboard statistics from learning store
    const realHeatmapData = dashboardStats?.heatmapData || [];
    const currentStreak = dashboardStats?.streak || 0;
    const maxStreak = dashboardStats?.maxStreak || 0;

    // Dialog state for Rename/Edit Details
    const [editingVis, setEditingVis] = useState<SavedVisualization | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    // Dialog state for Delete Confirmation
    const [deletingVis, setDeletingVis] = useState<SavedVisualization | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);



    // Sharing state feedback
    const [sharingId, setSharingId] = useState<string | null>(null);

    // Load dynamic profile details & learning profile
    useEffect(() => {
        const loadProfile = async () => {
            if (!user) return;
            try {
                const token = await user.getIdToken();
                const res = await fetch(`${API_URL}/api/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.user) {
                        if (data.user.bio) {
                            setBio(data.user.bio);
                            localStorage.setItem('cf_bio', data.user.bio);
                        } else {
                            setBio('');
                            localStorage.removeItem('cf_bio');
                        }
                        if (data.user.githubUrl) {
                            setGithubUrl(data.user.githubUrl);
                            localStorage.setItem('cf_github', data.user.githubUrl);
                        } else {
                            setGithubUrl('');
                            localStorage.removeItem('cf_github');
                        }
                        if (data.user.linkedinUrl) {
                            setLinkedinUrl(data.user.linkedinUrl);
                            localStorage.setItem('cf_linkedin', data.user.linkedinUrl);
                        } else {
                            setLinkedinUrl('');
                            localStorage.removeItem('cf_linkedin');
                        }
                        if (data.user.portfolioUrl) {
                            setPortfolioUrl(data.user.portfolioUrl);
                            localStorage.setItem('cf_portfolio', data.user.portfolioUrl);
                        } else {
                            setPortfolioUrl('');
                            localStorage.removeItem('cf_portfolio');
                        }
                        if (data.user.photoURL) {
                            setAvatarUrl(data.user.photoURL);
                            localStorage.setItem('cf_avatar', data.user.photoURL);
                        }
                        if (data.user.gender) {
                            setGender(data.user.gender);
                            localStorage.setItem('cf_gender', data.user.gender);
                        } else {
                            setGender('');
                            localStorage.removeItem('cf_gender');
                        }
                        if (data.user.location) {
                            setLocation(data.user.location);
                            localStorage.setItem('cf_location', data.user.location);
                        } else {
                            setLocation('');
                            localStorage.removeItem('cf_location');
                        }
                        if (data.user.birthday) {
                            setBirthday(data.user.birthday);
                            localStorage.setItem('cf_birthday', data.user.birthday);
                        } else {
                            setBirthday('');
                            localStorage.removeItem('cf_birthday');
                        }
                        if (data.user.xUrl) {
                            setXUrl(data.user.xUrl);
                            localStorage.setItem('cf_x', data.user.xUrl);
                        } else {
                            setXUrl('');
                            localStorage.removeItem('cf_x');
                        }
                        if (data.user.work) {
                            setWork(data.user.work);
                            localStorage.setItem('cf_work', data.user.work);
                        } else {
                            setWork('');
                            localStorage.removeItem('cf_work');
                        }
                        if (data.user.education) {
                            setEducation(data.user.education);
                            localStorage.setItem('cf_education', data.user.education);
                        } else {
                            setEducation('');
                            localStorage.removeItem('cf_education');
                        }
                        if (data.user.skills) {
                            setSkills(data.user.skills);
                            localStorage.setItem('cf_skills', data.user.skills);
                        } else {
                            setSkills('');
                            localStorage.removeItem('cf_skills');
                        }
                    }
                }
            } catch (err) {
                console.error("Failed to load profile in Dashboard:", err);
            }
        };
        loadProfile();
        fetchLearningProfile();
        fetchDashboardStats();
    }, [user, fetchLearningProfile, fetchDashboardStats]);

    // Fetch learning recommendation
    useEffect(() => {
        const fetchRecommendation = async () => {
            if (!user) return;
            setRecLoading(true);
            try {
                const token = await user.getIdToken();
                const res = await fetch(`${API_URL}/api/recommendations`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setRecommendation(data);
                }
            } catch (err) {
                console.error("Failed to load recommendation:", err);
            } finally {
                setRecLoading(false);
            }
        };
        fetchRecommendation();
    }, [user]);

    // Load playgrounds (visualizations)
    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
        user.getIdToken().then(t => {
            fetchUserVisualizations(t);
        });
    }, [user, navigate, fetchUserVisualizations]);

    // Handle hash scroll (e.g. from Saved Visualizations menu click)
    const handleHashScroll = () => {
        if (window.location.hash === '#playgrounds') {
            const element = document.getElementById('playgrounds');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        // Scroll on mount if hash is already there
        setTimeout(handleHashScroll, 300);

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashScroll);
        return () => window.removeEventListener('hashchange', handleHashScroll);
    }, []);

    // Statistics calculations
    const solvedProblems = problemsList.filter(p => completed[p.id]);
    const solvedCount = solvedProblems.length;

    const easyTotal = problemsList.filter(p => p.difficulty === 'Easy').length;
    const mediumTotal = problemsList.filter(p => p.difficulty === 'Medium').length;
    const hardTotal = problemsList.filter(p => p.difficulty === 'Hard').length;

    const easySolved = solvedProblems.filter(p => p.difficulty === 'Easy').length;
    const mediumSolved = solvedProblems.filter(p => p.difficulty === 'Medium').length;
    const hardSolved = solvedProblems.filter(p => p.difficulty === 'Hard').length;
    // Generate heatmap days (last 12 months)
    const getHeatmapData = (realData: any[]) => {
        const days = [];
        const now = new Date();
        const dayOfWeek = now.getDay();
        const totalDays = 365 + dayOfWeek; 

        const activityMap = new Map<string, number>();
        if (Array.isArray(realData)) {
            realData.forEach(item => {
                if (item && item.date) {
                    activityMap.set(item.date, item.count || 0);
                }
            });
        }

        for (let i = totalDays - 1; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
            const year = d.getFullYear();
            const monthStr = String(d.getMonth() + 1).padStart(2, '0');
            const dayStr = String(d.getDate()).padStart(2, '0');
            const dStr = `${year}-${monthStr}-${dayStr}`;
            const count = activityMap.get(dStr) || 0;
            days.push({ date: dStr, count });
        }
        return days;
    };

    const heatmapDays = getHeatmapData(realHeatmapData);

    const monthGrids = useMemo(() => {
        return generateMonthGrids(realHeatmapData);
    }, [realHeatmapData]);

    // Streak values (currentStreak, maxStreak) are sourced exclusively from the backend
    // via getDashboardStats and set directly when the dashboard data is fetched.
    // Do NOT recalculate from heatmapDays here — the backend is the single source of truth
    // and correctly counts only dates with real activity (solves, traces, revisions, AI, mock).

    // Profile username fallback
    const username = (user?.email?.split('@')[0] || '').toLowerCase().replace(/[^a-z0-9_]/g, '_');

    // Languages Solved breakdown
    const langStats = [
        { name: 'C++', count: solvedCount },
        { name: 'Python', count: 0 }
    ];

    // Dynamic skills classification based on actual solved problems
    const categoryCounts: Record<string, number> = {};
    solvedProblems.forEach(p => {
        categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    const advancedCats = ['Dynamic Programming', 'Graphs', 'Backtracking', 'Trie'];
    const intermediateCats = ['Sliding Window', 'Binary Search', 'Trees', 'Heap', 'Heap / Priority Queue', 'Stack', 'Linked List'];
    const fundamentalCats = ['Arrays & Hashing', 'Two Pointers', 'Sorting'];

    const advancedSkills = advancedCats.filter(cat => (categoryCounts[cat] || 0) > 0);
    const intermediateSkills = intermediateCats.filter(cat => (categoryCounts[cat] || 0) > 0);
    const fundamentalSkills = fundamentalCats.filter(cat => (categoryCounts[cat] || 0) > 0);
    const hasAnySkills = advancedSkills.length > 0 || intermediateSkills.length > 0 || fundamentalSkills.length > 0;



    // Solved problems for display (up to 8)
    const displaySolvedProblems = solvedProblems.slice(0, 8);

    // Dynamic Activity Feed
    const activityLogs = [
        ...(displaySolvedProblems.length > 0 
            ? displaySolvedProblems.slice(0, 3).map((prob, idx) => ({
                title: idx % 2 === 0 ? `Trace generated for ${prob.title}` : `Solved ${prob.title}`,
                type: idx % 2 === 0 ? 'trace' : 'solve',
                time: idx === 0 ? '2 hours ago' : idx === 1 ? '5 hours ago' : '1 day ago'
              }))
            : [
                { title: 'Launched CodeFlow compiler sandbox', type: 'trace', time: 'Just now' }
              ]
        ),
        { title: `Started active coding streak! 🔥`, type: 'streak', time: `${currentStreak} days ago` }
    ];

    // Workspaces Filter and Sort logic
    const filteredVisualizations = visualizations.filter(vis => {
        const matchesSearch = vis.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              (vis.description || '').toLowerCase().includes(searchQuery.toLowerCase());
        if (sortBy === 'favorites') {
            return matchesSearch && !!vis.metadata?.favorite;
        }
        return matchesSearch;
    });

    const sortedVisualizations = [...filteredVisualizations].sort((a, b) => {
        if (sortBy === 'updatedAt' || sortBy === 'favorites') {
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        }
        if (sortBy === 'createdAtNewest') {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'createdAtOldest') {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        if (sortBy === 'nameAZ') {
            return a.title.localeCompare(b.title);
        }
        if (sortBy === 'nameZA') {
            return b.title.localeCompare(a.title);
        }
        return 0;
    });

    const handleEditStart = (e: React.MouseEvent, vis: SavedVisualization) => {
        e.stopPropagation();
        setEditingVis(vis);
        setEditTitle(vis.title);
        setEditDescription(vis.description || '');
    };

    const handleEditSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingVis || !user) return;
        setIsUpdating(true);
        try {
            const token = await user.getIdToken();
            await updateVisualization(editingVis._id, {
                title: editTitle,
                description: editDescription
            }, token);
            setEditingVis(null);
        } catch (err) {
            console.error("Failed to update visualization:", err);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteStart = (e: React.MouseEvent, vis: SavedVisualization) => {
        e.stopPropagation();
        setDeletingVis(vis);
    };

    const handleDeleteConfirm = async () => {
        if (!deletingVis || !user) return;
        setIsDeleting(true);
        try {
            const token = await user.getIdToken();
            await deleteVisualization(deletingVis._id, token);
            setDeletingVis(null);
        } catch (err) {
            console.error("Failed to delete visualization:", err);
        } finally {
            setIsDeleting(false);
        }
    };



    const handleShare = async (e: React.MouseEvent, vis: SavedVisualization) => {
        e.stopPropagation();
        if (!user) return;
        setSharingId(vis._id);
        try {
            // 1. Fetch full details including traceSteps
            const fullVis = await useVisualizationStore.getState().fetchVisualizationById(vis._id);
            if (!fullVis || !fullVis.traceSteps || fullVis.traceSteps.length === 0) {
                alert("This project has no execution trace steps to share.");
                return;
            }

            // 2. Call share API
            const res = await fetch(`${API_URL}/api/traces/share`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    problemId: fullVis.metadata?.problemDetails?.id || 'sandbox',
                    language: fullVis.language,
                    code: fullVis.code,
                    traceSteps: fullVis.traceSteps,
                    complexity: {
                        time: fullVis.metadata?.problemDetails?.languages?.[fullVis.language]?.optimalSolution?.timeComplexity || 'O(N)',
                        space: fullVis.metadata?.problemDetails?.languages?.[fullVis.language]?.optimalSolution?.spaceComplexity || 'O(N)'
                    },
                    userId: user.uid
                })
            });

            if (!res.ok) throw new Error("Failed to share trace");
            const data = await res.json();
            if (data.shareId) {
                const url = `${window.location.origin}/share/${data.shareId}`;
                navigator.clipboard.writeText(url);
                alert(`Project shared! Link copied to clipboard:\n${url}`);
            }
        } catch (err: any) {
            console.error("Failed to share visualization:", err);
            alert("Failed to share visualization: " + err.message);
        } finally {
            setSharingId(null);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen pt-[100px] px-6 pb-12 bg-transparent text-text-primary relative overflow-x-hidden">
            <DynamicBackground />

            {/* Ambient Background Glows */}
            <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-primary/5 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] left-[-10%] w-[35%] h-[35%] bg-secondary/5 blur-[130px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 space-y-8">
                
                {/* ── TOP SECTION: TWO COLUMNS ── */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    
                    {/* ── LEFT SIDEBAR (PROFILE DETAILS) ── */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Main Profile Info */}
                        <div className="liquid-glass-card rounded-2xl p-6 shadow-xl text-left border border-white/5">
                            <div className="flex flex-col items-start gap-4">
                                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 shadow-lg shrink-0">
                                    {avatarUrl ? (
                                        <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-3xl font-black">
                                            {(user.displayName || user.email || 'D')[0].toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-xl font-extrabold text-white leading-snug">
                                        {user.displayName || 'Developer'}
                                    </h2>
                                    <p className="text-xs text-text-muted font-mono leading-none mt-1">@{username}</p>
                                </div>
                            </div>

                            {bio && (
                                <p className="text-xs font-mono text-text-secondary leading-relaxed mt-4 pt-4 border-t border-white/5">
                                    {bio}
                                </p>
                            )}

                            <button 
                                onClick={() => navigate('/profile-settings')}
                                className="w-full mt-5 py-2.5 bg-primary hover:bg-primary/95 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-[0.98]"
                            >
                                Edit Profile
                            </button>

                            <button 
                                onClick={() => navigate('/learning-roadmaps')}
                                className="w-full mt-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-[0.98]"
                            >
                                View Prep Roadmaps
                            </button>

                            {/* General Details (only visible if populated) */}
                            {(location || gender || birthday) && (
                                <div className="space-y-3 mt-6 pt-6 border-t border-white/5 font-mono text-[11px] text-text-secondary">
                                    <span className="text-[10px] text-text-muted font-bold block uppercase tracking-wide">General</span>
                                    {gender && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-text-muted">Gender</span>
                                            <span className="text-white font-bold">{gender}</span>
                                        </div>
                                    )}
                                    {location && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-text-muted">Location</span>
                                            <span className="text-white font-bold">{location}</span>
                                        </div>
                                    )}
                                    {birthday && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-text-muted">Birthday</span>
                                            <span className="text-white font-bold">
                                                {new Date(birthday).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Websites (only visible if populated) */}
                            {(githubUrl || linkedinUrl || xUrl || portfolioUrl) && (
                                <div className="space-y-3 mt-6 pt-6 border-t border-white/5 font-mono text-[11px] text-text-secondary">
                                    <span className="text-[10px] text-text-muted font-bold block uppercase tracking-wide">Websites</span>
                                    {githubUrl && (
                                        <div className="flex items-center gap-2">
                                            <Github size={14} className="text-text-muted shrink-0" />
                                            <a href={githubUrl} target="_blank" rel="noreferrer" className="hover:text-primary underline truncate">
                                                {githubUrl.replace('https://github.com/', '').replace(/\/$/, '')}
                                            </a>
                                        </div>
                                    )}
                                    {linkedinUrl && (
                                        <div className="flex items-center gap-2">
                                            <Linkedin size={14} className="text-text-muted shrink-0" />
                                            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-primary underline truncate">
                                                {linkedinUrl.replace('https://linkedin.com/in/', '').replace(/\/$/, '')}
                                            </a>
                                        </div>
                                    )}
                                    {xUrl && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-text-muted font-black w-[14px] text-center shrink-0">X</span>
                                            <a href={xUrl} target="_blank" rel="noreferrer" className="hover:text-primary underline truncate">
                                                {xUrl.replace('https://x.com/', '').replace('https://twitter.com/', '').replace(/\/$/, '')}
                                            </a>
                                        </div>
                                    )}
                                    {portfolioUrl && (
                                        <div className="flex items-center gap-2">
                                            <LinkIcon size={14} className="text-text-muted shrink-0" />
                                            <a href={portfolioUrl} target="_blank" rel="noreferrer" className="hover:text-primary underline truncate">
                                                {portfolioUrl.replace('https://', '').replace('http://', '').replace(/\/$/, '')}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Experience Card */}
                        {(work || education || skills) && (
                            <div className="liquid-glass-card rounded-2xl p-6 shadow-xl text-left font-mono border border-white/5">
                                <h3 className="text-xs font-black uppercase text-text-muted tracking-wider mb-4">Experience</h3>
                                <div className="space-y-4 text-xs">
                                    {work && (
                                        <div>
                                            <span className="text-[10px] text-text-muted font-bold block mb-1 uppercase tracking-wide">Work</span>
                                            <span className="text-white font-semibold">{work}</span>
                                        </div>
                                    )}
                                    {education && (
                                        <div>
                                            <span className="text-[10px] text-text-muted font-bold block mb-1 uppercase tracking-wide">Education</span>
                                            <span className="text-white font-semibold">{education}</span>
                                        </div>
                                    )}
                                    {skills && (
                                        <div>
                                            <span className="text-[10px] text-text-muted font-bold block mb-1.5 uppercase tracking-wide">Skills</span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {skills.split(',').map(s => s.trim()).filter(Boolean).map(skill => (
                                                    <span key={skill} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] text-text-secondary">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Languages Solved */}
                        <div className="liquid-glass-card rounded-2xl p-6 shadow-xl text-left font-mono border border-white/5">
                            <h3 className="text-xs font-black uppercase text-text-muted tracking-wider mb-4">Languages</h3>
                            <div className="space-y-3 text-xs">
                                {langStats.map(lang => (
                                    <div key={lang.name} className="flex justify-between items-center">
                                        <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold text-white">{lang.name}</span>
                                        <span className="text-text-secondary"><span className="text-white font-bold">{lang.count}</span> solved</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dynamic Skills */}
                        <div className="liquid-glass-card rounded-2xl p-6 shadow-xl text-left font-mono border border-white/5">
                            <h3 className="text-xs font-black uppercase text-text-muted tracking-wider mb-4">Skills</h3>
                            {hasAnySkills ? (
                                <div className="space-y-4">
                                    {advancedSkills.length > 0 && (
                                        <div>
                                            <span className="text-[10px] text-text-muted font-bold block mb-2 uppercase tracking-wide">• Advanced</span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {advancedSkills.map(cat => (
                                                    <span key={cat} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] text-text-secondary">
                                                        {cat} x{categoryCounts[cat]}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {intermediateSkills.length > 0 && (
                                        <div>
                                            <span className="text-[10px] text-text-muted font-bold block mb-2 uppercase tracking-wide">• Intermediate</span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {intermediateSkills.map(cat => (
                                                    <span key={cat} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] text-text-secondary">
                                                        {cat} x{categoryCounts[cat]}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {fundamentalSkills.length > 0 && (
                                        <div>
                                            <span className="text-[10px] text-text-muted font-bold block mb-2 uppercase tracking-wide">• Fundamental</span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {fundamentalSkills.map(cat => (
                                                    <span key={cat} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] text-text-secondary">
                                                        {cat} x{categoryCounts[cat]}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-[10px] text-text-muted italic leading-normal">Solve problems to display skills.</p>
                            )}
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN (CONSISTENCY MAP & ACTIVITIES) ── */}
                    <div className="lg:col-span-3 space-y-6">
                        
                        {/* Top Stats Cards (Rating & Attempted track) */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            
                            {/* Solved Problems Circular Ring card */}
                            <div className="liquid-glass-card rounded-2xl p-6 shadow-xl flex items-center justify-around gap-6 h-[170px] border border-white/5">
                                {/* Solved Ring Chart */}
                                <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                        <circle
                                            className="text-white/5"
                                            strokeWidth="3.5"
                                            cx="18" cy="18" r="15.915"
                                            stroke="currentColor"
                                            fill="none"
                                        />
                                        <circle
                                            className="text-[#ff9f0a]"
                                            strokeDasharray={`${(solvedCount / Math.max(problemsList.length, 1)) * 100} 100`}
                                            strokeWidth="3.5"
                                            strokeLinecap="round"
                                            cx="18" cy="18" r="15.915"
                                            stroke="currentColor"
                                            fill="none"
                                        />
                                    </svg>
                                    <div className="absolute text-center font-mono">
                                        <span className="text-xl font-black text-white block leading-none">{solvedCount}</span>
                                        <span className="text-[9px] text-text-muted block mt-1 font-bold">Solved</span>
                                    </div>
                                </div>

                                {/* Easy, Medium, Hard attempted breakdown */}
                                <div className="flex-1 space-y-2.5 font-mono text-[10px] text-text-secondary w-full">
                                    <div>
                                        <div className="flex justify-between mb-0.5">
                                            <span className="text-[#00b8a3] font-bold">Easy</span>
                                            <span>{easySolved} / {easyTotal}</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#00b8a3]" style={{ width: `${(easySolved / Math.max(easyTotal, 1)) * 100}%` }} />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-0.5">
                                            <span className="text-[#ffc01e] font-bold">Medium</span>
                                            <span>{mediumSolved} / {mediumTotal}</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#ffc01e]" style={{ width: `${(mediumSolved / Math.max(mediumTotal, 1)) * 100}%` }} />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-0.5">
                                            <span className="text-[#ff2d55] font-bold">Hard</span>
                                            <span>{hardSolved} / {hardTotal}</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#ff2d55]" style={{ width: `${(hardSolved / Math.max(hardTotal, 1)) * 100}%` }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Streak Milestones */}
                            <div className="liquid-glass-card rounded-2xl p-6 shadow-xl flex flex-col justify-between h-[170px] font-mono border border-white/5 text-left">
                                <div className="flex items-center gap-2 text-text-muted">
                                    <Award size={16} className="text-[#ff9f0a]" />
                                    <span className="text-[10px] font-black uppercase tracking-wider">Streak Milestones</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <div>
                                        <span className="text-[10px] text-text-muted block leading-none">Current Streak</span>
                                        <span className="text-2xl font-black text-white">{currentStreak} <span className="text-xs font-normal text-text-secondary">Days</span></span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] text-text-muted block leading-none">Highest Streak</span>
                                        <span className="text-2xl font-black text-[#ffc01e] flex items-center justify-end gap-1">
                                            <Zap size={18} className="fill-[#ffc01e] text-[#ffc01e] animate-pulse" />
                                            {maxStreak} Days
                                        </span>
                                    </div>
                                </div>
                                <div className="border-t border-white/5 pt-3 text-[10px] text-text-secondary leading-relaxed">
                                    Keep solving DSA problems in the workspace to sustain your active coding streak!
                                </div>
                            </div>

                            {/* Weak Topics & Recommendations */}
                            <div className="liquid-glass-card rounded-2xl p-6 shadow-xl flex flex-col justify-between h-[170px] font-mono border border-white/5 text-left relative overflow-hidden group">
                                <div className="flex items-center justify-between text-text-muted">
                                    <div className="flex items-center gap-2">
                                        <Zap size={16} className="text-primary animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-wider">AI Target Practice</span>
                                    </div>
                                    {profile?.weakTopics && profile.weakTopics.length > 0 && (
                                        <span className="text-[8px] bg-red-500/10 text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded uppercase font-bold shrink-0">
                                            {profile.weakTopics.length} Weak Topics
                                        </span>
                                    )}
                                </div>
                                {recLoading ? (
                                    <div className="flex items-center justify-center py-4">
                                        <RefreshCw className="animate-spin text-primary" size={16} />
                                    </div>
                                ) : recommendation ? (
                                    <div className="space-y-2 mt-2">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-black text-white truncate leading-tight group-hover:text-primary transition-colors cursor-pointer"
                                                    onClick={() => navigate(`/workspace?problemId=${recommendation.problemId}`)}>
                                                    {recommendation.title}
                                                </h4>
                                                <p className="text-[9px] text-text-muted mt-0.5 uppercase tracking-wider font-bold">
                                                    {recommendation.category} • <span className={
                                                        recommendation.difficulty === 'Easy' ? 'text-green-400' :
                                                        recommendation.difficulty === 'Medium' ? 'text-amber-400' : 'text-red-400'
                                                    }>{recommendation.difficulty}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-text-secondary line-clamp-2 leading-snug">
                                            {recommendation.reason}
                                        </p>
                                        <div className="pt-1 flex items-center justify-between gap-2">
                                            {profile?.weakTopics && profile.weakTopics.length > 0 ? (
                                                <div className="flex gap-1 overflow-hidden max-w-[120px]">
                                                    {profile.weakTopics.slice(0, 2).map(t => (
                                                        <span key={t} className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-text-muted truncate">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-[8px] text-text-muted italic">All topics look solid!</div>
                                            )}
                                            <button 
                                                onClick={() => navigate(`/workspace?problemId=${recommendation.problemId}`)}
                                                className="px-3 py-1.5 bg-primary hover:bg-primary/90 text-white rounded-lg text-[9px] font-bold uppercase tracking-wider shrink-0 transition-all active:scale-95"
                                            >
                                                Practice Now
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-xs text-text-muted italic py-4">
                                        No recommendations found. Keep solving to build your profile!
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Consistency Heatmap - FULL WIDTH */}
                        <div className="liquid-glass-card rounded-2xl p-6 shadow-xl font-mono w-full border border-white/5 text-left">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                <div>
                                    <h3 className="text-sm font-black text-white flex items-center gap-2">
                                        <Calendar size={15} className="text-[#00b8a3]" />
                                        {heatmapDays.filter(d => d.count > 0).length} submissions in the past one year
                                    </h3>
                                </div>
                                <div className="flex items-center gap-4 text-[10px] text-text-muted">
                                    <span>Total active days: <span className="text-white font-bold">{heatmapDays.filter(d => d.count > 0).length}</span></span>
                                    <span>Max streak: <span className="text-white font-bold">{maxStreak}</span></span>
                                    <select className="bg-[#1e1e1e] border border-white/5 rounded px-2 py-0.5 text-text-secondary outline-none text-[10px] cursor-pointer">
                                        <option>Current</option>
                                        <option>2025</option>
                                    </select>
                                </div>
                            </div>

                            {/* Heatmap Grid Calendar */}
                            <div className="overflow-x-auto pb-3 pt-1">
                                <div className="flex items-start gap-4 min-w-max">
                                    {monthGrids.map((mg, mIdx) => (
                                        <div key={mIdx} className="flex flex-col">
                                            {/* Month Name */}
                                            <span className="text-[10px] text-text-muted mb-2 font-black tracking-wider uppercase block text-left">
                                                {mg.monthName}
                                            </span>
                                            
                                            {/* Columns Grid for this month */}
                                            <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
                                                {mg.columns.flatMap((col, colIdx) => 
                                                    col.map((cell, rowIdx) => {
                                                        const key = `${colIdx}-${rowIdx}`;
                                                        if (cell === null) {
                                                            return (
                                                                <div 
                                                                    key={key} 
                                                                    className="w-[10px] h-[10px] rounded-[1.5px] bg-transparent pointer-events-none" 
                                                                />
                                                            );
                                                        }
                                                        return (
                                                            <div
                                                                key={key}
                                                                title={`${cell.date}: ${cell.count} active submissions`}
                                                                className={`w-[10px] h-[10px] rounded-[1.5px] transition-all hover:scale-125 ${
                                                                    cell.count === 0 ? 'bg-white/5 border border-white/[0.02]' :
                                                                    cell.count === 1 ? 'bg-[#0e4429]' :
                                                                    cell.count === 2 ? 'bg-[#006d32]' :
                                                                    cell.count === 3 ? 'bg-[#26a641]' :
                                                                    'bg-[#39d353]'
                                                                }`}
                                                            />
                                                        );
                                                    })
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Legend scale */}
                            <div className="flex items-center justify-end text-[9px] text-text-muted pt-1">
                                <div className="flex items-center gap-1.5">
                                    <span>Less</span>
                                    <span className="w-2.5 h-2.5 rounded-[1px] bg-white/5" />
                                    <span className="w-2.5 h-2.5 rounded-[1px] bg-[#0e4429]" />
                                    <span className="w-2.5 h-2.5 rounded-[1px] bg-[#006d32]" />
                                    <span className="w-2.5 h-2.5 rounded-[1px] bg-[#26a641]" />
                                    <span className="w-2.5 h-2.5 rounded-[1px] bg-[#39d353]" />
                                    <span>More</span>
                                </div>
                            </div>
                        </div>

                        {/* Solved Problems Recent AC & Activity Feed */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            {/* Solved Problems Recent list */}
                            <div className="md:col-span-2 liquid-glass-card rounded-2xl p-6 shadow-xl border border-white/5 text-left">
                                <div className="border-b border-white/5 pb-2.5 mb-4">
                                    <h3 className="text-xs font-black uppercase text-text-muted tracking-wider font-mono">Recent Solved Problems</h3>
                                </div>

                                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                                    {displaySolvedProblems.length > 0 ? (
                                        displaySolvedProblems.map((prob) => (
                                            <div 
                                                key={prob.id} 
                                                onClick={() => navigate(`/workspace?problemId=${prob.id}`)}
                                                className="flex items-center justify-between p-3.5 bg-white/5 border border-white/5 rounded-xl hover:border-[#3e3e3e] transition-all cursor-pointer gap-2"
                                            >
                                                <div className="min-w-0 flex-1">
                                                    <span className="text-sm font-extrabold text-white block truncate leading-tight hover:text-primary transition-colors">{prob.title}</span>
                                                    <span className="text-[10px] text-text-muted font-mono block mt-1">
                                                        Category: {prob.category}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3 shrink-0">
                                                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider font-mono ${
                                                        prob.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                        prob.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                        'bg-red-500/10 text-red-400 border border-red-500/20'
                                                    }`}>
                                                        {prob.difficulty}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-12 text-center text-text-muted font-mono text-xs">
                                            No solved problems yet.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Recent Activity Feed */}
                            <div className="liquid-glass-card rounded-2xl p-6 shadow-xl font-mono border border-white/5 text-left">
                                <h3 className="text-xs font-black uppercase text-text-muted tracking-wider mb-4">Recent Activity</h3>
                                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                                    {activityLogs.map((log, idx) => (
                                        <div key={idx} className="border-l-2 border-[#3e3e3e] pl-4 py-0.5 relative group">
                                            <div className={`absolute left-[-5px] top-1.5 w-2 h-2 rounded-full border border-bg-panel ${
                                                log.type === 'streak' ? 'bg-[#ffc01e]' :
                                                log.type === 'trace' ? 'bg-[#3b82f6]' : 'bg-[#00b8a3]'
                                            }`} />
                                            <div>
                                                <p className="text-[11px] font-bold text-white leading-tight">{log.title}</p>
                                                <p className="text-[9px] text-text-muted mt-1 flex justify-between">
                                                    <span>{log.type.toUpperCase()}</span>
                                                    <span>{log.time}</span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ── BOTTOM SECTION: SAVED VISUALIZATIONS (MY PLAYGROUNDS) ── */}
                <div id="playgrounds" className="scroll-mt-24 pt-8">
                    {/* Header Controls */}
                    <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="text-left">
                            <h2 className="text-2xl font-black flex items-center gap-2.5 text-white tracking-tight">
                                <Code2 className="text-primary" />
                                My Playgrounds
                            </h2>
                            <p className="text-xs text-text-muted mt-1 font-mono">Manage and replay your saved algorithm visualizer traces</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
                            {/* Search */}
                            <div className="relative w-full sm:w-64 group">
                                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-primary transition-colors" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Search by name or note..."
                                    className="w-full pl-10 pr-4 py-2 bg-white/5 hover:bg-white/[0.07] border border-white/5 rounded-xl text-xs font-bold text-white placeholder-text-muted outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-mono"
                                />
                            </div>

                            {/* Sort */}
                            <div className="relative w-full sm:w-auto shrink-0 flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/5 rounded-xl">
                                <ArrowUpDown size={14} className="text-primary" />
                                <select
                                    value={sortBy}
                                    onChange={e => setSortBy(e.target.value as any)}
                                    className="bg-transparent text-xs font-bold text-text-secondary hover:text-white outline-none border-none cursor-pointer pr-4 font-mono"
                                >
                                    <option value="updatedAt" className="bg-[#1a1a1a]">Last Modified</option>
                                    <option value="favorites" className="bg-[#1a1a1a]">Favorites</option>
                                    <option value="createdAtNewest" className="bg-[#1a1a1a]">Created: Newest</option>
                                    <option value="createdAtOldest" className="bg-[#1a1a1a]">Created: Oldest</option>
                                    <option value="nameAZ" className="bg-[#1a1a1a]">Name: A to Z</option>
                                    <option value="nameZA" className="bg-[#1a1a1a]">Name: Z to A</option>
                                </select>
                            </div>

                            <button 
                                onClick={() => navigate('/workspace')} 
                                className="w-full sm:w-auto px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-bold tracking-widest uppercase transition-all shadow-lg shadow-primary/20 active:scale-95 shrink-0"
                            >
                                New Workspace
                            </button>
                        </div>
                    </div>

                    {/* Vis Grid List */}
                    {visError && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-3">
                            <AlertCircle size={20} />
                            <span>Error loading projects: {visError}</span>
                        </div>
                    )}

                    {isVisLoading && sortedVisualizations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-text-muted gap-3">
                            <RefreshCw className="animate-spin text-primary" size={32} />
                            <span className="text-sm font-bold tracking-widest uppercase font-mono">Restoring saved projects...</span>
                        </div>
                    ) : sortedVisualizations.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="liquid-glass-card rounded-2xl p-16 text-center shadow-xl border border-white/5"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-5 border border-white/5">
                                <Code2 size={32} className="text-text-muted" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">No matching visualizations</h3>
                            <p className="text-text-muted text-sm mb-6 max-w-sm mx-auto font-mono">
                                {searchQuery ? "We couldn't find any saved projects matching your query." : "Save your algorithm visualizer traces to access them here."}
                            </p>
                            <button onClick={() => navigate('/workspace')} className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-xs tracking-wider uppercase transition-colors shadow-lg shadow-primary/20">
                                Launch Sandbox
                            </button>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence mode="popLayout">
                                {sortedVisualizations.map((vis, idx) => (
                                    <motion.div 
                                        layout
                                        key={vis._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.3) }}
                                        className="group liquid-glass-card rounded-2xl p-6 hover:border-primary/50 hover:-translate-y-1 transition-all cursor-pointer shadow-xl flex flex-col justify-between border border-white/5"
                                        onClick={() => navigate(`/workspace?vid=${vis._id}`)}
                                    >
                                        <div>
                                            {/* Card Header */}
                                            <div className="flex justify-between items-start mb-3.5 gap-2">
                                                <h3 className="text-base font-extrabold text-white group-hover:text-primary transition-colors line-clamp-1 leading-tight tracking-tight text-left">
                                                    {vis.title}
                                                </h3>
                                                <span className="text-[9px] px-2 py-0.5 rounded-[4px] bg-white/5 border border-white/5 font-black uppercase tracking-wider text-text-secondary font-mono shrink-0">
                                                    {vis.language}
                                                </span>
                                            </div>

                                            {/* Preview Code Grid placeholder */}
                                            <div className="relative h-28 w-full bg-[#161616]/40 rounded-xl mb-4 border border-white/5 overflow-hidden flex flex-col justify-center items-center group-hover:bg-[#161616]/75 transition-colors">
                                                <div className="absolute top-2 left-3 flex items-center gap-1.5 opacity-65 text-[9px] font-black text-text-muted font-mono tracking-wider">
                                                    <Clock size={10} />
                                                    <span>PREVIEW</span>
                                                </div>
                                                <div className="flex flex-col gap-2 w-[80%] opacity-20">
                                                    <div className="h-1.5 bg-primary/80 rounded-full w-[45%]" />
                                                    <div className="h-1.5 bg-secondary/80 rounded-full w-[70%] ml-4" />
                                                    <div className="h-1.5 bg-accent-cyan/80 rounded-full w-[30%] ml-4" />
                                                    <div className="h-1.5 bg-white/40 rounded-full w-[50%]" />
                                                </div>
                                                <div className="absolute p-3 rounded-full bg-primary/0 group-hover:bg-primary/20 text-primary/0 group-hover:text-primary transition-all duration-300 transform scale-75 group-hover:scale-100 flex items-center justify-center shadow-lg">
                                                    <Play size={20} fill="currentColor" />
                                                </div>
                                            </div>

                                            {/* Notes */}
                                            <p className="text-xs font-semibold text-text-secondary line-clamp-2 mb-6 h-9 font-mono leading-relaxed text-left">
                                                {vis.description || 'No description or developer notes provided.'}
                                            </p>
                                        </div>

                                        {/* Action footer */}
                                        <div className="flex items-center justify-between text-[11px] text-text-muted border-t border-white/5 pt-4">
                                            <span className="flex items-center gap-1.5 font-bold font-mono">
                                                <Calendar size={13} className="text-primary" />
                                                {new Date(vis.updatedAt).toLocaleDateString()}
                                            </span>
                                            <div className="flex items-center gap-1.5">
                                                {/* Favorite */}
                                                <button 
                                                    onClick={async (e) => {
                                                        e.stopPropagation();
                                                        const token = await user?.getIdToken();
                                                        if (token) {
                                                            const newFav = !vis.metadata?.favorite;
                                                            await updateVisualization(vis._id, {
                                                                metadata: {
                                                                    ...vis.metadata,
                                                                    favorite: newFav
                                                                }
                                                            }, token);
                                                        }
                                                    }}
                                                    className={`p-2 rounded-lg bg-white/5 hover:bg-yellow-500/20 hover:text-yellow-400 transition-colors cursor-pointer ${
                                                        vis.metadata?.favorite ? 'text-yellow-400 font-bold' : 'text-text-muted'
                                                    }`}
                                                    title={vis.metadata?.favorite ? 'Remove Favorite' : 'Mark as Favorite'}
                                                >
                                                    <Star size={13} fill={vis.metadata?.favorite ? 'currentColor' : 'none'} />
                                                </button>

                                                {/* Share */}
                                                <button 
                                                    onClick={(e) => handleShare(e, vis)}
                                                    disabled={sharingId === vis._id}
                                                    className="p-2 rounded-lg bg-white/5 hover:bg-secondary/20 hover:text-secondary transition-colors text-text-muted cursor-pointer"
                                                    title="Share Project"
                                                >
                                                    {sharingId === vis._id ? (
                                                        <RefreshCw size={13} className="animate-spin text-secondary" />
                                                    ) : (
                                                        <Share2 size={13} />
                                                    )}
                                                </button>

                                                {/* Rename/Edit */}
                                                <button 
                                                    onClick={(e) => handleEditStart(e, vis)}
                                                    className="p-2 rounded-lg bg-white/5 hover:bg-secondary/20 hover:text-secondary transition-colors text-text-muted cursor-pointer"
                                                    title="Edit Details / Rename"
                                                >
                                                    <Edit3 size={13} />
                                                </button>

                                                {/* Delete */}
                                                <button 
                                                    onClick={(e) => handleDeleteStart(e, vis)}
                                                    className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-colors text-text-muted cursor-pointer"
                                                    title="Delete Project"
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

            </div>

            {/* ── EDIT DIALOG ── */}
            <AnimatePresence>
                {editingVis && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-md liquid-glass-card border border-white/10 rounded-2xl shadow-2xl p-8 overflow-hidden"
                        >
                            <button 
                                onClick={() => setEditingVis(null)}
                                className="absolute top-4 right-4 p-2 text-text-muted hover:text-white rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex items-center gap-3 mb-6 text-left">
                                <div className="p-2 bg-secondary/20 text-secondary rounded-lg">
                                    <Edit3 size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white">Edit Project Details</h3>
                            </div>

                            <form onSubmit={handleEditSave} className="space-y-4 text-left">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-text-secondary font-mono">Project Title</label>
                                    <input 
                                        type="text" 
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary text-white outline-none transition-all font-mono"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-text-secondary font-mono">Description / Notes</label>
                                    <textarea 
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary text-white outline-none transition-all h-28 resize-none font-mono text-sm leading-relaxed"
                                    />
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button 
                                        type="button"
                                        onClick={() => setEditingVis(null)}
                                        className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all border border-white/5 font-mono"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={isUpdating}
                                        className="flex-1 py-2.5 bg-primary text-white rounded-xl text-xs font-bold transition-all shadow-lg hover:bg-primary/90 disabled:opacity-50 font-mono"
                                    >
                                        {isUpdating ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ── DELETE DIALOG ── */}
            <AnimatePresence>
                {deletingVis && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-sm liquid-glass-card border border-white/10 rounded-2xl shadow-2xl p-8 overflow-hidden"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20 mb-4 animate-pulse">
                                    <Trash2 size={28} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Delete Visualization?</h3>
                                <p className="text-xs text-text-muted font-mono leading-relaxed mb-6 max-w-xs">
                                    Are you sure you want to delete <span className="text-white">"{deletingVis.title}"</span>? This action is permanent and cannot be undone.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setDeletingVis(null)}
                                    className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all border border-white/5 font-mono"
                                >
                                    No, Keep it
                                </button>
                                <button 
                                    type="button"
                                    onClick={handleDeleteConfirm}
                                    disabled={isDeleting}
                                    className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg hover:bg-red-600 disabled:opacity-50 font-mono"
                                >
                                    {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
