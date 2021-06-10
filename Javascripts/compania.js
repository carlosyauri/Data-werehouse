
let getCompania = async () => {

    let searchApi = await fetch (`http://localhost:3000/compania`, {
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

let fondoNegro = document.getElementById("fondoNegro")
let container = document.getElementById("containerContacto")

let btnAgregarCompania = document.getElementById("btn-compania")
btnAgregarCompania.addEventListener("click", () => {

    fondoNegro.classList.toggle("noDisplay")
    container.classList.toggle("noDisplay")

    // postCompania("Yauri SA", "Av. asd 123", "yauri@gmail.com", "4947658", "2")
    // location.href = "../html/compania.html"
})

completarCompanias()




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

