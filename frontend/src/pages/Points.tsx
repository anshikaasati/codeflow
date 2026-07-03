import { motion } from 'framer-motion';
import { Award, Zap } from 'lucide-react';
import DynamicBackground from '../components/DynamicBackground';

export default function Points() {
    return (
        <div className="min-h-screen pt-[120px] px-6 pb-12 bg-transparent text-text-primary relative overflow-x-hidden flex items-center justify-center">
            <DynamicBackground />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-[#282828] border border-white/5 rounded-2xl p-8 text-center shadow-2xl relative z-10"
            >
                <div className="w-16 h-16 rounded-2xl bg-accent-yellow/10 border border-accent-yellow/20 flex items-center justify-center mx-auto mb-6 text-accent-yellow">
                    <Award size={32} />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight mb-2">My Coding Points</h2>
                <p className="text-text-muted text-xs font-mono leading-relaxed mb-6">
                    Earn points by solving daily challenges, completing visualizer traces, and maintaining your coding streak. Use points to unlock advanced themes.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl font-mono">
                        <span className="block text-2xl font-black text-white">450</span>
                        <span className="text-[9px] text-text-muted uppercase font-bold tracking-wider">Total Points</span>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl font-mono">
                        <span className="block text-2xl font-black text-white flex items-center justify-center gap-1">
                            <Zap size={16} className="text-accent-yellow fill-accent-yellow" />
                            17
                        </span>
                        <span className="text-[9px] text-text-muted uppercase font-bold tracking-wider">Active Streak</span>
                    </div>
                </div>
                <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[9px] font-black uppercase text-text-secondary tracking-widest">
                    Pioneer League
                </span>
            </motion.div>
        </div>
    );
}
