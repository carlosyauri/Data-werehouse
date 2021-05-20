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

class region extends Model {}
region.init({
         id : {
               type: DataTypes.INTEGER,
               autoIncrement: true,
               primaryKey: true
          },         
          nombre : DataTypes.STRING, 
}, {
    sequelize,
    modelName: "Region"
});

class pais extends Model {}
pais.init({
         id : {
               type: DataTypes.INTEGER,
               autoIncrement: true,
               primaryKey: true
          },         
          nombre : DataTypes.STRING,      
}, {
    sequelize,
    modelName: "Pais"
});

class ciudad extends Model {}
ciudad.init({
         id : {
               type: DataTypes.INTEGER,
               autoIncrement: true,
               primaryKey: true
          },         
          nombre : DataTypes.STRING, 
}, {
    sequelize,
    modelName: "Ciudad"
});

class compania extends Model {}
compania.init({
         id : {
               type: DataTypes.INTEGER,
               autoIncrement: true,
               primaryKey: true
          },         
          nombre : DataTypes.STRING, 
          direccion: DataTypes.STRING,
          email: DataTypes.STRING,
          telefono: DataTypes.STRING,
}, {
    sequelize,
    modelName: "Compania"
});


module.exports = {usuario, region, pais, ciudad, compania}