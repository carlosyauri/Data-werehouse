

var cerrar = document.getElementById("nvoContacto");
var fondoNegro = document.getElementById("fondoNegro");
var containerContacto = document.getElementById("containerContacto");
var btnAgregarContacto = document.getElementById("btn-agregar-contacto");
let btnCancelar = document.getElementById("cancelarContacto")


btnAgregarContacto.addEventListener("click", async() => {
    fondoNegro.classList.toggle("noDisplay")
    containerContacto.classList.toggle("noDisplay")    

})


btnCancelar.addEventListener("click",() => {
    location.href = "../html/index.html"
})


cerrar.addEventListener("click", () => {
    fondoNegro.classList.toggle("noDisplay")
    containerContacto.classList.toggle("noDisplay")

    location.href = "../html/index.html"

})



/////////////////////////////////////// GET REGIONES ///////////////////////////////////////

let getRegiones = async () => {

    let serachApi = await fetch (`http://localhost:3000/regiones`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
  
    let searchCompania = await fetch (`http://localhost:3000/compania`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let compania = await searchCompania.json()

    let res = await serachApi.json()

    let obj = {
        compania: compania,
        regiones: res
    }

    return obj
    
}


/////////////////////////////////////// GET CONTACTOS ///////////////////////////////////////

let getContactos = async () => {

    let serachApi = await fetch (`http://localhost:3000/contactos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })


    let res = await serachApi.json()

    if(res.exito){
        return res
    }
    if(res.message){
        return false
    }
    

         
}

var idCompania;
var regionId;
var paisId;
var ciudadId;

/////////////////////   TRAER DATOS DE CONTACTOS   ////////////////////////////
let arrayIdContactos;

async function completar () {
    
    arrayIdContactos = [];
    
    let arrayContactos = await getContactos()
    
    let arrayDatosCanales = []

    let tbody = document.getElementById("tablaBody")

    let array;


    let ordenarContacto = document.getElementById("ordenarContacto")
    let indicador = 0

    //// ORDENAR DE MANERA ASCENDENTO Y DESCENTENTE CON FLECHAS DE CONTACTO ////

    ordenarContacto.addEventListener("click", () => {

        
        let cantidadAnterior = tbody.children.length
        let validor;

        arrayContactos.contacto.sort(function (a, b) {
            if (a.nombre > b.nombre) {
                validor = 1
                return 1;
            }
            if (a.nombre < b.nombre) {
                validor = -1
                return -1;
            }
            validor = 0
            return 0;
        })

        if(validor == 1){
            arrayContactos.contacto.reverse()

        };


        for (let i = 0; i < arrayContactos.contacto.length; i++) {
        
            iId = i
            array = []
            
    
    
    
            array = Object.values(arrayContactos.contacto[i])
    
            
            arrayDatosCanales.push(JSON.parse(arrayContactos.contacto[i].datosContacto)) 
            
            
    
            let tr = document.createElement("tr")
    
            for (let j = 1; j < 7; j++) {
                
    
                if(j == 1){
    
                    let tdCheck = document.createElement("td")
                    tdCheck.classList = "checkbox"
                    let input = document.createElement("input")
                    input.type = "checkbox"
                    input.id = array[8]
                    tdCheck.appendChild(input)
                    tr.appendChild(tdCheck)
    
    
                    let td = document.createElement ("td")
    
                    let divPerfil = document.createElement("div")
                    divPerfil.classList = "perfil"
    
                    let img = document.createElement("img")
                    img.classList = "foto"
                    img.src = arrayContactos.contacto[i].img
    
                    let divDatos = document.createElement("div")
                    divDatos.classList = "datos"
                    let h2 = document.createElement("h2")
                    let p = document.createElement("p")
    
                    h2.innerHTML =  `${arrayContactos.contacto[i].nombre} ${arrayContactos.contacto[i].apellido}`
                    p.innerHTML = `${arrayContactos.contacto[i].email}`
    
                    divDatos.appendChild(h2)
                    divDatos.appendChild(p)
                    
                    divPerfil.appendChild(img)
                    divPerfil.appendChild(divDatos)
    
                    td.appendChild(divPerfil)
                    tr.appendChild(td)
    
                    
    
                    input.addEventListener("click", (e) =>{
                        let valor = e.target.checked
                        if(valor == true){
    
                            tr.style = "background: rgb(213 235 255)"
                            btnAcionnes.removeAttribute("hidden")
                            document.getElementById("mostrador").removeAttribute("hidden")
    
                            arrayIdContactos.push(input.id)
                            console.log(arrayIdContactos.length)
    
                            document.getElementById("mostrador").innerHTML = `${arrayIdContactos.length} seleccionados`
    
                        }
    
                        if(valor == false){
    
                            let contador = (arrayIdContactos.length-1)
                            if(contador < 1){
    
                                btnAcionnes.setAttribute("hidden", true)
                                document.getElementById("mostrador").setAttribute("hidden", true)
                                boxGeneral.checked = false
                            }
                            
                            tr.style = ""
                            arrayIdContactos = arrayIdContactos.filter(function(i) { return i !== input.id })
                            document.getElementById("mostrador").innerHTML = `${arrayIdContactos.length} seleccionados`
                        }
                    })
    
                    
                    
    
    
                } else
    
                if (j == 2){
                    let td = document.createElement("td")
                    let p = document.createElement("p")
                    p.style = "color: #CCCCCC; margin: 0; height: 10px; width: 130px"
                    p.innerHTML = arrayContactos.contacto[i].Region.nombre
                    td.innerHTML = arrayContactos.contacto[i].Pai.nombre
                    td.appendChild(p)
                    tr.appendChild(td)
    
                }else
    
    
                if(j == 3){
                    
    
                    if(arrayContactos.contacto[i].CompaniumId == null ){
                        
                        let td = document.createElement("td")
                        td.innerHTML = "Compania removida"
                        td.style = "color: red"
                        tr.appendChild(td)
                    }
    
                    if(arrayContactos.contacto[i].CompaniumId != null){
                        let td = document.createElement("td")
                        td.innerHTML = arrayContactos.contacto[i].Companium.nombre
                        tr.appendChild(td)
                    }            
    
    
                }else
    
    
                if( j == 4){
    
                    let td = document.createElement("td")
                    td.innerHTML = array[j]
                    tr.appendChild(td)
    
                }else
                
                if(j == 5){
    
                    let td = document.createElement("td")
                    let progress = document.createElement("progress")
                    let p = document.createElement("p")
                    p.innerHTML = `${array[j]}%`
                    p.style = "display: inline"
                    progress.classList = "progressFront"
                    progress.max = "100"
                    progress.value = array[j]
    
                    td.appendChild(p)
                    td.appendChild(progress)
    
                    tr.appendChild(td)
    
                }else
            
    
                if(j = 6){
                    let td = document.createElement("td")
                    td.classList = "btnHover"
                    let iEliminar = document.createElement("i")
                    let iEditar = document.createElement("i")
                    let divP = document.createElement("div")
                    divP.classList = "divBtnHover"
                    let p = document.createElement("p")
                    p.innerHTML = "..."
    
                    iEliminar.classList = "far fa-trash-alt"
                    iEliminar.style = "display: none"
    
                    iEditar.classList = "far fa-edit"
                    iEditar.style = "display: none"
    
            
    
    
                    divP.appendChild(p)
                    divP.appendChild(iEliminar)
                    divP.appendChild(iEditar)
    
                    tr.addEventListener("mouseover", () => {
                        
                        p.style = "display: none"
                        iEliminar.style = "display: inline"
                        iEditar.style = "display: inline"
                    })
    
                    tr.addEventListener("mouseout", () => {
      
                        p.style = "display: inline"
                        iEliminar.style = "display: none"
                        iEditar.style = "display: none"
                    })
    
                    iEliminar.addEventListener("click", () => {
                        deleteContactos(arrayContactos.contacto[i].id)
                        location.href = "../html/index.html"
                    })
                    
                    iEditar.addEventListener("click", () => {
    
    
    
                        let cuentaInput = document.getElementById("cuenta")
    
                        agregarCanal.style = "background: #1D72C2; color: white"
    
                        cuentaInput.addEventListener("keyup",(e) => {
    
        
                            if(e.target.value.length > 0){       
       
                                btnCancelar.style = "display: none"
                                btnGuardar.style = "display: none"
                        
                            }
                        
                            if(e.target.value.length < 1){
    
                                btnCancelar.style ="display: none"
                                btnGuardar.style = "display: none"
                            }
                        
                          })
                       
                        fondoNegro.classList.toggle("noDisplay")
                        containerContacto.classList.toggle("noDisplay")
                        let titulo = document.getElementById("tituloContacto")
                        titulo.innerHTML = "Modificar contacto"    
    
                        // IMAGEN //
                        let preview = document.getElementById("preview")
                        preview.style = "border: none;"
                        let perfil = document.getElementById("perfil-2")
                        perfil.style = "display: none"
                        let img = document.createElement("img")
                        img.src = arrayContactos.contacto[i].img
                        img.id = "imgCargada"
                        preview.appendChild(img)
    
                        // DATOS PRINCIPALES //
    
                        let nombre = document.getElementById("nombre")
                        nombre.value = arrayContactos.contacto[i].nombre
    
                        let apellido = document.getElementById("apellido")
                        apellido.value = arrayContactos.contacto[i].apellido
    
                        let cargo = document.getElementById("cargoUsuario")
                        cargo.value = arrayContactos.contacto[i].cargo
    
                        let email = document.getElementById("email")
                        email.value = arrayContactos.contacto[i].email
    
         
                        if (arrayContactos.contacto[i].Companium != null){
                            let compania = document.getElementById("compania")
                            compania.value = arrayContactos.contacto[i].Companium.nombre
                        }
                        
    
                        // OTROS DATOS //
    
                        let region = document.getElementById("region")
                        region.value = arrayContactos.contacto[i].Region.nombre
    
                        let pais = document.getElementById("pais")
                        let optionPais = document.getElementById("optionPais")
                        pais.disabled = false
                        optionPais.selected = true
                        optionPais.disabled = false
                        optionPais.innerHTML = arrayContactos.contacto[i].Pai.nombre
    
                        let ciudad = document.getElementById("ciudad")
                        let optionCiudad = document.getElementById("optionCiudad")
                        ciudad.disabled = false
                        optionCiudad.selected = true
                        optionCiudad.disabled = false
                        optionCiudad.innerHTML = arrayContactos.contacto[i].Ciudad.nombre
    
                        let direccion = document.getElementById("direccion")
                        direccion.value = arrayContactos.contacto[i].direccion
    
                        let barraProgreso = document.getElementById("barraProgreso")
                        barraProgreso.value = arrayContactos.contacto[i].interes
    
                        let barraNumerica = document.getElementById("barraNumerica")
                        barraNumerica.value = `${arrayContactos.contacto[i].interes}%`
                        
                        let btnGuardar = document.getElementById("guardarContacto")
                        btnGuardar.style = "display: none"
    
                        let btnConfirmar = document.getElementById("confimarContacto")
                        btnConfirmar.style = "display: inline; background: #429c41; color: white"
    
                        btnCancelar.style = "display: none"
                        let btnEliminar = document.getElementById("eliminarContacto")
                        btnEliminar.style = "display: inline; color: #429c41"
    
                        console.log("ACA", arrayDatosCanales[i])
    
                        document.getElementById("agregarCanal").disabled = false
    
                        let divCanales = document.getElementById("canales")
                        let divCuentas = document.getElementById("cuentas")
                        let divPreferencias = document.getElementById("divPreferencias")
    
                        if (arrayDatosCanales[i].length == 1){
    
                            let optionCanal = document.getElementById("optionGeneralCanal")
                            optionCanal.innerHTML = arrayDatosCanales[i][0].canal
                            optionCanal.value = arrayDatosCanales[i][0].canal
    
    
                            let inputCuenta = document.getElementById("cuenta")
                            inputCuenta.disabled = false
                            inputCuenta.value = arrayDatosCanales[i][0].cuenta
    
                            let optionGeneralPreferencia = document.getElementById("optionGeneralPreferencia")
                            optionGeneralPreferencia.innerHTML = arrayDatosCanales[i][0].preferencias
                            optionGeneralPreferencia.value = arrayDatosCanales[i][0].preferencias
                            document.getElementById("preferencias").disabled = false
    
                        }
                        
                        if(arrayDatosCanales[i].length > 1){
    
                            for (let z = 1; z <  arrayDatosCanales[i].length; z++) {
    
                                //CANALES//
    
               
        
                                let optionCanal = document.getElementById("optionGeneralCanal")
                                optionCanal.innerHTML = arrayDatosCanales[i][0].canal
                                optionCanal.value = arrayDatosCanales[i][0].canal
        
          
                                let selectCanal = document.createElement("select")
                                selectCanal.classList = "listaCanal"
                                let option = document.createElement("option")
                                option.disabled = true
                                option.selected = true
                                option.innerHTML = arrayDatosCanales[i][z].canal
                                selectCanal.appendChild(option)
                                divCanales.appendChild(selectCanal)
        
        
                                let canales = ["LinkedIn", "Whatsapp", "GitHub", "Instagram"];
                                for (let c = 0; c < canales.length; c++) {
                                    let option = document.createElement("option")
                                    option.innerHTML = canales[c]
                                    selectCanal.appendChild(option)                            
                                }
        
        
                                //CUENTAS//
        
                                let inputCuenta = document.getElementById("cuenta")
                                inputCuenta.disabled = false
                                inputCuenta.value = arrayDatosCanales[i][0].cuenta
        
        
        
                                let input = document.createElement("input")
                                input.classList = "listaCuenta"
                                input.value = arrayDatosCanales[i][z].cuenta
                                divCuentas.appendChild(input)
        
        
                                //PREFERENCIAS//
        
        
                                let optionGeneralPreferencia = document.getElementById("optionGeneralPreferencia")
                                optionGeneralPreferencia.innerHTML = arrayDatosCanales[i][0].preferencias
                                optionGeneralPreferencia.value = arrayDatosCanales[i][0].preferencias
                                document.getElementById("preferencias").disabled = false
        
        
        
                                let selectPreferencias = document.createElement("select")
                                selectPreferencias.classList = "listaReferencias"
                                let optionPrefe = document.createElement("option")
                                optionPrefe.disabled = true
                                optionPrefe.selected = true
                                optionPrefe.innerHTML = arrayDatosCanales[i][z].preferencias
                                selectPreferencias.appendChild(optionPrefe)
                                divPreferencias.appendChild(selectPreferencias)
        
                                let preferencias = ["Sin preferencia", "Canal favorito", "No molestar"]
        
                                for (let p = 0; p < preferencias.length; p++) {
        
                                    let option = document.createElement("option")
                                    option.innerHTML = preferencias[p]
                                    selectPreferencias.appendChild(option)
                        
                                }
                       
                      
                            }
    
                        }
    
    
    
                        let listaCuenta = document.getElementsByClassName("listaCuenta")
                        let listaCanal = document.getElementsByClassName("listaCanal")
                        let listaReferencias = document.getElementsByClassName("listaReferencias")
    
    
                        btnConfirmar.addEventListener("click", () => {
    
                            datosContacto = []
        
                            for (let i = 0; i < listaCuenta.length; i++) {
                                
                                let objet = {
                                    canal: listaCanal[i].value,
                                    cuenta: listaCuenta[i].value,
                                    preferencias: listaReferencias[i].value
                    
                                }
                    
                                datosContacto.push(objet)   
                            }
    
                            putContactos(arrayContactos.contacto[i].id, imageCargada, nombre.value, apellido.value, cargo.value, email.value, datosContacto, idCompania, regionId, paisId, ciudadId, direccion.value, barraProgreso.value)
                        })
    
    
                        let eliminarEditando = document.getElementById("eliminarContacto")
                        eliminarEditando.addEventListener("click", () =>{
                            deleteContactos(arrayContactos.contacto[i].id)
                            location.href = "../html/index.html" 
    
                        })
                     
                    })
                
                    td.appendChild(divP)
                    tr.appendChild(td)
    
                }

                
            }

            tbody.appendChild(tr)


        }

        let nuevaCantidad = tbody.children.length
        console.log("!!! 1", nuevaCantidad)
        console.log("!!! 2", cantidadAnterior)

        let vueltas = nuevaCantidad - cantidadAnterior
        // console.log("vueltas", vueltas)
        parseInt(vueltas)
        
        for (let i = 0; i <= vueltas; i++){
            console.log(indicador)
            if(i < vueltas){
                tbody.firstChild.remove()
            }
            if(i == vueltas && indicador == 0){
                indicador = 1
                console.log("esta es la ultima vuelta", i)
                tbody.firstChild.remove()
                console.log(indicador)
                
            }
            if(i == vueltas && indicador == 1){
                console.log("Acá no hace nada")
            }
            
        }


        /// arreglar. Con más de 2 contactos no anda!
        
 

    })

    //// ORDENAR DE MANERA ASCENDENTO Y DESCENTENTE CON FLECHAS DE PAIS ////

    let ordenarPais = document.getElementById("ordenarPais")
    ordenarPais.addEventListener("click", () => {

        
        let cantidadAnterior = tbody.children.length
        let validor;

        console.log(arrayContactos.contacto)

        arrayContactos.contacto.sort(function (a, b) {
            if (a.Pai.nombre > b.Pai.nombre) {
                validor = 1
                return 1;
            }
            if (a.Pai.nombre < b.Pai.nombre) {
                validor = -1
                return -1;
            }
            validor = 0
            return 0;
        })


        console.log(validor)

        if(validor == 1){

            arrayContactos.contacto.reverse(function (a, b) {
                if (a.Pai.nombre > b.Pai.nombre) {
                    validor = -1
                    return -1;
                }
                if (a.Pai.nombre < b.Pai.nombre) {
                    validor = 1
                    return 1;
                }
                validor = 0
                return 0;
            })

            

        };

 
        
        




        for (let i = 0; i < arrayContactos.contacto.length; i++) {
        
            iId = i
            array = []
            
    
    
    
            array = Object.values(arrayContactos.contacto[i])
    
            
            arrayDatosCanales.push(JSON.parse(arrayContactos.contacto[i].datosContacto)) 
            
            
    
            let tr = document.createElement("tr")
    
            for (let j = 1; j < 7; j++) {
                
    
                if(j == 1){
    
                    let tdCheck = document.createElement("td")
                    tdCheck.classList = "checkbox"
                    let input = document.createElement("input")
                    input.type = "checkbox"
                    input.id = array[8]
                    tdCheck.appendChild(input)
                    tr.appendChild(tdCheck)
    
    
                    let td = document.createElement ("td")
    
                    let divPerfil = document.createElement("div")
                    divPerfil.classList = "perfil"
    
                    let img = document.createElement("img")
                    img.classList = "foto"
                    img.src = arrayContactos.contacto[i].img
    
                    let divDatos = document.createElement("div")
                    divDatos.classList = "datos"
                    let h2 = document.createElement("h2")
                    let p = document.createElement("p")
    
                    h2.innerHTML =  `${arrayContactos.contacto[i].nombre} ${arrayContactos.contacto[i].apellido}`
                    p.innerHTML = `${arrayContactos.contacto[i].email}`
    
                    divDatos.appendChild(h2)
                    divDatos.appendChild(p)
                    
                    divPerfil.appendChild(img)
                    divPerfil.appendChild(divDatos)
    
                    td.appendChild(divPerfil)
                    tr.appendChild(td)
    
                    
    
                    input.addEventListener("click", (e) =>{
                        let valor = e.target.checked
                        if(valor == true){
    
                            tr.style = "background: rgb(213 235 255)"
                            btnAcionnes.removeAttribute("hidden")
                            document.getElementById("mostrador").removeAttribute("hidden")
    
                            arrayIdContactos.push(input.id)
                            
    
                            document.getElementById("mostrador").innerHTML = `${arrayIdContactos.length} seleccionados`
    
                        }
    
                        if(valor == false){
    
                            let contador = (arrayIdContactos.length-1)
                            if(contador < 1){
    
                                btnAcionnes.setAttribute("hidden", true)
                                document.getElementById("mostrador").setAttribute("hidden", true)
                                boxGeneral.checked = false
                            }
                            
                            tr.style = ""
                            arrayIdContactos = arrayIdContactos.filter(function(i) { return i !== input.id })
                            document.getElementById("mostrador").innerHTML = `${arrayIdContactos.length} seleccionados`
                        }
                    })
    
                    
                    
    
    
                } else
    
                if (j == 2){
                    let td = document.createElement("td")
                    let p = document.createElement("p")
                    p.style = "color: #CCCCCC; margin: 0; height: 10px; width: 130px"
                    p.innerHTML = arrayContactos.contacto[i].Region.nombre
                    td.innerHTML = arrayContactos.contacto[i].Pai.nombre
                    td.appendChild(p)
                    tr.appendChild(td)
    
                }else
    
    
                if(j == 3){
                    
    
                    if(arrayContactos.contacto[i].CompaniumId == null ){
                        
                        let td = document.createElement("td")
                        td.innerHTML = "Compania removida"
                        td.style = "color: red"
                        tr.appendChild(td)
                    }
    
                    if(arrayContactos.contacto[i].CompaniumId != null){
                        let td = document.createElement("td")
                        td.innerHTML = arrayContactos.contacto[i].Companium.nombre
                        tr.appendChild(td)
                    }            
    
    
                }else
    
    
                if( j == 4){
    
                    let td = document.createElement("td")
                    td.innerHTML = array[j]
                    tr.appendChild(td)
    
                }else
                
                if(j == 5){
    
                    let td = document.createElement("td")
                    let progress = document.createElement("progress")
                    let p = document.createElement("p")
                    p.innerHTML = `${array[j]}%`
                    p.style = "display: inline"
                    progress.classList = "progressFront"
                    progress.max = "100"
                    progress.value = array[j]
    
                    td.appendChild(p)
                    td.appendChild(progress)
    
                    tr.appendChild(td)
    
                }else
            
    
                if(j = 6){
                    let td = document.createElement("td")
                    td.classList = "btnHover"
                    let iEliminar = document.createElement("i")
                    let iEditar = document.createElement("i")
                    let divP = document.createElement("div")
                    divP.classList = "divBtnHover"
                    let p = document.createElement("p")
                    p.innerHTML = "..."
    
                    iEliminar.classList = "far fa-trash-alt"
                    iEliminar.style = "display: none"
    
                    iEditar.classList = "far fa-edit"
                    iEditar.style = "display: none"
    
            
    
    
                    divP.appendChild(p)
                    divP.appendChild(iEliminar)
                    divP.appendChild(iEditar)
    
                    tr.addEventListener("mouseover", () => {
                        
                        p.style = "display: none"
                        iEliminar.style = "display: inline"
                        iEditar.style = "display: inline"
                    })
    
                    tr.addEventListener("mouseout", () => {
      
                        p.style = "display: inline"
                        iEliminar.style = "display: none"
                        iEditar.style = "display: none"
                    })
    
                    iEliminar.addEventListener("click", () => {
                        deleteContactos(arrayContactos.contacto[i].id)
                        location.href = "../html/index.html"
                    })
                    
                    iEditar.addEventListener("click", () => {
    
    
    
                        let cuentaInput = document.getElementById("cuenta")
    
                        agregarCanal.style = "background: #1D72C2; color: white"
    
                        cuentaInput.addEventListener("keyup",(e) => {
    
        
                            if(e.target.value.length > 0){       
       
                                btnCancelar.style = "display: none"
                                btnGuardar.style = "display: none"
                        
                            }
                        
                            if(e.target.value.length < 1){
    
                                btnCancelar.style ="display: none"
                                btnGuardar.style = "display: none"
                            }
                        
                          })
                       
                        fondoNegro.classList.toggle("noDisplay")
                        containerContacto.classList.toggle("noDisplay")
                        let titulo = document.getElementById("tituloContacto")
                        titulo.innerHTML = "Modificar contacto"    
    
                        // IMAGEN //
                        let preview = document.getElementById("preview")
                        preview.style = "border: none;"
                        let perfil = document.getElementById("perfil-2")
                        perfil.style = "display: none"
                        let img = document.createElement("img")
                        img.src = arrayContactos.contacto[i].img
                        img.id = "imgCargada"
                        preview.appendChild(img)
    
                        // DATOS PRINCIPALES //
    
                        let nombre = document.getElementById("nombre")
                        nombre.value = arrayContactos.contacto[i].nombre
    
                        let apellido = document.getElementById("apellido")
                        apellido.value = arrayContactos.contacto[i].apellido
    
                        let cargo = document.getElementById("cargoUsuario")
                        cargo.value = arrayContactos.contacto[i].cargo
    
                        let email = document.getElementById("email")
                        email.value = arrayContactos.contacto[i].email
    
         
                        if (arrayContactos.contacto[i].Companium != null){
                            let compania = document.getElementById("compania")
                            compania.value = arrayContactos.contacto[i].Companium.nombre
                        }
                        
    
                        // OTROS DATOS //
    
                        let region = document.getElementById("region")
                        region.value = arrayContactos.contacto[i].Region.nombre
    
                        let pais = document.getElementById("pais")
                        let optionPais = document.getElementById("optionPais")
                        pais.disabled = false
                        optionPais.selected = true
                        optionPais.disabled = false
                        optionPais.innerHTML = arrayContactos.contacto[i].Pai.nombre
    
                        let ciudad = document.getElementById("ciudad")
                        let optionCiudad = document.getElementById("optionCiudad")
                        ciudad.disabled = false
                        optionCiudad.selected = true
                        optionCiudad.disabled = false
                        optionCiudad.innerHTML = arrayContactos.contacto[i].Ciudad.nombre
    
                        let direccion = document.getElementById("direccion")
                        direccion.value = arrayContactos.contacto[i].direccion
    
                        let barraProgreso = document.getElementById("barraProgreso")
                        barraProgreso.value = arrayContactos.contacto[i].interes
    
                        let barraNumerica = document.getElementById("barraNumerica")
                        barraNumerica.value = `${arrayContactos.contacto[i].interes}%`
                        
                        let btnGuardar = document.getElementById("guardarContacto")
                        btnGuardar.style = "display: none"
    
                        let btnConfirmar = document.getElementById("confimarContacto")
                        btnConfirmar.style = "display: inline; background: #429c41; color: white"
    
                        btnCancelar.style = "display: none"
                        let btnEliminar = document.getElementById("eliminarContacto")
                        btnEliminar.style = "display: inline; color: #429c41"
    
                 
    
                        document.getElementById("agregarCanal").disabled = false
    
                        let divCanales = document.getElementById("canales")
                        let divCuentas = document.getElementById("cuentas")
                        let divPreferencias = document.getElementById("divPreferencias")
    
                        if (arrayDatosCanales[i].length == 1){
    
                            let optionCanal = document.getElementById("optionGeneralCanal")
                            optionCanal.innerHTML = arrayDatosCanales[i][0].canal
                            optionCanal.value = arrayDatosCanales[i][0].canal
    
    
                            let inputCuenta = document.getElementById("cuenta")
                            inputCuenta.disabled = false
                            inputCuenta.value = arrayDatosCanales[i][0].cuenta
    
                            let optionGeneralPreferencia = document.getElementById("optionGeneralPreferencia")
                            optionGeneralPreferencia.innerHTML = arrayDatosCanales[i][0].preferencias
                            optionGeneralPreferencia.value = arrayDatosCanales[i][0].preferencias
                            document.getElementById("preferencias").disabled = false
    
                        }
                        
                        if(arrayDatosCanales[i].length > 1){
    
                            for (let z = 1; z <  arrayDatosCanales[i].length; z++) {
    
                                //CANALES//
    
               
        
                                let optionCanal = document.getElementById("optionGeneralCanal")
                                optionCanal.innerHTML = arrayDatosCanales[i][0].canal
                                optionCanal.value = arrayDatosCanales[i][0].canal
        
          
                                let selectCanal = document.createElement("select")
                                selectCanal.classList = "listaCanal"
                                let option = document.createElement("option")
                                option.disabled = true
                                option.selected = true
                                option.innerHTML = arrayDatosCanales[i][z].canal
                                selectCanal.appendChild(option)
                                divCanales.appendChild(selectCanal)
        
        
                                let canales = ["LinkedIn", "Whatsapp", "GitHub", "Instagram"];
                                for (let c = 0; c < canales.length; c++) {
                                    let option = document.createElement("option")
                                    option.innerHTML = canales[c]
                                    selectCanal.appendChild(option)                            
                                }
        
        
                                //CUENTAS//
        
                                let inputCuenta = document.getElementById("cuenta")
                                inputCuenta.disabled = false
                                inputCuenta.value = arrayDatosCanales[i][0].cuenta
        
        
        
                                let input = document.createElement("input")
                                input.classList = "listaCuenta"
                                input.value = arrayDatosCanales[i][z].cuenta
                                divCuentas.appendChild(input)
        
        
                                //PREFERENCIAS//
        
        
                                let optionGeneralPreferencia = document.getElementById("optionGeneralPreferencia")
                                optionGeneralPreferencia.innerHTML = arrayDatosCanales[i][0].preferencias
                                optionGeneralPreferencia.value = arrayDatosCanales[i][0].preferencias
                                document.getElementById("preferencias").disabled = false
        
        
        
                                let selectPreferencias = document.createElement("select")
                                selectPreferencias.classList = "listaReferencias"
                                let optionPrefe = document.createElement("option")
                                optionPrefe.disabled = true
                                optionPrefe.selected = true
                                optionPrefe.innerHTML = arrayDatosCanales[i][z].preferencias
                                selectPreferencias.appendChild(optionPrefe)
                                divPreferencias.appendChild(selectPreferencias)
        
                                let preferencias = ["Sin preferencia", "Canal favorito", "No molestar"]
        
                                for (let p = 0; p < preferencias.length; p++) {
        
                                    let option = document.createElement("option")
                                    option.innerHTML = preferencias[p]
                                    selectPreferencias.appendChild(option)
                        
                                }
                       
                      
                            }
    
                        }
    
    
    
                        let listaCuenta = document.getElementsByClassName("listaCuenta")
                        let listaCanal = document.getElementsByClassName("listaCanal")
                        let listaReferencias = document.getElementsByClassName("listaReferencias")
    
    
                        btnConfirmar.addEventListener("click", () => {
    
                            datosContacto = []
        
                            for (let i = 0; i < listaCuenta.length; i++) {
                                
                                let objet = {
                                    canal: listaCanal[i].value,
                                    cuenta: listaCuenta[i].value,
                                    preferencias: listaReferencias[i].value
                    
                                }
                    
                                datosContacto.push(objet)   
                            }
    
                            putContactos(arrayContactos.contacto[i].id, imageCargada, nombre.value, apellido.value, cargo.value, email.value, datosContacto, idCompania, regionId, paisId, ciudadId, direccion.value, barraProgreso.value)
                        })
    
    
                        let eliminarEditando = document.getElementById("eliminarContacto")
                        eliminarEditando.addEventListener("click", () =>{
                            deleteContactos(arrayContactos.contacto[i].id)
                            location.href = "../html/index.html" 
    
                        })
                     
                    })
                
                    td.appendChild(divP)
                    tr.appendChild(td)
    
                }

                
            }

            tbody.appendChild(tr)


        }

        let nuevaCantidad = tbody.children.length


        let vueltas = nuevaCantidad - cantidadAnterior

        parseInt(vueltas)
        
        for (let i = 0; i <= vueltas; i++){

            if(i < vueltas){
                tbody.firstChild.remove()
            }
            if(i == vueltas && indicador == 0){
                indicador = 1

                tbody.firstChild.remove()

                
            }
            if(i == vueltas && indicador == 1){
                console.log("Acá no hace nada")
            }
            
        }



        
 

    })

    //// ORDENAR DE MANERA ASCENDENTO Y DESCENTENTE CON FLECHAS DE COMPANIA ////
    let ordenarCompania = document.getElementById("ordenarCompania")
    ordenarCompania.addEventListener("click", () => {

        
        let cantidadAnterior = tbody.children.length
        let validor;

        console.log(arrayContactos.contacto)

        arrayContactos.contacto.sort(function (a, b) {
            if (a.Companium.nombre > b.Companium.nombre) {
                validor = 1
                return 1;
            }
            if (a.Companium.nombre < b.Companium.nombre) {
                validor = -1
                return -1;
            }
            validor = 0
            return 0;
        })


        console.log(validor)

        if(validor == 1){

            arrayContactos.contacto.reverse(function (a, b) {
                if (a.Companium.nombre > b.Companium.nombre) {
                    validor = -1
                    return -1;
                }
                if (a.Companium.nombre < b.Companium.nombre) {
                    validor = 1
                    return 1;
                }
                validor = 0
                return 0;
            })

            

        };

 
        
        




        for (let i = 0; i < arrayContactos.contacto.length; i++) {
        
            iId = i
            array = []
            
    
    
    
            array = Object.values(arrayContactos.contacto[i])
    
            
            arrayDatosCanales.push(JSON.parse(arrayContactos.contacto[i].datosContacto)) 
            
            
    
            let tr = document.createElement("tr")
    
            for (let j = 1; j < 7; j++) {
                
    
                if(j == 1){
    
                    let tdCheck = document.createElement("td")
                    tdCheck.classList = "checkbox"
                    let input = document.createElement("input")
                    input.type = "checkbox"
                    input.id = array[8]
                    tdCheck.appendChild(input)
                    tr.appendChild(tdCheck)
    
    
                    let td = document.createElement ("td")
    
                    let divPerfil = document.createElement("div")
                    divPerfil.classList = "perfil"
    
                    let img = document.createElement("img")
                    img.classList = "foto"
                    img.src = arrayContactos.contacto[i].img
    
                    let divDatos = document.createElement("div")
                    divDatos.classList = "datos"
                    let h2 = document.createElement("h2")
                    let p = document.createElement("p")
    
                    h2.innerHTML =  `${arrayContactos.contacto[i].nombre} ${arrayContactos.contacto[i].apellido}`
                    p.innerHTML = `${arrayContactos.contacto[i].email}`
    
                    divDatos.appendChild(h2)
                    divDatos.appendChild(p)
                    
                    divPerfil.appendChild(img)
                    divPerfil.appendChild(divDatos)
    
                    td.appendChild(divPerfil)
                    tr.appendChild(td)
    
                    
    
                    input.addEventListener("click", (e) =>{
                        let valor = e.target.checked
                        if(valor == true){
    
                            tr.style = "background: rgb(213 235 255)"
                            btnAcionnes.removeAttribute("hidden")
                            document.getElementById("mostrador").removeAttribute("hidden")
    
                            arrayIdContactos.push(input.id)
                            
    
                            document.getElementById("mostrador").innerHTML = `${arrayIdContactos.length} seleccionados`
    
                        }
    
                        if(valor == false){
    
                            let contador = (arrayIdContactos.length-1)
                            if(contador < 1){
    
                                btnAcionnes.setAttribute("hidden", true)
                                document.getElementById("mostrador").setAttribute("hidden", true)
                                boxGeneral.checked = false
                            }
                            
                            tr.style = ""
                            arrayIdContactos = arrayIdContactos.filter(function(i) { return i !== input.id })
                            document.getElementById("mostrador").innerHTML = `${arrayIdContactos.length} seleccionados`
                        }
                    })
    
                    
                    
    
    
                } else
    
                if (j == 2){
                    let td = document.createElement("td")
                    let p = document.createElement("p")
                    p.style = "color: #CCCCCC; margin: 0; height: 10px; width: 130px"
                    p.innerHTML = arrayContactos.contacto[i].Region.nombre
                    td.innerHTML = arrayContactos.contacto[i].Pai.nombre
                    td.appendChild(p)
                    tr.appendChild(td)
    
                }else
    
    
                if(j == 3){
                    
    
                    if(arrayContactos.contacto[i].CompaniumId == null ){
                        
                        let td = document.createElement("td")
                        td.innerHTML = "Compania removida"
                        td.style = "color: red"
                        tr.appendChild(td)
                    }
    
                    if(arrayContactos.contacto[i].CompaniumId != null){
                        let td = document.createElement("td")
                        td.innerHTML = arrayContactos.contacto[i].Companium.nombre
                        tr.appendChild(td)
                    }            
    
    
                }else
    
    
                if( j == 4){
    
                    let td = document.createElement("td")
                    td.innerHTML = array[j]
                    tr.appendChild(td)
    
                }else
                
                if(j == 5){
    
                    let td = document.createElement("td")
                    let progress = document.createElement("progress")
                    let p = document.createElement("p")
                    p.innerHTML = `${array[j]}%`
                    p.style = "display: inline"
                    progress.classList = "progressFront"
                    progress.max = "100"
                    progress.value = array[j]
    
                    td.appendChild(p)
                    td.appendChild(progress)
    
                    tr.appendChild(td)
    
                }else
            
    
                if(j = 6){
                    let td = document.createElement("td")
                    td.classList = "btnHover"
                    let iEliminar = document.createElement("i")
                    let iEditar = document.createElement("i")
                    let divP = document.createElement("div")
                    divP.classList = "divBtnHover"
                    let p = document.createElement("p")
                    p.innerHTML = "..."
    
                    iEliminar.classList = "far fa-trash-alt"
                    iEliminar.style = "display: none"
    
                    iEditar.classList = "far fa-edit"
                    iEditar.style = "display: none"
    
            
    
    
                    divP.appendChild(p)
                    divP.appendChild(iEliminar)
                    divP.appendChild(iEditar)
    
                    tr.addEventListener("mouseover", () => {
                        
                        p.style = "display: none"
                        iEliminar.style = "display: inline"
                        iEditar.style = "display: inline"
                    })
    
                    tr.addEventListener("mouseout", () => {
      
                        p.style = "display: inline"
                        iEliminar.style = "display: none"
                        iEditar.style = "display: none"
                    })
    
                    iEliminar.addEventListener("click", () => {
                        deleteContactos(arrayContactos.contacto[i].id)
                        location.href = "../html/index.html"
                    })
                    
                    iEditar.addEventListener("click", () => {
    
    
    
                        let cuentaInput = document.getElementById("cuenta")
    
                        agregarCanal.style = "background: #1D72C2; color: white"
    
                        cuentaInput.addEventListener("keyup",(e) => {
    
        
                            if(e.target.value.length > 0){       
       
                                btnCancelar.style = "display: none"
                                btnGuardar.style = "display: none"
                        
                            }
                        
                            if(e.target.value.length < 1){
    
                                btnCancelar.style ="display: none"
                                btnGuardar.style = "display: none"
                            }
                        
                          })
                       
                        fondoNegro.classList.toggle("noDisplay")
                        containerContacto.classList.toggle("noDisplay")
                        let titulo = document.getElementById("tituloContacto")
                        titulo.innerHTML = "Modificar contacto"    
    
                        // IMAGEN //
                        let preview = document.getElementById("preview")
                        preview.style = "border: none;"
                        let perfil = document.getElementById("perfil-2")
                        perfil.style = "display: none"
                        let img = document.createElement("img")
                        img.src = arrayContactos.contacto[i].img
                        img.id = "imgCargada"
                        preview.appendChild(img)
    
                        // DATOS PRINCIPALES //
    
                        let nombre = document.getElementById("nombre")
                        nombre.value = arrayContactos.contacto[i].nombre
    
                        let apellido = document.getElementById("apellido")
                        apellido.value = arrayContactos.contacto[i].apellido
    
                        let cargo = document.getElementById("cargoUsuario")
                        cargo.value = arrayContactos.contacto[i].cargo
    
                        let email = document.getElementById("email")
                        email.value = arrayContactos.contacto[i].email
    
         
                        if (arrayContactos.contacto[i].Companium != null){
                            let compania = document.getElementById("compania")
                            compania.value = arrayContactos.contacto[i].Companium.nombre
                        }
                        
    
                        // OTROS DATOS //
    
                        let region = document.getElementById("region")
                        region.value = arrayContactos.contacto[i].Region.nombre
    
                        let pais = document.getElementById("pais")
                        let optionPais = document.getElementById("optionPais")
                        pais.disabled = false
                        optionPais.selected = true
                        optionPais.disabled = false
                        optionPais.innerHTML = arrayContactos.contacto[i].Pai.nombre
    
                        let ciudad = document.getElementById("ciudad")
                        let optionCiudad = document.getElementById("optionCiudad")
                        ciudad.disabled = false
                        optionCiudad.selected = true
                        optionCiudad.disabled = false
                        optionCiudad.innerHTML = arrayContactos.contacto[i].Ciudad.nombre
    
                        let direccion = document.getElementById("direccion")
                        direccion.value = arrayContactos.contacto[i].direccion
    
                        let barraProgreso = document.getElementById("barraProgreso")
                        barraProgreso.value = arrayContactos.contacto[i].interes
    
                        let barraNumerica = document.getElementById("barraNumerica")
                        barraNumerica.value = `${arrayContactos.contacto[i].interes}%`
                        
                        let btnGuardar = document.getElementById("guardarContacto")
                        btnGuardar.style = "display: none"
    
                        let btnConfirmar = document.getElementById("confimarContacto")
                        btnConfirmar.style = "display: inline; background: #429c41; color: white"
    
                        btnCancelar.style = "display: none"
                        let btnEliminar = document.getElementById("eliminarContacto")
                        btnEliminar.style = "display: inline; color: #429c41"
    
                 
    
                        document.getElementById("agregarCanal").disabled = false
    
                        let divCanales = document.getElementById("canales")
                        let divCuentas = document.getElementById("cuentas")
                        let divPreferencias = document.getElementById("divPreferencias")
    
                        if (arrayDatosCanales[i].length == 1){
    
                            let optionCanal = document.getElementById("optionGeneralCanal")
                            optionCanal.innerHTML = arrayDatosCanales[i][0].canal
                            optionCanal.value = arrayDatosCanales[i][0].canal
    
    
                            let inputCuenta = document.getElementById("cuenta")
                            inputCuenta.disabled = false
                            inputCuenta.value = arrayDatosCanales[i][0].cuenta
    
                            let optionGeneralPreferencia = document.getElementById("optionGeneralPreferencia")
                            optionGeneralPreferencia.innerHTML = arrayDatosCanales[i][0].preferencias
                            optionGeneralPreferencia.value = arrayDatosCanales[i][0].preferencias
                            document.getElementById("preferencias").disabled = false
    
                        }
                        
                        if(arrayDatosCanales[i].length > 1){
    
                            for (let z = 1; z <  arrayDatosCanales[i].length; z++) {
    
                                //CANALES//
    
               
        
                                let optionCanal = document.getElementById("optionGeneralCanal")
                                optionCanal.innerHTML = arrayDatosCanales[i][0].canal
                                optionCanal.value = arrayDatosCanales[i][0].canal
        
          
                                let selectCanal = document.createElement("select")
                                selectCanal.classList = "listaCanal"
                                let option = document.createElement("option")
                                option.disabled = true
                                option.selected = true
                                option.innerHTML = arrayDatosCanales[i][z].canal
                                selectCanal.appendChild(option)
                                divCanales.appendChild(selectCanal)
        
        
                                let canales = ["LinkedIn", "Whatsapp", "GitHub", "Instagram"];
                                for (let c = 0; c < canales.length; c++) {
                                    let option = document.createElement("option")
                                    option.innerHTML = canales[c]
                                    selectCanal.appendChild(option)                            
                                }
        
        
                                //CUENTAS//
        
                                let inputCuenta = document.getElementById("cuenta")
                                inputCuenta.disabled = false
                                inputCuenta.value = arrayDatosCanales[i][0].cuenta
        
        
        
                                let input = document.createElement("input")
                                input.classList = "listaCuenta"
                                input.value = arrayDatosCanales[i][z].cuenta
                                divCuentas.appendChild(input)
        
        
                                //PREFERENCIAS//
        
        
                                let optionGeneralPreferencia = document.getElementById("optionGeneralPreferencia")
                                optionGeneralPreferencia.innerHTML = arrayDatosCanales[i][0].preferencias
                                optionGeneralPreferencia.value = arrayDatosCanales[i][0].preferencias
                                document.getElementById("preferencias").disabled = false
        
        
        
                                let selectPreferencias = document.createElement("select")
                                selectPreferencias.classList = "listaReferencias"
                                let optionPrefe = document.createElement("option")
                                optionPrefe.disabled = true
                                optionPrefe.selected = true
                                optionPrefe.innerHTML = arrayDatosCanales[i][z].preferencias
                                selectPreferencias.appendChild(optionPrefe)
                                divPreferencias.appendChild(selectPreferencias)
        
                                let preferencias = ["Sin preferencia", "Canal favorito", "No molestar"]
        
                                for (let p = 0; p < preferencias.length; p++) {
        
                                    let option = document.createElement("option")
                                    option.innerHTML = preferencias[p]
                                    selectPreferencias.appendChild(option)
                        
                                }
                       
                      
                            }
    
                        }
    
    
    
                        let listaCuenta = document.getElementsByClassName("listaCuenta")
                        let listaCanal = document.getElementsByClassName("listaCanal")
                        let listaReferencias = document.getElementsByClassName("listaReferencias")
    
    
                        btnConfirmar.addEventListener("click", () => {
    
                            datosContacto = []
        
                            for (let i = 0; i < listaCuenta.length; i++) {
                                
                                let objet = {
                                    canal: listaCanal[i].value,
                                    cuenta: listaCuenta[i].value,
                                    preferencias: listaReferencias[i].value
                    
                                }
                    
                                datosContacto.push(objet)   
                            }
    
                            putContactos(arrayContactos.contacto[i].id, imageCargada, nombre.value, apellido.value, cargo.value, email.value, datosContacto, idCompania, regionId, paisId, ciudadId, direccion.value, barraProgreso.value)
                        })
    
    
                        let eliminarEditando = document.getElementById("eliminarContacto")
                        eliminarEditando.addEventListener("click", () =>{
                            deleteContactos(arrayContactos.contacto[i].id)
                            location.href = "../html/index.html" 
    
                        })
                     
                    })
                
                    td.appendChild(divP)
                    tr.appendChild(td)
    
                }

                
            }

            tbody.appendChild(tr)


        }

        let nuevaCantidad = tbody.children.length


        let vueltas = nuevaCantidad - cantidadAnterior

        parseInt(vueltas)
        
        for (let i = 0; i <= vueltas; i++){

            if(i < vueltas){
                tbody.firstChild.remove()
            }
            if(i == vueltas && indicador == 0){
                indicador = 1

                tbody.firstChild.remove()

                
            }
            if(i == vueltas && indicador == 1){
                console.log("Acá no hace nada")
            }
            
        }



        
 

    })

    //// ORDENAR DE MANERA ASCENDENTO Y DESCENTENTE CON FLECHAS DE COMPANIA ////
    let ordenarCargo = document.getElementById("ordenarCargo")
    ordenarCargo.addEventListener("click", () => {

        
        let cantidadAnterior = tbody.children.length
        let validor;

        console.log(arrayContactos.contacto)

        arrayContactos.contacto.sort(function (a, b) {
            if (a.cargo > b.cargo) {
                validor = 1
                return 1;
            }
            if (a.cargo < b.cargo) {
                validor = -1
                return -1;
            }
            validor = 0
            return 0;
        })


        console.log(validor)

        if(validor == 1){

            arrayContactos.contacto.reverse(function (a, b) {
                if (a.cargo > b.cargo) {
                    validor = -1
                    return -1;
                }
                if (a.cargo < b.cargo) {
                    validor = 1
                    return 1;
                }
                validor = 0
                return 0;
            })

            

        };

 
        
        




        for (let i = 0; i < arrayContactos.contacto.length; i++) {
        
            iId = i
            array = []
            
    
    
    
            array = Object.values(arrayContactos.contacto[i])
    
            
            arrayDatosCanales.push(JSON.parse(arrayContactos.contacto[i].datosContacto)) 
            
            
    
            let tr = document.createElement("tr")
    
            for (let j = 1; j < 7; j++) {
                
    
                if(j == 1){
    
                    let tdCheck = document.createElement("td")
                    tdCheck.classList = "checkbox"
                    let input = document.createElement("input")
                    input.type = "checkbox"
                    input.id = array[8]
                    tdCheck.appendChild(input)
                    tr.appendChild(tdCheck)
    
    
                    let td = document.createElement ("td")
    
                    let divPerfil = document.createElement("div")
                    divPerfil.classList = "perfil"
    
                    let img = document.createElement("img")
                    img.classList = "foto"
                    img.src = arrayContactos.contacto[i].img
    
                    let divDatos = document.createElement("div")
                    divDatos.classList = "datos"
                    let h2 = document.createElement("h2")
                    let p = document.createElement("p")
    
                    h2.innerHTML =  `${arrayContactos.contacto[i].nombre} ${arrayContactos.contacto[i].apellido}`
                    p.innerHTML = `${arrayContactos.contacto[i].email}`
    
                    divDatos.appendChild(h2)
                    divDatos.appendChild(p)
                    
                    divPerfil.appendChild(img)
                    divPerfil.appendChild(divDatos)
    
                    td.appendChild(divPerfil)
                    tr.appendChild(td)
    
                    
    
                    input.addEventListener("click", (e) =>{
                        let valor = e.target.checked
                        if(valor == true){
    
                            tr.style = "background: rgb(213 235 255)"
                            btnAcionnes.removeAttribute("hidden")
                            document.getElementById("mostrador").removeAttribute("hidden")
    
                            arrayIdContactos.push(input.id)
                            
    
                            document.getElementById("mostrador").innerHTML = `${arrayIdContactos.length} seleccionados`
    
                        }
    
                        if(valor == false){
    
                            let contador = (arrayIdContactos.length-1)
                            if(contador < 1){
    
                                btnAcionnes.setAttribute("hidden", true)
                                document.getElementById("mostrador").setAttribute("hidden", true)
                                boxGeneral.checked = false
                            }
                            
                            tr.style = ""
                            arrayIdContactos = arrayIdContactos.filter(function(i) { return i !== input.id })
                            document.getElementById("mostrador").innerHTML = `${arrayIdContactos.length} seleccionados`
                        }
                    })
    
                    
                    
    
    
                } else
    
                if (j == 2){
                    let td = document.createElement("td")
                    let p = document.createElement("p")
                    p.style = "color: #CCCCCC; margin: 0; height: 10px; width: 130px"
                    p.innerHTML = arrayContactos.contacto[i].Region.nombre
                    td.innerHTML = arrayContactos.contacto[i].Pai.nombre
                    td.appendChild(p)
                    tr.appendChild(td)
    
                }else
    
    
                if(j == 3){
                    
    
                    if(arrayContactos.contacto[i].CompaniumId == null ){
                        
                        let td = document.createElement("td")
                        td.innerHTML = "Compania removida"
                        td.style = "color: red"
                        tr.appendChild(td)
                    }
    
                    if(arrayContactos.contacto[i].CompaniumId != null){
                        let td = document.createElement("td")
                        td.innerHTML = arrayContactos.contacto[i].Companium.nombre
                        tr.appendChild(td)
                    }            
    
    
                }else
    
    
                if( j == 4){
    
                    let td = document.createElement("td")
                    td.innerHTML = array[j]
                    tr.appendChild(td)
    
                }else
                
                if(j == 5){
    
                    let td = document.createElement("td")
                    let progress = document.createElement("progress")
                    let p = document.createElement("p")
                    p.innerHTML = `${array[j]}%`
                    p.style = "display: inline"
                    progress.classList = "progressFront"
                    progress.max = "100"
                    progress.value = array[j]
    
                    td.appendChild(p)
                    td.appendChild(progress)
    
                    tr.appendChild(td)
    
                }else
            
    
                if(j = 6){
                    let td = document.createElement("td")
                    td.classList = "btnHover"
                    let iEliminar = document.createElement("i")
                    let iEditar = document.createElement("i")
                    let divP = document.createElement("div")
                    divP.classList = "divBtnHover"
                    let p = document.createElement("p")
                    p.innerHTML = "..."
    
                    iEliminar.classList = "far fa-trash-alt"
                    iEliminar.style = "display: none"
    
                    iEditar.classList = "far fa-edit"
                    iEditar.style = "display: none"
    
            
    
    
                    divP.appendChild(p)
                    divP.appendChild(iEliminar)
                    divP.appendChild(iEditar)
    
                    tr.addEventListener("mouseover", () => {
                        
                        p.style = "display: none"
                        iEliminar.style = "display: inline"
                        iEditar.style = "display: inline"
                    })
    
                    tr.addEventListener("mouseout", () => {
      
                        p.style = "display: inline"
                        iEliminar.style = "display: none"
                        iEditar.style = "display: none"
                    })
    
                    iEliminar.addEventListener("click", () => {
                        deleteContactos(arrayContactos.contacto[i].id)
                        location.href = "../html/index.html"
                    })
                    
                    iEditar.addEventListener("click", () => {
    
    
    
                        let cuentaInput = document.getElementById("cuenta")
    
                        agregarCanal.style = "background: #1D72C2; color: white"
    
                        cuentaInput.addEventListener("keyup",(e) => {
    
        
                            if(e.target.value.length > 0){       
       
                                btnCancelar.style = "display: none"
                                btnGuardar.style = "display: none"
                        
                            }
                        
                            if(e.target.value.length < 1){
    
                                btnCancelar.style ="display: none"
                                btnGuardar.style = "display: none"
                            }
                        
                          })
                       
                        fondoNegro.classList.toggle("noDisplay")
                        containerContacto.classList.toggle("noDisplay")
                        let titulo = document.getElementById("tituloContacto")
                        titulo.innerHTML = "Modificar contacto"    
    
                        // IMAGEN //
                        let preview = document.getElementById("preview")
                        preview.style = "border: none;"
                        let perfil = document.getElementById("perfil-2")
                        perfil.style = "display: none"
                        let img = document.createElement("img")
                        img.src = arrayContactos.contacto[i].img
                        img.id = "imgCargada"
                        preview.appendChild(img)
    
                        // DATOS PRINCIPALES //
    
                        let nombre = document.getElementById("nombre")
                        nombre.value = arrayContactos.contacto[i].nombre
    
                        let apellido = document.getElementById("apellido")
                        apellido.value = arrayContactos.contacto[i].apellido
    
                        let cargo = document.getElementById("cargoUsuario")
                        cargo.value = arrayContactos.contacto[i].cargo
    
                        let email = document.getElementById("email")
                        email.value = arrayContactos.contacto[i].email
    
         
                        if (arrayContactos.contacto[i].Companium != null){
                            let compania = document.getElementById("compania")
                            compania.value = arrayContactos.contacto[i].Companium.nombre
                        }
                        
    
                        // OTROS DATOS //
    
                        let region = document.getElementById("region")
                        region.value = arrayContactos.contacto[i].Region.nombre
    
                        let pais = document.getElementById("pais")
                        let optionPais = document.getElementById("optionPais")
                        pais.disabled = false
                        optionPais.selected = true
                        optionPais.disabled = false
                        optionPais.innerHTML = arrayContactos.contacto[i].Pai.nombre
    
                        let ciudad = document.getElementById("ciudad")
                        let optionCiudad = document.getElementById("optionCiudad")
                        ciudad.disabled = false
                        optionCiudad.selected = true
                        optionCiudad.disabled = false
                        optionCiudad.innerHTML = arrayContactos.contacto[i].Ciudad.nombre
    
                        let direccion = document.getElementById("direccion")
                        direccion.value = arrayContactos.contacto[i].direccion
    
                        let barraProgreso = document.getElementById("barraProgreso")
                        barraProgreso.value = arrayContactos.contacto[i].interes
    
                        let barraNumerica = document.getElementById("barraNumerica")
                        barraNumerica.value = `${arrayContactos.contacto[i].interes}%`
                        
                        let btnGuardar = document.getElementById("guardarContacto")
                        btnGuardar.style = "display: none"
    
                        let btnConfirmar = document.getElementById("confimarContacto")
                        btnConfirmar.style = "display: inline; background: #429c41; color: white"
    
                        btnCancelar.style = "display: none"
                        let btnEliminar = document.getElementById("eliminarContacto")
                        btnEliminar.style = "display: inline; color: #429c41"
    
                 
    
                        document.getElementById("agregarCanal").disabled = false
    
                        let divCanales = document.getElementById("canales")
                        let divCuentas = document.getElementById("cuentas")
                        let divPreferencias = document.getElementById("divPreferencias")
    
                        if (arrayDatosCanales[i].length == 1){
    
                            let optionCanal = document.getElementById("optionGeneralCanal")
                            optionCanal.innerHTML = arrayDatosCanales[i][0].canal
                            optionCanal.value = arrayDatosCanales[i][0].canal
    
    
                            let inputCuenta = document.getElementById("cuenta")
                            inputCuenta.disabled = false
                            inputCuenta.value = arrayDatosCanales[i][0].cuenta
    
                            let optionGeneralPreferencia = document.getElementById("optionGeneralPreferencia")
                            optionGeneralPreferencia.innerHTML = arrayDatosCanales[i][0].preferencias
                            optionGeneralPreferencia.value = arrayDatosCanales[i][0].preferencias
                            document.getElementById("preferencias").disabled = false
    
                        }
                        
                        if(arrayDatosCanales[i].length > 1){
    
                            for (let z = 1; z <  arrayDatosCanales[i].length; z++) {
    
                                //CANALES//
    
               
        
                                let optionCanal = document.getElementById("optionGeneralCanal")
                                optionCanal.innerHTML = arrayDatosCanales[i][0].canal
                                optionCanal.value = arrayDatosCanales[i][0].canal
        
          
                                let selectCanal = document.createElement("select")
                                selectCanal.classList = "listaCanal"
                                let option = document.createElement("option")
                                option.disabled = true
                                option.selected = true
                                option.innerHTML = arrayDatosCanales[i][z].canal
                                selectCanal.appendChild(option)
                                divCanales.appendChild(selectCanal)
        
        
                                let canales = ["LinkedIn", "Whatsapp", "GitHub", "Instagram"];
                                for (let c = 0; c < canales.length; c++) {
                                    let option = document.createElement("option")
                                    option.innerHTML = canales[c]
                                    selectCanal.appendChild(option)                            
                                }
        
        
                                //CUENTAS//
        
                                let inputCuenta = document.getElementById("cuenta")
                                inputCuenta.disabled = false
                                inputCuenta.value = arrayDatosCanales[i][0].cuenta
        
        
        
                                let input = document.createElement("input")
                                input.classList = "listaCuenta"
                                input.value = arrayDatosCanales[i][z].cuenta
                                divCuentas.appendChild(input)
        
        
                                //PREFERENCIAS//
        
        
                                let optionGeneralPreferencia = document.getElementById("optionGeneralPreferencia")
                                optionGeneralPreferencia.innerHTML = arrayDatosCanales[i][0].preferencias
                                optionGeneralPreferencia.value = arrayDatosCanales[i][0].preferencias
                                document.getElementById("preferencias").disabled = false
        
        
        
                                let selectPreferencias = document.createElement("select")
                                selectPreferencias.classList = "listaReferencias"
                                let optionPrefe = document.createElement("option")
                                optionPrefe.disabled = true
                                optionPrefe.selected = true
                                optionPrefe.innerHTML = arrayDatosCanales[i][z].preferencias
                                selectPreferencias.appendChild(optionPrefe)
                                divPreferencias.appendChild(selectPreferencias)
        
                                let preferencias = ["Sin preferencia", "Canal favorito", "No molestar"]
        
                                for (let p = 0; p < preferencias.length; p++) {
        
                                    let option = document.createElement("option")
                                    option.innerHTML = preferencias[p]
                                    selectPreferencias.appendChild(option)
                        
                                }
                       
                      
                            }
    
                        }
    
    
    
                        let listaCuenta = document.getElementsByClassName("listaCuenta")
                        let listaCanal = document.getElementsByClassName("listaCanal")
                        let listaReferencias = document.getElementsByClassName("listaReferencias")
    
    
                        btnConfirmar.addEventListener("click", () => {
    
                            datosContacto = []
        
                            for (let i = 0; i < listaCuenta.length; i++) {
                                
                                let objet = {
                                    canal: listaCanal[i].value,
                                    cuenta: listaCuenta[i].value,
                                    preferencias: listaReferencias[i].value
                    
                                }
                    
                                datosContacto.push(objet)   
                            }
    
                            putContactos(arrayContactos.contacto[i].id, imageCargada, nombre.value, apellido.value, cargo.value, email.value, datosContacto, idCompania, regionId, paisId, ciudadId, direccion.value, barraProgreso.value)
                        })
    
    
                        let eliminarEditando = document.getElementById("eliminarContacto")
                        eliminarEditando.addEventListener("click", () =>{
                            deleteContactos(arrayContactos.contacto[i].id)
                            location.href = "../html/index.html" 
    
                        })
                     
                    })
                
                    td.appendChild(divP)
                    tr.appendChild(td)
    
                }

                
            }

            tbody.appendChild(tr)


        }

        let nuevaCantidad = tbody.children.length


        let vueltas = nuevaCantidad - cantidadAnterior

        parseInt(vueltas)
        
        for (let i = 0; i <= vueltas; i++){

            if(i < vueltas){
                tbody.firstChild.remove()
            }
            if(i == vueltas && indicador == 0){
                indicador = 1

                tbody.firstChild.remove()

                
            }
            if(i == vueltas && indicador == 1){
                console.log("Acá no hace nada")
            }
            
        }



        
 

    })
    ////////////////////////////////////////////////////////////////////////////

    for (let i = 0; i < arrayContactos.contacto.length; i++) {
        
        iId = i
        array = []
        

        let arrayPrueba = Object.values(arrayContactos.contacto)

        array = Object.values(arrayContactos.contacto[i])

        
        arrayDatosCanales.push(JSON.parse(arrayContactos.contacto[i].datosContacto)) 
        
        

        let tr = document.createElement("tr")

        for (let j = 1; j < 7; j++) {
            

            if(j == 1){

                let tdCheck = document.createElement("td")
                tdCheck.classList = "checkbox"
                let input = document.createElement("input")
                input.type = "checkbox"
                input.id = array[8]
                tdCheck.appendChild(input)
                tr.appendChild(tdCheck)


                let td = document.createElement ("td")

                let divPerfil = document.createElement("div")
                divPerfil.classList = "perfil"

                let img = document.createElement("img")
                img.classList = "foto"
                img.src = arrayContactos.contacto[i].img

                let divDatos = document.createElement("div")
                divDatos.classList = "datos"
                let h2 = document.createElement("h2")
                let p = document.createElement("p")

                h2.innerHTML =  `${arrayContactos.contacto[i].nombre} ${arrayContactos.contacto[i].apellido}`
                p.innerHTML = `${arrayContactos.contacto[i].email}`

                divDatos.appendChild(h2)
                divDatos.appendChild(p)
                
                divPerfil.appendChild(img)
                divPerfil.appendChild(divDatos)

                td.appendChild(divPerfil)
                tr.appendChild(td)

                

                input.addEventListener("click", (e) =>{
                    let valor = e.target.checked
                    if(valor == true){

                        tr.style = "background: rgb(213 235 255)"
                        btnAcionnes.removeAttribute("hidden")
                        document.getElementById("mostrador").removeAttribute("hidden")

                        arrayIdContactos.push(input.id)
                        console.log(arrayIdContactos.length)

                        document.getElementById("mostrador").innerHTML = `${arrayIdContactos.length} seleccionados`

                    }

                    if(valor == false){

                        let contador = (arrayIdContactos.length-1)
                        if(contador < 1){

                            btnAcionnes.setAttribute("hidden", true)
                            document.getElementById("mostrador").setAttribute("hidden", true)
                            boxGeneral.checked = false
                        }
                        
                        tr.style = ""
                        arrayIdContactos = arrayIdContactos.filter(function(i) { return i !== input.id })
                        document.getElementById("mostrador").innerHTML = `${arrayIdContactos.length} seleccionados`
                    }
                })

                
                


            } else

            if (j == 2){
                let td = document.createElement("td")
                let p = document.createElement("p")
                p.style = "color: #CCCCCC; margin: 0; height: 10px; width: 130px"
                p.innerHTML = arrayContactos.contacto[i].Region.nombre
                td.innerHTML = arrayContactos.contacto[i].Pai.nombre
                td.appendChild(p)
                tr.appendChild(td)

            }else


            if(j == 3){
                

                if(arrayContactos.contacto[i].CompaniumId == null ){
                    
                    let td = document.createElement("td")
                    td.innerHTML = "Compania removida"
                    td.style = "color: red"
                    tr.appendChild(td)
                }

                if(arrayContactos.contacto[i].CompaniumId != null){
                    let td = document.createElement("td")
                    td.innerHTML = arrayContactos.contacto[i].Companium.nombre
                    tr.appendChild(td)
                }            


            }else


            if( j == 4){

                let td = document.createElement("td")
                td.innerHTML = array[j]
                tr.appendChild(td)

            }else
            
            if(j == 5){

                let td = document.createElement("td")
                let progress = document.createElement("progress")
                let p = document.createElement("p")
                p.innerHTML = `${array[j]}%`
                p.style = "display: inline"
                progress.classList = "progressFront"
                progress.max = "100"
                progress.value = array[j]

                td.appendChild(p)
                td.appendChild(progress)

                tr.appendChild(td)

            }else
        

            if(j = 6){
                let td = document.createElement("td")
                td.classList = "btnHover"
                let iEliminar = document.createElement("i")
                let iEditar = document.createElement("i")
                let divP = document.createElement("div")
                divP.classList = "divBtnHover"
                let p = document.createElement("p")
                p.innerHTML = "..."

                iEliminar.classList = "far fa-trash-alt"
                iEliminar.style = "display: none"

                iEditar.classList = "far fa-edit"
                iEditar.style = "display: none"

        


                divP.appendChild(p)
                divP.appendChild(iEliminar)
                divP.appendChild(iEditar)

                tr.addEventListener("mouseover", () => {
                    
                    p.style = "display: none"
                    iEliminar.style = "display: inline"
                    iEditar.style = "display: inline"
                })

                tr.addEventListener("mouseout", () => {
  
                    p.style = "display: inline"
                    iEliminar.style = "display: none"
                    iEditar.style = "display: none"
                })

                iEliminar.addEventListener("click", () => {
                    deleteContactos(arrayContactos.contacto[i].id)
                    location.href = "../html/index.html"
                })
                
                iEditar.addEventListener("click", () => {



                    let cuentaInput = document.getElementById("cuenta")

                    agregarCanal.style = "background: #1D72C2; color: white"

                    cuentaInput.addEventListener("keyup",(e) => {

    
                        if(e.target.value.length > 0){       
   
                            btnCancelar.style = "display: none"
                            btnGuardar.style = "display: none"
                    
                        }
                    
                        if(e.target.value.length < 1){

                            btnCancelar.style ="display: none"
                            btnGuardar.style = "display: none"
                        }
                    
                      })
                   
                    fondoNegro.classList.toggle("noDisplay")
                    containerContacto.classList.toggle("noDisplay")
                    let titulo = document.getElementById("tituloContacto")
                    titulo.innerHTML = "Modificar contacto"    

                    // IMAGEN //
                    let preview = document.getElementById("preview")
                    preview.style = "border: none;"
                    let perfil = document.getElementById("perfil-2")
                    perfil.style = "display: none"
                    let img = document.createElement("img")
                    img.src = arrayContactos.contacto[i].img
                    img.id = "imgCargada"
                    preview.appendChild(img)

                    // DATOS PRINCIPALES //

                    let nombre = document.getElementById("nombre")
                    nombre.value = arrayContactos.contacto[i].nombre

                    let apellido = document.getElementById("apellido")
                    apellido.value = arrayContactos.contacto[i].apellido

                    let cargo = document.getElementById("cargoUsuario")
                    cargo.value = arrayContactos.contacto[i].cargo

                    let email = document.getElementById("email")
                    email.value = arrayContactos.contacto[i].email

     
                    if (arrayContactos.contacto[i].Companium != null){
                        let compania = document.getElementById("compania")
                        compania.value = arrayContactos.contacto[i].Companium.nombre
                    }
                    

                    // OTROS DATOS //

                    let region = document.getElementById("region")
                    region.value = arrayContactos.contacto[i].Region.nombre

                    let pais = document.getElementById("pais")
                    let optionPais = document.getElementById("optionPais")
                    pais.disabled = false
                    optionPais.selected = true
                    optionPais.disabled = false
                    optionPais.innerHTML = arrayContactos.contacto[i].Pai.nombre

                    let ciudad = document.getElementById("ciudad")
                    let optionCiudad = document.getElementById("optionCiudad")
                    ciudad.disabled = false
                    optionCiudad.selected = true
                    optionCiudad.disabled = false
                    optionCiudad.innerHTML = arrayContactos.contacto[i].Ciudad.nombre

                    let direccion = document.getElementById("direccion")
                    direccion.value = arrayContactos.contacto[i].direccion

                    let barraProgreso = document.getElementById("barraProgreso")
                    barraProgreso.value = arrayContactos.contacto[i].interes

                    let barraNumerica = document.getElementById("barraNumerica")
                    barraNumerica.value = `${arrayContactos.contacto[i].interes}%`
                    
                    let btnGuardar = document.getElementById("guardarContacto")
                    btnGuardar.style = "display: none"

                    let btnConfirmar = document.getElementById("confimarContacto")
                    btnConfirmar.style = "display: inline; background: #429c41; color: white"

                    btnCancelar.style = "display: none"
                    let btnEliminar = document.getElementById("eliminarContacto")
                    btnEliminar.style = "display: inline; color: #429c41"

                    console.log("ACA", arrayDatosCanales[i])

                    document.getElementById("agregarCanal").disabled = false

                    let divCanales = document.getElementById("canales")
                    let divCuentas = document.getElementById("cuentas")
                    let divPreferencias = document.getElementById("divPreferencias")

                    if (arrayDatosCanales[i].length == 1){

                        let optionCanal = document.getElementById("optionGeneralCanal")
                        optionCanal.innerHTML = arrayDatosCanales[i][0].canal
                        optionCanal.value = arrayDatosCanales[i][0].canal


                        let inputCuenta = document.getElementById("cuenta")
                        inputCuenta.disabled = false
                        inputCuenta.value = arrayDatosCanales[i][0].cuenta

                        let optionGeneralPreferencia = document.getElementById("optionGeneralPreferencia")
                        optionGeneralPreferencia.innerHTML = arrayDatosCanales[i][0].preferencias
                        optionGeneralPreferencia.value = arrayDatosCanales[i][0].preferencias
                        document.getElementById("preferencias").disabled = false

                    }
                    
                    if(arrayDatosCanales[i].length > 1){

                        for (let z = 1; z <  arrayDatosCanales[i].length; z++) {

                            //CANALES//

           
    
                            let optionCanal = document.getElementById("optionGeneralCanal")
                            optionCanal.innerHTML = arrayDatosCanales[i][0].canal
                            optionCanal.value = arrayDatosCanales[i][0].canal
    
      
                            let selectCanal = document.createElement("select")
                            selectCanal.classList = "listaCanal"
                            let option = document.createElement("option")
                            option.disabled = true
                            option.selected = true
                            option.innerHTML = arrayDatosCanales[i][z].canal
                            selectCanal.appendChild(option)
                            divCanales.appendChild(selectCanal)
    
    
                            let canales = ["LinkedIn", "Whatsapp", "GitHub", "Instagram"];
                            for (let c = 0; c < canales.length; c++) {
                                let option = document.createElement("option")
                                option.innerHTML = canales[c]
                                selectCanal.appendChild(option)                            
                            }
    
    
                            //CUENTAS//
    
                            let inputCuenta = document.getElementById("cuenta")
                            inputCuenta.disabled = false
                            inputCuenta.value = arrayDatosCanales[i][0].cuenta
    
    
    
                            let input = document.createElement("input")
                            input.classList = "listaCuenta"
                            input.value = arrayDatosCanales[i][z].cuenta
                            divCuentas.appendChild(input)
    
    
                            //PREFERENCIAS//
    
    
                            let optionGeneralPreferencia = document.getElementById("optionGeneralPreferencia")
                            optionGeneralPreferencia.innerHTML = arrayDatosCanales[i][0].preferencias
                            optionGeneralPreferencia.value = arrayDatosCanales[i][0].preferencias
                            document.getElementById("preferencias").disabled = false
    
    
    
                            let selectPreferencias = document.createElement("select")
                            selectPreferencias.classList = "listaReferencias"
                            let optionPrefe = document.createElement("option")
                            optionPrefe.disabled = true
                            optionPrefe.selected = true
                            optionPrefe.innerHTML = arrayDatosCanales[i][z].preferencias
                            selectPreferencias.appendChild(optionPrefe)
                            divPreferencias.appendChild(selectPreferencias)
    
                            let preferencias = ["Sin preferencia", "Canal favorito", "No molestar"]
    
                            for (let p = 0; p < preferencias.length; p++) {
    
                                let option = document.createElement("option")
                                option.innerHTML = preferencias[p]
                                selectPreferencias.appendChild(option)
                    
                            }
                   
                  
                        }

                    }



                    let listaCuenta = document.getElementsByClassName("listaCuenta")
                    let listaCanal = document.getElementsByClassName("listaCanal")
                    let listaReferencias = document.getElementsByClassName("listaReferencias")


                    btnConfirmar.addEventListener("click", () => {

                        datosContacto = []
    
                        for (let i = 0; i < listaCuenta.length; i++) {
                            
                            let objet = {
                                canal: listaCanal[i].value,
                                cuenta: listaCuenta[i].value,
                                preferencias: listaReferencias[i].value
                
                            }
                
                            datosContacto.push(objet)   
                        }

                        putContactos(arrayContactos.contacto[i].id, imageCargada, nombre.value, apellido.value, cargo.value, email.value, datosContacto, idCompania, regionId, paisId, ciudadId, direccion.value, barraProgreso.value)
                    })


                    let eliminarEditando = document.getElementById("eliminarContacto")
                    eliminarEditando.addEventListener("click", () =>{
                        deleteContactos(arrayContactos.contacto[i].id)
                        location.href = "../html/index.html" 

                    })
                 
                })
            
                td.appendChild(divP)
                tr.appendChild(td)

            }      
        }
        
        tbody.appendChild(tr)

    }
    // }

    
   
    // console.log(arrayContactos.contacto)
    // console.log(JSON.parse(arrayContactos.contacto[0].datosContacto))

}

completar()





///////////////////////////////////////////////////////////////////////////////

//////////////////////// CARGAR DATOS DE REGIONES - SIRVE PARA CREAR CONTACTOS///////////////////////////


async function agregarRegion () {


    let selectRegion = document.getElementById("region");
    let selectPais = document.getElementById("pais")
    let selectCiudad = document.getElementById("ciudad")
    let direccion = document.getElementById("direccion")
    let canal = document.getElementById("canal")

    


    let ObjRegiones = await getRegiones()



    let arr = Object.values(ObjRegiones)
    let arrayRegiones = arr[1]
    let arrayCompanias = arr[0]

    console.log(arrayRegiones)
    console.log(arrayCompanias)

    let selecCompania = document.getElementById("compania")
    
    for (let i = 0; i < arrayCompanias.length; i++) {
        let option = document.createElement("option")
        option.innerHTML = arrayCompanias[i].nombre
        selecCompania.appendChild(option)

        selecCompania.addEventListener("click", (e) => {
            if(e.target.value == arrayCompanias[i].nombre){
                idCompania = arrayCompanias[i].id
                console.log(idCompania)
            }
            
        })
    }





  

  

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
            let optionPais = document.getElementById ("optionPais")
            optionPais.innerHTML = "Seleccionar pais"
            optionPais.disabled = true
            
            let optionCiudad = document.getElementById("optionCiudad")
            optionCiudad.innerHTML = "Seleccionar ciudad"
            optionCiudad.disabled = true

            if(selectPais.options.length >= 1){
                for (let i = selectPais.options.length; i >= 1; i--) {
                    selectPais.remove(i);
                }
            }

            if(selectCiudad.options.length >= 1){
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
  let cuenta = document.getElementById("cuenta")
  let agregarCanal = document.getElementById("agregarCanal")
  let divCanales = document.getElementById("canales")
  let divCuentas = document.getElementById("cuentas")
  let preferencias = document.getElementById("preferencias")
  let divPreferencias = document.getElementById("divPreferencias")
  let direccionPrueba = document.getElementById("direccion")


  canal.addEventListener("click", () => {
      if(canal.value != "todos"){
        cuenta.disabled = false
      }

      


  })


  cuenta.addEventListener("keyup",(e) => {
    let btnColor = document.getElementById("guardarContacto")
    if(e.target.value.length > 0){       

        preferencias.disabled = false
        btnColor.style = "background: #429c41;"
        btnCancelar.style = "color: #429c41"

    }

    if(e.target.value.length < 1){
        preferencias.disabled = true
        btnColor.style = "background: #CCCCCC"
        btnCancelar.style ="color: #CCCCCC"
    }

  })

  preferencias.addEventListener("click", (e)=>{
      if(e.target.value != ""){
          agregarCanal.disabled = false
          agregarCanal.style = "background: #1D72C2; color: white"
      }
  })
  
  agregarCanal.addEventListener("click", ()=>{

    let canales = ["LinkedIn", "Whatsapp", "GitHub", "Instagram"]
    let select = document.createElement("select")
    select.classList = "listaCanal"
    let input = document.createElement("input")
    input.classList = "listaCuenta"
    let selectPreferencias = document.createElement("select")
    selectPreferencias.classList = "listaReferencias"
    let preferencias = ["Sin preferencia", "Canal favorito", "No molestar"]


    for (let i = 0; i < canales.length; i++) { 
        let option = document.createElement("option")
        option.innerHTML = canales[i]
        option.id = i+1
        select.appendChild(option)
    }

    for (let i = 0; i < preferencias.length; i++) {
        
        let option = document.createElement("option")
        option.innerHTML = preferencias[i]
        option.id = i+1
        selectPreferencias.appendChild(option)

    }



    divCanales.appendChild(select)
    divCuentas.appendChild(input)
    divPreferencias.appendChild(selectPreferencias)

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

    let listaCuenta = document.getElementsByClassName("listaCuenta")
    let listaCanal = document.getElementsByClassName("listaCanal")
    let listaReferencias = document.getElementsByClassName("listaReferencias")

    let datosContacto;


    let agregar = document.getElementById("guardarContacto")
    agregar.addEventListener("click", () => {

        datosContacto = []
    
        for (let i = 0; i < listaCuenta.length; i++) {
            
            let objet = {
                canal: listaCanal[i].value,
                cuenta: listaCuenta[i].value,
                preferencias: listaReferencias[i].value

            }

            datosContacto.push(objet)   
        }

        postContacto(imageCargada, nombre.value, apellido.value, cargoUsuario.value, email.value, idCompania, regionId, paisId, ciudadId, datosContacto, barraProgreso.value, direccionPrueba.value)
        

    })


    
}

agregarRegion()


let boxGeneral = document.getElementById("boxGeneral")
let btnAcionnes = document.getElementById("btn-acciones")


boxGeneral.addEventListener("click", (e) => {

    let checks = document.getElementsByClassName("checkbox")
    console.log(arrayIdContactos)

    if(arrayIdContactos.length<1){
        btnAcionnes.toggleAttribute("hidden")
        document.getElementById("mostrador").toggleAttribute("hidden")
    }

    // if(arrayIdContactos.length = checks.length){
    //     boxGeneral.checked = true
    // }
    

    arrayIdContactos = []

    
    
    // console.log(checks[1].firstChild.id)

    
    if (e.target.checked == true){

        for (let i = 1; i < checks.length; i++) {
            
            arrayIdContactos.push(checks[i].firstChild.id)
            checks[i].firstChild.checked = true;
            checks[i].parentNode.style = "background: rgb(213, 235, 255)"
        }
        document.getElementById("mostrador").innerHTML = `${arrayIdContactos.length} seleccionados`
        console.log(arrayIdContactos)
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




/////////////////////////////////////// POST CONTACTOS ///////////////////////////////////////

let postContacto = async (img, nombre, apellido, cargo, email, idCompania, id_region, id_pais, id_ciudad, datosContacto, interes, direccion) => {

    var data = {
        img,
        nombre,
        apellido,
        cargo,
        email,
        idCompania,
        id_region,
        id_pais,
        id_ciudad,
        datosContacto: JSON.stringify(datosContacto),
        interes,
        direccion

    }

    let searchApi = await fetch (`http://localhost:3000/contactos`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    await searchApi.json()

    location.href = "../html/index.html" 

}

/////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////// DELETE CONTACTOS ///////////////////////////////////



let eliminarTodo = document.getElementById("eliminarTodo")

eliminarTodo.addEventListener("click", () => {

    for (let i = 0; i < arrayIdContactos.length; i++) {
        deleteContactos(arrayIdContactos[i])     
    }

    location.href = "../html/index.html" 

})


let deleteContactos = async (id) => {

    let searchApi = await fetch (`http://localhost:3000/contactos/${id}` , {
      method: 'DELETE'
    })
  
    await searchApi.json()
  
  }
  


/////////////////////////////////////////////////////////////////////////////////////////////


let imageCargada;

document.getElementById("inputCamara").onchange = function(e) {
    // Creamos el objeto de la clase FileReader
    let tamañoMax = 50000;
    let reader = new FileReader();
  
    // Leemos el archivo subido y se lo pasamos a nuestro fileReader
    reader.readAsDataURL(e.target.files[0]);
  
    // Le decimos que cuando este listo ejecute el código interno

    reader.onload = function(){
      let preview = document.getElementById('preview'),
              image = document.createElement('img');
        
      
      image.src = reader.result;
      image.id = "imgCargada"
      imageCargada = reader.result;

      if(image.src.length > 60000){
          alert("El tamaño de la imagen no debe superar los 60kB")
          
      }
      
      if(image.src.length <= 60000){
        preview.style = "border: none;"
        preview.innerHTML = '';
        preview.append(image);
      }

    };
}


let putContactos = async (id, img, nombre, apellido, cargo, email, datosContacto, CompaniumId, RegionId, PaiId, CiudadId, direccion, interes) => {

    var data = {
      img,
      nombre,
      apellido,
      cargo,
      email,
      datosContacto: JSON.stringify(datosContacto),
      CompaniumId,
      RegionId,
      PaiId,
      CiudadId,
      direccion,
      interes
    }
  
    let searchApi = await fetch (`http://localhost:3000/contactos/${id}` , {
      method: 'PUT',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json'
          }
    })
  
    await searchApi.json()

    location.href = "../html/index.html" 

  }
  


  