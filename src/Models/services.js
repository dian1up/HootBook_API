const conn = require('../Configs/db')

module.exports={
    getAllServices:()=>{
        return new Promise((resolve, reject)=>{
            conn.query(`SELECT services.*, partners.company as company,\
                        partners.email as email, partners.address as address, partners.latitude as latitude,\
                        partners.longitude as longitude FROM partners,services\
                        WHERE partners.id=services.hotel_id`, (err, result)=>{
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    getServices:(data)=>{
        console.log('hai = ',data);
        
        return new Promise((resolve, reject)=>{
            conn.query(`SELECT services.*, partners.company as company,\
                        partners.email as email, partners.address as address, partners.latitude as latitude,\
                        partners.longitude as longitude FROM partners,services\
                        WHERE partners.id=services.hotel_id AND partners.id=?`, data.id, (err, result)=>{
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    insertServices:(data)=>{
        return new Promise((resolve, reject)=>{
            conn.query(`INSERT INTO services SET ?`, data, (err,result)=>{
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    deleteServices:(data)=>{
        return new Promise((resolve, reject)=>{
            conn.query(`DELETE FROM services WHERE ?`, data, (err, result)=>{
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    updateServices:(data)=>{
        return new Promise((resolve, reject)=>{
            conn.query(`UPDATE services SET ? WHERE id=?`, [data, data.id], (err, result)=>{
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }
}