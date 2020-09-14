//MÓDULOS
const fs = require("fs");
const path = require("path");
const bcrypt = require('bcrypt');
var { check, validationResult, body } = require('express-validator')
//BASES DE DATOS
let dbUsers = require('../data/databaseUsers');
const dbProduct = require("../data/database");

module.exports = {
    profile:(req,res,next)=>{
        let id  =req.params.id;
        let usr=dbUsers.filter((usr)=>{
            return id==usr.id
        })
        res.render("usersProf",{
            title: "Perfil ",
            user:usr[0],
            userLog: req.session.userLog
        })
    
    },
    editper:(req,res,next)=>{
        let id  =req.params.id;
        let usr=dbUsers.filter((usr)=>{
            return id==usr.id
        })
        res.render("editusr",{
            title: "Perfil ",
            user:usr[0],
            userLog: req.session.userLog
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
            admin:user[0].admin,
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
            title:"Registro",
            userLog: req.session.userLog
         }) 
    },
    login:(req,res,nex)=>{
        res.render("login",{
            title:'Iniciar Sesion',
            userLog: req.session.userLog
          })
    },
   processRegister:function(req,res){
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
        password:bcrypt.hashSync(req.body.password,10),
        image: (req.files[0])?req.files[0].filename:"default-image.png",
        admin: false
    }

    dbUsers.push(newUser);
    
    fs.writeFileSync(path.join(__dirname,"..",'data',"UsersDataBase.json"),JSON.stringify(dbUsers),'utf-8')
    
    res.redirect('/')
    }else{
        return res.render('register', {
            errors: errors.mapped(), 
            title:'Registro',
            old:req.body,
            userLog: req.session.userLog
        })
    }
   },
   processLogin:function(req,res){
       let errors = validationResult(req);
       let userALogearse

       if(errors.isEmpty()){
        dbUsers.forEach(user=>{
            if(user.email == req.body.email){
                if(user.password == req.body.password){
                    userALogearse = user;
                }
            }
        })
        if(userALogearse == undefined){
            return res.render("login",{
                title:'Iniciar Sesion',
                errors: [
                    {msg: 'Credenciales invalidas'}
                ],
                userLog: req.session.userLog
              })
        }

        req.session.userLog = userALogearse
        res.redirect('/')
       }else{
            res.render("login",{
            title:'Iniciar Sesion',
            errors: errors.errors,
            userLog: req.session.userLog
          })
       }
   }
}