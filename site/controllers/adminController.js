//BASE DE DATOS
const dbProduct = require("../data/database");
const dbUsers = require('../data/databaseUsers');
//MODULOS 
const fs = require("fs");
const path = require("path");
const {validationResult} = require('express-validator');
//DB SEQUELIZE
const db = require('../database/models')

module.exports = {
    mostrarForm:(req,res)=>{
        res.render("newProduct",{
            title:"Carga del producto"
        });
    },
    lista:(req,res)=>{
       
        let dbusuario
        db.users.findAll()
        .then((element)=>{
            dbusuario = element
         db.products.findAll({
                //include: [{association: "generos"}]
             })
             .then(function(element){
                let dpb=element
                 db.noticiabanner.findAll()
                 .then(element=>{
                    let banner=element
                db.noticiacarta.findAll()
                .then(element=>{
                 res.render("admin",{
                     usuarios:dbusuario,
                     dbP: dpb,
                     banner:banner,
                     carta:element
                    });
                })
              })
             })
         })
    },
    publicar:(req,res)=>{

        let errors = validationResult(req);

        if(errors.isEmpty()){
            db.products.create({
                name: req.body.name.trim(),
                price: (req.body.price)?Number(req.body.price):0,
                id_genre: req.body.genero,
                descripcion: req.body.description.trim(),
                requisito: req.body.requirements.trim(),
                image: (req.files[0])?req.files[0].filename:"default-image.png",
                propiedad: Boolean(Number(req.body.propiedad))
            })
           
            .catch(errores=>{
                console.log(errores)
            })
            res.redirect('/admin')
        }else{
            console.log("error-----------------")
            console.log(errors.errors)
            //res.redirect('/admin')
            res.render("newProduct",{
                title:"Carga del producto",
                old:req.body,
                errors:errors.errors
            });
        }

        

    },
    edit:(req,res)=>{
        let id = req.params.id;
        
        db.products.findAll({  include: [{association: "generos"}],
        where:{id: req.params.id}})
        .then((m)=>{
            console.log(m)
            res.render("editproduct",{
                title:"Editar producto",
                producto:m[0]
            })
        })
    },
    editp:(req,res)=>{
        let errors = validationResult(req);

        if(errors.isEmpty()){
            let id= Number(req.params.id)
            let img
            db.products.findAll({  include: [{association: "generos"}],
            where:{id:id}})
            .then((m)=>{
                return img=m[0].image
            })
            let producto={
                name: req.body.name.trim(),
                price: Number(req.body.price),
                id_genre: req.body.genero,
                descripcion: req.body.description.trim(),
                requisito: req.body.requirements.trim(),
                image: (req.files[0])?req.files[0].filename:img,
                propiedad: Boolean(Number(req.body.propiedad))
              }
            db.products.update(producto,{  include: [{association: "generos"}],
            where:{id:id}})
            res.redirect('/admin')
        }else{
            console.log("error-----------------")
            console.log(errors.errors)
            console.log(req.body.genero)

            db.products.findAll({  include: [{association: "generos"}],
            where:{id: req.params.id}})
            .then((m)=>{
                console.log(m)
                res.render("editproduct",{
                    title:"Editar producto",
                    producto:m[0],
                    old: req.body,
                    errors:errors.errors
                })
        })
        }

        
    },
    eliminar:function(req,res){
        
        db.products.destroy({
            where:{
                id:req.params.id
            }
        })
        return res.redirect('/admin')},
    banner:(req,res)=>{
        db.products.findAll({include: [{association: "generos"}], })
        .then((m)=>{
        res.render("noticiabanner",{
            title:"Creacion banner",
            producto:m, 
        })
         })
        
    },
    bannerpub:(req,res)=>{
        let errors = validationResult(req);

        if(errors.isEmpty()){
            
        db.noticiabanner.create({
            titulo: req.body.name.trim(),
            descripcion: req.body.description.trim(),
            image: (req.files[0])?req.files[0].filename:"default-image.png", 
            ref:req.body.ref,
        })
        .catch(errores=>{
            console.log(errores)
        })
        res.redirect('/admin')
         }
        else{
            db.products.findAll({include: [{association: "generos"}], })
            .then((m)=>{
            res.render("noticiabanner",{
                title:"Creacion banner",
                producto:m, 
                old:req.body,
                errors:errors.errors
            })  })
            console.log("error-----------------")
            console.log(errors.error);
        }
        
    },
    banneredit:(req,res)=>{
        
        let id = req.params.id;
        db.products.findAll({include: [{association: "generos"}], })
        .then(m=>{ 
        let produ=m
        db.noticiabanner.findAll({where:{id: req.params.id}})
        .then((m)=>{
            console.log(m)
            res.render("editbanner",{
                title:"Editar producto",
                producto:produ,
                banner:m[0]
            })
        } )
        })
    },
    bannereditp:(req,res)=>{

    let id= Number(req.params.id)
    let img
    let errors = validationResult(req);

    if(errors.isEmpty()){
    db.noticiabanner.findAll({ 
        where:{id:id}})
        .then((m)=>{
        return img=m[0].image
         })
    let banner={
         titulo: req.body.name.trim(),
         descripcion: req.body.description.trim(),
         image: (req.files[0])?req.files[0].filename:img, 
         ref:req.body.ref,
      }
    db.noticiabanner.update(banner,{ where:{id:id}})
    res.redirect('/admin')
     }
     else{
        db.products.findAll({include: [{association: "generos"}], })
        .then((m)=>{
        res.render("noticiabanner",{
            title:"Creacion Banner",
            producto:m, 
            old:req.body,
            errors:errors.errors
        })  })
        console.log("error-----------------")
        console.log(errors.error);
    }
 },
    bannerdelete:(req,res)=>{
            db.noticiabanner.destroy({
             where:{
              id:req.params.id
             }
        })
         return res.redirect('/admin')
    },
    carta:(req,res)=>{
        db.products.findAll({include: [{association: "generos"}], })
        .then((m)=>{
        res.render("noticiacarta",{
            title:"Creacion de tarjeta",
            producto:m, 
        })
         })
    },
    cartapub:(req,res)=>{
    let errors = validationResult(req);
    if(errors.isEmpty()){
        db.noticiacarta.create({
            titulo: req.body.name.trim(),
            descripcion: req.body.description.trim(),
            image: (req.files[0])?req.files[0].filename:"default-image.png", 
            ref:req.body.ref,
        })
        .catch(errores=>{
            console.log(errores)
        })
        res.redirect('/admin')
     }
     else{
        db.products.findAll({include: [{association: "generos"}], })
        .then((m)=>{
        res.render("noticiacarta",{
            title:"Creacion de tarjeta", 
            producto:m, 
            old:req.body,
            errors:errors.errors
        })  })
        console.log("error-----------------")
        console.log(errors.error);
    }

    },
    cartaedit:(req,res)=>{
        let id = req.params.id;
        db.products.findAll({include: [{association: "generos"}], })
        .then(m=>{ 
        let produ=m
        db.noticiacarta.findAll({where:{id: req.params.id}})
        .then((m)=>{
            console.log(m)
            res.render("editcarta",{
                title:"Editar producto",
                producto:produ,
                carta:m[0]
            })
        } )
        })
    },
    cartaeditp:(req,res)=>{
        let id= Number(req.params.id)
        let img
        let errors = validationResult(req);
        if(errors.isEmpty()){
        db.noticiacarta.findAll({ 
            where:{id:id}})
            .then((m)=>{
            return img=m[0].image
             })
        let carta={
             titulo: req.body.name.trim(),
             descripcion: req.body.description.trim(),
             image: (req.files[0])?req.files[0].filename:img, 
             ref:req.body.ref,
          }
        db.noticiacarta.update(carta,{ where:{id:id}})
        res.redirect('/admin')
         }
         else{
            db.products.findAll({include: [{association: "generos"}], })
            .then((m)=>{
            res.render("noticiacarta",{
                title:"Creacion de tarjeta", 
                producto:m, 
                old:req.body,
                errors:errors.errors
            })  })
            console.log("error-----------------")
            console.log(errors.error);
        }
     },
     cartadelete:(req,res)=>{
        db.noticiacarta.destroy({
         where:{
          id:req.params.id
         }
    })
     return res.redirect('/admin')
    },
    };
    
