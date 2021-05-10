var toggler = document.getElementsByClassName("caret");
var region1 = document.getElementById("region-title-1");
var region2 = document.getElementById("region-title-2");
var region3 = document.getElementById("region-title-3");
var pais1 = document.getElementById("pais-1");
var pais2 = document.getElementById("pais-2");
var pais3 = document.getElementById("pais-3");
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
    
  });
}


region1.addEventListener("click", () => {

  pais1.classList.toggle("noMostrar")
  pais1.classList.toggle("mostrar")

})
region2.addEventListener("click", () => {

  pais2.classList.toggle("noMostrar")
  pais2.classList.toggle("mostrar")


})
region3.addEventListener("click", () => {
  pais3.classList.toggle("noMostrar")
  pais3.classList.toggle("mostrar")
})



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

