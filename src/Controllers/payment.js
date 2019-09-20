const paymentModel = require('../Models/payment')
const cache = require('../Configs/redis')
const sqlToObj=(data)=>{
    return JSON.parse(JSON.parse(data))
}

module.exports={

    insertPayment:(req, res) =>{
        const input = req.body
        input.data=JSON.stringify(input.data)
        paymentModel.insertPayment(data) 
            .then(result=>res.status(200).json({message:'Sukses'}))
            .catch(err=>console.log(err))
    }           
}