import React, { useEffect, useState } from 'react';
import { getRequestDetails } from '../../api/requestApi';
import StatusBadge from '../../components/StatusBadge';
import RequestTimeline from '../../components/RequestTimeline';
import { useParams, Link } from 'react-router-dom';

const RequestDetails = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const res = await getRequestDetails(id);
            setRequest(res.data);
        };
        fetch();
    }, [id]);

    if (!request) return <div className="p-10 text-center font-bold text-blue-600">Loading details...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            <Link to="/student/dashboard" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">
                ← Back to Dashboard
            </Link>

            <header className="flex justify-between items-start bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-black uppercase">{request.type}</span>
                        <p className="text-xs text-gray-400 font-bold">Ref: #AF-{request.id}</p>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">{request.title}</h2>
                    <p className="text-gray-500 font-medium">Submitted on {new Date(request.created_at).toLocaleString()}</p>
                </div>
                <StatusBadge status={request.status} />
            </header>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Description</h3>
                <p className="text-gray-600 leading-relaxed font-normal bg-gray-50 p-6 rounded-2xl whitespace-pre-wrap">{request.description}</p>
            </div>

            <RequestTimeline history={request.history} />
        </div>
    );
};

export default RequestDetails;
