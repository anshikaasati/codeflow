import { useState, useRef, useEffect } from 'react';
import { Brain, X, Send, Sparkles, User, RefreshCw, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '../../../config/api';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface AiTutorWidgetProps {
    code: string;
    language: string;
    traceSteps: any[];
    currentStepIndex: number | null;
    user: any;
}

const getIdTokenWithRetry = async (user: any, retries = 3, delayMs = 800): Promise<string> => {
    let lastError: any = null;
    for (let i = 0; i < retries; i++) {
        try {
            return await user.getIdToken();
        } catch (err: any) {
            lastError = err;
            const isNetworkError = err.code === 'auth/network-request-failed' || 
                                   err.message?.includes('network-request-failed') ||
                                   err.message?.includes('auth/network-request-failed');
            if (!isNetworkError) {
                throw err;
            }
            console.warn(`Firebase token fetch failed (attempt ${i + 1}/${retries}). Retrying...`, err);
            if (i < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, delayMs * (i + 1))); // Exponential backoff
            }
        }
    }
    
    // Local dev fallback if network fails
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.warn('Firebase token fetch network request failed on localhost. Falling back to dev-mock-token.');
        return 'dev-mock-token';
    }
    
    throw lastError || new Error('Authentication network request failed');
};

export default function AiTutorWidget({ code, language, traceSteps, currentStepIndex, user }: AiTutorWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Hi! I'm your CodeFlow AI Tutor. Ask me anything about your code, explain a specific trace step, or request a Socratic hint!"
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSend = async (textToSend: string) => {
        if (!textToSend.trim() || !user || isLoading) return;

        setError(null);
        const newUserMsg: Message = { role: 'user', content: textToSend };
        setMessages(prev => [...prev, newUserMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const token = await getIdTokenWithRetry(user);
            const res = await fetch(`${API_URL}/api/ai/tutor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    code,
                    language,
                    traceSteps,
                    currentStepIndex,
                    chatHistory: messages,
                    message: textToSend
                })
            });

            const data = await res.json();
            if (data?.success && data.response) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
            } else {
                throw new Error(data.message || 'Failed to get response');
            }
        } catch (err: any) {
            console.error('AI Tutor Query Error:', err);
            const isAuthNetworkError = err.code === 'auth/network-request-failed' || 
                                       err.message?.includes('network-request-failed') ||
                                       err.message?.includes('auth/network-request-failed');
            const friendlyMessage = isAuthNetworkError
                ? 'Network connection error: Unable to authenticate with server. Please check your internet connection and try again.'
                : (err.message || 'Failed to connect to AI Tutor');
            setError(friendlyMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const loadPromptChip = (text: string) => {
        handleSend(text);
    };

    const currentLineContent = currentStepIndex !== null && traceSteps[currentStepIndex]
        ? traceSteps[currentStepIndex].lineContent?.trim()
        : null;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all border border-white/10"
            >
                {isOpen ? <X size={24} /> : <Brain size={24} className="animate-pulse" />}
            </motion.button>

            {/* Chat Widget Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-18 right-0 w-[350px] sm:w-[400px] h-[500px] glass-morphism border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden bg-bg-panel/95"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/5 bg-surface/40 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-primary/20 text-primary">
                                    <Sparkles size={16} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-white uppercase tracking-wider">AI Tutor</h4>
                                    <span className="text-[9px] font-bold text-accent-green font-mono flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-ping" />
                                        Context Injected
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 text-text-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Message Feed */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar select-text">
                            {messages.map((msg, idx) => {
                                const isAI = msg.role === 'assistant';
                                return (
                                    <div key={idx} className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}>
                                        {isAI && (
                                            <div className="w-8 h-8 rounded-full bg-primary/25 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                                                <Brain size={14} />
                                            </div>
                                        )}
                                        <div className={`p-3.5 rounded-2xl text-[12px] leading-relaxed max-w-[80%] ${
                                            isAI
                                                ? 'bg-surface border border-border-subtle text-text-secondary rounded-tl-sm'
                                                : 'bg-primary text-white rounded-tr-sm shadow-md shadow-primary/10'
                                        }`}>
                                            <div className="whitespace-pre-wrap">{msg.content}</div>
                                        </div>
                                        {!isAI && (
                                            <div className="w-8 h-8 rounded-full bg-secondary/25 border border-secondary/20 flex items-center justify-center text-secondary shrink-0">
                                                <User size={14} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {isLoading && (
                                <div className="flex gap-3 justify-start">
                                    <div className="w-8 h-8 rounded-full bg-primary/25 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                                        <Brain size={14} />
                                    </div>
                                    <div className="p-3.5 rounded-2xl bg-surface border border-border-subtle text-[12px] text-text-muted rounded-tl-sm flex items-center gap-2">
                                        <RefreshCw className="animate-spin text-primary" size={14} />
                                        Thinking...
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center gap-2">
                                    <AlertCircle size={14} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div ref={chatEndRef} />
                        </div>

                        {/* Context Chips & Suggestions */}
                        <div className="px-4 py-2 border-t border-white/5 bg-surface/20 space-y-2 shrink-0">
                            <span className="text-[8px] font-black text-text-muted uppercase tracking-wider block font-mono">Suggested Questions</span>
                            <div className="flex flex-wrap gap-1.5 max-h-[60px] overflow-y-auto pr-1">

                                {currentLineContent && (
                                    <button
                                        onClick={() => loadPromptChip(`Explain what is happening on current line: "${currentLineContent}"`)}
                                        className="text-[9px] font-bold px-2 py-1 bg-white/5 hover:bg-primary/15 hover:text-primary rounded-lg border border-white/5 transition-all text-left truncate max-w-full"
                                    >
                                        Explain current line: "{currentLineContent}"
                                    </button>
                                )}
                                <button
                                    onClick={() => loadPromptChip("Analyze my code. Is it optimal? What is the Time and Space complexity?")}
                                    className="text-[9px] font-bold px-2 py-1 bg-white/5 hover:bg-primary/15 hover:text-primary rounded-lg border border-white/5 transition-all"
                                >
                                    Am I optimal?
                                </button>
                                <button
                                    onClick={() => loadPromptChip("Can you give me a subtle hint on how to solve/optimize this problem?")}
                                    className="text-[9px] font-bold px-2 py-1 bg-white/5 hover:bg-primary/15 hover:text-primary rounded-lg border border-white/5 transition-all"
                                >
                                    Give me a hint
                                </button>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/5 bg-surface/30">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend(input);
                                }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask AI Tutor..."
                                    className="flex-1 bg-bg-main border border-white/10 rounded-xl px-3.5 py-2 text-[12px] font-bold text-white placeholder-text-muted outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-mono"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="p-2 bg-primary hover:bg-primary/90 text-white rounded-xl transition-all shadow-md shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                                >
                                    <Send size={16} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
