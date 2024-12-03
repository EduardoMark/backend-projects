const { query, body, param } = require('express-validator');

const validateUserQuery = [
    query('name')
        .optional()
        .isString()
        .withMessage('O nome deve ser do tipo texto!')
        .isLength({ min: 3, max: 50 })
        .withMessage('O nome deve ter entre 3 e 50 caracteres!')
        .trim()
        .escape(),

    query('email')
        .optional()
        .isEmail()
        .withMessage('O email deve ser um email válido!')
        .trim()
        .escape()
];

const validateUserBody = [
    body('name')
        .notEmpty()
        .withMessage('O nome não pode ser vazio')
        .isString()
        .withMessage('O nome deve ser do tipo texto!')
        .isLength({ min: 3, max: 50 })
        .withMessage('O nome deve ter entre 3 e 50 caracteres!')
        .trim()
        .escape(),

    body('email')
        .notEmpty()
        .withMessage('O email não pode ser vazio')
        .isEmail()
        .withMessage('O email deve ser um email válido!')
        .trim()
        .escape(),

    body('password')
        .notEmpty()
        .withMessage('A senha não pode ser vazia')
        .isString()
        .withMessage('A senha deve ser do tipo texto!')
        .isLength({ min: 3 })
        .withMessage('A senha deve ter no mínimo 3 caracteres')
        .trim()
        .escape(),
];

const validateUserIdParam = [
    param('id')
        .notEmpty()
        .withMessage('O id não pode ser vazio')
        .isUUID(4)
        .withMessage('O id deve ser do tipo UUID v4')
        .trim()
        .escape()
];

const validateUserBodyForUpdate = [
    body('name')
        .optional()
        .isString()
        .withMessage('O nome deve ser do tipo texto!')
        .isLength({ min: 3, max: 50 })
        .withMessage('O nome deve ter entre 3 e 50 caracteres!')
        .trim()
        .escape(),

    body('email')
        .optional()
        .isEmail()
        .withMessage('O email deve ser um email válido!')
        .trim()
        .escape(),

    body('newPassword')
        .optional()
        .isString()
        .withMessage('A senha deve ser do tipo texto!')
        .isLength({ min: 3 })
        .withMessage('A senha deve ter no mínimo 3 caracteres')
        .trim()
        .escape(),
];

module.exports = {
    validateUserQuery,
    validateUserBody,
    validateUserIdParam,
    validateUserBodyForUpdate
}