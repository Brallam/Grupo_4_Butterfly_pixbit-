const {check,validationResult,body} = require('express-validator');

module.exports = [
    check('email').trim().isEmail().withMessage('El email ingresado es invalido'),
]