const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

router.get('/', productsController.pruebaVista);
router.get('/:id', productsController.detalle);

module.exports = router;