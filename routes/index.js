var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/prueba', (req,res)=>{
  db.get().query('select * from movesica.canciones', (err,rows)=>{
    if(err) return res.json({error:'no furula!!!'})
    res.json(rows)
  })
})

module.exports = router;
