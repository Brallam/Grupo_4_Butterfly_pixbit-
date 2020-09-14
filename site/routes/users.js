//MODULOS 
var express = require('express');
var router = express.Router();
const path = require('path')

let controller = require('../controllers/usersController');

//VALIDACIONES
const registerValidator = require('../validators/registerValidator');
const loginValidator = require('../validators/loginValidator');

//MIDDLEWARES
const sessionUserCheck = require('../middlewares/sessionUserCheck')

//MULTER
const multer = require('multer');
let storage = multer.diskStorage({
  destination:(req,file,callback)=>{
      callback(null,"public/images/users")
  },
  filename:(req,file,callback)=>{
      callback(null,file.fieldname + Date.now() + path.extname(file.originalname))
  }
})

let upload = multer({storage:storage})

/* RUTAS DE USUARIOS */
router.get('/', function(req, res, next) {
 res.send('respond with a resource');
});
router.get("/profile/:id",controller.profile)

router.get("/edit/:id",controller.editper)
router.post("/edit/:id",upload.any(),controller.editf)

router.get('/register',sessionUserCheck, controller.registro)
router.post('/register', upload.any(),registerValidator, controller.processRegister)

router.get("/login",sessionUserCheck, controller.login )
router.post('/login',loginValidator ,controller.processLogin)



module.exports = router;
