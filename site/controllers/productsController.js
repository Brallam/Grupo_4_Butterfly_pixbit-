const dbProduct = require("../data/dataBase");

module.exports = {
  pruebaVista: function (req, res, next) {
    res.render("productDetails", {});
  },
  detalle: function (req, res, next) {
    let id = req.params.id;
    let producto = dbProduct.filter((producto) => {
      return id == producto.id;
    });
    console.log(producto);
    res.render("productDetails", {
        title:"Detalle del producto",
      producto: producto[0]
    });
  },
  eliminar:function(req,res){
    let aEliminar;
    let idProducto = req.params.id;
    dbProduct.forEach(producto => {
      if(producto.id== idProducto){
         aEliminar = dbProduct.indexof(producto)
        
      }
    })
    dbProduct.splice(aEliminar,1)
    res.redirect('/admin')
  }
};
