import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { user } = useAuth();

    const studentLinks = [
        { name: 'Dashboard', path: '/student/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { name: 'My Requests', path: '/student/my-requests', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
        { name: 'New Request', path: '/student/create-request', icon: 'M12 4v16m8-8H4' },
    ];

    const adminLinks = [
        { name: 'Overview', path: '/admin/dashboard', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
        { name: 'Review Queue', path: '/admin/pending', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
        { name: 'Analytics', path: '/admin/metrics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2' },
    ];

    const links = user?.role === 'ADMIN' ? adminLinks : studentLinks;

    return (
        <aside className="w-72 bg-white border-r border-slate-100 h-screen pt-32 pb-10 fixed left-0 top-0 overflow-y-auto px-6">
            <div className="space-y-2">
                <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Navigation</p>
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-5 py-4 rounded-[1.25rem] transition-all duration-300 group ${isActive
                                ? 'active-nav-link text-white shadow-xl translate-x-1'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 active:scale-95'
                            }`
                        }
                    >
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon} />
                        </svg>
                        <span className="text-sm font-bold tracking-tight">{link.name}</span>
                    </NavLink>
                ))}
            </div>

            <div className="mt-auto pt-20 px-4">
                <div className="p-6 rounded-3xl bg-indigo-50/50 border border-indigo-100/50 mb-6">
                    <p className="text-[10px] font-black text-indigo-900 uppercase tracking-widest mb-1">Support Info</p>
                    <p className="text-[11px] text-indigo-600 font-medium leading-relaxed">System v2.4 Active. Contact IT for permission escalations.</p>
                </div>
                <div className="px-4 text-center">
                    <p className="text-[10px] text-slate-400 font-black tracking-[0.2em] italic">by Jinisha R</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
