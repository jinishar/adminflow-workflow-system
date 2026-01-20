import API from './axios';

export const getAllRequests = () => API.get('/admin/requests/all');
export const getPendingRequests = () => API.get('/admin/requests/pending');
export const getAdminRequestDetails = (id) => API.get(`/admin/requests/${id}`);

export const reviewRequest = (id, remarks) => API.patch(`/admin/requests/${id}/review`, { remarks });
export const approveRequest = (id, remarks) => API.patch(`/admin/requests/${id}/approve`, { remarks });
export const rejectRequest = (id, remarks) => API.patch(`/admin/requests/${id}/reject`, { remarks });
export const resolveRequest = (id, remarks) => API.patch(`/admin/requests/${id}/resolve`, { remarks });

export const getSummaryMetrics = () => API.get('/admin/metrics/summary');
export const getStatusDistribution = () => API.get('/admin/metrics/status-distribution');
export const getAvgProcessingTime = () => API.get('/admin/metrics/avg-processing-time');
export const getAdminWorkload = () => API.get('/admin/metrics/admin-workload');
