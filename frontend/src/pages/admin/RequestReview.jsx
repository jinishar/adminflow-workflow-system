import React, { useEffect, useState } from 'react';
import { getAdminRequestDetails, reviewRequest, approveRequest, rejectRequest, resolveRequest } from '../../api/adminApi';
import StatusBadge from '../../components/StatusBadge';
import RequestTimeline from '../../components/RequestTimeline';
import { useParams, useNavigate, Link } from 'react-router-dom';

const RequestReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);
    const [remarks, setRemarks] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchDetail = async () => {
        const res = await getAdminRequestDetails(id);
        setRequest(res.data);
    };

    useEffect(() => {
        fetchDetail();
    }, [id]);

    const handleAction = async (actionFn) => {
        if (!remarks && actionFn === rejectRequest) {
            alert('Remarks are required for rejection');
            return;
        }
        setLoading(true);
        try {
            await actionFn(id, remarks);
            setRemarks('');
            await fetchDetail();
        } catch (error) {
            alert(error.response?.data?.detail || 'Action failed');
        } finally {
            setLoading(false);
        }
    };

    if (!request) return <div className="p-10 text-center font-bold text-blue-600">Loading request for review...</div>;

    const showActions = ['SUBMITTED', 'IN_REVIEW', 'APPROVED'].includes(request.status);

    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-20">
            <Link to="/admin/dashboard" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">
                ← Back to Dashboard
            </Link>

            <header className="flex justify-between items-start bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-xs font-black uppercase">{request.type}</span>
                        <p className="text-xs text-gray-400 font-bold">Request #AF-{request.id} • Student #{request.student_id}</p>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">{request.title}</h2>
                    <p className="text-gray-500 font-medium">Original submission date: {new Date(request.created_at).toLocaleString()}</p>
                </div>
                <StatusBadge status={request.status} />
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">Request Body</h3>
                        <p className="text-gray-600 leading-relaxed font-normal bg-gray-50 p-6 rounded-2xl whitespace-pre-wrap">{request.description}</p>
                    </div>
                    <RequestTimeline history={request.history} />
                </div>

                <div className="space-y-6">
                    {showActions && (
                        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-50 border border-gray-100 sticky top-24">
                            <h3 className="text-lg font-bold mb-6 text-gray-900">Take Action</h3>

                            <textarea
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 mb-6 text-sm"
                                placeholder="Add administrative remarks..."
                                rows="4"
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                            ></textarea>

                            <div className="grid grid-cols-1 gap-3">
                                {request.status === 'SUBMITTED' && (
                                    <button
                                        onClick={() => handleAction(reviewRequest)}
                                        className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50"
                                        disabled={loading}
                                    >Move to Review</button>
                                )}
                                {request.status === 'IN_REVIEW' && (
                                    <>
                                        <button
                                            onClick={() => handleAction(approveRequest)}
                                            className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all disabled:opacity-50"
                                            disabled={loading}
                                        >Approve</button>
                                        <button
                                            onClick={() => handleAction(rejectRequest)}
                                            className="w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all disabled:opacity-50"
                                            disabled={loading}
                                        >Reject</button>
                                    </>
                                )}
                                {request.status === 'APPROVED' && (
                                    <button
                                        onClick={() => handleAction(resolveRequest)}
                                        className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all disabled:opacity-50"
                                        disabled={loading}
                                    >Mark as Resolved</button>
                                )}
                            </div>
                        </div>
                    )}

                    {!showActions && (
                        <div className="bg-green-50 p-8 rounded-3xl border border-green-100 text-center">
                            <p className="text-green-800 font-bold">This workflow is completed.</p>
                            <p className="text-green-600 text-sm mt-2">No further actions are required.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequestReview;
