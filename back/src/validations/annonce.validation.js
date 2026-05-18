import Joi from 'joi';

export const annonceSchema = Joi.object({
    titre: Joi.string().min(3).max(100).required().messages({
        'string.min': 'Le titre doit contenir au moins 3 caractères',
        'string.max': 'Le titre ne peut pas dépasser 100 caractères',
        'any.required': 'Le titre est requis'
    }),
    description: Joi.string().min(10).max(2000).required().messages({
        'string.min': 'La description doit contenir au moins 10 caractères',
        'string.max': 'La description ne peut pas dépasser 2000 caractères',
        'any.required': 'La description est requise'
    }),
    prix: Joi.number().min(0).required().messages({
        'number.min': 'Le prix ne peut pas être négatif',
        'any.required': 'Le prix est requis'
    }),
    localisation: Joi.string().min(2).max(100).required().messages({
        'string.min': 'La localisation doit contenir au moins 2 caractères',
        'any.required': 'La localisation est requise'
    }),
    categorie_id: Joi.number().integer().required().messages({
        'any.required': 'La catégorie est requise'
    })
});

export const annonceUpdateSchema = Joi.object({
    titre: Joi.string().min(3).max(100).messages({
        'string.min': 'Le titre doit contenir au moins 3 caractères',
        'string.max': 'Le titre ne peut pas dépasser 100 caractères'
    }),
    description: Joi.string().min(10).max(2000).messages({
        'string.min': 'La description doit contenir au moins 10 caractères',
        'string.max': 'La description ne peut pas dépasser 2000 caractères'
    }),
    prix: Joi.number().min(0).messages({
        'number.min': 'Le prix ne peut pas être négatif'
    }),
    localisation: Joi.string().min(2).max(100),
    categorie_id: Joi.number().integer()
}).min(1);