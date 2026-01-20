import API from './axios';

export const createRequest = (data) => API.post('/requests', data);
export const getMyRequests = () => API.get('/requests/my');
export const getRequestDetails = (id) => API.get(`/requests/${id}`);
