import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    contenu: {
        type: String,
        required: true
    },
    expediteur_id: {
        type: Number,
        required: true
    },
    destinataire_id: {
        type: Number,
        required: true
    },
    annonce_id: {
        type: Number,
        required: true
    },
    date_envoi: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Message', messageSchema, 'message');