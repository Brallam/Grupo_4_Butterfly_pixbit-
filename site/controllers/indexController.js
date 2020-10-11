let dbProduct = require('../data/dataBase') 
// SEQUELIZE
const db = require('../database/models')
module.exports={
    index:((req,res)=>{
        db.products.findAll({
            include: [{association: "generos"}],
            where:{propiedad:true}

         })
         .then(function(element){
             let bpb=element
             db.products.findAll({
                include: [{association: "generos"}],
                where:{propiedad:false}
             })
            .then((element)=>{
                let af=element
                res.render("index", {
                title:"ButterFly-PixBit",
                producto: element[0],
                bpb:bpb,
                af:af,
                userLog: req.session.userLog})
            })
         })

       /* db.sequelize.query('SELECT * FROM users')
        .then(function(resultados){
            let usuarios = resultados[0]   
            console.log(usuarios)
        })
        let bpb=dbProduct.filter(m =>{
            return m.propiedad==true;
        })
        let af=dbProduct.filter(m=>{
            return m.propiedad==false;
        })

        res.render("index", {
            title: "Butterfly PixBit",
            bpb:bpb,
            af:af,
            userLog: req.session.userLog
        })*/
    })
    }