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
const multerBanner=require("../middlewares/multerBanner.js")
const multerCarta=require("../middlewares/multerCarta")

//VALIDATORS
const adminValidator = require("../validators/newProductsValidaror")

//RUTAS

router.get('/',userAdminCheck, controller.lista);

router.get('/newProduct', controller.mostrarForm);
router.post('/newProduct',multerProduct.any(), adminValidator, controller.publicar);

router.get("/banner",controller.banner)
router.post("/banner",multerBanner.any(),controller.bannerpub)

router.get("/card",controller.carta)
router.post("/card",multerCarta.any(),controller.cartapub)

router.get('/editproduct/:id', userAdminCheck, controller.edit);
router.post('/editproduct/:id',multerProduct.any(), adminValidator, controller.editp);

router.get("/editbanner/:id",userAdminCheck,controller.banneredit)
router.post("/editbanner/:id",multerBanner.any(),controller.bannereditp)

router.get("/editcarta/:id",userAdminCheck,controller.cartaedit)
router.post("/editcarta/:id",multerCarta.any(),controller.cartaeditp)

router.delete("/deleteB/:id",userAdminCheck,controller.bannerdelete)

router.delete('/delete/:id',userAdminCheck, controller.eliminar)
router.delete("/deleteC/:id",userAdminCheck,controller.cartadelete)

module.exports = router;