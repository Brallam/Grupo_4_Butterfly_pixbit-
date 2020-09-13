var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("carrito",{
    title:"Carrito de compras",
    userLog: req.session.userLog
  });
});

module.exports = router;