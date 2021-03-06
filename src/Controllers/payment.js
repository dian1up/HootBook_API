const paymentModel = require('../Models/payment')
const cache = require('../Configs/redis')
const sqlToObj=(data)=>{
    return JSON.parse(JSON.parse(data))
}

module.exports={

    insertPayment:(req, res) =>{
        const input = req.body
        input.data=JSON.stringify(input.data)
        paymentModel.insertPayment(input) 
            .then(result=>res.status(200).json({message:'Sukses'}))
            .catch(err=>console.log(err))
    },
    getPayment:(req, res)=>{
        const data = req.params
        paymentModel.getPayment(data)
            .then(result=>{
                result[0].data=JSON.parse(result[0].data)
                res.status(200).json(result)
            })
            .catch(err=>res.status(500).json({message:err}))
    },
    payPayment:(req, res)=>{
        const id = req.params
        const data = req.body
        paymentModel.payPayment(id,data)
            .then(result=>res.status(200).json({message:result}))
            .catch(err=>res.status(500).json({message:err}))
    }           
}