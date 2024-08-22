import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, user: null });

    const login = (token, user) => {
        setAuth({ token, user });
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setAuth({ token: null, user: null });
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
