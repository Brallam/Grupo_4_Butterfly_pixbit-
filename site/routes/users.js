//MODULOS 
var express = require('express');
var router = express.Router();
const path = require('path');

//CONTROLADORES
let controller = require('../controllers/usersController');

//VALIDACIONES
const registerValidator = require('../validators/registerValidator');
const loginValidator = require('../validators/loginValidator');
const editusrValidator = require('../validators/editusrValidator')

//MIDDLEWARES
const sessionUserCheck = require('../middlewares/sessionUserCheck')
const userCheck=require("../middlewares/editmidd")
const userLog = require('../middlewares/userLog')
const multerUsers =require('../middlewares/multerUsers')

/* RUTAS DE USUARIOS */
router.get('/', function(req, res, next) {
 res.send('respond with a resource');
}); 
router.get("/profile/:id",controller.profile)

router.get("/edit/:id",userCheck,controller.editper)
router.post("/edit/:id",multerUsers.any(), editusrValidator ,controller.editf)

router.get('/register',sessionUserCheck, controller.registro)
router.post('/register', multerUsers.any(),registerValidator, controller.processRegister)

router.get("/login", sessionUserCheck, controller.login )
router.post('/login',loginValidator,controller.processLogin)

router.get('/logout', controller.logout)

router.get("/keys",userLog,controller.key)




module.exports = router;
