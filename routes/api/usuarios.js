let express = require('express');
let router = express.Router();
let usuariosModel = require('../../models/usuarios')
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const moment = require('moment');

//Gestionamos api/usuarios/registro POST
router.post('/registro', async(req,res)=>{
    req.body.password = bcrypt.hashSync(req.body.password,10)
    try{
        let result = await usuariosModel.insert(req.body);
        let usuario = await usuariosModel.getById(result.insertId);
        res.json(usuario)
    }catch(err){
        res.json(err)
    }
    
})

//LOGIN, api/usuario/login POST
router.post('/login', async(req,res)=>{
    let user = await usuariosModel.getByUsername(req.body.user_name)
    if (user == null) return res.json({error: 'usuario y/o constraseña incorrecta (1)' })
    let same = bcrypt.compareSync(req.body.password, user.password);
    if (!same) return res.json({error: 'Usuario y o ontraseña erroneos (2)'});
    
    res.json({token: createToken(user), user: user})
    //console.log({token: createToken(user), user: user})
})

//PROFILE, api/usuario/profile POST
router.post('/profile', async(req,res)=>{
    //Compruebo que existe la cabecera authentication donde va el token
    if(!req.headers['authentication']){ 
        console.log(req.headers)
        return res.json({error: 'No existe token. Haz login.'})
    }

    let token = req.headers['authentication'];
    let payload = null;
    try{
        //Decodificar el token
        payload = jwt.decode(token, process.env.SECRET_KEY);
    res.json(payload); //Devuelve datos decodificados: id, fecha creación y expiración.
    } catch{ 
        return res.json({error: 'Existe un error con el token. No es correcto.'})
    }
})

//Gestionamos la ruta api/estudiantes con un PUT. Esto es para editar un alumno.
router.put('/edit/:userId', (req,res)=>{
    usuariosModel.update(req.params.userId, req.body)
    .then((result)=>{
        res.json(result)
    })
    .catch((err)=>{
        res.json(err)
    })
})

//Gestionamos api/usuarios/registro POST
router.get('/:userId', async(req,res)=>{
    try{
        let usuario = await usuariosModel.getById(req.params.userId);
        res.json(usuario)
    }catch(err){
        res.json(err)
    }
    
})

//Creación token user
const createToken = (pUser)=>{
        const payload = {
        userId: pUser.id,
        createdAt: moment().unix(),
        expiresAt: moment().add(1440, 'minutes').unix() //1 día
    }
    //console.log(payload);
    //primer parámetro: lo que vamos a encriptar, segundo: clave para desencriptar. 
    return jwt.encode(payload, process.env.SECRET_KEY); //Devuelve un token.
}

module.exports = router;