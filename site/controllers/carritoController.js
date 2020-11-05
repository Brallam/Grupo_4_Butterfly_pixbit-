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
    }
}