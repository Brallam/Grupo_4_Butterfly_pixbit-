module.exports = function sessionUserCheck(req,res,next){
    let admin = req.session.userLog
    if(admin != undefined){
        if(admin.admin){
            next()
        }else{
            res.redirect('/')
        }
    }
    
}