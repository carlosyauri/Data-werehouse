////////////////////// FUNCION GET REGIONES //////////////////////

let getLogin = async () => {

  let serachApi = await fetch (`http://localhost:3000/regiones`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })

let res = await serachApi.json()

if(res.exito){

  return res

}

  else {
    alert("NO FUNCIONO")
  }

}
async function completar (){

    let arrayRegiones = await getLogin()
    console.log(arrayRegiones.regiones[0])



    ////////////////////// COMPLETAR REGIONES ////////////////////////

    let nuevaRegion = document.getElementById("regionesNuevas");

    let ul = document.createElement("ul");
    ul.className = "myUL"

    let li = document.createElement("li");
    li.className = "region"

    let div1 = document.createElement("div");
    div1.classList="caret region-tittle"
    let p = document.createElement("p");
    p.innerHTML = `${arrayRegiones.regiones[0].nombre}`
    div1.appendChild(p)

    let div2 = document.createElement("div");
    div2.classList = "pais-ag noMostrar"
    let button = document.createElement("button");
    button.className = "pais"
    button.innerHTML = "Agregar Pais"
    div2.appendChild(button)





    let ul2 = document.createElement("ul")
    ul2.className = "nested"

    let li2 = document.createElement("li")
    let div3 = document.createElement("div")
    div3.classList = "caret country"
    div3.innerHTML = `${arrayRegiones.regiones[0].Pais[0].nombre}`
    li2.appendChild(div3)


    let div4 = document.createElement("div")
    div4.className = "container-btn"
    let div5 = document.createElement("div")
    let editar = document.createElement("button")
    let eliminar = document.createElement("button")
    editar.innerHTML = "Editar"
    eliminar.innerHTML = "Eliminar"
    div5.appendChild(editar)
    div5.appendChild(eliminar)
    let AgregarCiudad = document.createElement("button")
    AgregarCiudad.className = "ciudad"
    AgregarCiudad.innerHTML = "Agregar Ciudad"
    div4.appendChild(div5)
    div4.appendChild(AgregarCiudad)
    li2.appendChild(div4) 



    let ulCitys = document.createElement("ul");
    ulCitys.classList = "nested citys"
    let divPcia = document.createElement("div")
    let liPcia = document.createElement("li")
    liPcia.className = "cia"
    liPcia.innerHTML = `${arrayRegiones.regiones[0].Pais[0].Ciudads[0].nombre}`
    let span = document.createElement("span")
    let i1 = document.createElement("i")
    i1.classList = "far fa-edit"
    let i2= document.createElement("i")
    i2.classList = "far fa-trash-alt"


    span.appendChild(i1)
    span.appendChild(i2)
    liPcia.appendChild(span)
    divPcia.appendChild(liPcia)
    ulCitys.appendChild(divPcia)
    li2.appendChild(ulCitys)
    ul2.appendChild(li2)

    li.appendChild(div1)
    li.appendChild(div2)
    li.appendChild(ul2)
    ul.appendChild(li)
    nuevaRegion.appendChild(ul)





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







}


completar()


////////////////////// COMPLETAR REGIONES ////////////////////////

// let nuevaRegion = document.getElementById("regionesNuevas");

// let ul = document.createElement("ul");
// ul.className = "myUL"

// let li = document.createElement("li");
// li.className = "region"

// let div1 = document.createElement("div");
// div1.classList="caret region-tittle"
// let p = document.createElement("p");
// p.innerHTML = "Region creada"
// div1.appendChild(p)

// let div2 = document.createElement("div");
// div2.classList = "pais-ag noMostrar"
// let button = document.createElement("button");
// button.className = "pais"
// button.innerHTML = "Agregar PAIS"
// div2.appendChild(button)





// let ul2 = document.createElement("ul")
// ul2.className = "nested"

// let li2 = document.createElement("li")
// let div3 = document.createElement("div")
// div3.classList = "caret country"
// div3.innerHTML = "PAIS CREADO"
// li2.appendChild(div3)


// let div4 = document.createElement("div")
// div4.className = "container-btn"
// let div5 = document.createElement("div")
// let editar = document.createElement("button")
// let eliminar = document.createElement("button")
// editar.innerHTML = "Editar"
// eliminar.innerHTML = "Eliminar"
// div5.appendChild(editar)
// div5.appendChild(eliminar)
// let AgregarCiudad = document.createElement("button")
// AgregarCiudad.className = "ciudad"
// AgregarCiudad.innerHTML = "Agregar CIUDAD"
// div4.appendChild(div5)
// div4.appendChild(AgregarCiudad)
// li2.appendChild(div4) 



// let ulCitys = document.createElement("ul");
// ulCitys.classList = "nested citys"
// let divPcia = document.createElement("div")
// let liPcia = document.createElement("li")
// liPcia.className = "cia"
// liPcia.innerHTML = "PROVINCIA CREADA"
// let span = document.createElement("span")
// let i1 = document.createElement("i")
// i1.classList = "far fa-edit"
// let i2= document.createElement("i")
// i2.classList = "far fa-trash-alt"


// span.appendChild(i1)
// span.appendChild(i2)
// liPcia.appendChild(span)
// divPcia.appendChild(liPcia)
// ulCitys.appendChild(divPcia)
// li2.appendChild(ulCitys)
// ul2.appendChild(li2)

// li.appendChild(div1)
// li.appendChild(div2)
// li.appendChild(ul2)
// ul.appendChild(li)
// nuevaRegion.appendChild(ul)







