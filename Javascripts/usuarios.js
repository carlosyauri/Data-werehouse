let nombreUsuarioLogeado = document.getElementById("nombreUsuarioLogeado")
let token = JSON.parse(localStorage.getItem("oketn"))
nombreUsuarioLogeado.innerHTML = `${token.exito.nombre.nombre}!`



let cerrarSesion = document.getElementById("cerrarSesion")
cerrarSesion.addEventListener("click", () => {
    localStorage.clear()
    location.href ="../html/login.html#!"
})

document.getElementById("cerrarSesion").style = "display: none"
document.getElementById("nombreUsuario").style = "margin-top: 20px"

let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let email = document.getElementById("email");
let usuario = document.getElementById("usuarioInput");
let password = document.getElementById("password");
let passwordRepetida = document.getElementById("passwordRepetida");
let admin = document.getElementById("admin");
let crear = document.getElementById("crear");
let creado = document.getElementById("creado");
let noCreado = document.getElementById("noCreado")



crear.addEventListener("click", () => {
    getCrear(nombre.value, apellido.value, email.value, usuario.value, password.value, passwordRepetida.value, admin.checked)

})




let getCrear = async (nombre, apellido, email, usuario, password, passwordRepetida, isadmin) => {

    var data = {
        nombre,
        apellido,
        email,
        usuario,
        password,
        passwordRepetida,
        isadmin
    }


    let searchApi = await fetch(`http://localhost:3000/usuarios`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
     
    

    })

    let res = await searchApi.json();


    if(res.message){
        creado.removeAttribute("hidden")
    }

    else{
        noCreado.removeAttribute("hidden")
    }
}