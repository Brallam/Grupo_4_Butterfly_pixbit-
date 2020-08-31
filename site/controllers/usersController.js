let dbUsers = require('../data/databaseUsers');

const fs = require("fs");
const path = require("path");

module.exports = {

   listar:function(req,res){
    let bdUsers = dbUsers
    res.render("admin",{
        usuarios: bdUsers
    });
   }
}