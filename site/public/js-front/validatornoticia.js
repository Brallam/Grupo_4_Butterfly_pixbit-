//const { format } = require("sequelize/types/lib/utils");

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
            errors.push('El titulo es obligatorio')
        }
        if(description.value.trim() == ""){
            errors.push('La descripcion es obligatoria')
         }

        return errors
    }

    form.addEventListener('submit',(e)=>{
        divErrores.innerHTML = "";
        if(validateImputs().length>0){
            e.preventDefault()
            validateImputs().forEach(element => {
                divErrores.innerHTML += '<div class="alert alert-danger" role="alert">' + element + '</div>'
            });
        }
    })
})