import express from 'express';
import {
    fetchAnnonces,
    fetchAnnonceById,
    addAnnonce,
    editAnnonce,
    removeAnnonce,
    fetchAnnoncesByUser
} from '../controllers/annonces.controller.js';


const router = express.Router();


router.get('/', fetchAnnonces);
router.get('/:id', fetchAnnonceById);


router.post('/',  addAnnonce);
router.put('/:id', editAnnonce);
router.delete('/:id', removeAnnonce);
router.get('/user/:id', fetchAnnoncesByUser);

export default router;