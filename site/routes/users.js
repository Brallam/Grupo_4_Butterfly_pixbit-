var express = require('express');
var router = express.Router();
const override=require("method-override")
const multer = require('multer');
const path = require('path')


let controller = require('../controllers/usersController')

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
  router.post('/register', upload.any(), controller.guardar)


module.exports = router;
