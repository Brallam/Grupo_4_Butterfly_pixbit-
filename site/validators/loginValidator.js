const {check,validationResult,body} = require('express-validator');

const bcrypt = require ('bcrypt')

let dbUsers = require('../data/databaseUsers');

module.exports = [
    check('email').trim().isEmail().withMessage('El email ingresado es invalido')

     ]