import Message from '../models/message.model.js';

// récupérer les messages d'une annonce
export const fetchMessagesByAnnonce = async (req, res) => {
    try {
        const { annonce_id } = req.params;
        const messages = await Message.find({ annonce_id: parseInt(annonce_id) });
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur (fetchMessagesByAnnonce)' });
    }
};

// envoyer un message
export const addMessage = async (req, res) => {
    try {
        const { contenu, expediteur_id, destinataire_id, annonce_id } = req.body;
        const message = new Message({ contenu, expediteur_id, destinataire_id, annonce_id });
        await message.save();
        res.status(201).json({ message: 'Message envoyé' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur (addMessage)' });
    }
};

// supprimer un message
export const removeMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Message.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Message non trouvé' });
        }
        res.json({ message: 'Message supprimé' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur (removeMessage)' });
    }
};