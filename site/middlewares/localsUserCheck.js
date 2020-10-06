module.exports= function(req,res,next){
if(req.session.userLog){
    res.locals.users = req.session.user
}
next()
}