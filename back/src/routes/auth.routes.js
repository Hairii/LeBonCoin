import express from 'express';
import { register, login, refresh, logout, deleteUser, update } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/token.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/refresh', refresh);
router.post('/logout', logout);
router.delete('/delete', verifyToken, deleteUser);
router.patch('/update', verifyToken, update);

export default router;