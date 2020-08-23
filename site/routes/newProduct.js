var express = require('express');
var router = express.Router();

var controller = require("../controllers/gamesController")

router.get('/', controller.mostrarForm);

module.exports = router;