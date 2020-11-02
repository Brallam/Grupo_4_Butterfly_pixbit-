window.addEventListener('load',function(){
    let validateEmail=function(){ 
        fetch('http://localhost:3030/api/users')
        .then(function(respuesta){
            return respuesta.json()
        })
            .then(function(info){
                info.forEach(function(data){
                    if(data==email.value){
                        console.log('ya hay otro emaiil tontin')
                    }
                })
        })
        }
console.log('flipaooooooooo')
})