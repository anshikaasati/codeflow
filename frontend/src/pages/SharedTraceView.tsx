import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Play, Pause, SkipBack, SkipForward, RotateCcw,
    ArrowLeft, Code2, AlertCircle, Info, Maximize2, Minimize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExecutionStore } from '../store/executionStore';
import { useLanguageStore } from '../store/languageStore';
import WhiteboardPanel from '../features/visualizer/components/panels/WhiteboardPanel';
import CodeEditor from '../features/visualizer/components/CodeEditor';
import DynamicBackground from '../components/DynamicBackground';
import { API_URL } from '../config/api';

export default function SharedTraceView() {
    const { shareId } = useParams<{ shareId: string }>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [problemTitle, setProblemTitle] = useState('Shared Sandbox Trace');
    const [isCanvasFullscreen, setIsCanvasFullscreen] = useState(false);

    const {
        traceSteps,
        currentStepIndex,
        isPlaying,
        speed,
        togglePlay,
        nextStep,
        prevStep,
        setStep,
        setSpeed
    } = useExecutionStore();

    const stepsArray = traceSteps || [];
    const hasSteps = stepsArray.length > 0;
    const currentStep = hasSteps ? stepsArray[currentStepIndex] : null;

    useEffect(() => {
        const fetchSharedTrace = async () => {
            if (!shareId) return;
            setIsLoading(true);
            try {
                const res = await fetch(`${API_URL}/share/${shareId}`);
                if (!res.ok) {
                    throw new Error('Shared trace not found or expired');
                }
                const data = await res.json();
                
                // Initialize execution store state
                useExecutionStore.setState({
                    code: data.code,
                    traceSteps: data.traceSteps,
                    traces: data.traceSteps,
                    currentStepIndex: 0,
                    isPlaying: false,
                    traceMode: true
                });
                // Language lives in the language store
                if (data.language) {
                    useLanguageStore.setState({ currentLanguage: data.language });
                }

                if (data.problemId && data.problemId !== 'sandbox') {
                    const formatted = data.problemId
                        .split('-')
                        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' ');
                    setProblemTitle(formatted);
                }
            } catch (err: any) {
                setError(err.message || 'Failed to load shared trace');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSharedTrace();

        return () => {
            // Clean up execution store state on unmount
            useExecutionStore.getState().reset();
        };
    }, [shareId]);

    // Handle Escape key to exit fullscreen mode
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isCanvasFullscreen) {
                setIsCanvasFullscreen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isCanvasFullscreen]);

    const handleRewind = () => {
        setStep(0);
        if (isPlaying) {
            togglePlay();
        }
    };

    const cycleSpeed = () => {
        if (speed === 1000) setSpeed(500); // 1.0x -> 2.0x
        else if (speed === 500) setSpeed(250); // 2.0x -> 4.0x
        else if (speed === 250) setSpeed(1000); // 4.0x -> 1.0x
        else setSpeed(500);
    };

    const getSpeedLabel = () => {
        if (speed === 1000) return '1.0x';
        if (speed === 500) return '2.0x';
        if (speed === 250) return '4.0x';
        return ((1050 - speed) / 500).toFixed(1) + 'x';
    };

    const renderPlaybackControls = () => {
        return (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-[550px]">
                <div className="liquid-glass-card bg-surface/85 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl px-5 py-3 flex items-center justify-between gap-5 select-none">
                    {/* Playback Buttons */}
                    <div className="flex items-center gap-1.5 shrink-0">
                        <button
                            onClick={prevStep}
                            disabled={!hasSteps || currentStepIndex <= 0}
                            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-text-secondary hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer"
                            title="Previous Step"
                        >
                            <SkipBack size={14} />
                        </button>
                        <button
                            onClick={togglePlay}
                            disabled={!hasSteps}
                            className={`group w-20 h-8 flex items-center justify-center gap-1 rounded-xl text-[9px] font-black tracking-widest transition-all disabled:opacity-20 disabled:cursor-not-allowed border cursor-pointer active:scale-95 ${
                                isPlaying
                                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/25'
                                    : 'bg-primary/10 border-primary/30 text-primary hover:bg-primary/25'
                            }`}
                        >
                            {isPlaying ? <><Pause size={12} fill="currentColor" /> PAUSE</> : <><Play size={12} fill="currentColor" /> PLAY</>}
                        </button>
                        <button
                            onClick={nextStep}
                            disabled={!hasSteps || currentStepIndex >= stepsArray.length - 1}
                            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-text-secondary hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer"
                            title="Next Step"
                        >
                            <SkipForward size={14} />
                        </button>
                        <button
                            onClick={handleRewind}
                            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-text-secondary hover:text-red-400 transition-all active:scale-95 cursor-pointer"
                            title="Rewind to Start"
                        >
                            <RotateCcw size={14} />
                        </button>
                        <button
                            onClick={cycleSpeed}
                            className="h-8 px-2 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-text-secondary hover:text-cyan-400 font-mono text-[9px] font-bold tracking-wider transition-all active:scale-95 cursor-pointer"
                            title="Speed multiplier"
                        >
                            {getSpeedLabel()}
                        </button>
                    </div>

                    {/* Scrubber / Slider */}
                    <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                        <div className="flex justify-between items-center text-[8px] font-black text-text-muted uppercase tracking-wider font-mono">
                            <span>Progression</span>
                            <span>{currentStepIndex + 1} / {stepsArray.length}</span>
                        </div>
                        <input 
                            type="range"
                            min={0}
                            max={stepsArray.length - 1}
                            value={currentStepIndex}
                            onChange={(e) => setStep(Number(e.target.value))}
                            className="w-full accent-primary bg-white/10 h-1.5 rounded-lg cursor-pointer outline-none hover:bg-white/15 transition-all"
                        />
                    </div>
                </div>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-[100px] flex flex-col items-center justify-center text-text-muted gap-4">
                <DynamicBackground />
                <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <span className="text-sm font-bold tracking-widest uppercase font-mono">Restoring shared execution graph...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen pt-[100px] flex flex-col items-center justify-center p-6 text-center">
                <DynamicBackground />
                <div className="liquid-glass-card border border-white/5 rounded-2xl p-8 max-w-md shadow-2xl">
                    <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Failed to load trace</h3>
                    <p className="text-sm text-text-muted mb-6 leading-relaxed">{error}</p>
                    <button 
                        onClick={() => navigate('/')} 
                        className="px-6 py-2.5 bg-primary hover:bg-primary/95 text-white rounded-xl text-xs font-bold tracking-widest uppercase active:scale-95 transition-all cursor-pointer"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-[80px] px-6 pb-12 bg-transparent text-text-primary relative overflow-hidden flex flex-col">
            <DynamicBackground />
            
            {/* Header / Meta section */}
            <div className="max-w-[1440px] mx-auto w-full mb-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-text-secondary hover:text-white transition-all active:scale-95 cursor-pointer"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase bg-primary/10 border border-primary/20 text-primary px-2.5 py-0.5 rounded-[4px] tracking-wider font-mono">SHARED GRAPH</span>
                        </div>
                        <h1 className="text-xl font-extrabold text-white tracking-tight leading-none mt-1.5">{problemTitle}</h1>
                    </div>
                </div>
            </div>

            {/* Split layout: Editor on Left, Visualizer on Right */}
            <div className="max-w-[1440px] mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10 min-h-0">
                
                {/* Code Panel */}
                <div className="liquid-glass-card border border-white/5 rounded-2xl overflow-hidden flex flex-col h-[600px] lg:h-auto min-h-0 bg-[#0B1120]/45">
                    <div className="px-5 py-3.5 bg-white/[0.02] border-b border-white/5 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2">
                            <Code2 size={16} className="text-primary" />
                            <span className="text-xs font-extrabold text-white tracking-wider font-mono">Shared Execution Source</span>
                        </div>
                        <span className="text-[10px] font-bold text-text-muted bg-white/5 px-2 py-0.5 rounded border border-white/5 font-mono uppercase">
                            {useLanguageStore.getState().currentLanguage}
                        </span>
                    </div>
                    <div className="flex-1 min-h-0 overflow-hidden relative">
                        <CodeEditor readOnly={true} />
                    </div>
                </div>

                {/* Visualizer & Playback Panel */}
                <div className="flex flex-col gap-6 min-h-0">
                    
                    {/* Main Canvas view */}
                    <div className="flex-1 liquid-glass-card border border-white/5 rounded-2xl overflow-hidden relative h-[450px] lg:h-auto min-h-0 bg-[#0B1120]/45">
                        {/* Canvas Panel Header */}
                        <div className="absolute top-4 left-4 z-30 flex items-center justify-between w-[calc(100%-2rem)] pointer-events-none">
                            <div className="flex items-center gap-2 bg-[#0b0f19]/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 shadow-lg pointer-events-auto">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                <span className="text-[10px] font-black text-white tracking-widest uppercase font-mono">Whiteboard Canvas</span>
                            </div>
                            
                            <div className="flex items-center gap-2 pointer-events-auto">
                                <button 
                                    onClick={() => setIsCanvasFullscreen(true)}
                                    className="p-2 text-text-muted hover:text-white bg-[#0b0f19]/80 backdrop-blur-md border border-white/10 hover:border-primary/40 rounded-xl transition-all shadow-lg cursor-pointer active:scale-95"
                                    title="Enlarge Canvas"
                                >
                                    <Maximize2 size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="absolute inset-0 bg-transparent">
                            <WhiteboardPanel />
                        </div>

                        {/* Playback HUD controls overlay */}
                        {renderPlaybackControls()}
                    </div>

                    {/* Step Explanations & Variable HUD panel */}
                    <div className="liquid-glass-card border border-white/5 rounded-2xl p-5 shrink-0 flex flex-col justify-between min-h-[140px] max-h-[200px] overflow-hidden bg-[#0B1120]/45">
                        <div className="flex items-center gap-1.5 text-text-muted mb-2 font-mono text-[9px] font-black uppercase tracking-widest">
                            <Info size={12} />
                            <span>Execution Log</span>
                        </div>
                        <div className="flex-1 overflow-y-auto pr-1">
                            {currentStep ? (
                                <div className="space-y-2">
                                    <p className="text-sm font-bold text-white leading-relaxed">
                                        {currentStep.teacherNote?.what || currentStep.teacherNote?.why || 'Executing statement...'}
                                    </p>
                                    {currentStep.variables && Object.keys(currentStep.variables).length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
                                            {Object.entries(currentStep.variables).map(([k, v]) => (
                                                <span key={k} className="px-2.5 py-0.5 rounded bg-white/5 border border-white/5 text-text-secondary">
                                                    <span className="text-secondary font-bold">{k}</span>: <span className="text-white">{JSON.stringify(v)}</span>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-xs text-text-muted italic leading-relaxed font-mono">No active trace step.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Fullscreen Canvas Overlay */}
            <AnimatePresence>
                {isCanvasFullscreen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-[#070b13]"
                    >
                        {/* Canvas fills background */}
                        <div className="w-full h-full relative z-0">
                            <WhiteboardPanel />
                            {renderPlaybackControls()}
                        </div>

                        {/* Controls on top with very high z-index */}
                        <div className="absolute top-6 right-6 z-[300] flex items-center gap-3">
                            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] bg-[#0b0f19]/90 px-4 py-2.5 rounded-xl border border-white/10 backdrop-blur-xl shadow-2xl">
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
                                <Minimize2 size={24} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
