module.exports=function store(req,res,next){
    let id=req.params.g
    Number(g)
    switch(id){
        case 1: req.params.g=1; next();break;
        case 2: req.params.g=2; next();break;
        case 3: req.params.g=3; next();break;
        case 4: req.params.g=4; next();break;
        case 5: req.params.g=5; next();break;
        case 6: req.params.g=6; next();break;
        case 7: req.params.g=7; next();break;
        case 8: req.params.g=8; next();break;
        default: req.params.g="0"; next()
    }
    
}
