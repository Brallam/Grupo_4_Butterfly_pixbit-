var express = require('express');
var router = express.Router();

const productsController = require('../controllers/productsController');

router.get('/', productsController.pruebaVista);
router.get('/:id', productsController.detalle);

module.exports = router;