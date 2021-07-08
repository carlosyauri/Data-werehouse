


let password = document.getElementById("password");
let email = document.getElementById("email")
let login = document.getElementById("login")
let incorrecto = document.getElementById("incorrecto")


let eye = document.getElementById("eyeDisplay");
let noEye = document.getElementById("eyeNoDisplay");

eye.addEventListener("click", () => {
    password.type = "text";
    eye.classList.toggle("noMostrar");
    noEye.classList.toggle("noMostrar");
    
})

noEye.addEventListener("click", () =>{
    password.type = "password"
    noEye.classList.toggle("noMostrar");
    eye.classList.toggle("noMostrar");
})




////// LOGIN //////

login.addEventListener("click", async() => {

    getLogin(email.value, password.value)
        
        
        await Swal.fire({ 
            title: `Bienvenido`,
            text: `Usted se ha logeado correctamente!`,
            // html:
            icon: "success",
            grow: ``,
            allowOutsideClick: false,
            allosEscapeKey: false,
            allowEnterKey: false,
            stopKeydownPropagation: false,
        })


        location.href =  "../html/index.html"

    

    


    

})


let getLogin = async (email, password) => {

        var data = {
            email,
            password
        }

        let serachApi = await fetch (`http://localhost:3000/usuarios/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

    let res = await serachApi.json()

    if(res.exito){

        localStorage.setItem("token", res.exito.token)
        localStorage.setItem("oketn", JSON.stringify(res))
      
        
    }

    else {
        incorrecto.removeAttribute("hidden")
    }

}