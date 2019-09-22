const mysql = require('mysql');

let pool = null;

const connect = (done) => {
    pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'movesica'
        //port: 3306 //para windows no hace falta
    })
    done();
}

const get = () => {
    return pool;
}

module.exports = {
    connect: connect,
    get: get
}