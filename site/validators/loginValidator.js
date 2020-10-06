const {check,validationResult,body} = require('express-validator');

const bcrypt = require ('bcrypt')

let db = require('../database/models');

module.exports = [
    check('email').trim().isEmail().withMessage('El email ingresado es invalido'),

    body('email').custom(function(value){
        return db.users.findOne({
            where:{
                email:value
            }
        })
        .then(function(user){
            if(!user){
                Promise.reject('Email no registradooooooooooooooooo')
            }
        })
    }),
    body('password').custom(function(value,{req}){
        return db.users.findOne({
            where:{
                email :req.body.email
            }
        })
        .then(userr => {
            if(!bcrypt.compareSync(value,userr.dataValues.password)){ 
                return Promise.reject('Las contraseñas no coinciden')
            }
        })
        .catch(() => {
            return Promise.reject('Credenciales inválidas')
        })
    })

    
]