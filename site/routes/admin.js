var express = require('express');
var router = express.Router();

var controller = require("../controllers/adminController")
const override=require("method-override")
const multer = require('multer');
const path = require('path')
const userAdminCheck = require('../middlewares/userAdminCheck')

let storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'public/images/products')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage:storage})

//RUTAS

router.get('/',userAdminCheck, controller.lista);

router.get('/newProduct', userAdminCheck, controller.mostrarForm);
router.post('/newProduct',upload.any(), controller.publicar);

router.get('/editproduct/:id', userAdminCheck, controller.edit);
router.post('/editproduct/:id',upload.any(), controller.editp);

router.delete('/delete/:id',userAdminCheck, controller.eliminar)

module.exports = router;