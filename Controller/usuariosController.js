const express = require("express");
const models = require("../models")
const router = express.Router();
const {datosRecibidos} = require("../middlewares");
const { datosLogin } = require("../middlewares");
const { validacionJwt} = require("../middlewares");


router.post ("/usuariosIniciales", async(req,res) => {

    const usuarios = await models.usuario.findAll()

    if (usuarios.length > 0) {
        return res.send('Ya se crearon los usuarios iniciales, no puedo volver a realizar esta acción.')
    }

    const nuevoUsuario = [
        {           
            nombre: "Carlos",
            apellido: "Yauri",
            email: "carlos@gmail.com",
            usuario: "Carlitos",
            password: "Carlos123!",
            isadmin: false
        },
        {
            nombre: "Profe",
            apellido: "Acamica",
            email: "mentor@gmail.com",
            usuario: "Mentor",
            password: "Mentor123!",
            isadmin: true
        }
    ]

    nuevoUsuario.forEach(e => {
        models.usuario.create(e)
    });

    res.status(200).json({ 
        message: "Usuarios creados con exito", nuevoUsuario
    })

})


router.post ('/login', datosLogin, async(req, res)=>{

    res.status(200).json({

        exito:{
            token: req.token,
            nombre: req.email
        } 
    })

})


module.exports = router;