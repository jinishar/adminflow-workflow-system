import React from 'react';
import StatusBadge from './StatusBadge';

const RequestTimeline = ({ history }) => {
    return (
        <div className="mt-8">
            <h3 className="text-lg font-bold mb-6 text-gray-800">Audit Trail</h3>
            <div className="relative border-l-2 border-gray-200 ml-4">
                {history.map((log, index) => (
                    <div key={log.id} className="mb-8 ml-6 relative">
                        <span className="absolute -left-[2.05rem] top-1 px-3 py-1 bg-white border-2 border-blue-500 rounded-full text-xs font-bold text-blue-500">
                            {history.length - index}
                        </span>
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-gray-900">Status changed into</span>
                                    <StatusBadge status={log.new_status} />
                                </div>
                                <span className="text-xs text-gray-400 font-medium">
                                    {new Date(log.timestamp).toLocaleString()}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                                By <span className="font-semibold text-gray-700">{log.actor_role}</span>
                            </p>
                            {log.remarks && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-200">
                                    <p className="text-sm text-gray-600 italic">"{log.remarks}"</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RequestTimeline;
