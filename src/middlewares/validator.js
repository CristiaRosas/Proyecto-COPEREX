import { body } from 'express-validator';
import { validarCampos } from './validar-campos.js';


export const registerValidator = [
    body('name', 'The name is required').not().isEmpty(),
    body('impacto', 'The impacto is required').isIn(['bajo', 'medio', 'alto']),
    body('nivel', 'The nivel is required').isIn(['local', 'mundial']),
    body('año', 'The year is required').isNumeric(), // Validar año como número
    body('categoria', 'The categoria is required').not().isEmpty().isLength({ min: 8 }), // Validar longitud mínima
    validarCampos,
];

export const loginValidator = [
    body('email').optional().isEmail().withMessage("Enter a valid email adress"),
    body('username').optional().isEmail().isString().withMessage("Entert a valid usernamea"),
    body('password', "Password must be at least 6 characters").isLength({min: 8}),
    validarCampos,
]