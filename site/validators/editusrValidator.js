const {check,validationResult,body} = require('express-validator');
const path = require('path');

module.exports = [
    body('image').custom(function(value,{req}){
        if(req.files[0] == undefined){
            return true
        }else{
            value = req.files[0].originalname
            if(path.extname(value) == ".png" || path.extname(value) == ".jpg" || path.extname(value) == ".jpeg" || path.extname(value) == ".gif"){
                return true
            }else{
                return false
            }
        }
    }).withMessage('Extencion de imagen invalida'),

    check('name').trim().isLength({min:1}).withMessage('El nombre no puede quedar vacio'),

    check('nameU').trim().isLength({min:1}).withMessage('El nombre de usuario no puede quedar vacio')
]