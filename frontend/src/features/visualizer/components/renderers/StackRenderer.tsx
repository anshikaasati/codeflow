import { motion, AnimatePresence } from 'framer-motion';
import type { StackQueueVisual } from '../../../../types';
import './renderers.css';

interface StackRendererProps {
    visual: StackQueueVisual;
    className?: string;
}

export default function StackRenderer({ visual, className = '' }: StackRendererProps) {
    const { target, elements = [], pointers = [], activeIndices = [] } = visual;

    return (
        <div className={`stack-visualizer flex flex-col items-center justify-center w-full h-full relative ${className}`}>
            <div className="text-sm font-semibold text-accent-purple mb-4 font-mono tracking-widest uppercase pb-1.5 border-b border-white/5">
                {target} <span className="text-text-muted text-xs normal-case">(stack)</span>
            </div>

            <div 
                className="relative flex flex-col-reverse items-center gap-2 p-6 bg-slate-950/20 border-2"
                style={{ 
                    minWidth: '140px', 
                    minHeight: '320px',
                    borderColor: 'rgba(51, 65, 85, 0.4)',
                    borderRadius: '0 0 20px 20px',
                    borderTopColor: 'rgba(51, 65, 85, 0.15)',
                    boxShadow: 'inset 0 4px 30px rgba(0, 0, 0, 0.2)'
                }}
            >
                <AnimatePresence initial={false}>
                    {elements.length === 0 ? (
                        <motion.div 
                            key="empty-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center text-text-muted italic text-xs font-mono select-none"
                        >
                            Empty stack
                        </motion.div>
                    ) : (
                        elements.map((el, i) => {
                            const isActive = activeIndices.includes(i);
                            const isTop = i === elements.length - 1;

                            return (
                                <motion.div 
                                    key={`${el}-${i}`}
                                    initial={{ y: -200, opacity: 0, scale: 0.9 }}
                                    animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                    exit={{ y: -120, opacity: 0, scale: 0.8 }}
                                    transition={{ type: 'spring', stiffness: 140, damping: 15 }}
                                    layout
                                    className={`relative flex items-center justify-center rounded-xl border-2 font-mono font-black select-none shadow-md backdrop-blur-sm transition-colors duration-300
                                        ${isActive 
                                            ? 'border-accent-purple bg-accent-purple/10 text-accent-purple shadow-glow' 
                                            : 'border-white/10 bg-slate-900/60 text-[#cdd6f4]'
                                        }`}
                                    style={{
                                        width: '100px',
                                        height: '42px',
                                        flexShrink: 0
                                    }}
                                >
                                    <span>{String(el).substring(0, 5)}</span>

                                    {/* Position Indicators */}
                                    {pointers.length === 0 && (
                                        <div className="absolute font-mono text-[8px] font-black text-orange-400 whitespace-nowrap tracking-wider uppercase left-[110%]">
                                            {isTop && '← TOP'}
                                        </div>
                                    )}

                                    {/* Custom labels */}
                                    {pointers.filter(p => p.index === i).map((p) => (
                                        <div 
                                            key={p.name} 
                                            className="absolute font-mono text-[8px] font-black whitespace-nowrap tracking-wider uppercase right-[110%]"
                                            style={{ color: p.color || 'var(--color-accent-orange)' }}
                                        >
                                            {p.name} →
                                        </div>
                                    ))}
                                </motion.div>
                            );
                        })
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
