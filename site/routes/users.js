//MÓDULOS 
var express = require('express');
var router = express.Router();

//CONTROLADORES
let controller = require('../controllers/usersController');

//VALIDACIONES
const registerValidator = require('../validators/registerValidator');
const loginValidator = require('../validators/loginValidator');

//MIDDLEWARES
const sessionUserCheck = require('../middlewares/sessionUserCheck')
const multerPerfil = require('../middlewares/multerPerfil')

/* RUTAS DE USUARIOS */

router.get('/register', controller.registro)
router.post('/register', multerPerfil.any(),registerValidator, controller.processRegister)

router.get("/login", controller.login )
router.post('/login',loginValidator ,controller.processLogin)

router.get("/profile/:id",sessionUserCheck,controller.profile)

router.get("/edit/:id",sessionUserCheck,controller.editper)
router.post("/edit/:id",multerPerfil.any(),sessionUserCheck,controller.editf)

router.get('/logout', controller.logout)

module.exports = router;
