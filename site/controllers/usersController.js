let dbUsers = require('../data/databaseUsers');
const dbProduct = require("../data/database");
const fs = require("fs");
const path = require("path");
var { check, validationResult, body } = require('express-validator')


module.exports = {

   guardar:function(req,res){
    let errors = validationResult(req);

    if(errors.isEmpty()){

    let lastID = 1;
        dbUsers.forEach(usuario => {
            if(usuario.id >= lastID){
                lastID = usuario.id
            }
    });
    lastID = lastID + 1
    let newUser ={
        id: lastID,
        name: req.body.name.trim(),
        nameU:req.body.nameU.trim(),
        email:(req.body.email).trim(),
        password:req.body.password.trim(),
        admin: false
    }

    dbUsers.push(newUser);
    
    fs.writeFileSync(path.join(__dirname,"..",'data',"UsersDataBase.json"),JSON.stringify(dbUsers),'utf-8')
    
    res.redirect('/')
    }else{
        return res.render('register', {errors: errors.errors, title:'Registro'})
    }
   }
}