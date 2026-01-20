import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md px-10 py-5 flex justify-between items-center fixed w-full top-0 z-50 border-b border-slate-100">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-white text-xl font-black">A</span>
                </div>
                <h1 className="text-2xl font-black tracking-tighter text-slate-900">
                    AdminFlow
                </h1>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex flex-col items-end">
                    <p className="text-sm font-black text-slate-800 tracking-tight">{user?.name}</p>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{user?.role}</p>
                    </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=6366f1&color=fff&bold=true`} alt="avatar" />
                </div>

                <button
                    onClick={handleLogout}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-slate-200"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
