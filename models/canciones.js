const db = require('../db')

//recuperar todas las canciones
const getAlll = ()=>{
    return new Promise((resolve,reject)=>{
        db.get().query('select * from movesica.canciones', (err,rows)=>{
            if(err) reject(err);
            resolve(rows);
        })
    })
}

//recuperar 10 canciones por página
const getAll = (numPag)=>{
    return new Promise((resolve,reject)=>{
        db.get().query('select * from movesica.canciones LIMIT ?, 10',[numPag*10], (err,rows)=>{
            if(err) reject(err);
            resolve(rows);
        })
    })
}

//Recuperar por filtro
const getByFilter = (values)=>{
    return new Promise((resolve,reject)=>{

        let keysFiltros=[]
        let valuesFiltros=[];
        let query ="select * from movesica.canciones where "
        for(let key in values){
            if(values[key]){
                valuesFiltros.push(values[key])
                keysFiltros.push(key + " = ?")
            }
        }
        query += keysFiltros.join(" AND ")
        db.get().query(query,valuesFiltros,(err,rows)=>{
            if(err)reject(err);
            resolve(rows);
        })
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
            resolve(rows);
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