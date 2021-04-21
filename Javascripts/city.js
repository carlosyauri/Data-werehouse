var toggler = document.getElementsByClassName("caret");
var region1 = document.getElementById("region-1")
var region2 = document.getElementById("region-2")
var region3 = document.getElementById("region-3")
var pais1 = document.getElementById("pais-1")
var pais2 = document.getElementById("pais-2")
var pais3 = document.getElementById("pais-3")
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {

    this.parentElement.querySelector(".nested").classList.toggle("active");
    
    this.classList.toggle("caret-down");
  });
}


region1.addEventListener("click", () => {
  pais1.classList.toggle("noMostrar")
  pais1.classList.toggle("mostrar")

  pais2.classList.remove("mostrar")
  pais2.classList.add("noMostrar")
  pais3.classList.remove("mostrar")
  pais3.classList.add("noMostrar")
})
region2.addEventListener("click", () => {

  pais2.classList.toggle("noMostrar")
  pais2.classList.toggle("mostrar")

  pais1.classList.remove("mostrar")
  pais1.classList.add("noMostrar")
  pais3.classList.remove("mostrar")
  pais3.classList.add("noMostrar")
})
region3.addEventListener("click", () => {
  pais3.classList.toggle("noMostrar")
  pais3.classList.toggle("mostrar")

  pais2.classList.remove("mostrar")
  pais2.classList.add("noMostrar")
  pais1.classList.remove("mostrar")
  pais1.classList.add("noMostrar")
})


