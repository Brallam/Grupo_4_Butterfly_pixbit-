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
  }
}
