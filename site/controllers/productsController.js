const dbProduct = require("../data/dataBase");
// SEQUELIZE
const db = require('../database/models')

module.exports = {
  pruebaVista: function (req, res, next) {
    res.render("productDetails", {
      title:"Detalle del producto",
      userLog: req.session.userLog
    });
  },
  detalle: function (req, res, next) {
    //let id = req.params.id;
    /*let producto = dbProduct.filter((producto) => {
      return id == producto.id;
    });*/
    //console.log(producto);

    db.products.findAll({
    include: [{association: "generos"}],
      where:{id: req.params.id}
   })
   .then(function(element){
     console.log("--------------------------------------------------")
     console.log(element[0].generos.gname)
     console.log(req.session.cart)
     console.log("--------------------------------------------------")
     

      res.render("productDetails", {
      title:"Detalle del producto",
      producto: element[0],
      userLog: req.session.userLog
  });
   })

    /*res.render("productDetails", {
        title:"Detalle del producto",
        producto: producto[0],
        userLog: req.session.userLog
    });*/
  },
  detalleCarrito: function(req,res,next){
    db.products.findAll({
      include: [{association: "generos"}],
        where:{id: req.params.id}
     })
     .then(function(element){
       if(req.session.userLog){
        if(req.session.cart  == undefined){
          req.session.cart = []
        }
         
         
         let producto = {
           id: element[0].id,
           name: element[0].name,
           price: element[0].price,
           image: element[0].image
         }
         let resultado = true
         let productId = ()=>{
           
           req.session.cart.forEach(element => {
           if(element.id == producto.id){
             return resultado = false
           }
         })
         return resultado
        };
         if(productId()){
          req.session.cart.push(producto)
         }
         console.log(req.session.cart)
         console.log(productId)
        res.redirect("/products/"+req.params.id);
       }else{
         res.redirect('/users/login')
       }
      
     })
  }

}
