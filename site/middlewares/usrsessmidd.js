let db = require('../database/models');
    function usrsessmidd(req,res,next){
        next();
        if(req.cookies.usrsess !=undefined && req.session.userLog==undefined ){

            db.users.findOne({
                where:{
                    email: req.cookies.usrsess
                }
            }).then(function(user){
                req.session.userLog = user
                return res.redirect('/')
            })

            /*db.forEach(user=>{
                if(user.email == req.cookies.usrsess){
                    userALogearse = user;
                    req.session.userLog = userALogearse
                    return res.redirect('/')
                }
                
            })*/
        }
     }
    module.exports= usrsessmidd