var express = require('express');
var router = express.Router();

var controller = require("../controllers/adminController")

router.get('/', controller.lista);
router.get('/newProduct', controller.mostrarForm);
router.post('/newProduct', controller.publicar)
router.get('/editproduct/:id', controller.edit);
router.post('/editproduct/:id', controller.editp)

module.exports = router;