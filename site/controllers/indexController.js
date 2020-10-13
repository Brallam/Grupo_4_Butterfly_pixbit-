
let dbProduct = require('../data/dataBase') 
// SEQUELIZE
const db = require('../database/models')
module.exports={
    home:((req,res)=>{
        db.noticiabanner.findAll()
        .then((m)=>{
        res.render("Home",{
             title:"Butterfly pixbit",
             banner:m,
             userLog: req.session.userLog
         })
      
        })
       
    }),
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
                title:"Tienda",
                bpb:bpb,
                af:af,
                userLog: req.session.userLog})
            })
         })

    })
    }