import React from 'react';

const StatusBadge = ({ status }) => {
    const styles = {
        SUBMITTED: 'bg-amber-50 text-amber-700 border-amber-200/50 shadow-sm shadow-amber-100',
        IN_REVIEW: 'bg-indigo-50 text-indigo-700 border-indigo-200/50 shadow-sm shadow-indigo-100',
        APPROVED: 'bg-emerald-50 text-emerald-700 border-emerald-200/50 shadow-sm shadow-emerald-100',
        REJECTED: 'bg-rose-50 text-rose-700 border-rose-200/50 shadow-sm shadow-rose-100',
        RESOLVED: 'bg-violet-50 text-violet-700 border-violet-200/50 shadow-sm shadow-violet-100',
    };

    return (
        <span className={`px-4 py-1.5 text-[11px] font-black uppercase tracking-widest rounded-full border ${styles[status] || 'bg-slate-50 text-slate-700'}`}>
            {status?.replace('_', ' ')}
        </span>
    );
};

export default StatusBadge;
