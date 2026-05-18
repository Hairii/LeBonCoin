import express from 'express';
import { register, login, refresh, logout, deleteUser, update } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/token.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { registerSchema, loginSchema, updateSchema } from '../validations/auth.validation.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/refresh', refresh);
router.post('/logout', logout);
router.delete('/delete', verifyToken, deleteUser);
router.patch('/update', verifyToken, validate(updateSchema), update);

export default router;