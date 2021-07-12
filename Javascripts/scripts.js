// let filtro = document.getElementById("sector-15")
// let flecha = document.getElementById("arrow")

// flecha.addEventListener("click", () => {
//     filtro.classList.toggle("none")

//     })


// let inputBusqueda = document.getElementById("input")
// inputBusqueda.addEventListener("keyup", async(e) => {
//     if(e.target.value.length>0){
//         document.getElementById("sugerencias").style = "display: inline"

//         let info = await getContactSearch(e.target.value)
//         console.log(info)

        
//     }else{
//         document.getElementById("sugerencias").style = "display: none"
//     }
// })

// async function fetchApi(url, method){

   
//             const res = await fetch(url, {
//                 method: method,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });
//             const data = res.json();
//             if(data){
//                 return await data;
//             }
            

        

// }

// async function getContactSearch(nombre, cargo){

//     const searchedContacts = fetchApi(`http://localhost:3000/contactos/${nombre}/${cargo}`, 'GET')

//     return searchedContacts

// }