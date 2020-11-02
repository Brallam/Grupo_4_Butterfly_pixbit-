const db = require('../../database/models')

module.exports = {
    allEmails: function(req,res,next){
        db.users.findAll()
        .then((element)=>{
                let emails=[]
            for(let i = 0; i < element.length; i++) {
                 emails.push(element[i].email);
                
            }

            res.json(emails)        
        })
        }   
}