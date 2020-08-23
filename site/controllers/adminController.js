const dbProduct = require("../data/database");
const fs = require("fs");
const path = require("path");

module.exports = {
    mostrarForm:(req,res)=>{
        res.render("newProduct",{});
    },
    agregar:(req,res)=>{
        res.render("newProduct",{});
    },
    publicar:(req,res)=>{

        let lastID = 1;

        dbProduct.forEach(producto => {
            if(producto.id > lastID){
                lastID = producto.id
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
            id: lastID + 1,
            name: req.body.name,
            price: Number(req.body.price),
            genre: generosfiltrados,
            description: req.body.description,
            requirements: req.body.requirements,
            image: "default-image.png"
        }
        dbProduct.push(newProduct);

        fs.writeFileSync(path.join(__dirname,"..", "data","productsDataBase.json"),JSON.stringify(dbProduct), "utf-8");

        res.send(dbProduct)
    }
}