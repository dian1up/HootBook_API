const conn = require('../Configs/db')

module.exports={

    profilePartner:(data)=>{
      return new Promise((resolve, reject)=>{
        console.log('input data = ',data)
        
        conn.query(`SELECT * FROM partners WHERE ?`,data, (err, result)=>{
          if(!err){
            resolve(result)
          }else{
            reject(err)
          }
        })
      })
    },

    updatePartner:(data)=>{
      return new Promise((resolve, reject)=>{
        conn.query(`UPDATE partners SET ? WHERE id=?`, [data, data.id], (err, result)=>{
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
      })
    },

    loginPartner:(data)=>{
      return new Promise((resolve,reject)=>{
        conn.query(`SELECT * FROM partners WHERE email = ? AND password = ?`,[data.email, data.password], (err, result)=>{
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
      })
    },

    cekPartner:(data)=>{
      return new Promise((resolve, reject)=>{
        conn.query(`SELECT * FROM partners WHERE email= ?`,data.email, (err, result)=>{
          if(!err){
            resolve(result)
          }else{
            reject(err)
          }
        })
      })
    },

    registerPartner:(data)=>{
      return new Promise((resolve, reject)=>{
        conn.query('INSERT INTO partners SET ?', data, (err,result)=>{
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
      })
    },

    registerUser: (data) => {
      return new Promise((resolve, reject) => {
        conn.query('INSERT users SET ?', data, (err, result) => {
          if (err) { reject(err) } else { resolve(result) }
        })
      })
    },
    cekUser:(email) =>{
      return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM users WHERE email = ?', email, (err, result) => {
          if (err) { reject(err) } else { resolve(result) }
        })
      })
    },
    getUserProfile:(id) =>{
      return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM users WHERE id = ?', id, (err, result) => {
          if (err) { reject(err) } else { resolve(result) }
        })
      })
    },
    loginUser:(email, password) =>{
      return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM users WHERE email = ? AND password = ?', [email,password], (err, result) => {
          if (err) { reject(err) } else { resolve(result) }
        })
      })
    },
    updateUser: (id, data) => {
      return new Promise((resolve, reject) => {
        conn.query('UPDATE users SET ? WHERE id = ?', [data, id], (err, result) => {
          if (err) { reject(err) } else { resolve(result) }
        })
      })
    },
}