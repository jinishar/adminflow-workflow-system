import React, { createContext, useState, useEffect, useContext } from 'react';
import { getMe, login as loginApi, register as registerApi } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await getMe();
                    setUser(res.data);
                } catch (error) {
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const login = async (credentials) => {
        const res = await loginApi(credentials);
        localStorage.setItem('token', res.data.access_token);
        const userRes = await getMe();
        setUser(userRes.data);
        return userRes.data;
    };

    const register = async (userData) => {
        const res = await registerApi(userData);
        // After registration, we could automatically log them in or just return the user
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
