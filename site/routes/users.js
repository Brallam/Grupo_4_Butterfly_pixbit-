var express = require('express');
var router = express.Router();
let controller = require('../controllers/usersController');
const multer = require('multer');
const path = require('path')
const usersValidator = require('../validators/usersValidator');

let storage = multer.diskStorage({
  destination:(req,file,callback)=>{
      callback(null,"public/images/users")
  },
  filename:(req,file,callback)=>{
      callback(null,file.fieldname + Date.now() + path.extname(file.originalname))
  }
})

let upload = multer({storage:storage})

/* GET users listing. */
router.get('/', function(req, res, next) {
 res.send('respond with a resource');
});
router.get('/register', controller.registro)

  router.get("/login", controller.login )
  router.post('/register', upload.any(),usersValidator, controller.guardar)


module.exports = router;
