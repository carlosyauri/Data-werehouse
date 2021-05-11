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

    console.log(admin.checked)

    var data = {
        nombre,
        apellido,
        email,
        usuario,
        password,
        passwordRepetida,
        isadmin
    }

    console.log(data)


    let searchApi = await fetch(`http://localhost:3000/usuarios`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
     
    

    })

    let res = await searchApi.json();
    console.log(res)

    if(res.message){
        creado.removeAttribute("hidden")
    }

    else{
        noCreado.removeAttribute("hidden")
    }
}