import React, { useEffect, useState } from 'react';
import { getMyRequests } from '../../api/requestApi';
import StatusBadge from '../../components/StatusBadge';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getMyRequests();
            setRequests(res.data.slice(0, 5));
        };
        fetch();
    }, []);

    return (
        <div className="space-y-12 animate-fade-in">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Student Workspace</h2>
                    <p className="text-slate-500 mt-2 font-medium tracking-wide">Manage your operational requests and monitor workflow status.</p>
                </div>
                <Link to="/student/create-request" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-2xl shadow-indigo-100 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                    New Request
                </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Active Requests', val: requests.filter(r => r.status !== 'RESOLVED' && r.status !== 'REJECTED').length, color: 'indigo' },
                    { label: 'Total Approved', val: requests.filter(r => r.status === 'APPROVED' || r.status === 'RESOLVED').length, color: 'emerald' },
                    { label: 'Drafted/Submitted', val: requests.length, color: 'slate' }
                ].map((stat, i) => (
                    <div key={i} className="group bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 transition-all hover:shadow-2xl hover:shadow-slate-100 hover:-translate-y-1">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{stat.label}</p>
                        <div className="flex items-end gap-3">
                            <h3 className={`text-6xl font-black text-${stat.color}-600 leading-none`}>{stat.val}</h3>
                            <div className={`w-8 h-1 bg-${stat.color}-200 rounded-full mb-2`}></div>
                        </div>
                    </div>
                ))}
            </div>

            <section className="bg-white rounded-[3rem] shadow-xl shadow-slate-100/50 border border-slate-50 overflow-hidden">
                <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Activity</h3>
                    <div className="flex gap-2">
                        <span className="w-3 h-3 bg-slate-200 rounded-full"></span>
                        <span className="w-3 h-3 bg-slate-200 rounded-full"></span>
                        <span className="w-3 h-3 bg-slate-200 rounded-full"></span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/30">
                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reference Title</th>
                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Workflow State</th>
                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Submission Date</th>
                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {requests.map((req) => (
                                <tr key={req.id} className="group hover:bg-indigo-50/30 transition-all">
                                    <td className="px-10 py-8">
                                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black uppercase tracking-wider">{req.type}</span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <p className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">{req.title}</p>
                                    </td>
                                    <td className="px-10 py-8"><StatusBadge status={req.status} /></td>
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-700">{new Date(req.created_at).toLocaleDateString()}</span>
                                            <span className="text-[10px] text-slate-400 font-medium">UTC Standard</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <Link to={`/student/requests/${req.id}`} className="inline-flex px-6 py-2.5 bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all">
                                            Track
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {requests.length === 0 && (
                        <div className="py-32 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                                <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                            </div>
                            <p className="text-slate-400 font-bold tracking-tight italic">No records found. Start by creating a new request.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default StudentDashboard;
