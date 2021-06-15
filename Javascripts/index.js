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
  let selectPais = document.getElementById("pais")
  let selectCiudad = document.getElementById("ciudad")
  let direccion = document.getElementById("direccion")
  let canal = document.getElementById("canal")
  let regionId;
  let paisId;
  let ciudadId;
  

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
            regionId = arrayRegiones.regiones[i].id

            //////////  ELIMINAR OPTIONS DE SELECT ANTES DE CARGAR NUEVOS PAISES ///////////
    
            if(selectPais.options.length>1){
                for (let i = selectPais.options.length; i >= 1; i--) {
                    selectPais.remove(i);
                }
            }

            if(selectCiudad.options.length>1){
                for (let i = selectCiudad.options.length; i >= 1; i--) {
                    selectCiudad.remove(i);
                }
            }

            ///////////////////////////////////////////////////////////////////////////////

            for (let j = 0; j < arrayRegiones.regiones[i].Pais.length; j++) {

                let optionPais = document.createElement("option")

                optionPais.innerHTML = arrayRegiones.regiones[i].Pais[j].nombre
                
                selectPais.appendChild(optionPais)



                selectPais.addEventListener("click", async(e) => {
                

                    let paisIngresado = e.target.value
                    if(paisIngresado != "todos"){
                        document.getElementById("ciudad").disabled = false
                    }


                    if(paisIngresado == arrayRegiones.regiones[i].Pais[j].nombre){
                        paisId = arrayRegiones.regiones[i].Pais[j].id
                        
        
                        ////// ELIMINAR OPTIONS DE SELECT ANTES DE CARGAR NUEVAS CIUDADES/////

                        if(selectCiudad.options.length>1){
                            for (let i = selectCiudad.options.length; i >= 1; i--) {
                                selectCiudad.remove(i);
                            }
                        }
                        //////////////////////////////////////////////////////////////////////
        
                        for (let k = 0; k < arrayRegiones.regiones[i].Pais[j].Ciudads.length; k++) {
                            
                            let optionCiudades = document.createElement("option")
            
                            optionCiudades.innerHTML =  arrayRegiones.regiones[i].Pais[j].Ciudads[k].nombre   
                            selectCiudad.appendChild(optionCiudades)


                            selectCiudad.addEventListener("click", (e) => {

                                let ciudadIngresada = e.target.value

                                if(ciudadIngresada != "todos"){
                                    direccion.disabled = false
                                }
                                if(ciudadIngresada == arrayRegiones.regiones[i].Pais[j].Ciudads[k].nombre){
                                    ciudadId = arrayRegiones.regiones[i].Pais[j].Ciudads[k].id
                                    
                                }


                            })
        
                        }
        
                    }

                })

                
                

            }            
        } 
    })
  }
  let nombre = document.getElementById("nombre")
  let apellido = document.getElementById("apellido")
  let cargoUsuario = document.getElementById("cargoUsuario")
  let email = document.getElementById("email")
  let compania = document.getElementById("compania")
  let cuenta = document.getElementById("cuenta")
  let agregarCanal = document.getElementById("agregarCanal")
  let divCanales = document.getElementById("canales")
  let divCuentas = document.getElementById("cuentas")


  canal.addEventListener("click", () => {
      if(canal.value != "todos"){
        cuenta.disabled = false
      }
  })


  cuenta.addEventListener("keyup",(e) => {

    console.log(e.target.value.length)

    if(e.target.value.length > 0){
        agregarCanal.disabled = false
    }

    if(e.target.value.length < 1){
        agregarCanal.disabled = true
    }

  })
  
  agregarCanal.addEventListener("click", ()=>{

    let canales = ["linkedIn", "Facebook", "Instagram", "GitHub"]
    let select = document.createElement("select")
    let input = document.createElement("input")

    for (let i = 0; i < canales.length; i++) { 
        let option = document.createElement("option")
        option.innerHTML = canales[i]
        select.appendChild(option)
    }

    divCanales.appendChild(select)
    divCuentas.appendChild(input)
  })

  let barraNumerica = document.getElementById("barraNumerica")
  let barraProgreso = document.getElementById("barraProgreso")


  barraNumerica.addEventListener("click", (e) => {
    let num = e.target.value
    
    if (num == "25%"){
        barraProgreso.value = 25
    }
    if (num == "50%"){
        barraProgreso.value = 50
    }
    if (num == "75%"){
        barraProgreso.value = 75
    }
    if (num == "100%"){
        barraProgreso.value = 100
    }

  })
    let agregar = document.getElementById("guardarContacto")
    agregar.addEventListener("click", () => {

        postContacto(nombre.value, apellido.value, cargoUsuario.value, email.value, compania.value, regionId, paisId, ciudadId, canal.value, cuenta.value)
        location.href = "../html/index.html" 
    })
    
}

agregarRegion()

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

