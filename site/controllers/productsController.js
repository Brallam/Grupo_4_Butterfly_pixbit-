let dbProduct = require('../data/dataBase') 

module.exports={

    pruebaVista:function(req,res,next){
        res.render('productDetails',{
            title:'Detalle del producto'
        })
    }
}