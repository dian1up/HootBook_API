const conn = require('../Configs/db')

module.exports={

    insertPayment:(data)=>{
        return new Promise((resolve, reject)=>{
            conn.query(`INSERT INTO payment SET ?`, data, (err,result)=>{
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
}