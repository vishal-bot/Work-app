import { useState } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));

    const login = (token) => {
        localStorage.setItem('accessToken', token);
        setIsAuthenticated(true);
        console.log(isAuthenticated);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
    };

    return { isAuthenticated, login, logout };
}

export default useAuth;

