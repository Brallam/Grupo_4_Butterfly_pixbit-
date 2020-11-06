const db = require("../database/models");

module.exports = {
    vistaCarrito: function(req, res, next) {
        res.render("carrito",{
          title:"Carrito de compras",
          userLog: req.session.userLog,
          cart: req.session.cart
        });
    },
    borrarP: function(req, res, next){
        let carrito = req.session.cart 
        for (let index = 0; index < carrito.length; index++) {
            if(req.params.id == carrito[index].id){
                req.session.cart.splice(index,1)
            }
        }
        if(req.session.cart.length == 0){
            req.session.cart = undefined
        }
        res.redirect('/carrito')
    },
    borrarT: function(req,res,next){
        req.session.cart = undefined
        res.redirect('/carrito')
    },
    processCart:function(req,res,next){
        let carrito = req.session.cart
        let usuario = req.session.userLog

        if(carrito != undefined && usuario != undefined){
            
            carrito.forEach(element => {
                var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
                var key = "";
                for (i=0; i<20; i++) key +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
                console.log(key)

                db.cart.create({
                    cantidad: key,
                    id_product: element.id,
                    id_user: usuario.id
                })
                .then(function(result){
                    console.log(result)
                })
            });
            req.session.cart = undefined
            res.redirect('/carrito')
            console.log("salio bieeeeeeeeeeeeeeeeeeen")
            
        }else{
            console.log("salio maaaaaaaaaaaaaaaaaaaaaaaaaal")
            res.redirect('/carrito')
        }
    }
}