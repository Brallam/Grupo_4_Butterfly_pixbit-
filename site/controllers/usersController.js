//MÓDULOS
const fs = require("fs");
const path = require("path");
const bcrypt = require('bcrypt');
var { check, validationResult, body } = require('express-validator')
//BASE DE DATOS
let dbUsers = require('../data/databaseUsers');

// SEQUELIZE
const db = require('../database/models')
module.exports = {
    profile:(req,res,next)=>{
        db.users.findAll(
            {where: { id:req.params.id}}
        )
        .then((element)=>{
            console.log(element)
            res.render("usersProf",{
                title: "Perfil ",
                user:element[0],
                userLog: req.session.userLog
          
         }) } )
       /* let id  =req.params.id;
        let usr=dbUsers.filter((usr)=>{
            return id==usr.id
        })
        res.render("usersProf",{
            title: "Perfil ",
            user:usr[0],
            userLog: req.session.userLog
        })*/
    
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

        db.users.create(
            {
            name: req.body.name.trim(),
            nameU:req.body.nameU.trim(),
            email:req.body.email.trim(),
            password:bcrypt.hashSync(req.body.password,10),
            image: (req.files[0])?req.files[0].filename:"default-image.png",
            admin: true
        }
        )
        .then(function(result){
            console.log(result)
        })
        return  res.redirect('/users/login')
        .catch(errores=>{
            console.log(errores)
        })
    }else{
        return res.render('register', {
            errors: errors.errors, 
            title:'Registro',
            old:req.body,
            userLog: req.session.userLog
        })
    }
   },
   processLogin:function(req,res){
       let errors = validationResult(req);
       
       if(errors.isEmpty()){
           console.log('viene bieeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeen')
        db.users.findOne({
            where:{
                email:req.body.email
            }
        }).then(function(user){
            console.log('salió maaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaal')
            req.session.userLog={
            id:user.id,
            name:user.name,
            nameU:user.nameU,
            email:user.email,
            image:user.image,
            admin:user.admin
            }
            if(req.body.remember=! undefined){
                res.cookie("usrsess", req.session.userLog.email,{maxAge: 3.154e+10} )
            }
            res.locals.user = req.session.userLog
            res.redirect('/')
        })
        
       }else{
            res.render("login",{
            title:'Iniciar Sesion',
            errors: errors.errors,
            userLog: req.session.userLog,
            old:req.body,

          })
       }
   },
   logout:function(req,res){
    
    req.session.destroy();
    if(req.cookies.usrsess){
        res.cookie('usrsess','',{maxAge:-1})
    }
    res.redirect('/')
   }
}