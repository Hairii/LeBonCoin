const API = 'http://localhost:5000/api/auth';

export const registerUser = async ({ nom, email, password }) => {
    const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erreur inscription');
    return data;
};

export const loginUser = async ({ email, password }) => {
    const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // pour recevoir le cookie refresh_token
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erreur connexion');
    return data;
};

export const refreshToken = async () => {
    const res = await fetch(`${API}/refresh`, {
        method: 'GET',
        credentials: 'include'
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Session expirée');
    return data;
};

export const logoutUser = async () => {
    await fetch(`${API}/logout`, {
        method: 'POST',
        credentials: 'include'
    });
    sessionStorage.clear();
};