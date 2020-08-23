const dbGames = require("../data/database.json");
const fs = require("fs");
const path = require("path");

module.exports = {
    mostrarForm:(req,res)=>{
        res.render("newProduct");
    },
    agregar:(req,res)=>{
        
    }
}