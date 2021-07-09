

window.history.forward()


let global;

(function (global) { 

    if(typeof (global) === "undefined") {
        throw new Error("window is undefined");
    }

    var _hash = "!";
    var noBackPlease = function () {
        global.location.href += "#";

        // making sure we have the fruit available for juice (^__^)
        global.setTimeout(function () {
            global.location.href += "!";
        }, 50);
    };

    global.onhashchange = function () {
        if (global.location.hash !== _hash) {
            global.location.hash = _hash;
        }
    };

    global.onload = function () {            
        noBackPlease();

        // disables backspace on page except on input fields and textarea..
        document.body.onkeydown = function (e) {
            var Elm = e.target.nodeName.toLowerCase();
            if (e.which === 8 && (Elm !== 'input' && Elm  !== 'textarea')) {
                e.preventDefault();
            }
            // stopping event bubbling up the DOM tree..
            e.stopPropagation();
        };          
    }

})(window)







/////////////////////////////////////////////////////////////

let password = document.getElementById("password");
let email = document.getElementById("email")
let login = document.getElementById("login")
let incorrecto = document.getElementById("incorrecto")

email.addEventListener("keyup", (e) => {
    if(e.target.value.length > 0){
        incorrecto.setAttribute("hidden", true)
    }
})

password.addEventListener("keyup", (e) => {
    if(e.target.value.length > 0){
        incorrecto.setAttribute("hidden", true)
    }
})


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

    let result = await getLogin(email.value, password.value)

    if(result != "faltan campos" && result != "email o password invalidas"){
        
        await Swal.fire({ 
            title: `Bienvenido ${result.exito.nombre.nombre}`,
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
    } else{
        return
    }

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
        return res
        
    }else{
        incorrecto.removeAttribute("hidden")
        return res.error
    }

}