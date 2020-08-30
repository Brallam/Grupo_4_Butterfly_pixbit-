const express = require('express');
const router = express.Router();


const controller = require('../controllers/productsController');

router.get('/', controller.pruebaVista);
router.get('/:id', controller.detalle);
router.delete('/delete/:id',controller.eliminar)

module.exports = router;