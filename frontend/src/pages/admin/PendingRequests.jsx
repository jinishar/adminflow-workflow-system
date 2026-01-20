import React, { useEffect, useState } from 'react';
import { getPendingRequests } from '../../api/adminApi';
import StatusBadge from '../../components/StatusBadge';
import { Link } from 'react-router-dom';

const PendingRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getPendingRequests();
            setRequests(res.data);
        };
        fetch();
    }, []);

    return (
        <div className="space-y-8">
            <header>
                <h2 className="text-3xl font-extrabold text-gray-900">Pending Approvals</h2>
                <p className="text-gray-500 mt-1 font-medium">List of all requests awaiting administrative action.</p>
            </header>

            <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {requests.map((req) => (
                                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-8 py-5 text-sm font-semibold text-blue-600">{req.type}</td>
                                    <td className="px-8 py-5 text-sm font-medium text-gray-800">{req.title}</td>
                                    <td className="px-8 py-5"><StatusBadge status={req.status} /></td>
                                    <td className="px-8 py-5">
                                        <Link to={`/admin/requests/${req.id}`} className="text-sm font-bold text-blue-600 hover:text-blue-800">
                                            Review Request
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {requests.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-8 py-10 text-center text-gray-400 font-medium italic">All caught up! No pending requests.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default PendingRequests;
