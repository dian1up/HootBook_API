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
}