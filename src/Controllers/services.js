const serviceModel = require('../Models/services')
const cache = require('../Configs/redis')
const sqlToObj=(data)=>{
    return JSON.parse(JSON.parse(data))
}

module.exports={
    getAllServices:(req, res) => {
        serviceModel.getAllServices()
            .then(result=>{
                if (result.length!==0) {
                    for (let index = 0; index < result.length; index++) {
                        result[index].facilities =sqlToObj(result[index].facilities)
                    }
                    res.status(200).json(result)
                } else {
                    res.status(404).json({message:'Not Found'})
                }
             
                
            })
            .catch(err=>res.json(err))
    },

    getServices:(req, res) => {
        const data = req.params
        serviceModel.getServices(data)
            .then(result=>{
                if (result.length!==0) {
                    for (let index = 0; index < result.length; index++) {
                        result[index].facilities =sqlToObj(result[index].facilities)
                    }
                    console.log('get')
                    cache.hset('services', data.id, JSON.stringify(result))
                    res.status(200).json(response)
                } else {
                    res.status(404).json({message:'Not Found'})
                }
                
            })
            .catch(err=>res.json(err))
    },
    insertServices:(req, res) =>{
        const data = req.body
        data.facilities=JSON.stringify(data.facilities)
        serviceModel.insertServices(data)            
            .then((result)=>{
                data.id = result.insertId
                serviceModel.getServices({id:data.hotel_id})
                    .then(result => {
                        for (let index = 0; index < result.length; index++) {
                            result[index].facilities =sqlToObj(result[index].facilities)
                        }
                        console.log('get')
                        cache.hset('services', data.hotel_id, JSON.stringify(result))
                    })
                    .catch(err =>{
                        console.log(err)
                    })
                res.status(200).json({
                    message:'Add Successful'
                })
            })
            .catch(err=>res.json(err))
    },
    deleteServices:(req, res) => {
        const data = req.params
        serviceModel.deleteServices(data)
            .then(()=>res.status(200).json({
                message:'Delete Successful'
            }))
            .catch(()=>res.status(500).json({
                message:'Delete Error'
            }))
    },
    updateServices:(req, res) => {
        const data = req.body
        serviceModel.updateServices(data)
            .then(()=>res.status(200).json({
                message:'Update Successful'
            }))
            .catch(()=>res.status(500).json({
                message:'Update Error'
            }))
    },
}