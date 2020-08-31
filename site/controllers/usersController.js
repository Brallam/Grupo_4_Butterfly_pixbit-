let dbUsers = require('../data/databaseUsers');
const dbProduct = require("../data/database");
const fs = require("fs");
const path = require("path");

module.exports = {

   guardar:function(req,res){
    let lastID = 1;
        dbUsers.forEach(usuario => {
            if(usuario.id >= lastID){
                lastID = lastID + 1
            }
    });
    let newUser ={
        id: lastID + 1,
        name: req.body.name.trim(),
        nameU:req.body.nameU.trim(),
        email:(req.body.email).trim(),
        password:req.body.password.trim(),
        admin: (req.body.admin)
    }

    dbUsers.push(newUser);
    
    fs.writeFileSync(path.join(__dirname,"..",'data',"UsersDataBase.json"),JSON.stringify(dbUsers),'utf-8')
    
    res.redirect('/')
   }
}