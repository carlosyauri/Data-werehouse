const express = require("express");
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
        canal_contacto,
        cuenta_contacto
    }


    const pais = await models.pais.findAll({
        where: {RegionId: id_region}
    })

    if(pais.length > 0){

        const ciudad = await models.ciudad.findAll({
            where: {PaiId: id_pais}
        })
        
        if(ciudad.length>0){

            for(let i = 0; i < ciudad.length ; i++){
                console.log(ciudad[i].id)
                if (ciudad[i].id == id_ciudad){

                    const contacto = await models.contacto.create(nuevoContacto)

                    await models.contacto.update({RegionId: id_region},{
                        where: {RegionId: null}
                    })
                    await models.contacto.update({PaiId: id_pais},{
                        where: {PaiId: null}
                    })
                    await models.contacto.update({CiudadId: id_ciudad},{
                        where: {CiudadId: null}
                    })
                    
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


router.get("/", async(req, res) => {
    const contacto = await models.contacto.findAll({
        attributes:["nombre", "apellido", "cargo", "email", "compania", "canal_contacto", "cuenta_contacto"],
        include: [
            {
                model: models.region,
                required: true,
                attributes: ["nombre"]
            },
            {
                model: models.pais,
                required: true,
                attributes: ["nombre"]
            },{
                model: models.ciudad,
                required: true,
                attributes: ["nombre"]
            },
        ]
    })

    if(contacto.length>0) return res.status(200).json({exito: "Operacion exitosa", contacto});
    res.status(400).json({message: "No se encontraron contactos"})
})

router.put("/:id", async(req, res) => {
    const conctactoActualizado = await models.contacto.update(req.body,{
        where:{id: req.params.id}
    })

    if(conctactoActualizado) return res.status(200).json({exito: "Contaco actualizado con exito"});
    res.status(400).json({message: "No se pudo realizar la operacion"})
})

router.delete("/:id", async(req,res)=>{
    const contactoEliminado = await models.contacto.destroy({
        where: {id: req.params.id}
    })

    if(contactoEliminado) return res.status(200).json({exito: "Contacto eliminado con exito"});
    res.status(400).json({message: "No se pudo realizar la operacion"})
})


module.exports = router;