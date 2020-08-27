var express = require('express');
var router = express.Router();

var controller = require("../controllers/adminController")

const multer = require('multer');
const path = require('path')

let storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'public/images/products')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage:storage})

router.get('/', controller.lista);
router.get('/newProduct', controller.mostrarForm);
router.post('/newProduct',upload.any(), controller.publicar)
router.get('/editproduct/:id', controller.edit);
router.post('/editproduct/:id', controller.editp)

module.exports = router;