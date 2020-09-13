let dbUsers = require('../data/databaseUsers');
const dbProduct = require("../data/database");
const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");

module.exports = {
    registro:(req,res,next)=>{
        res.render("register",{
            title:"Registro"
         }) 
    },
    login:(req,res,nex)=>{
        res.render("login",{
            title:'Iniciar Sesion'
          })
    },
    guardar:function(req,res){
    let lastID = 1;
        dbUsers.forEach(usuario => {
            if(usuario.id >= lastID){
                lastID = usuario.id
            }
    });
    lastID = lastID + 1
    let newUser ={
        id: lastID,
        name: req.body.name.trim(),
        nameU:req.body.nameU.trim(),
        email:(req.body.email).trim(),
        password:req.body.password.trim(),
        image: (req.files[0])?req.files[0].filename:"default-image.png",
        admin: false
    }

    dbUsers.push(newUser);
    
    fs.writeFileSync(path.join(__dirname,"..",'data',"UsersDataBase.json"),JSON.stringify(dbUsers),'utf-8')
    
    res.redirect('/')
   }
}