const multer = require('multer');
const path = require('path')
//MULTER
let storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'public/images/newsCard')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage:storage})

module.exports = upload