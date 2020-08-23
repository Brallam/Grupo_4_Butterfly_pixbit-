const dbGames = require("../data/database");
const fs = require("fs");
const path = require("path");

module.exports = {
    mostrarForm:(req,res)=>{
        res.render("newProduct",{});
    },
    agregar:(req,res)=>{
        res.render("newProduct",{});
    }
}