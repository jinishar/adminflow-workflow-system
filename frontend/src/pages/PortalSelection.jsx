import React from 'react';
import { useNavigate } from 'react-router-dom';

const PortalSelection = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[150px]"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-600/10 rounded-full blur-[150px]"></div>

            <div className="max-w-4xl w-full relative z-10">
                <div className="text-center mb-16 animate-fade-in">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center shadow-2xl">
                            <span className="text-white text-2xl font-black">A</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-white">AdminFlow</h1>
                    </div>
                    <p className="text-slate-400 text-lg font-medium max-w-xl mx-auto">
                        Welcome to the central workflow hub. Select the gateway corresponding to your organizational role.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    {/* Student/Employee Card */}
                    <div
                        onClick={() => navigate('/login/student')}
                        className="group bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] cursor-pointer hover:bg-white/10 hover:border-indigo-500/50 transition-all hover:-translate-y-2"
                    >
                        <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-8 border border-indigo-500/30 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-white mb-3">Employee Portal</h3>
                        <p className="text-slate-400 font-medium leading-relaxed mb-8">
                            Submit requests, track approvals, and manage your operational tasks.
                        </p>
                        <div className="flex items-center gap-2 text-indigo-400 font-black text-sm uppercase tracking-widest">
                            Access Portal
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>

                    {/* Admin Card */}
                    <div
                        onClick={() => navigate('/login/admin')}
                        className="group bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] cursor-pointer hover:bg-white/10 hover:border-emerald-500/50 transition-all hover:-translate-y-2"
                    >
                        <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-white mb-3">Admin Gateway</h3>
                        <p className="text-slate-400 font-medium leading-relaxed mb-8">
                            Review pending requests, manage system status, and access executive analytics.
                        </p>
                        <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-widest">
                            Authorized Access
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <p className="text-indigo-400/60 text-xs font-black tracking-widest italic">by Jinisha R</p>
                </div>
            </div>
        </div>
    );
};

export default PortalSelection;
