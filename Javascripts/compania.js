
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
        th.appendChild(input)
        tr.appendChild(th)

        for (let j = 0; j < array.length; j++) {
           
            let td = document.createElement("td")
            if(j != 4){
                td.innerHTML = array[j]
            }
            
            if (j == 4){
                td.innerHTML = array[j].nombre
            }

            tr.appendChild(td)
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

let nombre = document.getElementById("nombre")
let direccion = document.getElementById("direccion")
let email = document.getElementById("email")
let telefono = document.getElementById("telefono")
let idCiudad;

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

