window.addEventListener('load', function() {
    let divErrores2 = document.getElementById('cajaErrores2');
let divErrores = document.getElementById('cajaErrores');
let form = document.getElementById('formulario');
let name = document.getElementById('name')
let nameU = document.getElementById('nameU') 
let email = document.getElementById('email')
let pass = document.getElementById('pwd')
let emailregex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
let passregex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;

let validateImputs = ()=>{
let errors = []

   
if(name.value.length<2){
    errors.push(' El nombre debe tener al menos 2 caracteres')
}
if(nameU.value.length<2){
    errors.push(' El nombre de usuario debe tener al menos 2 caracteres')
}
if(!emailregex.test(email.value)){
    errors.push(' El formato de el email es inválido')
}
if(!passregex.test(pass.value)){
    errors.push('La contraseña debe contener mayúscula y un número')
}

return errors
}

form.onsubmit=function(e){
    fetch('http://localhost:3030/api/users')
.then(function(respuesta){
    return respuesta.json()
})
    .then(function(info){
        
        info.forEach(function(data){
            if(data==email.value){
                    e.preventDefault()
                    divErrores.innerHTML +=
                '<div class="alert alert-danger" role="alert">El email está registrado</div>'
            console.log('email ya registrado ')     
        }
        })
})

    console.log(email.value)
    e.preventDefault()
     divErrores.innerHTML = "";
    let errores = validateImputs()
    console.log(errores);
     if(errores.length>0){  
                e.preventDefault()
                    errores.forEach(error => {
                     divErrores.innerHTML +=
                    '<div class="alert alert-danger" role="alert">'+error+'</div>' 
        })
    }else{
    form.submit()
    }
}
    });

