var express = require('express');
var router = express.Router();
const path = require('path');


const controller = require('../controllers/productsController');

router.get('/', controller.pruebaVista);
router.get('/:id', controller.detalle);

module.exports = router;