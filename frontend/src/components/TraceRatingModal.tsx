import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Send } from 'lucide-react';
import { useLearningStore } from '../store/learningStore';
import { useLanguageStore } from '../store/languageStore';

interface TraceRatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    problemId: string;
    problemTitle?: string;
}

export default function TraceRatingModal({ isOpen, onClose, problemId, problemTitle = 'Algorithm' }: TraceRatingModalProps) {
    const { submitTraceRating } = useLearningStore();
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
    const [reviewText, setReviewText] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setRating(0);
            setHoveredRating(0);
            setDifficulty(null);
            setReviewText('');
            setSubmitted(false);
        }
    }, [isOpen]);

    const getWordCount = (text: string) => {
        return text.trim().split(/\s+/).filter(Boolean).length;
    };

    const wordCount = getWordCount(reviewText);
    const isReviewValid = wordCount >= 25;
    const canSubmit = rating > 0 && difficulty !== null && isReviewValid;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;
        setIsSubmitting(true);
        try {
            const language = useLanguageStore.getState().preferredLanguage;
            await submitTraceRating(problemId, rating, difficulty, reviewText, language);
            setSubmitted(true);
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err) {
            console.error('Failed to submit trace rating:', err);
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-sm liquid-glass-card shadow-2xl z-10 overflow-hidden"
                    >
                        <div className="h-1 bg-gradient-to-r from-primary via-accent-cyan to-accent-green w-full" />
                        
                        <div className="p-6">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-1.5 text-text-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <X size={16} />
                            </button>

                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-6 space-y-2"
                                    >
                                        <div className="text-3xl">🎉</div>
                                        <h4 className="text-base font-black text-white">Thank You!</h4>
                                        <p className="text-xs text-text-secondary font-mono">Your rating has been saved.</p>
                                    </motion.div>
                                ) : (
                                    <form key="form" onSubmit={handleSubmit} className="space-y-5">
                                        <div>
                                            <h3 className="text-lg font-black text-white leading-tight">Rate Trace Explanation</h3>
                                            <p className="text-[11px] text-text-secondary mt-1 font-mono">
                                                Problem: <span className="text-primary font-bold">{problemTitle}</span>
                                            </p>
                                        </div>

                                        {/* Stars */}
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-wider text-text-muted font-mono block">
                                                How helpful was this visual trace?
                                            </label>
                                            <div className="flex gap-1.5">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                        onMouseEnter={() => setHoveredRating(star)}
                                                        onMouseLeave={() => setHoveredRating(0)}
                                                        className="transition-transform active:scale-90"
                                                    >
                                                        <Star
                                                            size={24}
                                                            fill={star <= (hoveredRating || rating) ? 'currentColor' : 'none'}
                                                            className={`transition-colors ${
                                                                star <= (hoveredRating || rating)
                                                                    ? 'text-accent-yellow'
                                                                    : 'text-text-muted'
                                                            }`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Perceived Difficulty */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-wider text-text-muted font-mono block">
                                                Rate Perceived Difficulty
                                            </label>
                                            <div className="flex gap-2">
                                                {[
                                                    { value: 'easy', label: 'Easy', color: 'hover:bg-accent-green/20 hover:text-accent-green hover:border-accent-green/40' },
                                                    { value: 'medium', label: 'Medium', color: 'hover:bg-accent-orange/20 hover:text-accent-orange hover:border-accent-orange/40' },
                                                    { value: 'hard', label: 'Hard', color: 'hover:bg-accent-red/20 hover:text-accent-red hover:border-accent-red/40' }
                                                ].map((diff) => (
                                                    <button
                                                        key={diff.value}
                                                        type="button"
                                                        onClick={() => setDifficulty(diff.value as any)}
                                                        className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                                                            difficulty === diff.value
                                                                ? 'bg-primary/20 text-primary border-primary/40'
                                                                : 'border-white/5 text-text-secondary ' + diff.color
                                                        }`}
                                                    >
                                                        {diff.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Written Review */}
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between items-center">
                                                <label className="text-[10px] font-black uppercase tracking-wider text-text-muted font-mono block">
                                                    Write a short review
                                                </label>
                                                <span className={`text-[10px] font-bold font-mono ${wordCount >= 25 ? 'text-accent-green' : 'text-accent-red'}`}>
                                                    {wordCount} / 25 words
                                                </span>
                                            </div>
                                            <textarea
                                                value={reviewText}
                                                onChange={(e) => setReviewText(e.target.value)}
                                                placeholder="What did you think of the visual explanation and code walk-through? (min. 25 words)"
                                                className="w-full h-20 px-3 py-2 text-xs text-text-primary bg-slate-900/60 border border-white/5 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none resize-none font-sans"
                                                required
                                            />
                                        </div>

                                        {/* Submit button */}
                                        <button
                                            type="submit"
                                            disabled={!canSubmit || isSubmitting}
                                            className="w-full py-2.5 bg-primary text-white text-xs font-black rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                                        >
                                            <Send size={12} />
                                            {isSubmitting ? 'Submitting...' : 'Submit Rating'}
                                        </button>
                                    </form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
