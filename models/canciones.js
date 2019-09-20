const db = require('../db')

//recuperar todas las canciones
const getAlll = ()=>{
    return new Promise((resolve,reject)=>{
        db.get().query('select * from movesica.canciones', (err,rows)=>{
            if(err) reject(err);
            resolve(rows); //para yo comprobar en el middleware***
        })
    })
}

//recuperar 10 canciones por página
const getAll = (numPag)=>{
    return new Promise((resolve,reject)=>{
        db.get().query('select * from movesica.canciones LIMIT ?, 10',[numPag*10], (err,rows)=>{
            if(err) reject(err);
            resolve(rows); //para yo comprobar en el middleware***
        })
    })
}

//Recuperar por filtro
const getByFilter = (values)=>{
    return new Promise((resolve,reject)=>{

        /* db.get().query('select * from movesica.canciones where (nombre = ? AND estilo = ? AND epoca= ? AND grupo = ?) OR (estilo = ? AND epoca= ? AND grupo = ?) OR (nombre = ? AND epoca= ? AND grupo = ?) OR(nombre = ? AND estilo = ? AND grupo = ?) OR (nombre = ? AND estilo = ? AND epoca = ?) OR (epoca = ? AND grupo = ?) OR  (nombre = ? AND estilo = ?) OR (estilo = ? AND grupo = ?) OR (estilo = ? AND epoca = ?) OR (nombre = ? AND grupo = ?) OR (nombre = ? AND epoca = ?) OR (nombre = ?) OR (estilo = ?) OR (epoca = ?) OR (grupo = ?)', [values.nombre, values.estilo, values.epoca, values.grupo], (err,rows)=>{
            if(err) reject(err);
            resolve(rows)
        })  */
        
        if(values.nombre && values.estilo && values.epoca && values.grupo){
            
            db.get().query('select * from movesica.canciones where nombre = ? AND estilo = ? AND epoca= ? AND grupo = ?',[values.nombre, values.estilo, values.epoca, values.grupo], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        }
        if(!values.nombre && values.estilo && values.epoca && values.grupo){
            
            db.get().query('select * from movesica.canciones where estilo = ? AND epoca= ? AND grupo = ?',[values.estilo, values.epoca, values.grupo], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        }
        if(values.nombre && !values.estilo && values.epoca && values.grupo){
            db.get().query('select * from movesica.canciones where nombre = ? AND epoca= ? AND grupo = ?',[values.nombre, values.epoca, values.grupo], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        }
        if(values.nombre && values.estilo && !values.epoca && values.grupo){
            db.get().query('select * from movesica.canciones where nombre = ? AND estilo = ? AND grupo = ?',[values.nombre, values.estilo, values.grupo], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        }
        if(values.nombre && values.estilo && values.epoca && !values.grupo){
            db.get().query('select * from movesica.canciones where nombre = ? AND estilo = ? AND epoca = ?',[values.nombre, values.estilo, values.epoca], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        }
        
        if(!values.nombre && !values.estilo && values.epoca && values.grupo){
            db.get().query('select * from movesica.canciones where epoca = ? AND grupo = ?',[values.epoca, values.grupo], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        }

        if(values.nombre && values.estilo && !values.epoca && !values.grupo){
            db.get().query('select * from movesica.canciones where nombre = ? AND estilo = ?',[values.nombre, values.estilo], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        }

        if(!values.nombre && values.estilo && !values.epoca && values.grupo){
            db.get().query('select * from movesica.canciones where estilo = ? AND grupo = ?',[values.estilo, values.grupo], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        }

        if(!values.nombre && values.estilo && values.epoca && !values.grupo){
            db.get().query('select * from movesica.canciones where estilo = ? AND epoca = ?',[values.estilo, values.epoca], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        }

        if(values.nombre && !values.estilo && !values.epoca && values.grupo){
            db.get().query('select * from movesica.canciones where nombre = ? AND grupo = ?',[values.nombre, values.grupo], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        }

        if(values.nombre && !values.estilo && values.epoca && !values.grupo){
            db.get().query('select * from movesica.canciones where nombre = ? AND epoca = ?',[values.nombre, values.epoca], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        }

        if(values.nombre && !values.estilo && !values.epoca && !values.grupo){
            db.get().query('select * from movesica.canciones where nombre = ?',[values.nombre], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        }

        if(!values.nombre && values.estilo && !values.epoca && !values.grupo){
            db.get().query('select * from movesica.canciones where estilo = ?',[values.estilo], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        }

        if(!values.nombre && !values.estilo && values.epoca && !values.grupo){
            db.get().query('select * from movesica.canciones where epoca = ?',[values.epoca], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        }

        if(!values.nombre && !values.estilo && !values.epoca && values.grupo){
            db.get().query('select * from movesica.canciones where grupo = ?',[values.grupo], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        }   
    })  
}

//Añadir a favoritos una canción
const añadirFav = (idUser, idCancion)=>{
    return new Promise((resolve,reject)=>{
        db.get().query('insert into movesica.tbi_usuarioscanciones (fk_usuario, fk_cancion) values (?,?)', [idUser, idCancion], (err,result)=>{
            if(err) reject(err);
            resolve(result)
        })
    })
}

//Borrar de favoritos una canción
const delFav = (idUser, idCancion)=>{
    return new Promise((resolve,reject)=>{
        db.get().query('DELETE FROM movesica.tbi_usuarioscanciones WHERE fk_usuario = ? AND fk_cancion=?', [idUser, idCancion], (err,result)=>{
            if(err) reject(err);
            resolve(result)
        })
    })
}

//Mostrar las canciones favoritas de un user
const getFavs = (idUser)=>{
    return new Promise((resolve,reject)=>{
        db.get().query('SELECT canciones.* FROM tbi_usuarioscanciones, canciones WHERE canciones.id = tbi_usuarioscanciones.fk_cancion AND tbi_usuarioscanciones.fk_usuario = 4',[idUser], (err,rows)=>        
        {
            if(err) reject(err);
            resolve(rows); //para yo comprobar en el middleware***
        })
    })
}


module.exports = {
    getAll: getAll,
    getAlll: getAlll,
    getByFilter: getByFilter,
    añadirFav: añadirFav,
    getFavs: getFavs,
    delFav: delFav
}