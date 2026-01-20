import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login: performLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await performLogin(credentials);
            if (user.role === 'ADMIN') {
                navigate('/admin/dashboard');
            } else {
                setError('Unauthorized. This portal is for Administrators only.');
                // Note: In a real app, you might logout immediately if they used the wrong portal
            }
        } catch (err) {
            setError('Invalid credentials for Admin Gateway');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-emerald-600/5 blur-[120px]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[200px] border-emerald-600/5 rounded-full rotate-45"></div>

            <div className="max-w-md w-full glass p-12 rounded-[3.5rem] shadow-3xl animate-fade-in relative z-10 border-white/5 bg-slate-900/40">
                <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest mb-10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Selection
                </Link>

                <div className="mb-12">
                    <div className="w-16 h-16 bg-emerald-600 rounded-2xl mb-8 flex items-center justify-center shadow-2xl shadow-emerald-900">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h2 className="text-4xl font-black text-white tracking-tight">Admin <span className="text-emerald-500">Gateway</span></h2>
                    <p className="text-slate-500 mt-3 font-bold tracking-tight">Executive identification required.</p>
                </div>

                {error && (
                    <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-5 rounded-2xl mb-8 text-xs font-black uppercase tracking-wider animate-shake">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Admin Email</label>
                        <input
                            type="email"
                            required
                            className="w-full px-7 py-5 bg-white/5 border border-white/10 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-black font-medium placeholder:text-slate-700"
                            placeholder="admin@adminflow.com"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Secret Key</label>
                        <input
                            type="password"
                            required
                            className="w-full px-7 py-5 bg-white/5 border border-white/10 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-black font-medium placeholder:text-slate-700"
                            placeholder="••••••••"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl shadow-2xl shadow-emerald-900 transition-all transform hover:-translate-y-1 active:scale-[0.98] mt-4"
                    >
                        Validate Identity
                    </button>

                    <div className="pt-6 flex flex-col items-center justify-center gap-3 border-t border-white/5 opacity-40">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic text-center">Encrypted Session</span>
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        </div>
                        <p className="text-[11px] text-emerald-400 font-black tracking-[0.3em] uppercase">by Jinisha R</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
