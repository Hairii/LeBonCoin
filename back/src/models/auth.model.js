import db from '../config/db.js';

export const findUserByEmail = async (email) => {
    try {
        const [rows] = await db.query('SELECT * FROM utilisateur WHERE email = ?', [email]);
        return rows[0];
    } catch (error) {
        console.error('erreur findUserByEmail', error.message);
        throw error;
    }
};

export const createUser = async ({ nom, email, password }) => {
    try {
        await db.query('INSERT INTO utilisateur (nom, email, mot_de_passe) VALUES (?, ?, ?)', [nom, email, password]);
    } catch (error) {
        console.error('erreur createUser', error.message);
        throw error;
    }
};

export const deleteUserById = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM utilisateur WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('erreur deleteUserById', error.message);
        throw error;
    }
};

export const updateUser = async (id, data) => {
    try {
        await db.query('UPDATE utilisateur SET nom = ?, email = ? WHERE id = ?', [data.nom, data.email, id]);
    } catch (error) {
        console.error('erreur updateUser', error.message);
        throw error;
    }
};