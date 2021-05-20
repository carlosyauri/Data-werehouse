const express = require("express");
const { default: ModelManager } = require("sequelize/types/lib/model-manager");
const models = require("../models")
const router = express.Router();


router.post("/", async(req, res) => {

    const {nombre, apellido, cargo, email, compania, id_region, id_pais, id_ciudad, canal_contacto, cuenta_contacto} = req.body;
    const nuevoContacto = {
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

    const pais = await models.pais.findAll({
        where: {RegionId: id_region}
    })

    if(pais.length > 0){

        const ciudad = await models.ciudad.findAll({
            where:{PaiId: id_pais}
        })
        
        if(ciudad.length >0){

            for(let i = 1; i < ciudad.length ; i++){
                
                if (ciudad[i].id == id_ciudad){
                    const contacto = await models.contacto.create(nuevoContacto)
                    if(contacto) {
                        return res.status(200).json({exito: "El contacto fue creado exitosamente", contacto})
                    }             
                }
            }

            return res.status(400).json({message: "La id de la ciudad ingresada no existe en el pais ingresado"})
            
        }
        else{
            return res.status(400).json({message: "No se encontro ninguna ciudad con el id de pais ingresado"}) 
        }
    }
    else{
        return res.status(400).json({message: "No se encontro ningun pais con el id de la region ingresada"})
    }

})




module.exports = router;