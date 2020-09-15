const {check,validationResult,body} = require('express-validator');

const bcrypt = require ('bcrypt')

let dbUsers = require('../data/databaseUsers');

module.exports = [
    check('email').trim().isEmail().withMessage('El email ingresado es invalido'),

    body('pass')
    .custom(function(value,{req}){
        let result = true;
        dbUsers.forEach(user => {
            if(user.email == req.body.email){
                if(!bcrypt.compareSync(value,user.password)){
                    result = false
                }
            }
        });
        if (result == false){
            return false
        }else{
            return true
        }
    })
    .withMessage("Contraseña incorrecta")
]