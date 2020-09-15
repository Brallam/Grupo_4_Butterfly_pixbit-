var express = require('express');
var router = express.Router();

const sessionUserCheck = require('../middlewares/sessionUserCheck')

/* GET home page. */
router.get('/', sessionUserCheck,function(req, res, next) {
  res.render("carrito",{
    title:"Carrito de compras",
    userLog: req.session.userLog
  });
});

module.exports = router;