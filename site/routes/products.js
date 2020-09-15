//MÖDULOS
const express = require('express');
const router = express.Router();

const sessionUserCheck = require('../middlewares/sessionUserCheck')

//CONTROLADORES
const controller = require('../controllers/productsController');
//RUTAS
router.get('/', controller.pruebaVista);
router.get('/:id', controller.detalle);
router.get('/',sessionUserCheck, function(req, res, next) {
    res.render("carrito",{
      title:"Carrito de compras",
      userLog: req.session.userLog
    })
 })

  

  

module.exports = router;