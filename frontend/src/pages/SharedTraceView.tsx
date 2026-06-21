import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Play, Pause, SkipBack, SkipForward, RotateCcw,
    ArrowLeft, Code2, AlertCircle, Info
} from 'lucide-react';
import { useExecutionStore } from '../store/executionStore';
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

    const {
        traceSteps,
        currentStepIndex,
        isPlaying,
        togglePlay,
        nextStep,
        prevStep,
        reset,
        setStep
    } = useExecutionStore();

    const stepsArray = traceSteps || [];
    const hasSteps = stepsArray.length > 0;
    const currentStep = hasSteps ? stepsArray[currentStepIndex] : null;

    useEffect(() => {
        const fetchSharedTrace = async () => {
            if (!shareId) return;
            setIsLoading(true);
            try {
                const res = await fetch(`${API_URL}/api/visualizations/shared/${shareId}`);
                if (!res.ok) {
                    throw new Error('Shared trace not found or expired');
                }
                const data = await res.json();
                
                // Initialize execution store state
                useExecutionStore.setState({
                    code: data.code,
                    language: data.language,
                    traceSteps: data.traceSteps,
                    traces: data.traceSteps,
                    currentStepIndex: 0,
                    isPlaying: false
                });

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
            useExecutionStore.setState({
                code: '',
                traceSteps: [],
                traces: [],
                currentStepIndex: 0,
                isPlaying: false
            });
        };
    }, [shareId]);

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
                <div className="glass-morphism border border-white/5 rounded-2xl p-8 max-w-md shadow-2xl">
                    <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Failed to load trace</h3>
                    <p className="text-sm text-text-muted mb-6 leading-relaxed">{error}</p>
                    <button 
                        onClick={() => navigate('/')} 
                        className="px-6 py-2.5 bg-primary hover:bg-primary/95 text-white rounded-xl text-xs font-bold tracking-widest uppercase active:scale-95 transition-all"
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
            <div className="max-w-[1440px] mx-auto w-full mb-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-text-secondary hover:text-white transition-all active:scale-95 cursor-pointer"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 rounded-[4px] tracking-wider font-mono">SHARED GRAPH</span>
                        </div>
                        <h1 className="text-xl font-extrabold text-white tracking-tight leading-none mt-1">{problemTitle}</h1>
                    </div>
                </div>
            </div>

            {/* Split layout: Editor on Left, Visualizer on Right */}
            <div className="max-w-[1440px] mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10 min-h-0">
                
                {/* Code Panel */}
                <div className="glass-morphism border border-white/5 rounded-2xl overflow-hidden flex flex-col h-[650px] lg:h-auto min-h-0">
                    <div className="px-5 py-3.5 bg-white/[0.02] border-b border-white/5 flex items-center gap-2 shrink-0">
                        <Code2 size={16} className="text-primary" />
                        <span className="text-xs font-extrabold text-white tracking-wider font-mono">Shared Execution Source</span>
                    </div>
                    <div className="flex-1 min-h-0 overflow-hidden relative">
                        <CodeEditor />
                    </div>
                </div>

                {/* Visualizer & Playback Panel */}
                <div className="flex flex-col gap-6 min-h-0">
                    
                    {/* Main Canvas view */}
                    <div className="flex-1 glass-morphism border border-white/5 rounded-2xl overflow-hidden relative h-[450px] lg:h-auto min-h-0">
                        <div className="absolute inset-0 bg-transparent">
                            <WhiteboardPanel />
                        </div>

                        {/* Playback HUD controls overlay */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[500px]">
                            <div className="glass-morphism bg-surface/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl px-5 py-3 flex items-center justify-between gap-4 select-none">
                                <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                        onClick={prevStep}
                                        disabled={!hasSteps || currentStepIndex <= 0}
                                        className="p-2 rounded-xl bg-white/5 border border-white/5 text-text-secondary hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer"
                                    >
                                        <SkipBack size={14} />
                                    </button>
                                    <button
                                        onClick={togglePlay}
                                        disabled={!hasSteps}
                                        className={`px-4 py-2 flex items-center gap-1 rounded-xl text-[10px] font-black tracking-widest transition-all border ${
                                            isPlaying
                                                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                                                : 'bg-primary/10 border-primary/30 text-primary'
                                        } cursor-pointer`}
                                    >
                                        {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
                                        {isPlaying ? 'PAUSE' : 'PLAY'}
                                    </button>
                                    <button
                                        onClick={nextStep}
                                        disabled={!hasSteps || currentStepIndex >= stepsArray.length - 1}
                                        className="p-2 rounded-xl bg-white/5 border border-white/5 text-text-secondary hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-all active:scale-95 cursor-pointer"
                                    >
                                        <SkipForward size={14} />
                                    </button>
                                    <button
                                        onClick={reset}
                                        className="p-2 rounded-xl bg-white/5 border border-white/5 text-text-secondary hover:text-red-400 transition-all active:scale-95 cursor-pointer"
                                    >
                                        <RotateCcw size={14} />
                                    </button>
                                </div>

                                <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                                    <div className="flex justify-between text-[8px] font-black text-text-muted uppercase tracking-wider font-mono">
                                        <span>Progression</span>
                                        <span>{currentStepIndex + 1} / {stepsArray.length}</span>
                                    </div>
                                    <input 
                                        type="range"
                                        min={0}
                                        max={stepsArray.length - 1}
                                        value={currentStepIndex}
                                        onChange={(e) => setStep(Number(e.target.value))}
                                        className="w-full accent-primary bg-white/10 h-1 rounded-lg cursor-pointer outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step Explanations & Variable HUD panel */}
                    <div className="glass-morphism border border-white/5 rounded-2xl p-5 shrink-0 flex flex-col justify-between min-h-[140px] max-h-[200px] overflow-hidden">
                        <div className="flex items-center gap-1.5 text-text-muted mb-2 font-mono text-[9px] font-black uppercase tracking-widest">
                            <Info size={12} />
                            <span>Execution Log</span>
                        </div>
                        <div className="flex-1 overflow-y-auto pr-1">
                            {currentStep ? (
                                <div className="space-y-2">
                                    <p className="text-sm font-bold text-white leading-relaxed">
                                        {currentStep.explanation || currentStep.annotation || "Executing statement..."}
                                    </p>
                                    {currentStep.variables && Object.keys(currentStep.variables).length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
                                            {Object.entries(currentStep.variables).map(([k, v]) => (
                                                <span key={k} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-text-secondary">
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
        </div>
    );
}
