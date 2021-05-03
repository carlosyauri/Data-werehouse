var nvoContacto = document.getElementById("nvoContacto");
var fondoNegro = document.getElementById("fondoNegro");
var containerContacto = document.getElementById("containerContacto");
var btnAgregarContacto = document.getElementById("btn-agregar-contacto");

nvoContacto.addEventListener("click", () => {
    fondoNegro.classList.toggle("noDisplay")
    containerContacto.classList.toggle("noDisplay")
})


btnAgregarContacto.addEventListener("click", () => {
    fondoNegro.classList.toggle("noDisplay")
    containerContacto.classList.toggle("noDisplay")

  })