import { fetchWithAuth } from '/service/fetchWithAuth.js';

const API = 'http://localhost:5000/api/annonces';


export const getAnnonces = async () => {
    const res = await fetch(API);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erreur chargement annonces');
    return data;
};


export const getAnnonceById = async (id) => {
    const res = await fetch(`${API}/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Annonce introuvable');
    return data;
};


export const getAnnoncesByUser = async (userId) => {
    const res = await fetch(`${API}/user/${userId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erreur chargement annonces utilisateur');
    return data;
};


export const createAnnonce = async (annonce) => {
    const res = await fetchWithAuth(API, {
        method: 'POST',
        body: JSON.stringify(annonce)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erreur création annonce');
    return data;
};


export const updateAnnonce = async (id, annonce) => {
    const res = await fetchWithAuth(`${API}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(annonce)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erreur modification annonce');
    return data;
};


export const deleteAnnonce = async (id) => {
    const res = await fetchWithAuth(`${API}/${id}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erreur suppression annonce');
    return data;
};