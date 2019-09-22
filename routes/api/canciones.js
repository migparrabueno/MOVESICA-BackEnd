let express = require('express');
let router = express.Router();
let cancionesModel = require('../../models/canciones')



//Gestionamos api/canciones GET
router.get('/', async(req,res)=>{
    try{
        let result = await cancionesModel.getAlll();
        res.json(result)
    }catch(err){
        res.json(err)
    }    
})

//Gestionamos api/canciones/:numPag
router.get('/page/:numPag', async(req,res)=>{
    try{
        let result = await cancionesModel.getAll(parseInt(req.params.numPag))
        res.json(result)
    }catch(err){
        console.log(err)
    }

})

//Gestionamos api/canciones/filter
router.post('/filter', async(req,res)=>{
    try{
        let result = await cancionesModel.getByFilter(req.body)
        res.json(result)
    }catch(err){
        console.log(err)
    }
})

//Gestionamos api/canciones/fav/:idUser
router.post('/fav/:idUser', async(req,res)=>{
    console.log(req.params.idUser,req.body.idCancion);
    try{
        let result = await cancionesModel.añadirFav(req.params.idUser,req.body.idCancion)
        res.json(result)
    }catch(err){
        console.log(err)
    }
})

//Gestionamos api/canciones/fav/:idUser
router.get('/fav/:idUser', async(req,res)=>{
    try{
        let result = await cancionesModel.getFavs(req.params.idUser)
        res.json(result)
    }catch(err){
        console.log(err)
    }

})

//Gestionamos api/canciones/fav/:idUser
router.post('/fav/del/:idUser', async(req,res)=>{
    console.log(req.params.idUser,req.body.idCancion);
    try{
        let result = await cancionesModel.delFav(req.params.idUser,req.body.idCancion)
        res.json(result)
    }catch(err){
        console.log(err)
    }
})





module.exports = router;