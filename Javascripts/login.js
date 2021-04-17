let inputEye = document.getElementById("eyeInput");
let eye = document.getElementById("eyeDisplay");
let noEye = document.getElementById("eyeNoDisplay");

eye.addEventListener("click", () => {
    inputEye.type = "text";
    eye.classList.toggle("noMostrar");
    noEye.classList.toggle("noMostrar");
    
})

noEye.addEventListener("click", () =>{
    inputEye.type = "password"
    noEye.classList.toggle("noMostrar");
    eye.classList.toggle("noMostrar");
})