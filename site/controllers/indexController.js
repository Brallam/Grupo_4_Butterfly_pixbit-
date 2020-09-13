let dbProduct = require('../data/dataBase') 

module.exports={
    index:((req,res)=>{
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
        })
    })
}