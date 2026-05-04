import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser, deleteUserById, updateUser } from '../models/auth.model.js';

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
};


export const register = async (req, res) => {
    try {
        const { nom, email, password } = req.body;

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Email déjà utilisé' });
        }

        const hash = await argon2.hash(password);
        await createUser({ nom, email, password: hash });

        res.status(201).json({ message: 'Utilisateur créé' });
    } catch (error) {
        console.error('erreur register', error.message);
        res.status(500).json({ message: 'Erreur serveur (register)' });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        const isValidPassword = await argon2.verify(user.mot_de_passe, password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // refresh token 
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
        });

        // access token 
        res.json({ message: 'Connexion réussie', accessToken, id: user.id });
    } catch (error) {
        console.error('erreur login', error.message);
        res.status(500).json({ message: 'Erreur serveur (login)' });
    }
};

// refresh
export const refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token manquant' });
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        // on genere un nouveau access token
        const accessToken = generateAccessToken({ id: decoded.id, email: decoded.email });

        res.json({ accessToken });
    } catch (error) {
        console.error('erreur refresh', error.message);
        res.status(401).json({ message: 'Refresh token invalide ou expiré' });
    }
};


export const logout = (req, res) => {
    res.clearCookie('refresh_token');
    res.json({ message: 'Déconnexion réussie' });
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.user;
        const deleted = await deleteUserById(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        res.clearCookie('refresh_token');
        res.json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        console.error('erreur deleteUser', error.message);
        res.status(500).json({ message: 'Erreur serveur (deleteUser)' });
    }
};


export const update = async (req, res) => {
    try {
        const { id } = req.user;
        const { nom, email } = req.body;

        const existingUser = await findUserByEmail(email);
        if (existingUser && existingUser.id !== id) {
            return res.status(409).json({ message: 'Email déjà utilisé' });
        }

        await updateUser(id, { nom, email });
        res.json({ message: 'Utilisateur mis à jour' });
    } catch (error) {
        console.error('erreur update', error.message);
        res.status(500).json({ message: 'Erreur serveur (update)' });
    }
};