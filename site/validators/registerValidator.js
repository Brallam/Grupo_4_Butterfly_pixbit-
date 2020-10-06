const {check,validationResult,body} = require('express-validator');

let dbUsers = require('../data/databaseUsers');
const db = require('../database/models')

module.exports= [
        check('name').trim().isLength({min: 1}).withMessage('El nombre es obligatorio'),

        check('nameU').trim().isLength({min: 1}).withMessage('El nombre de usuario es obligatorio'),

        check('email').trim().isEmail().withMessage('El email ingresado es invalido'),

        check('password').trim().isLength({min: 6}).withMessage('La contraseña tiene que tener un minimo de 6 caracteres'),

        body('email').trim().custom(function(value){
         return db.users.findOne({
            where :{
            email : value
            }
          }).then(function(user){
            if(user){
              return Promise.reject('El usuario ya existe')
            }
          })
        }),
        
        body('Cpassword').trim().custom(function(value, {req}){
          return value == req.body.password
        })
      ]
     