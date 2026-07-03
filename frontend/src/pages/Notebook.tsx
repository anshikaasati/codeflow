import { motion } from 'framer-motion';
import { PenTool } from 'lucide-react';
import DynamicBackground from '../components/DynamicBackground';

export default function Notebook() {
    return (
        <div className="min-h-screen pt-[120px] px-6 pb-12 bg-transparent text-text-primary relative overflow-x-hidden flex items-center justify-center">
            <DynamicBackground />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-[#282828] border border-white/5 rounded-2xl p-8 text-center shadow-2xl relative z-10"
            >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 text-primary">
                    <PenTool size={32} />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight mb-2">Developer Notebook</h2>
                <p className="text-text-muted text-xs font-mono leading-relaxed mb-6">
                    A private workspace to write notes, document patterns, and scribble algorithms. Syncs directly with your code traces.
                </p>
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-left font-mono text-[10px] text-text-muted mb-6">
                    <span className="text-primary font-bold block mb-1">// Quick Tip</span>
                    Use this notebook to outline your brute force ideas before coding in the playground.
                </div>
                <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[9px] font-black uppercase text-text-secondary tracking-widest">
                    Coming Soon
                </span>
            </motion.div>
        </div>
    );
}
