const conexion = require("./conexion.js")
const sequelize = conexion.sequelize
const {Model, DataTypes} = require('sequelize');

sequelize.define()

class usuario extends Model {}
usuario.init({
         id : {
               type: DataTypes.INTEGER,
               autoIncrement: true,
               primaryKey: true
          },         
          nombre : DataTypes.STRING, 
          apellido: DataTypes.STRING, 
          email: DataTypes.STRING, 
          usuario: DataTypes.STRING,
          password: DataTypes.STRING,
          isadmin: DataTypes.BOOLEAN 

}, {
    sequelize,
    modelName: "Usuario"
});

module.exports = {usuario}