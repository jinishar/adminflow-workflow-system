import React, { useState } from 'react';
import { createRequest } from '../../api/requestApi';
import { useNavigate } from 'react-router-dom';

const CreateRequest = () => {
    const [formData, setFormData] = useState({ type: '', title: '', description: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createRequest(formData);
            navigate('/student/dashboard');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <header className="mb-10 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Create New Request</h2>
                <p className="text-gray-500 font-medium">Please provide accurate details for review.</p>
            </header>

            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl shadow-blue-50 border border-gray-100 space-y-8">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Request Category</label>
                    <select
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium text-gray-700 capitalize"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                        <option value="">Select a category</option>
                        <option value="HR_LEAVE">Leave Approval</option>
                        <option value="IT_SUPPORT">IT Service Desk</option>
                        <option value="PROCUREMENT">Procurement Request</option>
                        <option value="COMPLIANCE">Compliance Permission</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Subject / Title</label>
                    <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium text-gray-700"
                        placeholder="Short summary of your request"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Detailed Description</label>
                    <textarea
                        required
                        rows="5"
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium text-gray-700"
                        placeholder="Explain your request in detail..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                </div>
                <button
                    disabled={loading}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1 active:scale-95 disabled:bg-blue-300 disabled:transform-none"
                    type="submit"
                >
                    {loading ? 'Submitting...' : 'Submit Request'}
                </button>
            </form>
        </div>
    );
};

export default CreateRequest;
