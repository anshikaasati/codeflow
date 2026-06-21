import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Trophy, Github, Linkedin, Globe, Lock,
    ArrowLeft, Award, Sparkles,
    Code2, Share2, Download
} from 'lucide-react';
import { API_URL } from '../config/api';
import DynamicBackground from '../components/DynamicBackground';

interface PublicProfileData {
    displayName: string;
    photoURL?: string;
    bio: string;
    githubUrl?: string;
    linkedinUrl?: string;
    portfolioUrl?: string;
    streak: number;
    readinessScore: number;
    solvedCount: number;
    totalTraced: number;
    achievements: { id: string; name: string; description: string; icon: string }[];
    topicProgress: { topic: string; masteryScore: number; solvedCount: number }[];
}

export default function PublicProfile() {
    const { username } = useParams<{ username: string }>();
    const navigate = useNavigate();
    const [publicData, setPublicData] = useState<PublicProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const fetchPublicProfile = async () => {
            if (!username) return;
            setIsLoading(true);
            try {
                const res = await fetch(`${API_URL}/api/profile/public/${username}`);
                if (!res.ok) {
                    if (res.status === 404) {
                        throw new Error('User public profile not found');
                    }
                    throw new Error('Failed to retrieve public profile');
                }
                const data = await res.json();
                if (data.user) {
                    setPublicData(data.user);
                }
            } catch (err: any) {
                setError(err.message || 'Failed to load profile');
            } finally {
                setIsLoading(false);
            }
        };
        fetchPublicProfile();
    }, [username]);

    const exportAchievementCard = () => {
        if (!publicData) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set dimensions (800 x 450)
        canvas.width = 800;
        canvas.height = 450;

        // Draw card background
        const gradient = ctx.createLinearGradient(0, 0, 800, 450);
        gradient.addColorStop(0, '#0d1527');
        gradient.addColorStop(1, '#070a13');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 800, 450);

        // Ambient glows
        const glow = ctx.createRadialGradient(400, 225, 50, 400, 225, 400);
        glow.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, 800, 450);

        // Outer borders
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 14;
        ctx.strokeRect(7, 7, 786, 436);

        ctx.strokeStyle = 'rgba(59, 130, 246, 0.25)';
        ctx.lineWidth = 2;
        ctx.strokeRect(18, 18, 764, 414);

        // Title text
        ctx.fillStyle = '#3b82f6';
        ctx.font = '900 12px monospace';
        ctx.fillText('CODEFLOW ALGORITHMIC PROFILE & CREDENTIALS', 50, 60);

        // User Display Name
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText(publicData.displayName, 50, 110);

        // Bio
        ctx.fillStyle = '#9ca3af';
        ctx.font = 'italic 15px sans-serif';
        const bioText = publicData.bio || 'CodeFlow Algorithmic Developer';
        ctx.fillText(bioText.length > 50 ? bioText.slice(0, 47) + '...' : bioText, 50, 140);

        // Stats Box
        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.fillRect(50, 185, 460, 190);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.lineWidth = 1;
        ctx.strokeRect(50, 185, 460, 190);

        // Solved problems count
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px monospace';
        ctx.fillText(String(publicData.solvedCount), 80, 240);
        ctx.fillStyle = '#9ca3af';
        ctx.font = '10px monospace';
        ctx.fillText('PROBLEMS SOLVED', 80, 260);

        // Traced count
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px monospace';
        ctx.fillText(String(publicData.totalTraced), 280, 240);
        ctx.fillStyle = '#9ca3af';
        ctx.font = '10px monospace';
        ctx.fillText('TRACES COMPLETED', 280, 260);

        // Streak count
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px monospace';
        ctx.fillText(String(publicData.streak) + ' days', 80, 320);
        ctx.fillStyle = '#9ca3af';
        ctx.font = '10px monospace';
        ctx.fillText('ACTIVE STREAK', 80, 340);

        // Mastery badge
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 28px monospace';
        ctx.fillText(String(publicData.achievements.length), 280, 320);
        ctx.fillStyle = '#9ca3af';
        ctx.font = '10px monospace';
        ctx.fillText('ACHIEVEMENTS EARNED', 280, 340);

        // Readiness Score badge
        ctx.fillStyle = 'rgba(59, 130, 246, 0.04)';
        ctx.beginPath();
        ctx.arc(630, 260, 85, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(630, 260, 85, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(630, 260, 85, -Math.PI / 2, (-Math.PI / 2) + (Math.PI * 2 * (publicData.readinessScore / 100)));
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 44px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(publicData.readinessScore) + '%', 630, 265);
        
        ctx.fillStyle = '#9ca3af';
        ctx.font = '900 11px monospace';
        ctx.fillText('READINESS SCORE', 630, 292);

        // Trigger download
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${publicData.displayName.replace(/\s+/g, '_')}_codeflow_achievement.png`;
        link.href = dataUrl;
        link.click();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-[100px] flex flex-col items-center justify-center text-text-muted gap-4">
                <DynamicBackground />
                <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <span className="text-sm font-bold tracking-widest uppercase font-mono">Resolving public credentials...</span>
            </div>
        );
    }

    if (error || !publicData) {
        return (
            <div className="min-h-screen pt-[100px] flex flex-col items-center justify-center p-6 text-center">
                <DynamicBackground />
                <div className="glass-morphism border border-white/5 rounded-2xl p-8 max-w-md shadow-2xl">
                    <Trophy size={48} className="text-red-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Profile Not Found</h3>
                    <p className="text-sm text-text-muted mb-6 leading-relaxed">
                        {error || "We couldn't locate any public profile matching this username."}
                    </p>
                    <button 
                        onClick={() => navigate('/')} 
                        className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-bold tracking-widest uppercase active:scale-95 transition-all"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-[100px] px-6 pb-12 bg-transparent text-text-primary relative overflow-x-hidden">
            <DynamicBackground />
            <canvas ref={canvasRef} className="hidden" />

            <div className="max-w-5xl mx-auto relative z-10">
                
                {/* Header Back Button */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-text-secondary hover:text-white transition-all text-xs font-bold font-mono mb-6 group cursor-pointer"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to dashboard
                </button>

                {/* Main Profile Summary Card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    
                    {/* Left Column: User bio and socials */}
                    <div className="lg:col-span-2 glass-morphism border border-white/5 rounded-2xl p-8 shadow-2xl flex flex-col justify-between">
                        <div className="flex items-start gap-6">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-secondary p-1 shadow-xl shrink-0">
                                <div className="w-full h-full bg-bg-panel rounded-full overflow-hidden flex items-center justify-center">
                                    {publicData.photoURL ? (
                                        <img src={publicData.photoURL} alt={publicData.displayName} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-4xl font-black text-white">{publicData.displayName[0].toUpperCase()}</span>
                                    )}
                                </div>
                            </div>
                            <div className="min-w-0">
                                <span className="text-[10px] font-black uppercase bg-primary/10 border border-primary/20 text-primary px-2.5 py-0.5 rounded-[4px] tracking-wider inline-block mb-2">VERIFIED ALGORITHMIC DEVELOPER</span>
                                <h1 className="text-3xl font-extrabold text-white tracking-tight leading-none mb-2">{publicData.displayName}</h1>
                                <p className="text-sm text-text-muted italic leading-relaxed">{publicData.bio || 'This user has not set a bio yet.'}</p>
                            </div>
                        </div>

                        {/* Social Links & Sharing */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/5 mt-8">
                            <div className="flex items-center gap-3">
                                {publicData.githubUrl && (
                                    <a href={publicData.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 hover:bg-white/10 hover:text-white rounded-xl border border-white/5 transition-all">
                                        <Github size={16} />
                                    </a>
                                )}
                                {publicData.linkedinUrl && (
                                    <a href={publicData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 hover:bg-white/10 hover:text-white rounded-xl border border-white/5 transition-all">
                                        <Linkedin size={16} />
                                    </a>
                                )}
                                {publicData.portfolioUrl && (
                                    <a href={publicData.portfolioUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 hover:bg-white/10 hover:text-white rounded-xl border border-white/5 transition-all">
                                        <Globe size={16} />
                                    </a>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        alert('Profile link copied to clipboard!');
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl text-xs font-bold text-text-secondary hover:text-white active:scale-95 transition-all cursor-pointer"
                                >
                                    <Share2 size={13} />
                                    Share Profile
                                </button>
                                <button
                                    onClick={exportAchievementCard}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 rounded-xl text-xs font-bold text-white shadow-lg shadow-primary/10 active:scale-95 transition-all cursor-pointer"
                                >
                                    <Download size={13} />
                                    Export Card
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Readiness ring widget */}
                    <div className="glass-morphism border border-white/5 rounded-2xl p-6 shadow-2xl flex flex-col justify-center items-center text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
                        <h3 className="text-xs font-black uppercase text-text-muted tracking-wider mb-6 font-mono">Overall Readiness Score</h3>
                        <div className="relative w-36 h-36 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <path
                                    className="text-white/5"
                                    strokeWidth="2.5"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                    className="text-primary transition-all duration-1000 ease-out"
                                    strokeDasharray={`${publicData.readinessScore}, 100`}
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            <div className="absolute text-center">
                                <span className="text-3xl font-black text-white font-mono">{publicData.readinessScore}%</span>
                                <span className="text-[9px] text-text-muted uppercase font-mono block tracking-wider mt-0.5">Ready for Mock Exams</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Overview row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: 'DSA Solved', val: publicData.solvedCount, desc: 'Flagship DSA problems', color: 'text-primary' },
                        { label: 'Execution Traces', val: publicData.totalTraced, desc: 'Graphs visualised', color: 'text-secondary' },
                        { label: 'Daily Streak', val: `${publicData.streak} days`, desc: 'Active momentum', color: 'text-accent-yellow' },
                        { label: 'Topic Masteries', val: publicData.topicProgress.filter(t => t.masteryScore >= 70).length, desc: 'Topics mastered', color: 'text-accent-green' }
                    ].map((stat, idx) => (
                        <div key={idx} className="glass-morphism border border-white/5 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                            <span className="text-[10px] font-black uppercase text-text-muted tracking-wider block font-mono">{stat.label}</span>
                            <span className={`text-2xl font-black block mt-2 font-mono ${stat.color}`}>{stat.val}</span>
                            <span className="text-[9px] text-text-muted mt-1 leading-tight block font-sans">{stat.desc}</span>
                        </div>
                    ))}
                </div>

                {/* Achievements List & Topic Mastery Coverage Split grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Achievements List (2 cols) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-morphism border border-white/5 rounded-2xl p-6 shadow-xl">
                            <h3 className="text-lg font-black flex items-center gap-2 mb-6 text-white tracking-tight">
                                <Award size={18} className="text-primary" />
                                Credentials & Achievements
                            </h3>
                            
                            {publicData.achievements.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {publicData.achievements.map((ach) => (
                                        <div key={ach.id} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all flex gap-3.5 items-start">
                                            <div className="p-2 bg-primary/10 border border-primary/20 text-primary rounded-xl shrink-0 mt-0.5">
                                                <Sparkles size={16} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-extrabold text-white leading-tight">{ach.name}</h4>
                                                <p className="text-[11px] text-text-muted leading-tight mt-1 font-sans">{ach.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-10 text-center text-text-muted font-mono border border-white/5 rounded-xl bg-white/[0.01]">
                                    <Lock className="mx-auto mb-2 opacity-30 animate-pulse" size={24} />
                                    <span>No credentials unlocked yet.</span>
                                    <p className="text-[10px] mt-1">Keep solving and tracing to unlock achievements!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Topic Mastery Coverage (1 col) */}
                    <div>
                        <div className="glass-morphism border border-white/5 rounded-2xl p-6 shadow-xl">
                            <h3 className="text-lg font-black flex items-center gap-2 mb-6 text-white tracking-tight">
                                <Code2 size={18} className="text-secondary" />
                                Algorithmic Coverage
                            </h3>
                            
                            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                                {publicData.topicProgress.map((tp) => (
                                    <div key={tp.topic} className="space-y-1">
                                        <div className="flex justify-between text-xs font-mono">
                                            <span className="font-extrabold text-white">{tp.topic}</span>
                                            <span className="text-text-muted">{tp.masteryScore}%</span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" 
                                                style={{ width: `${tp.masteryScore}%` }} 
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
