const express = require("express");
const models = require("../models")
const router = express.Router();


////////////////////////////// REGIONES ////////////////////////////////

router.post ("/regionesIniciales", async(req, res) => {
    const regiones = await models.region.findAll();
    if (regiones.length > 0) {
        return res.send("Ya se crearon regiones iniciales, no puede volver a realizar esta acción")
    }

    const nuevaRegion = [
        {
            id: 1,
            nombre: "Sudamerica"
        },
        {
            id: 2,
            nombre: "Norteameria"
        },
        {
            id:3,
            nombre: "Europa"
        }
    ]

    nuevaRegion.forEach(e =>{
        models.region.create(e)
    })

    res.status(200).json({
        exito: "Regiones creadas con exito", nuevaRegion
    })

})

router.post("/", async(req,res) => {

    const {nombre} = req.body
    const nuevaRegion = {
        nombre
    }

    const region = await models.region.create(nuevaRegion);
    if(region) return res.status(200).json({exito:"Region creada con exito", region});

    res.status(400).json({
        message: "No se pudo crear la region"
    })


})

router.get("/", async(req, res)=>{

    const regiones = await models.region.findAll({
        attributes: ["id", "nombre"],
        include: [
            {
                model: models.pais,
                required: false,
                attributes: ["id", "nombre"],
                include: [
                    {
                        model: models.ciudad,
                        required: false,
                        attributes: ["id", "nombre"]
                    }
                ]
            }

        ]
    });
    
    if(regiones.length >= 0) return res.status(200).json({
            exito: "Operacion exitosa", regiones});
    res.status(400).json({
        message: "No se encontraron regiones"
    })
    
})


router.put("/:id", async(req, res) => {

    const actualizarRegion = await models.region.update(req.body,{
        where: {id: req.params.id}
    });

    if(actualizarRegion == true) return res.status(200).json({exito: "Region actualizada con exito"});
    res.status(400).json({
        message: `No se encontro la region con el ID: ${req.params.id}`
    })

})

///////////////////////////////////////////////////////////////////

////////////////////////////// PAISES /////////////////////////////

router.post("/paises", async(req, res) =>{

    const {nombre, id_region} = req.body
    const nuevoPais = {
        nombre
    }

    const pais = await models.pais.create(nuevoPais);
    
    await models.pais.update({RegionId: id_region},{
        where: {RegionId: null}
    })

    if(pais) return res.status(200).json({exito: "Pais creado con exito", pais});

    res.status(400).json({
        message: "No se pudo crear el pais"
    })


})

router.post("/paisesIniciales", async(req, res) =>{


    const paises = await models.pais.findAll();
    if (paises.length > 0) {
        return res.send("Ya se crearon paises iniciales, no puede volver a realizar esta acción")
    }

    const nuevoPais = [
        {
            id: 1,
            nombre: "Argentina",
            RegionId: 1
        },
        {
            id: 2,
            nombre: "Brasil",
            RegionId: 1
        },
        {
            id: 3,
            nombre: "Chile",
            RegionId: 1
        },
        {
            id: 4,
            nombre: "Estados Unidos",
            RegionId: 2
        },
        {
            id: 5,
            nombre: "Canada",
            RegionId: 2
        }, 
        {
            id: 6,
            nombre: "Mexico",
            RegionId: 2
        },      
        {
            id: 7,
            nombre: "España",
            RegionId: 3
        },
        {
            id: 8,
            nombre: "Francia",
            RegionId: 3
        },
        {
            id: 9,
            nombre: "Alemania",
            RegionId: 3
        }
    ]

    nuevoPais.forEach(e =>{
        models.pais.create(e)
    })

    res.status(200).json({
        exito: "Paises creados con exito", nuevoPais
    })



})

router.get("/paises", async(req, res) => {

    const paises = await models.pais.findAll({
        attributes: ["id", "nombre"],
        include: [
            {
                model: models.ciudad,
                required: false,
                attributes: ["id", "nombre"]
            }
        ]

    });

    if(paises.length > 0) return res.status(200).json({exito: "Operacion exitosa", paises})
    return res.status(400).json({
        message: "No se encontraron paises"
    })

})




router.put("/paises/:id", async(req,res)=>{
    const actualizarPais = await models.pais.update(req.body,{
        where: {id: req.params.id}
    });

    if(actualizarPais == true) return res.status(200).json({exito: "Pais actualizado con exito"});
    res.status(400).json({
        message: `No se encontro pais con el ID: ${req.params.id}`
    })

})


