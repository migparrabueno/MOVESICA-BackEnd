const db = require('../db')

//para insertar un nuevo usuario
const insert = ({user_name,email,password, edad, codigo_postal}) =>{
    return new Promise((resolve,reject)=>{
        db.get().query('insert into movesica.usuarios (user_name, email, password, edad, codigo_postal) values (?,?,?, ?, ?)', [user_name, email, password, edad, codigo_postal], (err,result)=>{
            if(err) reject(err);
            resolve(result)
        })
    })
}

//recuperar usuario por id
const getById = (pId)=>{
    return new Promise((resolve,reject)=>{
        db.get().query('select * from movesica.usuarios where id = ?', [pId], (err,rows)=>{
            if(err) reject(err);
            rows.length ==1 ? resolve(rows[0]) : resolve(null) //para yo comprobar en el middleware***
        })
    })
}

//recuperar el usuario por username
const getByUsername = (pUsername) =>{
    return new Promise((resolve,reject)=>{
        db.get().query('select * from movesica.usuarios where user_name = ?', [pUsername], (err, rows)=>{
            if(err) reject(err);
            if(rows.length !=1) resolve(null)
            resolve(rows[0])
        })
    })
}

//Editar datos de usuario
const update = (pId,{user_name, nombre, apellidos, email, edad, codigo_postal, foto_perfil})=>{
    return new Promise((resolve,reject)=>{
        db.get().query('update usuarios set user_name = ?, nombre = ?, apellidos = ?, email = ?, edad = ?, codigo_postal = ?, foto_perfil = ? where id = ?', [user_name, nombre, apellidos, email, edad, codigo_postal, foto_perfil, pId], (err, result)=>{
            if(err) reject(err)
            resolve(result)
        })
    })
}

module.exports = {
    insert:insert,
    getById: getById,
    getByUsername: getByUsername,
    update: update
}