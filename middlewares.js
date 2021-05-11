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


//////////// VALIDAMOS CLAVE PARA CREACION DE USUARIO /////////////

function validarClave(password) {
    if (password.length >= 8) {
        var mayuscula = false;
        var minuscula = false;
        var numero = false;
        var caracter_raro = false;

        for (var i = 0; i < password.length; i++) {
            if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
                mayuscula = true;
            }
            else if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
                minuscula = true;
            }
            else if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
                numero = true;
            }
            else {
                caracter_raro = true;
            }
        }
        if (mayuscula == true && minuscula == true && caracter_raro == true && numero == true) {
            return true;
        }
    }
    return false;
}

////////////VALIDAMOS EMAIL PARA LA CREACION DE USUARIO //////////////

function validarEmail(valor) {

    if (/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(valor)) {
        return true
    } else {
        return false
    }
}


////////////// VALIDACION DE DATOS RECIBIDOS PARA LA CREACION DE USUARIO /////////

const datosRecibidos = (req, res, next) => {
    const {nombre, apellido, email, usuario, password, isadmin } = req.body;
    if (!nombre || !apellido || !email || !usuario || !password || !isadmin) {
        return res.status(400).json({
            error: 'faltan campos'
        })
    }
    if (isNaN(nombre) == false) {
        return res.status(400).json({
            error: 'Nombre no valido'
        })
    }
    if (isNaN(apellido) == false) {
        return res.status(400).json({
            error: 'Nombre no valido'
        })
    }
    if (validarEmail(email) === false) {
        return res.status(400).json({
            error: 'Email incorrecto'
        })
    }
    if (validarClave(password) === false) {
        return res.status(400).json({
            error: 'Password incorrecto'
        })
    }

    next()
}

module.exports = { datosLogin, validacionJwt, validateUser, datosRecibidos, validarClave, validarEmail};

