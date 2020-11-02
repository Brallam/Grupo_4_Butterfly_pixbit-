window.addEventListener('load',function(){
    console.log("esta enlasado")    

    let form = document.querySelector('form')                                                                                       
    let name = document.querySelector('.formNombre')
    let nameU = document.querySelector('.formNombreU')
    let imagen = document.querySelector('.formimagen')
    let divErrores = document.querySelector('.errores')

    let regeximg = (/\.(gif|jpe?g|png)$/i)

    let validateImputs = function(){
        errors = []

        if(name.value.trim() == ""){
            errors.push('El nombre es obligatorio')
        }
        if(nameU.value.trim() == ""){
            errors.push('El nombre de usuario es obligatorio')
        }
        if(imagen.value != ''){
            if(!regeximg.test(imagen.value)){
                errors.push('La extencion de la imagen no es valida')
            }
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
})