var cerrar = document.getElementById("nvoContacto");
var fondoNegro = document.getElementById("fondoNegro");
var containerContacto = document.getElementById("containerContacto");
var btnAgregarContacto = document.getElementById("btn-agregar-contacto");

btnAgregarContacto.addEventListener("click", () => {
    fondoNegro.classList.toggle("noDisplay")
    containerContacto.classList.toggle("noDisplay")
})
cerrar.addEventListener("click", () => {
    fondoNegro.classList.toggle("noDisplay")
    containerContacto.classList.toggle("noDisplay")
})

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


//////////////////////// CARGAR DATOS DE REGIONES - SIRVE PARA CREAR CONTACTOS///////////////////////////

async function agregarRegion () {


  let arrayRegiones = await getRegiones()
  let selectRegion = document.getElementById("region");

  for (let i = 0; i < arrayRegiones.regiones.length; i++) {
    
    

    let option = document.createElement("option")
    option.innerHTML = arrayRegiones.regiones[i].nombre
    selectRegion.appendChild(option)



    selectRegion.addEventListener("click", async(e)=>{

      let regionIngresada = e.target.value
      if(regionIngresada != "todos"){
        document.getElementById("pais").disabled = false
         
    }

    if(regionIngresada == arrayRegiones.regiones[i].nombre){
        let pais = document.getElementById("pais")

        //////////  ELIMINAR OPTIONS DE SELECT ANTES DE CARGAR NUEVOS PAISES ///////////

        
        if(pais.options.length>1){
            for (let i = pais.options.length; i >= 1; i--) {
                pais.remove(i);
            }
        }

        ///////////////////////////////////////////////////////////////////////////////

        for (let j = 0; j < arrayRegiones.regiones[i].Pais.length; j++) {

            let optionPais = document.createElement("option")
        
            optionPais.value = `pais${j}`
            optionPais.id = `pais${j}`
            optionPais.innerHTML = arrayRegiones.regiones[i].Pais[j].nombre
            pais.appendChild(optionPais)



            pais.addEventListener("click", async(e) => {
                let paisIngresado = e.target.value
                if(paisIngresado != "todos"){
                    document.getElementById("ciudad").disabled = false
                }

                if(paisIngresado == arrayRegiones.regiones[i].Pais[j].nombre){
                    let ciudad = document.getElementById("ciudad")
    
                    ////// ELIMINAR OPTIONS DE SELECT ANTES DE CARGAR NUEVAS CIUDADES/////

                    if(ciudad.options.length>1){
                        for (let i = ciudad.options.length; i >= 1; i--) {
                            ciudad.remove(i);
                        }
                    }
                    //////////////////////////////////////////////////////////////////////
    
                    for (let k = 0; k < arrayRegiones.regiones[i].Pais[j].Ciudads.length; k++) {
                        
                        let optionCiudades = document.createElement("option")
                        optionCiudades.value = `ciudad${k}`
                        optionCiudades.id = `ciudad${k}`
                        optionCiudades.innerHTML =  arrayRegiones.regiones[i].Pais[j].Ciudads[k].nombre   
                        ciudad.appendChild(optionCiudades)
    
                    }
    
                }

            })

            
            

        }            
      } 
    })
  }

}

agregarRegion()














let agregar = document.getElementById("guardarContacto")
agregar.addEventListener("click", () => {
})



/////////////////////////////////////// POST CONTACTOS ///////////////////////////////////////

let postContacto = async (nombre, apellido, cargo, email, compania, id_region, id_pais, id_ciudad, canal_contacto, cuenta_contacto) => {

    var data = {
        nombre,
        apellido,
        cargo,
        email,
        compania,
        id_region,
        id_pais,
        id_ciudad,
        canal_contacto,
        cuenta_contacto
    }

    let searchApi = await fetch (`http://localhost:3000/contactos`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    await searchApi.json()
}

