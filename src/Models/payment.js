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
    getPayment:(data)=>{
        return new Promise((resolve, reject)=>{
            conn.query(`SELECT * FROM payment WHERE ?`, data, (err,result)=>{
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }  
            })
        })
    },
    payPayment:(id,data)=>{
        return new Promise((resolve, reject)=>{
            conn.query(`UPDATE payment SET ? WHERE ?`,[data, id], (err, result)=>{
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                } 
            })
        })
    }
}