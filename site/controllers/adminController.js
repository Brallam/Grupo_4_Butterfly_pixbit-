//BASE DE DATOS
const dbProduct = require("../data/database");
const dbUsers = require('../data/databaseUsers');
//MODULOS 
const fs = require("fs");
const path = require("path");
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
                 res.render("admin",{
                     usuarios:dbusuario,
                     dbP: dpb,
                     banner:element
                    });
              })
             })
         })
    },
    publicar:(req,res)=>{

        db.products.create({
            name: req.body.name.trim(),
            price: Number(req.body.price),
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
            title:"Carga del producto",
            producto:m, 
        })
         })
        
    },
    bannerpub:(req,res)=>{
        db.noticiabanner.create({
            titulo: req.body.title.trim(),
            descripcion: req.body.description.trim(),
            image: (req.files[0])?req.files[0].filename:"default-image.png", 
            ref:req.body.ref,
        })
        .catch(errores=>{
            console.log(errores)
        })
        res.redirect('/admin')
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
    db.noticiabanner.findAll({ 
        where:{id:id}})
        .then((m)=>{
        return img=m[0].image
         })
    let banner={
         titulo: req.body.title.trim(),
         descripcion: req.body.description.trim(),
         image: (req.files[0])?req.files[0].filename:img, 
         ref:req.body.ref,
      }
    db.noticiabanner.update(banner,{ where:{id:id}})
    res.redirect('/admin')
 },
    bannerdelete:(req,res)=>{
            db.noticiabanner.destroy({
             where:{
              id:req.params.id
             }
        })
         return res.redirect('/admin')
    }

    };
    
