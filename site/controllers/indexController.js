// SEQUELIZE//
const db = require('../database/models')
module.exports={
    home:((req,res)=>{
        db.noticiabanner.findAll()
        .then((m)=>{
        let banner=m
        db.noticiacarta.findAll()
        .then(m=>{
        res.render("Home",{
             title:"Butterfly pixbit",
             banner:banner,
             carta:m,
             userLog: req.session.userLog
         })
        })
        })
       
    }),
    index:((req,res)=>{
        let id= req.params.id
        let g=req.params.d
        let ge="active1"
        let c=[]
        Number(g)
        let pro
        let gen=db.Genres.findAll()
        if(g>=1||g<=8){
            pro=db.products.findAll({where:{id_genre:g}})
        }else{
        pro=db.products.findAll()}
        if(id==undefined&&g==undefined){
            pro=db.products.findAll({where:{propiedad:true}})
        }
        Promise.all([pro,gen])
        .then(([pro,gen])=>{
            console.log(g)
            gen.forEach(m=>{ c.push(m.id)}) 
            for(let i=0;i<=c.length;i++){
                if(g==i){
                    ge=""
                }
             }
            if(id==1){
            pro= pro.filter(p=> p.propiedad==true)
             }
            if(id==2){
            pro=pro.filter(p=> p.propiedad==false)
            }
        res.render("index",{
            title:"Tienda",
            id:req.params.id,
            ge:ge,
            g:g,
            genero:gen,
            pro:pro,
            userLog: req.session.userLog
        }) 
    })
    })
        
    }