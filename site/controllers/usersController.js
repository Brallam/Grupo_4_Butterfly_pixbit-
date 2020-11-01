//MÓDULOS
const fs = require("fs");
const path = require("path");
const bcrypt = require('bcrypt');
var {check , validationResult, body} = require('express-validator')
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
    },
    editper:(req,res,next)=>{
        let id  =req.params.id;
        db.users.findAll({
        where:{id: req.params.id}})
        .then((m)=>{
            res.render("editusr",{
                title:"Editar Perfil",
                user:m[0],
                userLog: req.session.userLog
            })
        })
      
    },
    editf:(req,res,next)=>{
        let errors = validationResult(req);

        if(errors.isEmpty()){
            let id =req.params.id;
            db.users.findAll({where: { id:id}})
            .then((m)=>{
                let newImagen = (typeof req.files[0] != 'undefined')?req.files[0].filename:m[0].image
            let newusr = {
                id:Number(m.id),
                name: req.body.name.trim(),
                nameU: req.body.nameU.trim(),
                email:m[0].email,
                password:m[0].password,
                admin:m[0].admin,
                image: newImagen,
            }
            req.session.userLog.name = req.body.name.trim()
            req.session.userLog.nameU = req.body.nameU.trim()
            req.session.userLog.image = newImagen
            
            db.users.update(newusr, {where: { id:id}})
            res.redirect('/users/profile/' + id)
            })
        }else{
            //res.redirect('/')
            console.log(errors.errors)
            
            //console.log("hubo error!!!!")
            let id  =req.params.id;
            db.users.findAll({
            where:{id: req.params.id}})
            .then((m)=>{
                res.render("editusr",{
                    title:"Editar Perfil",
                    user:m[0],
                    old:req.body,
                    errors:errors.errors,
                    userLog: req.session.userLog
                })
            })
        }

        

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
           
        db.users.findOne({
            where:{
                email:req.body.email
            }
        }).then(function(user){
            
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