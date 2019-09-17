const conn = require('../Configs/db')

module.exports={
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