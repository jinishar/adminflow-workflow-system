import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState('STUDENT'); // STUDENT or ADMIN
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { login: performLogin, register: performRegister } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            if (isLogin) {
                const user = await performLogin({ email: formData.email, password: formData.password });
                if (role === 'ADMIN' && user.role !== 'ADMIN') {
                    throw new Error('Unauthorized. This portal is for Administrators only.');
                }
                if (role === 'STUDENT' && user.role !== 'STUDENT') {
                    throw new Error('Unauthorized. This portal is for Staff/Students only.');
                }

                if (user.role === 'ADMIN') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/student/dashboard');
                }
            } else {
                await performRegister({ ...formData, role: role });
                setSuccess('Registration successful! You can now login.');
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.response?.data?.detail || err.message || 'Authentication failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden font-sans">
            {/* Background Decorative Elements */}
            <div className={`absolute top-[-10%] left-[-10%] h-[60%] w-[60%] blur-[120px] rounded-full transition-all duration-700 ${role === 'ADMIN' ? 'bg-emerald-600/10' : 'bg-indigo-600/10'}`}></div>
            <div className={`absolute bottom-[-10%] right-[-10%] h-[60%] w-[60%] blur-[120px] rounded-full transition-all duration-700 ${role === 'ADMIN' ? 'bg-emerald-400/10' : 'bg-violet-600/10'}`}></div>

            <div className="max-w-md w-full relative z-10">
                {/* Logo & Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-2xl transition-all duration-500 ${role === 'ADMIN' ? 'bg-emerald-600' : 'bg-indigo-600'}`}>
                            <span className="text-white text-2xl font-black">A</span>
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter text-white">AdminFlow</h1>
                    </div>
                </div>

                {/* Main Auth Card */}
                <div className="glass bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-3xl backdrop-blur-2xl">

                    {/* Role Selector */}
                    <div className="flex p-1 bg-black/40 rounded-2xl mb-8">
                        <button
                            onClick={() => setRole('STUDENT')}
                            className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${role === 'STUDENT' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            Staff Portal
                        </button>
                        <button
                            onClick={() => setRole('ADMIN')}
                            className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${role === 'ADMIN' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            Admin Gateway
                        </button>
                    </div>

                    <div className="mb-8">
                        <h2 className={`text-3xl font-black tracking-tight mb-2 transition-all ${role === 'ADMIN' ? 'text-emerald-500' : 'text-indigo-400'}`}>
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-slate-500 text-sm font-medium">
                            {isLogin ? 'Enter your credentials to continue' : 'Join our workflow automation platform'}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-2xl mb-6 text-xs font-bold animate-shake uppercase tracking-wider text-center">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-2xl mb-6 text-xs font-bold animate-fade-in uppercase tracking-wider text-center">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-6 py-4 bg-white/90 border border-white/10 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:outline-none transition-all text-black font-semibold placeholder:text-slate-400"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        )}
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-6 py-4 bg-white/90 border border-white/10 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:outline-none transition-all text-black font-semibold placeholder:text-slate-400"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-6 py-4 bg-white/90 border border-white/10 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:outline-none transition-all text-black font-semibold placeholder:text-slate-400"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-5 rounded-2xl shadow-2xl transition-all transform hover:-translate-y-1 active:scale-[0.98] mt-4 font-black text-white ${role === 'ADMIN' ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/40' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/40'}`}
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-8 text-center pt-6 border-t border-white/5">
                        <p className="text-slate-500 text-sm font-medium">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className={`ml-2 font-black transition-colors ${role === 'ADMIN' ? 'text-emerald-500 hover:text-emerald-400' : 'text-indigo-400 hover:text-indigo-300'}`}
                            >
                                {isLogin ? 'Register Now' : 'Login Here'}
                            </button>
                        </p>
                    </div>

                    <div className="mt-6 flex flex-col items-center justify-center gap-1 opacity-30">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] italic">Internal Access Hub</p>
                        <p className="text-[11px] text-white font-black tracking-[0.5em] uppercase">by Jinisha R</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
