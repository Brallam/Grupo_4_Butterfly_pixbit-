//---MÓDULOS
var express = require('express');
var router = express.Router();
const override=require("method-override")

//---CONTROLADORES
var controller = require("../controllers/adminController")
//---MIDDLEWARES
const userAdminCheck = require('../middlewares/userAdminCheck')
const multerProduct = require('../middlewares/multerProduct')

//RUTAS DE PRODUCTOS

router.get('/',userAdminCheck, controller.lista);

router.get('/newProduct', userAdminCheck, controller.mostrarForm);
router.post('/newProduct',multerProduct.any(),userAdminCheck, controller.publicar);

router.get('/editproduct/:id', userAdminCheck, controller.edit);
router.post('/editproduct/:id',multerProduct.any(),userAdminCheck, controller.editp);

router.delete('/delete/:id',userAdminCheck, controller.eliminar)

module.exports = router;