const express = require("express");
const models = require("../models")
const router = express.Router();


router.post("/", async(req, res) => {

    const {nombre, apellido, cargo, email, compania, id_region, id_pais, id_ciudad, datosContacto} = req.body;
    const nuevoContacto = {
        nombre,
        apellido,
        cargo,
        email,
        compania,
        id_region,
        id_pais,
        id_ciudad,
        datosContacto
    }


    await models.contacto.create(nuevoContacto)



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