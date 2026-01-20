import React, { useEffect, useState } from 'react';
import { getSummaryMetrics, getAdminWorkload, getAvgProcessingTime } from '../../api/adminApi';

const Metrics = () => {
    const [summary, setSummary] = useState(null);
    const [workload, setWorkload] = useState([]);
    const [avgTime, setAvgTime] = useState('');

    useEffect(() => {
        const fetch = async () => {
            const s = await getSummaryMetrics();
            setSummary(s.data);
            const w = await getAdminWorkload();
            setWorkload(w.data);
            const a = await getAvgProcessingTime();
            setAvgTime(a.data.avg_processing_time);
        };
        fetch();
    }, []);

    return (
        <div className="space-y-12 animate-fade-in pb-20">
            <header>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">System Intelligence</h2>
                <p className="text-slate-500 mt-2 font-medium tracking-wide">High-performance analytics powered by SQL engine.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-indigo-100/20 border border-slate-50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
                    <h3 className="text-xl font-black mb-10 text-slate-900 tracking-tight relative z-10">Workflow Efficiency</h3>
                    <div className="flex flex-col items-center justify-center py-10 px-6 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[2.5rem] shadow-xl shadow-indigo-200 relative z-10">
                        <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.3em] mb-4">AVG Core Latency</p>
                        <p className="text-white font-black text-6xl tracking-tighter">{avgTime?.split('.')[0] || '0'}h</p>
                        <p className="text-white/60 text-[11px] mt-4 font-bold tracking-tight italic">Optimized by SQL Aggr. Pipeline</p>
                    </div>
                </div>

                <div className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-indigo-100/20 border border-slate-50">
                    <h3 className="text-xl font-black mb-10 text-slate-900 tracking-tight">Resource Allocation</h3>
                    <div className="space-y-6">
                        {workload.map((admin, idx) => (
                            <div key={admin.admin_name} className="flex justify-between items-center p-6 bg-slate-50/50 rounded-3xl border border-slate-100 group transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-[10px] font-black`}>
                                        {admin.admin_name.charAt(0)}
                                    </div>
                                    <span className="font-black text-slate-800 tracking-tight">{admin.admin_name}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black text-slate-900">{admin.requests_handled}</p>
                                    <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest">Invocations</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 p-12 rounded-[4rem] shadow-3xl relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"></div>

                <h3 className="text-xl font-black mb-10 text-white tracking-tight relative z-10">System Load by Status</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative z-10">
                    {summary && Object.entries(summary).map(([key, val]) => (
                        <div key={key} className="text-center p-8 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 group hover:border-white/20 transition-all">
                            <p className="text-4xl font-black text-white group-hover:scale-110 transition-transform">{val}</p>
                            <p className="text-[10px] font-black text-indigo-300 uppercase mt-3 tracking-widest">{key.replace('_', ' ')}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Metrics;
