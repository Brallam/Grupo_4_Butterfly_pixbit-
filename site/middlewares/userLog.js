module.exports = function sessionUserChech(req,res,next){
    if(req.session.userLog){
        next()
    }else{
        res.redirect('/users/login')
    }
}