const dbProduct = require("../data/database");
const dbUsers = require('../data/databaseUsers');
const fs = require("fs");
const path = require("path");

module.exports = {
    mostrarForm:(req,res)=>{
        res.render("newProduct",{});
 
    },
    lista:(req,res)=>{
        let dbP = dbProduct
        res.render("admin",{
            usuarios:dbUsers,
            dbP: dbP
        });
    },
    publicar:(req,res)=>{

        let lastID = 1;

        dbProduct.forEach(producto => {
            if(producto.id >= lastID){
                lastID = lastID + 1
            }
        });

        let reqgeneros = [req.body.Accion, req.body.Disparos, req.body.Estrategia, req.body.Simulacion, req.body.Deporte, req.body.Carrera, req.body.Aventura, req.body.ROL]
        let generos = ["Accion", "Disparos", "Estrategia", "Simulacion", "Deporte", "Carrera", "Aventura", "ROL"]
        let generosfiltrados = []

        reqgeneros.forEach(element =>{
            if(element != null){
                generosfiltrados.push(generos[element])
            }
        })

        let newProduct = {
            id: lastID,
            name: req.body.name,
            price: Number(req.body.price),
            genre: generosfiltrados,
            description: req.body.description,
            requirements: req.body.requirements,
            image: (req.files[0])?req.files[0].filename:"default-image.png",
            propiedad: Boolean(Number(req.body.propiedad))
        }
        dbProduct.push(newProduct);

        fs.writeFileSync(path.join(__dirname,"..", "data","productsDataBase.json"),JSON.stringify(dbProduct), "utf-8");

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
        let generos = ["Accion", "Disparos", "Estrategia", "Simulacion", "Deporte", "Carrera", "Aventura", "ROL"]
        let generosfiltrados = []

        reqgeneros.forEach(element =>{
            if(element != null){
                generosfiltrados.push(generos[element])
            }
        })

        let editProduct = {
            id:Number(id),
            name: req.body.name,
            price: Number(req.body.price),
            genre: generosfiltrados,
            description: req.body.description,
            requirements: req.body.requirements,
            image: (req.files[0])?req.files[0].filename:"default-image.png",
            propiedad: Boolean(Number(req.body.propiedad))
            

         }
        let p=id
        p=p-1
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
    
