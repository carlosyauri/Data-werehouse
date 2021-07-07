
let getCompania = async () => {

    let searchApi = await fetch (`http://localhost:3000/compania`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return await searchApi.json()
    

}


let getCiudades = async () => {

    let searchApi = await fetch (`http://localhost:3000/regiones/ciudades`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return await searchApi.json()
    

}



// let selectCiudad = document.getElementById("ciudad")

// selectCiudad.addEventListener("click", (e) => {
//     let valor = 
// })

let arrayIdCompanias;
let idCiudad;

async function completarCompanias (){

    arrayIdCompanias = []
    
    let companias = await getCompania()
    let array = []

    let tabla = document.getElementById("tablaBody")

    for (let x = 0; x < companias.length; x++) {
        array = Object.values(companias[x])
        let tr = document.createElement("tr")
        let th = document.createElement("th")
        th.className = "checkbox"

        let input = document.createElement("input")
        input.type = "checkbox"

        input.id = array[0] ///////////<-----------------------------------------

        th.appendChild(input)
        tr.appendChild(th)

        input.addEventListener("click", (e) =>{
            let valor = e.target.checked
            if(valor == true){

                tr.style = "background: rgb(213 235 255)"
                btnAcionnes.removeAttribute("hidden")
                document.getElementById("mostrador").removeAttribute("hidden")
                arrayIdCompanias.push(input.id)
                document.getElementById("mostrador").innerHTML = `${arrayIdCompanias.length} seleccionados`
                console.log(arrayIdCompanias)

            }

            if(valor == false){

                let contador = (arrayIdCompanias.length-1)
                if(contador < 1){

                    btnAcionnes.setAttribute("hidden", true)
                    document.getElementById("mostrador").setAttribute("hidden", true)
                    boxGeneral.checked = false
                }
                
                tr.style = ""
                arrayIdCompanias = arrayIdCompanias.filter(function(i) { return i !== input.id })
                document.getElementById("mostrador").innerHTML = `${arrayIdCompanias.length} seleccionados`
            }
        })

        for (let j = 1; j < array.length; j++) {
           
            let td = document.createElement("td")
            if(j != 5){

                td.innerHTML = array[j]
                tr.appendChild(td)
            }

            let i = document.createElement("i")
            let i2 = document.createElement("i")
            let idCompania;

            if (j == 5){

                td.innerHTML = array[j].nombre
                let td2 = document.createElement("td")
                idCompania = array[0]

                i.classList = "far fa-edit btnAccion"
                i2.classList = "far fa-trash-alt btnAccion"

                td2.appendChild(i)
                td2.appendChild(i2)

                tr.appendChild(td)
                tr.appendChild(td2)

            }

            i.addEventListener("click", () => {
                let ciudadSelect = document.getElementById("ciudad")
                ciudadSelect.addEventListener("click", () => {
                    guardar.style = "display: none"
                    cancelar.style = "display: none"
                })
                console.log(companias[x])
                guardar.style = "display: none"
                cancelar.style = "display: none"

                let h2 = document.getElementById("tituloEdit")
                h2.innerHTML = "Modificar compania"

                let btnEliminar = document.getElementById("eliminarBtn")
                btnEliminar.style = "display: inline; color: rgb(66, 156, 65)"
                let guardarEdicion = document.getElementById("guardarEdicion")
                guardarEdicion.style = "display: inline; background: rgb(66, 156, 65); color: white"
                
                // guardar.style = "background: rgb(66, 156, 65); color: white"
                // cancelar.style = "color: rgb(66, 156, 65)"

                fondoNegro.classList.toggle("noDisplay")
                containerContacto.classList.toggle("noDisplay")

                nombre.value = companias[x].nombre
                direccion.value = companias[x].direccion
                email.value = companias[x].email
                telefono.value = companias[x].telefono

                let optionSelectCiudad = document.getElementById("optionGralCiudad")
                optionSelectCiudad.innerHTML = companias[x].Ciudad.nombre
                optionSelectCiudad.disabled = true

                guardarEdicion.addEventListener("click", () => {
                    putCompania(companias[x].id, nombre.value, direccion.value, email.value, telefono.value, idCiudad)
                    location.href = "../html/compania.html"
                })
                

                btnEliminar.addEventListener("click", () => {
                    deleteCompania(companias[x].id)
                    location.href = "../html/compania.html"
                })
                
                



            })


            i2.addEventListener("click", () => {
                deleteCompania(idCompania)
                location.href = "../html/compania.html"
            })

            
            
        }
        tabla.appendChild(tr)
    } 

}

completarCompanias()


let btnAgregarCompania = document.getElementById("btn-compania")
let fondoNegro = document.getElementById("fondoNegro")
let container = document.getElementById("containerContacto")
let cerrarAgregar = document.getElementById("nvoContacto")
let guardar = document.getElementById("guardar")
let cancelar = document.getElementById("cancelar")
let nombre = document.getElementById("nombre")
let direccion = document.getElementById("direccion")
let email = document.getElementById("email")
let telefono = document.getElementById("telefono")



cerrarAgregar.addEventListener("click", () => {
    location.href = "../html/compania.html" 
})

cancelar.addEventListener("click", () => {
    location.href = "../html/compania.html" 
})


btnAgregarCompania.addEventListener("click", () => {

    fondoNegro.classList.toggle("noDisplay")
    container.classList.toggle("noDisplay")
})



guardar.addEventListener("click", () => {

    postCompania(nombre.value, direccion.value, email.value, telefono.value, idCiudad)
    

})


async function agregarCiudades () {


    let selectCiudad = document.getElementById("ciudad")
    let ciudades = await getCiudades();

    for (let i = 0; i < ciudades.ciudades.length; i++) {

        let option = document.createElement("option")
        option.innerHTML = ciudades.ciudades[i].nombre

        selectCiudad.appendChild(option) 


        selectCiudad.addEventListener("click", async(e) => {

            let ciudadIngresada = e.target.value
    
            if(ciudadIngresada == ciudades.ciudades[i].nombre){
                idCiudad = ciudades.ciudades[i].id
                guardar.disabled = false
                guardar.style = "background: #429c41; color: white"
                cancelar.style = "color: #429c41"
            }

        })

    }   

}

agregarCiudades()







let postCompania = async (nombre, direccion, email, telefono, id_ciudad) => {
    var data = {
        nombre, 
        direccion,
        email,
        telefono,
        id_ciudad
    }

    let searchApi = await fetch (`http://localhost:3000/compania`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    await searchApi.json()
    location.href = "../html/compania.html" 

}

let boxGeneral = document.getElementById("boxGeneral")
let btnAcionnes = document.getElementById("btn-acciones")


boxGeneral.addEventListener("click", (e) => {
    let checks = document.getElementsByClassName("checkbox")

    if(arrayIdCompanias.length < 1){
        btnAcionnes.toggleAttribute("hidden")
        document.getElementById("mostrador").toggleAttribute("hidden")
    }
  
    arrayIdCompanias = []

    
    if (e.target.checked == true){

        for (let i = 1; i < checks.length; i++) {

            arrayIdCompanias.push(checks[i].firstChild.id)
            checks[i].firstChild.checked = true;
            checks[i].parentNode.style = "background: rgb(213, 235, 255)"
        }
        document.getElementById("mostrador").innerHTML = `${arrayIdCompanias.length} seleccionados`
        console.log(arrayIdCompanias)
    }

    if (e.target.checked == false){
        btnAcionnes.toggleAttribute("hidden")
        document.getElementById("mostrador").toggleAttribute("hidden")
        for (let i = 1; i < checks.length; i++) {
            checks[i].firstChild.checked = false;
            checks[i].parentNode.style = ""
        }
    }

})




let eliminarTodo = document.getElementById("eliminarTodo")

eliminarTodo.addEventListener("click", () => {

    for (let i = 0; i < arrayIdCompanias.length; i++) {
        deleteCompania(arrayIdCompanias[i])     
    }

    location.href = "../html/compania.html" 

})

let deleteCompania = async (id) => {

    let searchApi = await fetch (`http://localhost:3000/compania/${id}` , {
      method: 'DELETE'
    })
  
    await searchApi.json()
  
}


let putCompania = async (id, nombre, direccion, email, telefono, CiudadId) => {

    var data = {
      nombre,
      direccion,
      email,
      telefono,
      CiudadId
    }
  
    let searchApi = await fetch (`http://localhost:3000/compania/${id}` , {
      method: 'PUT',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json'
          }
    })
  
    await searchApi.json()

    location.href = "../html/compania.html" 

  }
  