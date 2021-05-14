const express = require("express");
const cors = require("cors"); 
const helmet = require("helmet");
const app = express();
const db = require("./conexion.js")
const models = require("./models.js")
const usuariosController = require("./Controller/usuariosController")
const regionesController = require("./Controller/regionesController")


app.use(helmet());
app.use(express.json())
app.use(cors());
app.use("/usuarios", usuariosController);
app.use("/regiones", regionesController)


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