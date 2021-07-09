let nombreUsuarioLogeado = document.getElementById("nombreUsuarioLogeado")
let token = JSON.parse(localStorage.getItem("oketn"))
nombreUsuarioLogeado.innerHTML = `${token.exito.nombre.nombre}!`

if(token.exito.nombre.isadmin == false){
  document.getElementById("htmlUsuarios").style = "display: none"
}

let cerrarSesion = document.getElementById("cerrarSesion")
cerrarSesion.addEventListener("click", () => {
    localStorage.clear()
    location.href ="../html/login.html#!"
})

document.getElementById("cerrarSesion").style = "display: none"
document.getElementById("nombreUsuario").style = "margin-top: 20px"

let newRegion = document.getElementById("button-new-region")
let fondoNegro = document.getElementById("fondoNegro");
let containerContacto = document.getElementById("containerContacto");
var cerrarNuevaRegion = document.getElementById("nvoContacto");
let cancelar = document.getElementById("cancelar")
let cancelarPais = document.getElementById("cancelarPais")
let cancelarCiudad = document.getElementById("cancelarCiudad")
let cerrarNuevoPais = document.getElementById("nvoPais");
let cerrarNuevoCiudad = document.getElementById("nvoCiudad");

/////////////////////////////////////// GET REGIONES ///////////////////////////////////////

let getRegiones = async () => {

  let serachApi = await fetch (`http://localhost:3000/regiones`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })

let res = await serachApi.json()

if(res.exito)

  return res

}


/////////////////////////////////////// GET PAISES //////////////////////////////////////

let getPaises = async () => {

  let serachApi = await fetch (`http://localhost:3000/regiones/paises`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })

let res = await serachApi.json()

if(res.exito)
  return res
}


////////////////////////////////////////////////////////////////////////////////////////

newRegion.addEventListener("click", () => {

  document.getElementById("region").addEventListener("keyup", (e) => {
    if(e.target.value.length > 0){
      document.getElementById("guardar").style = "background: rgb(66, 156, 65)"
      document.getElementById("cancelar").style = "color: rgb(66, 156, 65)"
    }else{
      document.getElementById("guardar").style = ""
      document.getElementById("cancelar").style = ""
    }
  })
  fondoNegro.classList.toggle("noDisplay")
  containerContacto.classList.toggle("noDisplay")
  body.classList.toggle("noHidden")
})


cerrarNuevaRegion.addEventListener("click", () => {
  fondoNegro.classList.toggle("noDisplay")
  containerContacto.classList.toggle("noDisplay")
  body.classList.toggle("noHidden")
})



cancelar.addEventListener("click", () => {
  fondoNegro.classList.toggle("noDisplay")
  containerContacto.classList.toggle("noDisplay")
  body.classList.toggle("noHidden")
})

cancelarCiudad.addEventListener("click", () => {
  fondoNegro.classList.toggle("noDisplay")
  containerCiudad.classList.toggle("noDisplay")
  body.classList.toggle("noHidden")
})

cancelarPais.addEventListener("click", () => {
  fondoNegro.classList.toggle("noDisplay")
  containerPais.classList.toggle("noDisplay")
  body.classList.toggle("noHidden")
})

cerrarNuevoPais.addEventListener("click", () => {
  fondoNegro.classList.toggle("noDisplay")
  containerPais.classList.toggle("noDisplay")
  body.classList.toggle("noHidden")
})

cerrarNuevoCiudad.addEventListener("click", () => {
  fondoNegro.classList.toggle("noDisplay")
  containerCiudad.classList.toggle("noDisplay")
  body.classList.toggle("noHidden")
})




