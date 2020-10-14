//MODULOS
var express = require('express');
var router = express.Router();

//CONTROLADORES
var controller=require("../controllers/indexController")
let middlestore=require("../middlewares/middlestore")
let middlecat=require("../middlewares/middlecat")

/* GET home page. */
router.get("/",controller.home)
router.get('/store/:id?/:d?',middlestore, controller.index);

module.exports = router;

