import { refreshToken } from '/api/auth.api.js';


export const fetchWithAuth = async (url, options = {}) => {
    const token = sessionStorage.getItem('accessToken');

   
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };

    const config = {
        ...options,
        headers,
        credentials: 'include'
    };

    let res = await fetch(url, config);

   
    if (res.status === 401) {
        try {
            const data = await refreshToken();
            sessionStorage.setItem('accessToken', data.accessToken);

            config.headers['Authorization'] = `Bearer ${data.accessToken}`;
            res = await fetch(url, config);
        } catch (err) {
            sessionStorage.clear();
            window.location.href = '/pages/login.html';
            return;
        }
    }

    return res;
};