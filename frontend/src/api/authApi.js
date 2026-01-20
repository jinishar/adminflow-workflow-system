import API from './axios';

export const login = (credentials) => {
    const params = new URLSearchParams();
    params.append('username', credentials.email);
    params.append('password', credentials.password);
    return API.post('/auth/login', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
};

export const register = (userData) => API.post('/auth/register', userData);
export const getMe = () => API.get('/auth/me');
