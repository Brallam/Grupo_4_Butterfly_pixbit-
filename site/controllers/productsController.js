let dbProduct = require('../data/dataBase') 

module.exports={

    pruebaVista:function(req,res,next){
        res.render('productDetails',{
            
            productos: dbProduct
        })
    },
    detalle:function(req,res,next){
        let id= req.params.id;
        let producto = dbProduct.filter(producto=>{
            return id==producto.id
        })
        console.log(producto)
        res.render('productDetails',{
            
            producto:producto[0]
        })
    }
}