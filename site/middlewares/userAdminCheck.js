module.exports = function sessionUserChech(req,res,next){
    let admin = req.session.userLog
    if(admin != undefined){
        if(admin.admin){
            next()
        }else{
            res.redirect('/')
        }
    }else{
        res.redirect('/')
    }
    
}