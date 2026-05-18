import Joi from 'joi';

export const registerSchema = Joi.object({
    nom: Joi.string().min(2).max(50).required().messages({
        'string.min': 'Le nom doit contenir au moins 2 caractères',
        'string.max': 'Le nom ne peut pas dépasser 50 caractères',
        'any.required': 'Le nom est requis'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email invalide',
        'any.required': 'Email requis'
    }),
    password: Joi.string().min(6).max(100).required().messages({
        'string.min': 'Le mot de passe doit contenir au moins 6 caractères',
        'any.required': 'Mot de passe requis'
    })
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Email invalide',
        'any.required': 'Email requis'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Mot de passe requis'
    })
});

export const updateSchema = Joi.object({
    nom: Joi.string().min(2).max(50).messages({
        'string.min': 'Le nom doit contenir au moins 2 caractères',
        'string.max': 'Le nom ne peut pas dépasser 50 caractères'
    }),
    email: Joi.string().email().messages({
        'string.email': 'Email invalide'
    })
}).min(1);