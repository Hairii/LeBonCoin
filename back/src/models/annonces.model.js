import db from '../config/db.js';


export const getAllAnnonces = async () => {
    try {
        // on  change comment on apelle les colonne sinon on sait pas qui est qui car le 2 s'apelle nom
        const [rows] = await db.query(`
            SELECT annonce.*, categorie.nom AS categorie_nom, utilisateur.nom AS vendeur 
            FROM annonce
            JOIN categorie ON annonce.categorie_id = categorie.id
            JOIN utilisateur ON annonce.utilisateur_id = utilisateur.id
        `);
        return rows;
    } catch (error) { 
        console.error('erreur getAllAnnonces', error.message);
        throw error;
    }
};


export const getAnnonceById = async (id) => {
    try {
        const [rows] = await db.query(`
            SELECT annonce.*, categorie.nom AS categorie_nom, utilisateur.nom AS vendeur
            FROM annonce
            JOIN categorie ON annonce.categorie_id = categorie.id
            JOIN utilisateur ON annonce.utilisateur_id = utilisateur.id
            WHERE annonce.id = ?
        `, [id]);
        return rows[0];
    } catch (error) {
        console.error('erreur getAnnonceById', error.message);
        throw error;
    }
};


export const createAnnonce = async ({ titre, description, prix, localisation, utilisateur_id, categorie_id }) => {
    try {
        const [result] = await db.query(`
            INSERT INTO annonce (titre, description, prix, localisation, utilisateur_id, categorie_id)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [titre, description, prix, localisation, utilisateur_id, categorie_id]);
        return result.insertId;
    } catch (error) {
        console.error('erreur createAnnonce', error.message);
        throw error;
    }
};


export const updateAnnonce = async (id, { titre, description, prix, localisation, categorie_id }) => {
    try {
        await db.query(`
            UPDATE annonce SET titre = ?, description = ?, prix = ?, localisation = ?, categorie_id = ?
            WHERE id = ?
        `, [titre, description, prix, localisation, categorie_id, id]);
    } catch (error) {
        console.error('erreur updateAnnonce', error.message);
        throw error;
    }
};


export const deleteAnnonce = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM annonce WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('erreur deleteAnnonce', error.message);
        throw error;
    }
};


export const getAnnoncesByUserId = async (utilisateur_id) => {
    try {
        const [rows] = await db.query(`
            SELECT annonce.*, categorie.nom AS categorie_nom
            FROM annonce
            JOIN categorie ON annonce.categorie_id = categorie.id
            WHERE annonce.utilisateur_id = ?
        `, [utilisateur_id]);
        return rows;
    } catch (error) {
        console.error('erreur getAnnoncesByUserId', error.message);
        throw error;
    }
};