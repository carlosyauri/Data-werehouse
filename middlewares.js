require("dotenv").config();
const jwt = require("jsonwebtoken");
const models = require("./models.js");
const db = require("./conexion.js")

var jwtClave = process.env.JWT_PASSWORD;
var codigoToken; 


////////////////// VALIDACION DE TOKEN POR POSTMAN ///////////////////

const validacionJwt = (req, res, next) => {
    const codigoToken = req.headers.authorization.split(' ')[1];
    jwt.verify( codigoToken, jwtClave, (err, decoded) => {
        if (err) { 
            res.send('No está autorizado');
        }
        req.user = decoded;
        next()
    });
}


///////////////// VALIDACION LOGIN /////////////////////

const datosLogin = async (req, res, next) => {

    const {email, password } = req.body

    if (!email || !password) {
        res.status(400).json({
            error: 'faltan campos'
        })
    }

    let access = await validateUser(email, password)

    if (access) {
        req.token = access.codigoToken
        req.email = access.email
        next();
    }
    
    else {
        res.status(401).json({       
            error: "email o password invalidas"          
        })
    }
}


//////////////// VALIDAMOS USUARIO ///////////////////

const validateUser = async (email, password) => {

    const userSelected = await models.usuario.findOne({
        where : {email: email}

    })

    if (userSelected) {
        if (userSelected.password == password.trim()) {
            codigoToken = tokenGenerado(userSelected.nombre, userSelected.isadmin)
            const email = {nombre: userSelected.nombre, isadmin: userSelected.isadmin}
            return {codigoToken, email};

        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}



//////////////// GENERAMOS TOKEN /////////////////////

function tokenGenerado(nombre, isadmin) {

    const payload = {
        user: nombre,
        admin: isadmin
    } 
    
    var token = jwt.sign(payload, jwtClave);
 
    //envio Token
    return token
}


module.exports = { datosLogin, validacionJwt, validateUser};