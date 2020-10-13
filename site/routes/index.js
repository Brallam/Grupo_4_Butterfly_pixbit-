//MODULOS
var express = require('express');
var router = express.Router();

//CONTROLADORES
var controller=require("../controllers/indexController")

/* GET home page. */
router.get("/",controller.home)
router.get('/store', controller.index);

module.exports = router;

