const {check,validationResult,body} = require('express-validator');
const path = require('path');
//let img = req.files[0].filename;

module.exports = [
    check('name').trim().isLength({min:1}).withMessage('El nombre es obligatorio.'),

    check('description').trim().isLength({min:1}).withMessage('La descripcion es obligatoria.'),
    
    body('genero').custom(function(value,{req}){
        if(value == undefined){
            return false
        }else{
            return true
        }
    }).withMessage('Se necesita un genero.'),

    check('requirements').trim().isLength({min:1}).withMessage('La descripcion es obligatoria'),

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
    }).withMessage('Extencion de imagen invalida')

    //check('price').isNumeric().withMessage('El precio debe ser numeros')
    
]