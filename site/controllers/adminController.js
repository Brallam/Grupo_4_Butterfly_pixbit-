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
        })

        db.products.findAll({
           include: [{association: "generos"}]
        })
        .then(function(element){
            console.log(element[2].generos.gname)
            res.render("admin",{
                usuarios:dbusuario,
                dbP: element
            });
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
        .then(function(result){
            console.log(result)
        })
        .catch(errores=>{
            console.log(errores)
        })
        res.redirect('/admin')

    },
    edit:(req,res)=>{
        let id = req.params.id;
        let producto = dbProduct.filter((producto) => {
          return id == producto.id;
        });
        console.log(producto);
        res.render("editproduct", {
            title:"Detalle del producto",
          producto: producto[0]
        });
    },
    editp:(req,res)=>{
        let id= Number(req.params.id)
        let reqgeneros = [req.body.Accion, req.body.Disparos, req.body.Estrategia, req.body.Simulacion, req.body.Deporte, req.body.Carrera, req.body.Aventura, req.body.ROL]
        let generos = ["Pelucheosi","Accion", "Disparos", "Estrategia", "Simulacion", "Deporte", "Carrera", "Aventura", "ROL"]
        let generosfiltrados = []

        reqgeneros.forEach(element =>{
            if(element != null){
                generosfiltrados.push(generos[element])
            }
        })
        let img
        dbProduct.forEach(m=>{
            if (m.id==id){
                return img=m.image
               }
        })
        let editProduct = {
            id:Number(id),
            name: req.body.name.trim(),
            price: Number(req.body.price),
            genre: generosfiltrados,
            description: req.body.description.trim(),
            requirements: req.body.requirements.trim(),
            image: (req.files[0])?req.files[0].filename:img,
            propiedad: Boolean(Number(req.body.propiedad))
            

         }
        let p
        dbProduct.forEach(m=>{
            if (m.id==id){
             return p=dbProduct.indexOf(m) 
            }
        })
        dbProduct.splice(p,1,editProduct)
        fs.writeFileSync(path.join(__dirname,"..", "data","productsDataBase.json"),JSON.stringify(dbProduct), "utf-8");

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
      }
    };
    
