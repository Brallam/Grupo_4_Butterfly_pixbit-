//MODULOS
var express = require('express');
var router = express.Router();

//CONTROLADOR
var carritoController = require('../controllers/carritoController')

/* GET home page. */
router.get('/', carritoController.vistaCarrito);
router.post('/', carritoController.processCart)
router.delete('/delete/:id', carritoController.borrarP)
router.delete('/deleteAll', carritoController.borrarT)

module.exports = router;