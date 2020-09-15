module.exports = function sessionUserChech(req,res,next){
    if(req.session.userLog == undefined){
        next()
    }else{
        res.redirect('/')
    }
}