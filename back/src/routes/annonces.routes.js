import express from 'express';
import {
    fetchAnnonces,
    fetchAnnonceById,
    addAnnonce,
    editAnnonce,
    removeAnnonce,
    fetchAnnoncesByUser
} from '../controllers/annonces.controller.js';
import { verifyToken } from '../middlewares/token.middleware.js';



const router = express.Router();


router.get('/', fetchAnnonces);
router.get('/:id', fetchAnnonceById);


router.post('/', verifyToken, addAnnonce);
router.put('/:id', verifyToken, editAnnonce);
router.delete('/:id', verifyToken, removeAnnonce);
router.get('/user/:id', fetchAnnoncesByUser);

export default router;