//BASE DE DATOS
const dbProduct = require("../data/database");
const dbUsers = require('../data/databaseUsers');
//MODULOS 
const fs = require("fs");
const path = require("path");
// SEQUELIZE
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
                include: [{association: "generos"}]
             })
             .then(function(element){
                 res.render("admin",{
                     usuarios:dbusuario,
                     dbP: element
                 });
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
        let aEliminar;
        let idProducto = req.params.id;
        dbProduct.forEach(producto => {
          if(producto.id== idProducto){
             aEliminar = dbProduct.indexOf(producto)
            
          }
        })
        dbProduct.splice(aEliminar,1)
        fs.writeFileSync(path.join(__dirname,"..", "data","productsDataBase.json"),JSON.stringify(dbProduct), "utf-8");
        res.redirect('/admin')
      },
    banner:(req,res)=>{
        res.render("noticiabanner",{
            title:"Carga del producto"
        })
    },
    bannerpub:(req,res)=>{

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
    };
    
