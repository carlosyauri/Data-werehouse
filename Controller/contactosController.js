const express = require("express");
const models = require("../models")
const router = express.Router();

router.post("/contactosIniciales", async(req,res) => {

    const contactos = await models.contacto.findAll();
    if (contactos.length > 0) {
        return res.send("Ya se crearon contactos iniciales, no puede volver a realizar esta acción")
    }

    const nuevoContacto = [
        {
            img: "../assets/perfil-1.jpg",
            nombre: "Juan",
            apellido: "Cruz",
            cargo: "CEO",
            email: "juancruz@gmail.com",
            datosContacto: `[{"canal":"LinkedIn","cuenta":"juanperezDeveloper","preferencias":"Sin preferencia"},{"canal":"Whatsapp","cuenta":"0303456","preferencias":"Canal favorito"}]`,
            interes: 50,
            RegionId: 1,
            PaiId: 1,
            CiudadId: 1,
            CompaniumId: 1
        },
        {
            img: "../assets/perfil-2.jpg",
            nombre: "Joshua",
            apellido: "Jmenilsky",
            cargo: "Encargado de limpieza",
            email: "joshua@gmail.com",
            datosContacto: `[{"canal":"LinkedIn","cuenta":"joshuaSJ","preferencias":"Canal favorito"},{"canal":"Whatsapp","cuenta":"123456789","preferencias":"Sin preferencia"}]`,
            interes: 25,
            RegionId: 2,
            PaiId: 4,
            CiudadId: 11,
            CompaniumId: 2
        },        {
            img: "../assets/perfil-3.jpg",
            nombre: "Franco",
            apellido: "Lopez",
            cargo: "Piletero",
            email: "francolopez@gmail.com",
            datosContacto: `[{"canal":"Instagram","cuenta":"tuPileteroFranco","preferencias":"Canal favorito"},{"canal":"Whatsapp","cuenta":"157189456","preferencias":"Sin preferencia"}]`,
            interes: 100,
            RegionId: 3,
            PaiId: 7,
            CiudadId: 6,
            CompaniumId: 3
        },        {
            img: "../assets/perfil-4.jpg",
            nombre: "Fabri",
            apellido: "ruffini",
            cargo: "Cerrero",
            email: "fabriRuffini@gmail.com",
            datosContacto: `[{"canal":"LinkedIn","cuenta":"FabriRuffini","preferencias":"Sin preferencia"},{"canal":"Whatsapp","cuenta":"000111333","preferencias":"Canal favorito"}]`,
            interes: 75,
            RegionId: 1,
            PaiId: 2,
            CiudadId: 10,
            CompaniumId: 4
        },
    ]

    nuevoContacto.forEach(e =>{
        models.contacto.create(e)
    })

    res.status(200).json({
        exito: "Contactos creados con exito", nuevoContacto
    })


})
router.post("/", async(req, res) => {

    const {img, nombre, apellido, cargo, email, idCompania, id_region, id_pais, id_ciudad, datosContacto, interes, direccion} = req.body;
    const nuevoContacto = {
        img,
        nombre,
        apellido,
        cargo,
        email,
        datosContacto,
        interes,
        direccion
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
                    await models.contacto.update({CompaniumId: idCompania},{
                        where: {CompaniumId: null}
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
        attributes:["nombre", "apellido", "email", "CompaniumId", "cargo", "interes", "datosContacto", "img", "id", "direccion"],
        include: [
            {
                model: models.region,
                attributes: ["nombre"]
            },
            {
                model: models.pais,
                attributes: ["nombre"]
            },
            {
                model: models.ciudad,
                attributes: ["nombre"]
            },
            {
                model: models.compania,
                attributes:["nombre"]
            }
        ]
    })

    if(contacto.length>0) return res.status(200).json({exito: "Operacion exitosa", contacto});
    res.status(400).json({message: "No se encontraron contactos"})

    
})

router.get("/:busqueda", async (req, res)=>{

    const contactos = await models.contacto.findAll({
        include: [
            {
                model: models.region,
                attributes: ["nombre"],
            },
            {
                model: models.pais,
                attributes: ["nombre"],
            },
            {
                model: models.ciudad,
                attributes: ["nombre"]
            },
            {
                model: models.compania,
                attributes:["nombre"],
            }
        ],

        where:{nombre: req.params.busqueda},
        attributes:["nombre", "apellido", "email", "CompaniumId", "cargo", "interes", "datosContacto", "img", "id", "direccion"],
    });


    if(contactos.length>0) {
        return res.status(200).json(contactos);
    }else{
        
        const contactos = await models.contacto.findAll({
            attributes:["nombre", "apellido", "email", "CompaniumId", "cargo", "interes", "datosContacto", "img", "id", "direccion"],
            include: [
                {
                    model: models.region,
                    attributes: ["nombre"],                       
                    where:{nombre: req.params.busqueda},
                },
                {
                    model: models.pais,
                    attributes: ["nombre"],
                },
                {
                    model: models.ciudad,
                    attributes: ["nombre"]
                },
                {
                    model: models.compania,
                    attributes:["nombre"],
                }
            ],

        });

        if(contactos.length>0) {
            return res.status(200).json(contactos);
        }else{

            const contactos = await models.contacto.findAll({
                attributes:["nombre", "apellido", "email", "CompaniumId", "cargo", "interes", "datosContacto", "img", "id", "direccion"],
                include: [
                    {
                        model: models.region,
                        attributes: ["nombre"],                       
                        
                    },
                    {
                        model: models.pais,
                        attributes: ["nombre"],
                        where:{nombre: req.params.busqueda},
                    },
                    {
                        model: models.ciudad,
                        attributes: ["nombre"]
                    },
                    {
                        model: models.compania,
                        attributes:["nombre"],
                    }
                ],
    
            });

            if(contactos.length>0) {
                return res.status(200).json(contactos);
            }else{
                const contactos = await models.contacto.findAll({
                    attributes:["nombre", "apellido", "email", "CompaniumId", "cargo", "interes", "datosContacto", "img", "id", "direccion"],
                    include: [
                        {
                            model: models.region,
                            attributes: ["nombre"],                       
                            
                        },
                        {
                            model: models.pais,
                            attributes: ["nombre"],
                            
                        },
                        {
                            model: models.ciudad,
                            attributes: ["nombre"],
                            where:{nombre: req.params.busqueda},
                        },
                        {
                            model: models.compania,
                            attributes:["nombre"],
                        }
                    ],
        
                });

                if(contactos.length>0) {
                    return res.status(200).json(contactos);
                }else{
                    const contactos = await models.contacto.findAll({
                        attributes:["nombre", "apellido", "email", "CompaniumId", "cargo", "interes", "datosContacto", "img", "id", "direccion"],
                        include: [
                            {
                                model: models.region,
                                attributes: ["nombre"],                       
                                
                            },
                            {
                                model: models.pais,
                                attributes: ["nombre"],
                                
                            },
                            {
                                model: models.ciudad,
                                attributes: ["nombre"]
                            },
                            {
                                model: models.compania,
                                attributes:["nombre"],
                                where:{nombre: req.params.busqueda},
                            }
                        ],
            
                    });

                    if(contactos.length>0) {
                        return res.status(200).json(contactos);
                    }else{

                        const contactos = await models.contacto.findAll({
                            attributes:["nombre", "apellido", "email", "CompaniumId", "cargo", "interes", "datosContacto", "img", "id", "direccion"],
                            include: [
                                {
                                    model: models.region,
                                    attributes: ["nombre"],
                                },
                                {
                                    model: models.pais,
                                    attributes: ["nombre"],
                                },
                                {
                                    model: models.ciudad,
                                    attributes: ["nombre"]
                                },
                                {
                                    model: models.compania,
                                    attributes:["nombre"],
                                }
                            ],
                    
                            where:{cargo: req.params.busqueda},
                        });
                        if(contactos.length>0) {
                            return res.status(200).json(contactos);
                        }else{

                            const contactos = await models.contacto.findAll({
                                attributes:["nombre", "apellido", "email", "CompaniumId", "cargo", "interes", "datosContacto", "img", "id", "direccion"],
                                include: [
                                    {
                                        model: models.region,
                                        attributes: ["nombre"],
                                    },
                                    {
                                        model: models.pais,
                                        attributes: ["nombre"],
                                    },
                                    {
                                        model: models.ciudad,
                                        attributes: ["nombre"]
                                    },
                                    {
                                        model: models.compania,
                                        attributes:["nombre"],
                                    }
                                ],
                        
                                where:{email: req.params.busqueda},
                            });
                            if(contactos.length>0) {
                                return res.status(200).json(contactos);
                            }else{
                                
                                const contactos = await models.contacto.findAll({
                                    attributes:["nombre", "apellido", "email", "CompaniumId", "cargo", "interes", "datosContacto", "img", "id", "direccion"],
                                    include: [
                                        {
                                            model: models.region,
                                            attributes: ["nombre"],
                                        },
                                        {
                                            model: models.pais,
                                            attributes: ["nombre"],
                                        },
                                        {
                                            model: models.ciudad,
                                            attributes: ["nombre"]
                                        },
                                        {
                                            model: models.compania,
                                            attributes:["nombre"],
                                        }
                                    ],
                            
                                    where:{direccion: req.params.busqueda},
                                });
                                if(contactos.length>0) {
                                    return res.status(200).json(contactos);
                                }else{

                                    const contactos = await models.contacto.findAll({
                                        attributes:["nombre", "apellido", "email", "CompaniumId", "cargo", "interes", "datosContacto", "img", "id", "direccion"],
                                        include: [
                                            {
                                                model: models.region,
                                                attributes: ["nombre"],
                                            },
                                            {
                                                model: models.pais,
                                                attributes: ["nombre"],
                                            },
                                            {
                                                model: models.ciudad,
                                                attributes: ["nombre"]
                                            },
                                            {
                                                model: models.compania,
                                                attributes:["nombre"],
                                            }
                                        ],
                                
                                        where:{interes: req.params.busqueda},
                                    });
                                    if(contactos.length>0) {
                                        return res.status(200).json(contactos);
                                    }else{
                                        const contactos = await models.contacto.findAll({
                                            attributes:["nombre", "apellido", "email", "CompaniumId", "cargo", "interes", "datosContacto", "img", "id", "direccion"],
                                            include: [
                                                {
                                                    model: models.region,
                                                    attributes: ["nombre"],
                                                },
                                                {
                                                    model: models.pais,
                                                    attributes: ["nombre"],
                                                },
                                                {
                                                    model: models.ciudad,
                                                    attributes: ["nombre"]
                                                },
                                                {
                                                    model: models.compania,
                                                    attributes:["nombre"],
                                                }
                                            ],
                                    
                                            where:{apellido: req.params.busqueda},
                                        });
                                        if(contactos.length>0) {
                                            return res.status(200).json(contactos);
                                        }else{
                                            return res.status(400).json({message: 'No se encontraron contactos'})
                                        }
                                    }                                  
                                }
                            }
                        }
                    }
                }
            }   
        }
    }

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