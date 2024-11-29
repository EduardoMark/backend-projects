const { query, body, param } = require('express-validator');
const { validationResult } = require('express-validator');

const validateBooksQuery = [
    query('author')
        .optional()
        .isString()
        .withMessage('O autor deve ser uma string válida!')
        .trim()
        .escape(),

    query('year')
        .optional()
        .isInt({ min: 1 })
        .withMessage('O ano deve ser um número inteiro positivo!')
        .toInt()
];

const validateBooksBody = [
    body('title')
        .notEmpty()
        .withMessage('O campo título não deve ser vazio!')
        .isString()
        .withMessage('O campo título deve ser do tipo texto!')
        .isLength({ min: 3, max: 100 })
        .withMessage('O títitulo deve ter entre 3 e 100 caracteres!')
        .trim()
        .escape(),

    body('author')
        .notEmpty()
        .withMessage('O campo autor não deve ser vazio!')
        .isString()
        .withMessage('O campo autor deve ser do tipo texto!')
        .isLength({ min: 3, max: 50 })
        .withMessage('O títitulo deve ter entre 3 e 50 caracteres!')
        .trim()
        .escape(),

    body('year')
        .notEmpty()
        .withMessage('O campo ano não deve ser vazio!')
        .isInt({ min: 1 })
        .withMessage('O campo ano deve ser um número inteiro positivo!')
        .toInt()
];

const validateBooksBodyForUpdate = [
    body('title')
        .optional()
        .isString()
        .withMessage('O campo título deve ser do tipo texto!')
        .isLength({ min: 3, max: 100 })
        .withMessage('O títitulo deve ter entre 3 e 100 caracteres!')
        .trim()
        .escape(),

    body('author')
        .optional()
        .isString()
        .withMessage('O campo autor deve ser do tipo texto!')
        .isLength({ min: 3, max: 50 })
        .withMessage('O títitulo deve ter entre 3 e 50 caracteres!')
        .trim()
        .escape(),

    body('year')
        .optional()
        .isInt({ min: 1 })
        .withMessage('O campo ano deve ser um número inteiro positivo!')
        .toInt()
];

const validateID = [
    param('id')
        .notEmpty()
        .withMessage('O campo id não pode ser vazio!')
        .bail()
        .isUUID()
        .withMessage('O campo id deve ser um UUID válido!')
        .trim()
        .escape()
];

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }
    next();
};

module.exports = {
    validateBooksQuery,
    validateBooksBody,
    validateBooksBodyForUpdate,
    validateID,
    validateRequest
};