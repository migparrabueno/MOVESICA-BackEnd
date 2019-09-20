const jwt = require('jwt-simple');
const userModel = require('./models/usuarios')
const moment = require('moment');

//Vamos a pedir que el token se pase en la cabecera. Si el token no está en la cabecera: error. 
const checkUserAuthentication = async(req, res, next) =>{
    //Compruebo que existe la cabecera authentication donde va el token
    if(!req.headers['authentication']){ //si no existe token devolvemos error
        return res.json({error: 'No existe token.'})
    }

    let token = req.headers['authentication'];
    let payload = null;
    //compruebo si puedo decodificar el token
    try{
        //vamos a decodificar el token
        payload = jwt.decode(token, process.env.SECRET_KEY);
    console.log(payload); //Me devuelve los datos decodificados: id, fecha creación y expiración. Ahora podemos trabajar con esta info para seguir filtrando. 
    } catch{ //gestionamos el error
        return res.json({error: 'Existe un error con el token. No es codificable.'})
    }

    //Comprobamos si el id del usuario existe en mi base de datos
    let usuario = await userModel.getById(payload.userId)
    if(!usuario){
        return res.json({error: 'No existe el usuario en la base de datos'})
    }

    //Compruebo si la fecha de expiración está caducada
    if(payload.expiresAt < moment().unix()){
        return res.json({error:'Existe un error con el token. Está caducada la sesión.Hagalogin de nuevo'})
    } 
        
    next();
}

module.exports ={
    checkUserAuthentication: checkUserAuthentication
}