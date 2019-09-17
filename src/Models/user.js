const conn = require('../Configs/db')

module.exports={
    cekPartner:(data)=>{
      return new Promise((resolve, reject)=>{
        conn.query(`SELECT * FROM partners WHERE email='${data.email}'`, (err, result)=>{
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
    getAll: () => {
        return new Promise((resolve, reject) => {
          conn.query(`SELECT * FROM book `,  (err, result) => {
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