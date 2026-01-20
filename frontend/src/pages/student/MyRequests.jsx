import React, { useEffect, useState } from 'react';
import { getMyRequests } from '../../api/requestApi';
import StatusBadge from '../../components/StatusBadge';
import { Link } from 'react-router-dom';

const MyRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getMyRequests();
            setRequests(res.data);
        };
        fetch();
    }, []);

    return (
        <div className="space-y-8">
            <header>
                <h2 className="text-3xl font-extrabold text-gray-900">All My Requests</h2>
                <p className="text-gray-500 mt-1 font-medium">History of all operations submitted by you.</p>
            </header>

            <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Created</th>
                                <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {requests.map((req) => (
                                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-8 py-5 text-sm font-bold text-gray-400">#AF-{req.id}</td>
                                    <td className="px-8 py-5 text-sm font-semibold text-blue-600">{req.type}</td>
                                    <td className="px-8 py-5 text-sm font-medium text-gray-800">{req.title}</td>
                                    <td className="px-8 py-5"><StatusBadge status={req.status} /></td>
                                    <td className="px-8 py-5 text-sm text-gray-500">{new Date(req.created_at).toLocaleDateString()}</td>
                                    <td className="px-8 py-5">
                                        <Link to={`/student/requests/${req.id}`} className="text-sm font-bold text-blue-600 hover:text-blue-800">
                                            Details
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

export default MyRequests;
