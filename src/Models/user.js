const conn = require('../Configs/db')

module.exports={
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
    }
}