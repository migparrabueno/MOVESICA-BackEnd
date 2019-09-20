let express = require('express');
let router = express.Router();
//let apiCancionesRouter = require('./api/canciones')
let apiUsuariosRouter = require('./api/usuarios')
let apiCancionesRouter = require('./api/canciones')


router.use('/usuarios', apiUsuariosRouter)
router.use('/canciones', apiCancionesRouter);

module.exports = router;