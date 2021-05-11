let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let email = document.getElementById("email");
let usuario = document.getElementById("usuario");
let password = document.getElementById("password");
let passwordRepetida = document.getElementById("passwordRepetida");
// let admin = document.getElementById("admin");
let crear = document.getElementById("crear");
let creado = document.getElementById("creado");
let noCreado = document.getElementById("noCreado")



crear.addEventListener("click", () => {
    getCrear(nombre.value, apellido.value, email.value, usuario.value, password.value, passwordRepetida.value)
})


let getCrear = async (nombre, apellido, email, usuario, password, passwordRepetida) => {

    var data = {
        nombre,
        apellido,
        email,
        usuario,
        password,
        passwordRepetida,
    }

    let searchApi = await fetch(`http://localhost:5000/usuarios`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
     
    

    })

    let res = await searchApi.json();

    if(res.exito){
        creado.removeAttribute("hidden")
    }

    else{
        noCreado.removeAttribute("hidden")
    }
}