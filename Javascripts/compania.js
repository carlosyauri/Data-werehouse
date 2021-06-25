
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


async function completarCompanias (){

    
    let companias = await getCompania()
    let array = []

    let tabla = document.getElementById("tablaBody")

    for (let i = 0; i < companias.length; i++) {
        array = Object.values(companias[i])
        let tr = document.createElement("tr")
        let th = document.createElement("th")
        th.className = "checkbox"

        let input = document.createElement("input")
        input.type = "checkbox"

        input.id = array[0] ///////////<-----------------------------------------

        th.appendChild(input)
        tr.appendChild(th)

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
                console.log(idCompania)
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
let idCiudad;


cerrarAgregar.addEventListener("click", () => {
    fondoNegro.classList.toggle("noDisplay")
    container.classList.toggle("noDisplay")
})

cancelar.addEventListener("click", () => {
    fondoNegro.classList.toggle("noDisplay")
    container.classList.toggle("noDisplay")
})


btnAgregarCompania.addEventListener("click", () => {

    fondoNegro.classList.toggle("noDisplay")
    container.classList.toggle("noDisplay")
})



guardar.addEventListener("click", () => {

    postCompania(nombre.value, direccion.value, email.value, telefono.value, idCiudad)
    location.href = "../html/compania.html" 

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

    await serachApi.json()
}

let boxGeneral = document.getElementById("boxGeneral")
let btnAcionnes = document.getElementById("btn-acciones")
let arrayIdCompanias;

boxGeneral.addEventListener("click", (e) => {

    btnAcionnes.toggleAttribute("hidden")

    arrayIdCompanias = []

    
    let checks = document.getElementsByClassName("checkbox")

 
    
    if (e.target.checked == true){

        for (let i = 1; i < checks.length; i++) {

            arrayIdCompanias.push(checks[i].firstChild.id)
            checks[i].firstChild.checked = true;
        }

        console.log(arrayIdCompanias)
    }

    if (e.target.checked == false){

        for (let i = 1; i < checks.length; i++) {
            checks[i].firstChild.checked = false;
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
  