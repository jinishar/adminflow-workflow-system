import React, { useEffect, useState } from 'react';
import { getSummaryMetrics, getPendingRequests } from '../../api/adminApi';
import StatusBadge from '../../components/StatusBadge';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [metrics, setMetrics] = useState(null);
    const [pending, setPending] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const mRes = await getSummaryMetrics();
            setMetrics(mRes.data);
            const pRes = await getPendingRequests();
            setPending(pRes.data.slice(0, 5));
        };
        fetch();
    }, []);

    return (
        <div className="space-y-12 animate-fade-in pb-20">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Executive Dashboard</h2>
                    <p className="text-slate-500 mt-2 font-medium tracking-wide italic">Operational oversight and approval workflow management.</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 shadow-sm overflow-hidden">
                                <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="avatar" />
                            </div>
                        ))}
                        <div className="w-10 h-10 rounded-full border-4 border-white bg-indigo-600 flex items-center justify-center text-[10px] text-white font-black shadow-lg">
                            +2
                        </div>
                    </div>
                </div>
            </header>

            {metrics && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { label: 'Pending Review', value: metrics.pending_requests, color: 'amber', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                        { label: 'Finalized', value: metrics.approved_requests, color: 'emerald', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                        { label: 'Declinced', value: metrics.rejected_requests, color: 'rose', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' },
                        { label: 'Closed/Resolved', value: metrics.resolved_requests, color: 'violet', icon: 'M5 13l4 4L19 7' }
                    ].map((m, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 transition-all hover:scale-[1.02] hover:shadow-2xl">
                            <div className={`w-12 h-12 bg-${m.color}-50 rounded-2xl flex items-center justify-center mb-6`}>
                                <svg className={`w-6 h-6 text-${m.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={m.icon} />
                                </svg>
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
                            <h3 className="text-4xl font-black text-slate-900 tracking-tight">{m.value}</h3>
                        </div>
                    ))}
                </div>
            )}

            <section className="bg-white rounded-[3rem] shadow-2xl shadow-slate-100 border border-slate-50 overflow-hidden">
                <div className="px-12 py-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Queue Requiring Attention</h3>
                        <p className="text-sm text-slate-400 font-bold mt-1 tracking-tight">Urgent tasks awaiting administrative review.</p>
                    </div>
                    <Link to="/admin/pending" className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-black uppercase tracking-widest rounded-2xl transition-all">
                        View Entire Queue
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Origin User</th>
                                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Workflow Target</th>
                                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Current Status</th>
                                <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Executive Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {pending.map((req) => (
                                <tr key={req.id} className="group hover:bg-indigo-50/20 transition-all">
                                    <td className="px-12 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-black text-slate-400">
                                                U{req.student_id}
                                            </div>
                                            <span className="text-sm font-black text-slate-800 tracking-tight">User #{req.student_id}</span>
                                        </div>
                                    </td>
                                    <td className="px-12 py-8">
                                        <p className="text-sm font-bold text-slate-700 leading-snug max-w-xs">{req.title}</p>
                                    </td>
                                    <td className="px-12 py-8"><StatusBadge status={req.status} /></td>
                                    <td className="px-12 py-8">
                                        <Link to={`/admin/requests/${req.id}`} className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.15em] hover:bg-black hover:scale-105 transition-all shadow-lg shadow-indigo-100 inline-block">
                                            Initialize Review
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;
