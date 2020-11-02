
const multer = require('multer');
const path = require('path')
//MULTER
let storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'public/images/products')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage:storage,
    fileFilter:(req,res,next)=>{
        if(file.mimemtype=="image/png"||file.mimemtype=="image/jpg"||file.mimemtype=="image/jpeg"||file.mimemtype=="image/gif"){
            next(null,true)
        }
        else{
            next(null,false);
            return next ({message:"Solo se acepta archivos jpg,png,jpeg y gif"});
        }
    }
})

module.exports = upload