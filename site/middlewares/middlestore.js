module.exports=function store(req,res,next){
        let id=req.params.id
        
        switch(id){
            case"1": next();break;
            case"2": next();break;
            case"3": next();break;
            default: req.params.id="1"; next()
        }
        
}

