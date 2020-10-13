//MODULOS
var express = require('express');
var router = express.Router();

//CONTROLADORES
var controller = require("../controllers/adminController")
const override =require("method-override")
const multer = require('multer');
const path = require('path')

//MIDDLEWARES
const userAdminCheck = require('../middlewares/userAdminCheck')
const multerProduct =require('../middlewares/multerProduct')

//RUTAS

router.get('/',userAdminCheck, controller.lista);

router.get('/newProduct', controller.mostrarForm);
router.post('/newProduct',multerProduct.any(), controller.publicar);
router.get("/banner",controller.banner)

router.get('/editproduct/:id', userAdminCheck, controller.edit);
router.post('/editproduct/:id',multerProduct.any(), controller.editp);

router.delete('/delete/:id',userAdminCheck, controller.eliminar)

module.exports = router;