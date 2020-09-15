//------MÓDULOS
var express = require('express');
var router = express.Router();
var controller=require("../controllers/indexController")

//------RUTA GENERAL
router.get('/', controller.index);

module.exports = router;

