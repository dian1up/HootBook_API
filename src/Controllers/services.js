const serviceModel = require('../Models/services')
const cache = require('../Configs/redis')
const sqlToObj=(data)=>{
    return JSON.parse(JSON.parse(data))
}

module.exports={
    getServices:(req, res) => {
        const data = req.params
        serviceModel.getServices(data)
            .then(result=>{
                if (result.length!==0) {
                    result[0].facilities =sqlToObj(result[0].facilities)
                    res.json(result[0])
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
            .then(result=>{res.json(result)})
            .catch(err=>res.json(err))
    }
}