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
            nombre: "Sudamerica"
        },
        {
            nombre: "Norteameria"
        },
        {
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

    const regiones = await models.region.findAll();
    if(regiones.length > 0) return res.status(200).json({
            exito: "Operacion exitosa", regiones});
    res.status(400).json({
        message: "No se encontraron regiones"
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

router.get("/paises", async(req, res) => {

    const paises = await models.pais.findAll({
        attributes: ["id", "nombre"],
        include: [
            {
                model: models.region,
                required: true,
                attributes: ["nombre"]
            }
        ]

    });

    if(paises.length > 0) return res.status(200).json({exito: "Operacion exitosa", paises})
    return res.status(400).json({
        message: "No se encontraron paises"
    })

})
///////////////////////////////////////////////////////////////////


////////////////////////////// CIUDADES ///////////////////////////


///////////////////////////////////////////////////////////////////












module.exports = router;