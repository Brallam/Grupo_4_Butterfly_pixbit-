//MODULOS
var express = require('express');
var router = express.Router();

//CONTROLADOR
var carritoController = require('../controllers/carritoController')

//MIDDLEWARES
const userLog = require('../middlewares/userLog')

/* GET home page. */
router.get('/', carritoController.vistaCarrito);
router.post('/', userLog, carritoController.processCart)
router.delete('/delete/:id', userLog, carritoController.borrarP)
router.delete('/deleteAll', userLog, carritoController.borrarT)

module.exports = router;