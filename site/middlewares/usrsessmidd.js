let dbUsers = require('../data/databaseUsers');
    function usrsessmidd(req,res,next){
        next();
        if(req.cookies.usrsess !=undefined && req.session.userLog==undefined ){

            dbUsers.forEach(user=>{
                if(user.email == req.cookies.usrsess){
                    userALogearse = user;
                    req.session.userLog = userALogearse
                    return res.redirect('/')
                }
                
            })
        }
     }
    module.exports= usrsessmidd