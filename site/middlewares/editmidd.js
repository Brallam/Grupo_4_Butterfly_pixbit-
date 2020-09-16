module.exports = function sessionUserChech(req,res,next){
    let user=req.session.userLog
    if(user != undefined){
        if(user.id==req.params.id){
            next()
        }
        else{
            res.redirect("/")
        }
     
    }else{
        res.redirect('/')
    }
}