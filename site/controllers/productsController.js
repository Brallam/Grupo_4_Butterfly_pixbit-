let dbProduct = require('../data/dataBase') 

module.exports={
    pruebaVista:function(req,res,next){
        res.render('productDetails',{
            title:"Detalle",
            productos: dbProduct
        })
    },
    detalle:function(req,res,next){
        
        let id= req.params.id;
        let producto = dbProduct.filter(producto=>{
            return id==producto.id
        })
       
        res.render('productDetails',{
            title:"Detalle",
            producto:producto[0]
        })
    }
}