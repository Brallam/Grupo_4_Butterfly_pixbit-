const dbProduct = require("../data/dataBase");
// SEQUELIZE
const db = require('../database/models')

module.exports = {
  pruebaVista: function (req, res, next) {
    res.render("productDetails", {
      title: "Detalle del producto",
      userLog: req.session.userLog
    });
  },
  detalle: function (req, res, next) {
    db.products.findAll({
      include: [{ association: "generos" }, { association: "users" }],
      where: { id: req.params.id }
    })
      .then(function (element) {
        console.log("--------------------------------------------------")

        console.log("--------------------------------------------------")

        if (element.length != 0) {
          if (req.session.userLog && element) {
            let idUsers = []
            element[0].users.forEach(function (usuario) {
              idUsers.push(usuario.id)
            })

            console.log(idUsers)
            function compra() {
              let r = true
              idUsers.forEach(function (a) {
                if (a == req.session.userLog.id) {
                  r = false
                }
              })
              return r
            }
          } else {
            function compra() {
              return true
            }
          }

          console.log(compra())

          res.render("productDetails", {
            title: "Detalle del producto",
            producto: element[0],
            userLog: req.session.userLog,
            puedeComprar: compra()
          });
        } else {
          res.redirect('/')
        }
      })
  },
  detalleCarrito: function (req, res, next) {
    db.products.findAll({
      include: [{ association: "generos" }, { association: "users" }],
      where: { id: req.params.id }
    })
      .then(function (element) {
        //if(req.session.userLog){


        let idUsers = []
        element[0].users.forEach(function (usuario) {
          idUsers.push(usuario.id)
        })

        console.log(idUsers)
        function compra() {
          let r = true
          idUsers.forEach(function (a) {
            if (a == req.session.userLog.id) {
              r = false
            }
          })
          return r
        }


        if (compra()) {
          if (req.session.cart == undefined) {
            req.session.cart = []
          }
          let producto = {
            id: element[0].id,
            name: element[0].name,
            price: element[0].price,
            image: element[0].image
          }
          let resultado = true
          let productId = () => {
            req.session.cart.forEach(element => {
              if (element.id == producto.id) {
                return resultado = false
              }
            })
            return resultado
          };
          if (productId()) {
            req.session.cart.push(producto)
          }
          console.log(req.session.cart)
          console.log(productId)
          res.redirect("/products/" + req.params.id);
        } else {
          res.redirect("/products/" + req.params.id);
        }



        //}else{
        //res.redirect('/users/login')
        //}

      })
  }

}
