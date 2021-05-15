var toggler = document.getElementsByClassName("caret");
var i;
var nvoRegion = document.getElementById("button-new-region");
var fondoNegro = document.getElementById("fondoNegro");
var containerContacto = document.getElementById("containerContacto");
var cerrarNuevaRegion = document.getElementById("nvoContacto");
var newRegion = document.getElementById("button-new-region")
var pais = document.getElementsByClassName("pais");
var ciudad = document.getElementsByClassName("ciudad");
var containerPais = document.getElementById("containerPais");
var containerCiudad = document.getElementById("containerCiudad")
var cerrarNuevoPais = document.getElementById("nvoPais");
var cerrarNuevoCiudad = document.getElementById("nvoCiudad");

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {

    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
    
    this.parentElement.querySelector(".pais-ag").classList.toggle("noMostrar")
    
  });
}



nvoRegion.addEventListener("click", () => {
    fondoNegro.classList.toggle("noDisplay")
    containerContacto.classList.toggle("noDisplay")
})


cerrarNuevaRegion.addEventListener("click", () => {
    fondoNegro.classList.toggle("noDisplay")
    containerContacto.classList.toggle("noDisplay")
})




for (i = 0; i < pais.length; i++){

  pais[i].addEventListener("click", function() {

    fondoNegro.classList.toggle("noDisplay")
    containerPais.classList.toggle("noDisplay")

  })

  cerrarNuevoPais.addEventListener("click", () => {
    fondoNegro.classList.toggle("noDisplay")
    containerPais.classList.toggle("noDisplay")
  })

}


for (i = 0; i < ciudad.length; i++){

  ciudad[i].addEventListener("click", function() {

    fondoNegro.classList.toggle("noDisplay")
    containerCiudad.classList.toggle("noDisplay")

  })
}

cerrarNuevoCiudad.addEventListener("click", () => {

  fondoNegro.classList.toggle("noDisplay")
  containerCiudad.classList.toggle("noDisplay")
  
})



