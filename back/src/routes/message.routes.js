import express from 'express';
import {
    fetchMessagesByAnnonce,
    addMessage,
    removeMessage
} from '../controllers/message.controller.js';

const router = express.Router();

router.get('/:annonce_id', fetchMessagesByAnnonce);
router.post('/', addMessage);
router.delete('/:id', removeMessage);

export default router;