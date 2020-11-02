//const { format } = require("sequelize/types/lib/utils");
/*
window.addEventListener('load', function() {
    console.log("esta enlasado")

    let form = document.querySelector('form')
    let name = document.querySelector('.nombre');
    let description = document.querySelector('.descripcion')
    let genero = document.querySelectorAll('.genero')
    let especificaiones = document.querySelector('.especificaiones')
    let imagen = document.querySelector('.imagen')
    let divErrores = document.querySelector('.errores')

    let regeximg = (/\.(gif|jpe?g|png)$/i)

    let validateImputs = ()=>{
        errors = []

        if(name.value.trim() == ""){
            errors.push('El nombre es obligatorio')
        }
        if(description.value.trim() == ""){
            errors.push('La descripcion es obligatoria')
        }
        let resultadoGenero = ()=>{
            let resError = true
            for (let i = 0; i < genero.length; i++) {
                if(genero[i].checked){
                    resError = false
                }
            }
            return resError
        }
        if(resultadoGenero()){
            errors.push('Se necesita un genero')
        }
        if(imagen.value != ''){
            if(!regeximg.test(imagen.value)){
                errors.push('La extencion de la imagen no es valida')
            }
        }
        if(especificaiones.value.trim() == ""){
            errors.push('Las especificaciones son obligatorias')
        }

        return errors
    }

    form.addEventListener('submit',(e)=>{
        divErrores.innerHTML = "";
        if(validateImputs().length>0){
            e.preventDefault()
            validateImputs().forEach(element => {
                divErrores.innerHTML += '<small class="text-danger">' + element + '</small><br>'
            });
        }
    })
})*/