async function completar (){

    ///////////////////// OBTENEMOS ARRAY DE BASE DE DATOS CON GET ////////////////////////

    let arrayRegiones = await getRegiones()
    

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


      ////////////////////// EVENTO AGREGAR PAIS /////////////////////


      button.addEventListener("click", async function() {

        let body = document.getElementById("body")
        body.classList.toggle("noHidden")
        fondoNegro.classList.toggle("noDisplay")
        containerPais.classList.toggle("noDisplay")

        let guardarPais = document.getElementById("guardarPais")
        let paisNombre = document.getElementById("pais")

        paisNombre.addEventListener("keyup", (e) => {
          if(e.target.value.length > 0){
            document.getElementById("guardarPais").style = "background: rgb(66, 156, 65)"
            document.getElementById("cancelarPais").style = "color: rgb(66, 156, 65)"
          }else{
            document.getElementById("guardarPais").style = ""
            document.getElementById("cancelarPais").style = ""
          }
        })
        
        guardarPais.addEventListener("click", () =>{
          body.classList.toggle("noHidden")
          fondoNegro.classList.toggle("noDisplay")
          containerPais.classList.toggle("noDisplay")
          postPais(paisNombre.value, arrayRegiones.regiones[i].id)

          location.href = "../html/city.html"        
        
        })

      })

      //////////////////////////////////////////////////////////////////


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
          eliminar.id = "eliminarPais"
          editar.id = "editarPais"
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

          /////////////EVENTO EDITAR PAIS ////////////////

          editar.addEventListener("click", () => {

            let input = document.getElementById("inputEditar")
            let aceptar = document.getElementById("aceptarEdit")
            let cancelar = document.getElementById("cancelarEdit")
      
            let containerEdit = document.getElementById("containerEdit")
            let body = document.getElementById("body")
            let h3 = document.getElementById("h3Edit")
            h3.innerHTML = `Editando: ${arrayRegiones.regiones[i].Pais[j].nombre}`
            

            body.classList.toggle("noHidden")
            fondoNegro.classList.toggle("noDisplay")
            containerEdit.classList.toggle("noDisplay")

            
              aceptar.addEventListener("click", () => {

                if(input.value.length > 0){
                  putGeneral(arrayRegiones.regiones[i].Pais[j].id, input.value, "paises")
                  body.classList.toggle("noHidden")
                  fondoNegro.classList.toggle("noDisplay")
                  containerEdit.classList.toggle("noDisplay")
                  location.href = "../html/city.html"
                }else{
                  alert("El campo es requerido")
                }

                
                
              })
            

           

            cancelar.addEventListener("click", () => {
              body.classList.toggle("noHidden")
              fondoNegro.classList.toggle("noDisplay")
              containerEdit.classList.toggle("noDisplay")
              location.href = "../html/city.html"
            })


          })

          /////////// EVENTO DELETE PAIS ///////////

          eliminar.addEventListener("click", () => {
            deleteGeneral(arrayRegiones.regiones[i].Pais[j].id, "paises")
            location.href = "../html/city.html"

          })




          ////////////////  AGREGAR CIUDADES  ///////////////////////////


          AgregarCiudad.addEventListener("click", async function() {
        
            

            fondoNegro.classList.toggle("noDisplay")
            containerCiudad.classList.toggle("noDisplay")
            let body = document.getElementById("body")
            body.classList.toggle("noHidden")
    
            let guardarCiudad = document.getElementById("guardarCiudad");
            let ciudadNombre = document.getElementById("ciudad");

            ciudadNombre.addEventListener("keyup", (e) => {
              if(e.target.value.length > 0){
                document.getElementById("guardarCiudad").style = "background: rgb(66, 156, 65)"
                document.getElementById("cancelarCiudad").style = "color: rgb(66, 156, 65)"
              }else{
                document.getElementById("guardarCiudad").style = ""
                document.getElementById("cancelarCiudad").style = ""
              }
            })
       
 
            guardarCiudad.addEventListener("click", () => {
    
                fondoNegro.classList.toggle("noDisplay")
                containerCiudad.classList.toggle("noDisplay")
                body.classList.toggle("noHidden")
                postCiudad(ciudadNombre.value, arrayRegiones.regiones[i].Pais[j].id)
                location.href = "../html/city.html" 
      
              })
           

          })


          ///////////////////////////////////////////////////////////////////////
          
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

            /////////// EVENTO DELETE PAIS ///////////////////////////////////////////

            i2.addEventListener("click", () => {
              deleteGeneral(arrayRegiones.regiones[i].Pais[j].Ciudads[k].id, "ciudades")
              location.href = "../html/city.html"

            })
          
            /////////////////////////////////////////////////////////////////////////

            
          }
          
          
          li2.appendChild(ulCitys)


      }

      li.appendChild(ul2)
      ul.appendChild(li)

    }
    
    nuevaRegion.appendChild(ul)




    ////////////////////// EVENTOS CRUD ////////////////////////

    var toggler = document.getElementsByClassName("caret");
    var fondoNegro = document.getElementById("fondoNegro");
    var containerPais = document.getElementById("containerPais");
    var containerCiudad = document.getElementById("containerCiudad")

    for (let i = 0; i < toggler.length; i++) {

      toggler[i].addEventListener("click", function() {

        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
        if( this.parentElement.querySelector(".pais-ag") != null){
          this.parentElement.querySelector(".pais-ag").classList.toggle("noMostrar")
        }
        

      }); 
       
    }
  
    //// FALTA ARREGLAR CIUDAD /////

}

completar()





let guardar = document.getElementById("guardar")
guardar.addEventListener("click", ()=>{

    let nombreRegion = document.getElementById("region")

    postRegion(nombreRegion.value)
    location.href = "../html/city.html"
    
})

////////////////// POST REGION ////////////////////

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

////////////////// POST PAIS ////////////////////

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

  await serachApi.json()

}

/////////////// POST CIUDAD /////////////////

let postCiudad = async (nombre, id_pais) => {
  var data = {
    nombre,
    id_pais
  }

  let searchApi = await fetch (`http://localhost:3000/regiones/ciudades`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

  await searchApi.json() 

}


/////////////// DETELE ///////////////



let deleteGeneral = async (id, lugar) => {

  let searchApi = await fetch (`http://localhost:3000/regiones/${lugar}/${id}` , {
    method: 'DELETE'
  })

  await searchApi.json()

}


//////////////////   PUT   ///////////////////

let putGeneral = async (id, nombre, lugar) => {

  var data = {
    nombre
  }

  let searchApi = await fetch (`http://localhost:3000/regiones/${lugar}/${id}` , {
    method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
  })

  await searchApi.json()

}




