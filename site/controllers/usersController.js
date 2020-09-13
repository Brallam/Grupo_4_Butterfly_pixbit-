let dbUsers = require('../data/databaseUsers');
const dbProduct = require("../data/database");
const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");
var { check, validationResult, body } = require('express-validator')

module.exports = {
    profile:(req,res,next)=>{
        let id  =req.params.id;
        let usr=dbUsers.filter((usr)=>{
            return id==usr.id
        })
        res.render("usersProf",{
            title: "Perfil ",
            user:usr[0]
        })
    
    },
    editper:(req,res,next)=>{
        let id  =req.params.id;
        let usr=dbUsers.filter((usr)=>{
            return id==usr.id
        })
        res.render("editusr",{
            title: "Perfil ",
            user:usr[0]
        })
    },
    editf:(req,res,next)=>{
        let id  =req.params.id;
        let user = dbUsers.filter((m) => {
            return id == m.id;
          });
        let editusr = {
            id:Number(id),
            name: req.body.name.trim(),
            nameU: req.body.nameU.trim(),
            email:user[0].email,
            password:user[0].password,
            image: (req.files[0])?req.files[0].filename:user[0].image,
         }
        let p
        dbUsers.forEach(m=>{
            if (m.id==id){
             return p=dbUsers.indexOf(m) 
            }
        })
        dbUsers.splice(p,1,editusr)
        fs.writeFileSync(path.join(__dirname,"..",'data',"UsersDataBase.json"),JSON.stringify(dbUsers),'utf-8')
        res.redirect("/users/profile/"+id )

    },
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
    let errors = validationResult(req);


    if(errors.isEmpty()){

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
    }else{
        return res.render('register', {errors: errors.errors, title:'Registro'})
    }
   }
}