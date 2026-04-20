import {
    getAllAnnonces,
    getAnnonceById,
    createAnnonce,
    updateAnnonce,
    deleteAnnonce,
    getAnnoncesByUserId
} from '../models/annonces.model.js';


export const fetchAnnonces = async (req, res) => {
    try {
        const annonces = await getAllAnnonces();
        res.json(annonces);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur (fetchAnnonces)' });
    }
};


export const fetchAnnonceById = async (req, res) => {
    try {
        const { id } = req.params;
        const annonce = await getAnnonceById(id);
        if (!annonce) {
            return res.status(404).json({ message: 'Annonce non trouvée' });
        }
        res.json(annonce);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur (fetchAnnonceById)' });
    }
};


export const addAnnonce = async (req, res) => {
    try {
        const { titre, description, prix, localisation, categorie_id } = req.body;
        const utilisateur_id = req.body.utilisateur_id;
        const id = await createAnnonce({ titre, description, prix, localisation, utilisateur_id, categorie_id });
        res.status(201).json({ message: 'Annonce créée', id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur (addAnnonce)' });
    }
};


export const editAnnonce = async (req, res) => {
    try {
        const { id } = req.params;
        const { titre, description, prix, localisation, categorie_id } = req.body;
        const annonce = await getAnnonceById(id);
        if (!annonce) {
            return res.status(404).json({ message: 'Annonce non trouvée' });
        }
        if (annonce.utilisateur_id !== req.body.utilisateur_id) {
            return res.status(403).json({ message: 'Non autorisé' });
        }
        await updateAnnonce(id, { titre, description, prix, localisation, categorie_id });
        res.json({ message: 'Annonce modifiée' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur (editAnnonce)' });
    }
};


export const removeAnnonce = async (req, res) => {
    try {
        const { id } = req.params;
        const annonce = await getAnnonceById(id);
        if (!annonce) {
            return res.status(404).json({ message: 'Annonce non trouvée' });
        }
        if (annonce.utilisateur_id !== req.body.utilisateur_id) {
            return res.status(403).json({ message: 'Non autorisé' });
        }
        await deleteAnnonce(id);
        res.json({ message: 'Annonce supprimée' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur (removeAnnonce)' });
    }
};


export const fetchAnnoncesByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const annonces = await getAnnoncesByUserId(id);
        res.json(annonces);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur (fetchAnnoncesByUser)' });
    }
};