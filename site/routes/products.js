//MODULOS
const express = require('express');

const router = express.Router();

//CONTROLADORES
const controller = require('../controllers/productsController');

//MIDDLEWARES
const userLog = require('../middlewares/userLog')

//RUTAS
router.get('/', controller.pruebaVista);
router.get('/:id', controller.detalle);
router.post('/:id', userLog, controller.detalleCarrito )

module.exports = router;