import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser, deleteUserById, updateUser } from '../models/auth.model.js';

// register
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

// login
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

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ message: 'Connexion réussie', token, id: user.id });
    } catch (error) {
        console.error('erreur login', error.message);
        res.status(500).json({ message: 'Erreur serveur (login)' });
    }
};

// delete
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.user;
        const deleted = await deleteUserById(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        res.json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        console.error('erreur deleteUser', error.message);
        res.status(500).json({ message: 'Erreur serveur (deleteUser)' });
    }
};

// update
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