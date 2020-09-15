const dbProduct = require("../data/dataBase");

module.exports = {
  pruebaVista: function (req, res, next) {
    res.render("productDetails", {
      title:"Detalle del producto",
      userLog: req.session.userLog
    });
  },
  detalle: function (req, res, next) {
    let id = req.params.id;
    let producto = dbProduct.filter((producto) => {
      return id == producto.id;
    });
    console.log(producto);
    res.render("productDetails", {
        title:"Detalle del producto",
        producto: producto[0],
        userLog: req.session.userLog
    });
  },
  vistaCarrito:function(req, res, next) {
    res.render("carrito",{
      title:"Carrito de compras",
      userLog: req.session.userLog
    });
  
}
}
