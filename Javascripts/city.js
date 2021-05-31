let newRegion = document.getElementById("button-new-region")
let fondoNegro = document.getElementById("fondoNegro");
let containerContacto = document.getElementById("containerContacto");
var cerrarNuevaRegion = document.getElementById("nvoContacto");
let cancelar = document.getElementById("cancelar")

newRegion.addEventListener("click", () => {
  fondoNegro.classList.toggle("noDisplay")
  containerContacto.classList.toggle("noDisplay")
})


cerrarNuevaRegion.addEventListener("click", () => {
  fondoNegro.classList.toggle("noDisplay")
  containerContacto.classList.toggle("noDisplay")
})



cancelar.addEventListener("click", () => {
  fondoNegro.classList.toggle("noDisplay")
  containerContacto.classList.toggle("noDisplay")
})

cancelarCiudad.addEventListener("click", () => {
  fondoNegro.classList.toggle("noDisplay")
  containerContacto.classList.toggle("noDisplay")
})



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

    ///////////////////// OBTENEMOS ARRAY DE BASE DE DATOS CON GET ////////////////////////

    let arrayRegiones = await getLogin()

    ////////////////////// COMPLETAR REGIONES ////////////////////////

    let nuevaRegion = document.getElementById("regionesNuevas");
    let ul = document.createElement("ul");
    ul.className = "myUL"


    for (let i = 0; i < arrayRegiones.regiones.length; i++) {

      let li = document.createElement("li");
      li.className = "region"

      let div1 = document.createElement("div");
      div1.classList="caret region-tittle"
      let p = document.createElement("p");
      p.innerHTML = arrayRegiones.regiones[i].nombre
      div1.appendChild(p)

      let div2 = document.createElement("div");
      div2.classList = "pais-ag noMostrar"
      let button = document.createElement("button");
      button.className = "pais"
      button.innerHTML = "Agregar Pais"
      div2.appendChild(button)

      li.appendChild(div1)
      li.appendChild(div2)



      ////////////////////// COMPLETAR PAISES ////////////////////////

      let ul2 = document.createElement("ul")
      ul2.className = "nested"

      for (let j = 0; j < arrayRegiones.regiones[i].Pais.length; j++) {


          let li2 = document.createElement("li")
          let div3 = document.createElement("div")
          div3.classList = "caret country"
          div3.innerHTML = arrayRegiones.regiones[i].Pais[j].nombre
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

          ul2.appendChild(li2)



          ////////////////////// COMPLETAR CIUDADES ////////////////////////

          let ulCitys = document.createElement("ul");
          ulCitys.classList = "nested citys"
          
          for (let k = 0; k < arrayRegiones.regiones[i].Pais[j].Ciudads.length; k++) {
            
      
            let divPcia = document.createElement("div")
            let liPcia = document.createElement("li")
            liPcia.className = "cia"
            liPcia.innerHTML = arrayRegiones.regiones[i].Pais[j].Ciudads[k].nombre
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

          }
          
          
          li2.appendChild(ulCitys)


      }

      li.appendChild(ul2)
      ul.appendChild(li)

    }
    
    nuevaRegion.appendChild(ul)




    ////////////////////// EVENTOS CRUD ////////////////////////

    var toggler = document.getElementsByClassName("caret");
    var i;
    var fondoNegro = document.getElementById("fondoNegro");
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

    for (i = 0; i < pais.length; i++){

      pais[i].addEventListener("click", async function() {

        fondoNegro.classList.toggle("noDisplay")
        containerPais.classList.toggle("noDisplay")

        let nombreRegion = this.parentNode.querySelector(".pais").parentElement.previousSibling.firstChild.firstChild
        


        console.log(nombreRegion)

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


////////////////////////// CARGAR DATOS DE REGIONES - SIRVE PARA CREAR CONTACTOS///////////////////////////

// async function agregarRegion () {


//   let arrayRegiones = await getLogin()
//   let selectRegion = document.getElementById("region");

//   for (let i = 0; i < arrayRegiones.regiones.length; i++) {
    
    

//     let option = document.createElement("option")
//     option.innerHTML = arrayRegiones.regiones[i].nombre
//     selectRegion.appendChild(option)



//     selectRegion.addEventListener("click", async(e)=>{


//       let regionIngresada = e.target.value
//       if(regionIngresada != "todos"){
//         document.getElementById("pais").disabled = false
        
        
//       }

//       if(regionIngresada == arrayRegiones.regiones[i].nombre){

//           //////////  ELIMINAR OPTIONS DE SELECT ANTES DE CARGAR NUEVOS PAISES ///////////

//           let paisEliminar = document.getElementById("pais")
//           if(paisEliminar.options.length>1){
//             for (let i = paisEliminar.options.length; i >= 1; i--) {
//               paisEliminar.remove(i);
//             }
//           }

//           /////////////////////////////////////////////////////////////////////////////////


//           for (let j = 0; j < arrayRegiones.regiones[i].Pais.length; j++) {
        
            
      
    
//             let pais = document.getElementById("pais")
//             let optionPais = document.createElement("option")
        
//             optionPais.value = `pais${j}`
//             optionPais.id = `pais${j}`
//             optionPais.innerHTML = arrayRegiones.regiones[i].Pais[j].nombre
        
//             pais.appendChild(optionPais)
//           }            
//       } 
//     })
//   }

// }

// agregarRegion()

////////////////// GUARDAR NUEVA REGION COMPLETADA DESDE EL FRONT ////////////////////



// regionNombre.addEventListener("keypress", (e) => {

//   let nombre = e.target.value
//   if (nombre.length = 0){
//     regionNombre.value = ""
//   }
  
//   if(nombre.length > 0 && nombre != " "){
//     guardar.classList.toggle("guardar")
//     guardar.classList.toggle("guardarOk")

//     guardar.classList.toggle("cancel")
//     guardar.classList.toggle("cancelOk")
//   }

// })

////////////////// GUARDAR NUEVA REGION COMPLETADA DESDE EL FRONT ////////////////////

let guardar = document.getElementById("guardar")
let regionNombre = document.getElementById("region")

guardar.addEventListener("click", () =>{
  postRegion(regionNombre.value)
  fondoNegro.classList.toggle("noDisplay")
  containerContacto.classList.toggle("noDisplay")
})


let postRegion = async (nombre) => {

    var data = {
        nombre
    }

    let serachApi = await fetch (`http://localhost:3000/regiones`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

  let res = await serachApi.json()

}

////////////////// GUARDAR UN PAIS COMPLETADO DESDE EL FRONT ////////////////////

let guardarPais = document.getElementById("guardarPais")
let paisNombre = document.getElementById("pais")



guardarPais.addEventListener("click", () =>{

  postPais(paisNombre.value, buscarIdRegion())

  fondoNegro.classList.toggle("noDisplay")
  containerContacto.classList.toggle("noDisplay")

})


let postPais = async (nombre, id_region) => {

    var data = {
        nombre,
        id_region
    }

    let serachApi = await fetch (`http://localhost:3000/regiones/paises`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

  let res = await serachApi.json()

}




// let buscarIdRegion = async (nombre) => {
//   let regionEncontrada = await region.findAll({
//     where: {nombre: nombre}
//   })

//   if(regionEncontrada) return regionEncontrada.id
// }