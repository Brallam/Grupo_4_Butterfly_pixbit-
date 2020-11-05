//MODULOS
const express = require('express');
const router = express.Router();

//CONTROLADORES
const controller = require('../controllers/productsController');

//RUTAS
router.get('/', controller.pruebaVista);
router.get('/:id', controller.detalle);
router.post('/:id', controller.detalleCarrito )


module.exports = router;