router.delete("/paises/:id", async(req,res)=>{
    const borrarPais = await models.pais.destroy({
        where: {id: req.params.id}
    })

    if(borrarPais){
        await models.ciudad.destroy({where: {PaiId: null}})
        return res.status(200).json({ exito: `El pais con ID ${req.params.id}, fue eliminado con exito`})
    }
    else{
        res.status(400).json({
            message: `No se encontro pais con el ID: ${req.params.id}`
        })
    }
})


///////////////////////////////////////////////////////////////////


////////////////////////////// CIUDADES ///////////////////////////

router.post("/ciudades", async(req, res) =>{
    
    const {nombre, id_pais} = req.body
    const nuevaCiudad = {
        nombre
    }

    const ciudad = await models.ciudad.create(nuevaCiudad);
    
    await models.ciudad.update({PaiId: id_pais},{
        where: {PaiId: null}
    })

    if(ciudad) return res.status(200).json({exito: "Ciudad creada con exito", ciudad});

    res.status(400).json({
        message: "No se pudo crear la ciudad"
    })
})


router.post("/ciudadesIniciales", async(req, res) =>{
    const ciudades = await models.ciudad.findAll();
    if (ciudades.length > 0) {
        return res.send("Ya se crearon ciudades iniciales, no puede volver a realizar esta acción")
    }

    const nuevaCiudad = [
        {   
            id: 1,
            nombre: "Córdoba",
            PaiId: 1
        },
        {   
            id: 2,
            nombre: "Buenos aires",
            PaiId: 1
        },
        {   
            id: 3,
            nombre: "Puebla",
            PaiId: 6
        },
        {   
            id: 4,
            nombre: "Acapulco",
            PaiId: 6
        },
        {   
            id: 5,
            nombre: "Barcelona",
            PaiId: 7
        },      
        {   
            id: 6,
            nombre: "Madrid",
            PaiId: 7
        },
        {   
            id: 7,
            nombre: "Santiago de chile",
            PaiId: 3
        },
        {   
            id: 8,
            nombre: "Viña del mar",
            PaiId: 3
        },
        {   
            id: 9,
            nombre: "Brasilia",
            PaiId: 2
        },
        {   
            id: 10,
            nombre: "Rio de janeiro",
            PaiId: 2
        },
        {   
            id: 11,
            nombre: "Miami",
            PaiId: 4
        },
        {   
            id: 12,
            nombre: "Orlando",
            PaiId: 4
        },
        {   
            id: 13,
            nombre: "Toronto",
            PaiId: 5
        },
        {   
            id: 14,
            nombre: "Montreal",
            PaiId: 5
        },
        {   
            id: 15,
            nombre: "Paris",
            PaiId: 8
        },
        {   
            id: 16,
            nombre: "Marsella",
            PaiId: 8
        },
        {   
            id: 17,
            nombre: "Berlin",
            PaiId: 9
        },
        {   
            id: 18,
            nombre: "Múnich",
            PaiId: 9
        }
    ]

    nuevaCiudad.forEach(e =>{
        models.ciudad.create(e)
    })

    res.status(200).json({
        exito: "Ciudades creadas con exito", nuevaCiudad
    })

})



router.get("/ciudades", async (req, res )=>{
    const ciudades = await models.ciudad.findAll({
        attributes: ["id", "nombre"]
    });
    if(ciudades.length > 0) return res.status(200).json({exito: "Operacion exitosa", ciudades})
    return res.status(400).json({
        message: "No se encontraron ciudades"
    })
})

router.put("/ciudades/:id", async(req,res)=>{
    const actualizarCiudad = await models.ciudad.update(req.body,{
        where: {id: req.params.id}
    });

    if(actualizarCiudad == true) return res.status(200).json({exito: "Ciudad actualizada con exito"});
    res.status(400).json({
        message: `No se encontro ciudad con el ID: ${req.params.id}`
    })

})

router.delete("/ciudades/:id", async(req,res)=>{

    const borrarCiudad = await models.ciudad.destroy({
        where: {id: req.params.id}
    })

    if(borrarCiudad) return res.status(200).json({ exito: `La ciudad con id ${req.params.id}, fue eliminada con exito`});
    res.status(400).json({
            message: `No se encontro ciudad con el id: ${req.params.id}`
        })

})

///////////////////////////////////////////////////////////////////



module.exports = router;