const express = require("express");
const cors = require("cors"); 
const helmet = require("helmet");
const app = express();
const db = require("./conexion.js")
const models = require("./models.js")
const usuariosController = require("./Controller/usuariosController")
const regionesController = require("./Controller/regionesController")
const companiasController = require("./Controller/companiasController")
const contactosController = require("./Controller/contactosController")



app.use(helmet());
app.use(express.json())
app.use(cors());
app.use("/usuarios", usuariosController);
app.use("/regiones", regionesController);
app.use("/compania", companiasController);
app.use("/contactos", contactosController);

db.init()
    .then(async () => {

        db.sequelize.sync({force: false}).then(()=>{
            console.log("Database Connected Succesfull…");
        }).catch(err=>{
            console.log(err);
        });

        console.log('Conectado a la Base de Datos');
        app.set("port", process.env.PORT || 3000);
        app.listen(app.get("port"), () => {
            console.log("Server on port", app.get("port"))
        })

    }).catch((err) => {
        console.log('Error al conectar a la db', err);
    });


models.region.hasMany(models.pais)
models.pais.belongsTo(models.region)

models.pais.hasMany(models.ciudad)
models.ciudad.belongsTo(models.pais)


models.ciudad.hasMany(models.compania)
models.compania.belongsTo(models.ciudad)

models.region.hasMany(models.contacto)
models.pais.hasMany(models.contacto)
models.ciudad.hasMany(models.contacto)

models.contacto.belongsTo(models.region)
models.contacto.belongsTo(models.pais)
models.contacto.belongsTo(models.ciudad)