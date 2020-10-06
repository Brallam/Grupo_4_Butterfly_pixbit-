// valida compara email al logearse y contraseña

/*function(req,res){
    let errors = validationResult(req);
    let userALogearse

    if(errors.isEmpty()){
     dbUsers.forEach(user=>{
         if(user.email == req.body.email){
             if(bcrypt.compareSync(req.body.password, user.password)){
                 userALogearse = user;
             }
         }
     })
     if(userALogearse == undefined){
         return res.render("login",{
             title:'Iniciar Sesion',
             errors: [
                 {msg: 'Credenciales invalidas'}
             ],
             userLog: req.session.userLog
           })
     }
     if(req.body.remember=! undefined){
         res.cookie("usrsess", userALogearse.email,{maxAge: 3.154e+10} )
     }
     req.session.userLog = userALogearse
     res.redirect('/')
    }else{
         res.render("login",{
         title:'Iniciar Sesion',
         errors: errors.errors,
         userLog: req.session.userLog,
         old:req.body,

       })
    }
}


if(req.body.remember=! undefined){
                res.cookie("usrsess", userALogearse.email,{maxAge: 3.154e+10} )
            }
            
            if(userALogearse == undefined){
            return res.render("login",{
                title:'Iniciar Sesion',
                errors: [
                    {msg: 'Credenciales invalidas'}
                ],
                userLog: req.session.userLog
              })
        }
        
        req.session.userLog = userALogearse
       
            */