import DynamicBackground from '../components/DynamicBackground';

export default function Progress() {
    return (
        <div className="min-h-screen pt-[100px] px-6 pb-12 bg-transparent text-text-primary relative overflow-x-hidden">
            <DynamicBackground />
            
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-white tracking-tight">Learning Progress</h1>
                    <p className="text-xs text-text-muted mt-1 font-mono">Detailed statistics and simulated LeetCode-style metrics</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Contest Rating Card */}
                    <div className="lg:col-span-2 bg-[#282828] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-[220px]">
                        <div>
                            <div className="flex justify-between items-start font-mono">
                                <div>
                                    <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider block">Contest Rating</span>
                                    <span className="text-3xl font-black text-white">1,414</span>
                                </div>
                                <div className="text-right text-[10px] text-text-muted">
                                    <div>Global Ranking</div>
                                    <div className="font-bold text-white"><span className="text-primary font-black">688,967</span> / 874,367</div>
                                    <div className="mt-1">Attended <span className="font-bold text-white">1</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Line Chart representation */}
                        <div className="w-full h-24 mt-4 relative">
                            <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4"/>
                                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0"/>
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M0,80 Q50,75 100,85 T200,60 T300,50 T400,65 T500,45"
                                    fill="none"
                                    stroke="#3b82f6"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M0,80 Q50,75 100,85 T200,60 T300,50 T400,65 T500,45 L500,100 L0,100 Z"
                                    fill="url(#chartGrad)"
                                />
                                <circle cx="500" cy="45" r="4.5" fill="#3b82f6" stroke="#282828" strokeWidth="1.5" />
                                <text x="475" y="32" fill="#8a92a6" fontSize="8" fontFamily="monospace">1,414</text>
                            </svg>
                            <span className="absolute bottom-0 left-0 text-[8px] text-text-muted font-mono">Jul 2025</span>
                        </div>
                    </div>

                    {/* Top percentage distribution card */}
                    <div className="bg-[#282828] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-[220px]">
                        <div>
                            <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider block font-mono">Contest Standing</span>
                            <span className="text-3xl font-black text-white">Top 79.1%</span>
                        </div>

                        {/* Vertical Bar Chart */}
                        <div className="h-24 flex items-end justify-between gap-1.5 mt-4 relative">
                            {[15, 25, 45, 78, 65, 50, 42, 30, 20, 15, 10, 8, 5].map((val, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center">
                                    <div
                                        className={`w-full rounded-t-[2px] transition-all ${i === 3 ? 'bg-[#ff9f0a] shadow-sm shadow-[#ff9f0a]/30' : 'bg-[#404040]'}`}
                                        style={{ height: `${val}%` }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Solved Donut card */}
                    <div className="lg:col-span-2 bg-[#282828] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-around gap-6 min-h-[200px]">
                        {/* Solved Ring Chart */}
                        <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <circle
                                    className="text-white/5"
                                    strokeWidth="3.5"
                                    stroke="currentColor"
                                    fill="none"
                                    cx="18" cy="18" r="15.915"
                                />
                                {/* Segmented green progress ring */}
                                <circle
                                    className="text-[#00b8a3]"
                                    strokeDasharray="8 100"
                                    strokeDashoffset="0"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="none"
                                    cx="18" cy="18" r="15.915"
                                />
                            </svg>
                            <div className="absolute text-center">
                                <span className="text-2xl font-black text-white font-mono block leading-none">311</span>
                                <span className="text-[10px] text-text-muted font-bold block mt-1 font-mono uppercase">/ 3972</span>
                                <span className="text-[9px] text-[#00b8a3] font-bold block mt-0.5 font-mono uppercase">Solved</span>
                            </div>
                        </div>

                        {/* Difficulty breakdown list */}
                        <div className="flex-1 w-full space-y-3 font-mono text-xs">
                            <div className="p-3 bg-[#1e1e1e] border border-white/5 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#00b8a3]" />
                                    <span className="font-extrabold text-white">Easy</span>
                                </div>
                                <span className="text-text-secondary"><span className="text-white font-bold">111</span> / 951</span>
                            </div>

                            <div className="p-3 bg-[#1e1e1e] border border-white/5 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffc01e]" />
                                    <span className="font-extrabold text-white">Medium</span>
                                </div>
                                <span className="text-text-secondary"><span className="text-white font-bold">171</span> / 2074</span>
                            </div>

                            <div className="p-3 bg-[#1e1e1e] border border-white/5 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff2d55]" />
                                    <span className="font-extrabold text-white">Hard</span>
                                </div>
                                <span className="text-text-secondary"><span className="text-white font-bold">29</span> / 947</span>
                            </div>
                        </div>
                    </div>

                    {/* Badges Card */}
                    <div className="bg-[#282828] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-[200px]">
                        <div className="flex justify-between items-center font-mono mb-4">
                            <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider block">Badges</span>
                            <span className="text-sm font-black text-white">2</span>
                        </div>

                        {/* Custom SVG Badges */}
                        <div className="flex items-center justify-center gap-6 py-2">
                            {/* 50 Days Badge */}
                            <div className="flex flex-col items-center group cursor-help" title="50 Days Active Badge 2025">
                                <svg className="w-16 h-16 transition-transform group-hover:scale-110" viewBox="0 0 100 100">
                                    <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="#1e293b" stroke="#00b8a3" strokeWidth="3" />
                                    <polygon points="50,12 88,30 88,70 50,88 12,70 12,30" fill="#0f172a" />
                                    <circle cx="50" cy="50" r="22" fill="#00b8a3" fillOpacity="0.1" />
                                    <text x="50" y="47" textAnchor="middle" fill="#00b8a3" fontSize="18" fontWeight="black" fontFamily="sans-serif">50</text>
                                    <text x="50" y="62" textAnchor="middle" fill="#8a92a6" fontSize="9" fontWeight="bold" fontFamily="monospace">DAYS</text>
                                </svg>
                                <span className="text-[9px] font-bold text-text-muted mt-2 font-mono">50 Days</span>
                            </div>

                            {/* 100 Days Badge */}
                            <div className="flex flex-col items-center group cursor-help" title="100 Days Active Badge 2025">
                                <svg className="w-16 h-16 transition-transform group-hover:scale-110" viewBox="0 0 100 100">
                                    <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="#1e293b" stroke="#3b82f6" strokeWidth="3" />
                                    <polygon points="50,12 88,30 88,70 50,88 12,70 12,30" fill="#0f172a" />
                                    <circle cx="50" cy="50" r="22" fill="#3b82f6" fillOpacity="0.1" />
                                    <text x="50" y="47" textAnchor="middle" fill="#3b82f6" fontSize="16" fontWeight="black" fontFamily="sans-serif">100</text>
                                    <text x="50" y="62" textAnchor="middle" fill="#8a92a6" fontSize="9" fontWeight="bold" fontFamily="monospace">DAYS</text>
                                </svg>
                                <span className="text-[9px] font-bold text-text-muted mt-2 font-mono">100 Days</span>
                            </div>
                        </div>

                        <div className="border-t border-white/5 pt-3.5 flex items-center justify-between text-[10px] text-text-muted font-mono mt-2">
                            <span>Most Recent Badge</span>
                            <span className="text-white font-bold">100 Days Badge 2025</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
