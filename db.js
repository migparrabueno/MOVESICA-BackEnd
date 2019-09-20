const mysql = require('mysql');

let pool = null;//desde fuera no se puede acceder a esta variable, solo si la retorno en alguna función de las que están exportadas.

const connect = (done) => {//cuando llame a connect le paso por parámetro una función que se va a ejecutar después de conectar con la base de datos
    pool = mysql.createPool({//pool nos va a permitir lanzar sentencias sql para no tener que hacer todo el rato lo de conectar a la base de datos y lanzar query.
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'movesica'
        //port: 3306 //para windows no hace falta, lo pongo por saberlo
    })
    done();
}

const get = () => {
    return pool;
}

//exporto las funciones connect y get para poder trabajar con ellas en otros ficheros
module.exports = {
    connect: connect,
    get: get
}