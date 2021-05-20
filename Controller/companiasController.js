const express = require("express");
const models = require("../models")
const router = express.Router();
const {datosCiudad} = require("../middlewares");



router.post("/", datosCiudad, async(req, res) => {


    const nuevaCompania = {
        nombre: req.datos.nombre,
        direccion: req.datos.direccion,
        email: req.datos.email,
        telefono: req.datos.telefono,
    }

    const ciudadExistente = await models.ciudad.findAll({
        where: {id: req.datos.id_ciudad}
    })

    if(ciudadExistente.length > 0){
        
        const compania = await models.compania.create(nuevaCompania);
        await models.compania.update({CiudadId: req.datos.id_ciudad},{
            where: {CiudadId: null}
        })    

        if(compania) return res.status(200).json({exito: "La compania fue creada exitosamente", compania});
    
    }
    else{
        return res.status(400).json({
            message: "El ID ingresado no pertenece a ninguna ciudad existente"
        })
    }
    
})

router.get("/", async(req, res) => {

    const companias = await models.compania.findAll({
        attributes: ["id", "nombre", "direccion", "email", "telefono"],
        include: [
            {
                model: models.ciudad,
                required: true,
                attributes: ["nombre"]
            }
        ]

    });

    if(companias.length > 0) return res.status(200).json({exito: "Operacion exitosa", companias})
    return res.status(400).json({
        message: "No se encontraron companias"
    })
})

router.put("/:id", async(req,res)=>{
    const actualizarCompania = await models.compania.update(req.body,{
        where: {id: req.params.id}
    });

    if(actualizarCompania == true) return res.status(200).json({exito: "Compania actualizada con exito"});
    res.status(400).json({
        message: `No se encontro compania con el ID: ${req.params.id}`
    })

})

router.delete("/:id", async(req,res)=>{
    const borrarCompania = await models.compania.destroy({
        where: {id: req.params.id}
    })

    if(borrarCompania){
        return res.status(200).json({ exito: `La compania con ID ${req.params.id}, fue eliminada con exito`})
    }
    else{
        res.status(400).json({
            message: `No se encontro compania con el ID: ${req.params.id}`
        })
    }
})

module.exports = router;