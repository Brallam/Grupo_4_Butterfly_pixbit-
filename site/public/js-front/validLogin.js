window.addEventListener("load", function () {
  let form = document.getElementById("formLogin");
  let email = document.getElementById("email");
  let pwd = document.getElementById("pwd");
  let divErrores = document.getElementById("divError");
  let emailregex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  let validateImputs = () => {
    let errors = [];

    if (pwd.value.trim() == "") {
      errors.push("Debe ingresar una contraseña");
    }
    if (email.value.trim() == "") {
      errors.push("Debe ingresar un email");
    }
    if (!emailregex.test(email.value)) {
      errors.push(" El formato de el email es inválido");
    }

    return errors;
  };
  form.onsubmit = function (e) {
    divErrores.innerHTML = "";
    let errores = validateImputs();
    console.log(errores);
    if (errores.length > 0) {
      e.preventDefault();
      errores.forEach((error) => {
        divErrores.innerHTML +=
          '<div class="alert alert-danger" role="alert">' + error + "</div>";
      });
    } else {
      form.submit();
    }
  };

  console.log("flipaooooooooo");
});
