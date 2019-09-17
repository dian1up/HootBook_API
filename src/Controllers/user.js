const userModel = require('../Models/user')
const cache = require('../Configs/redis')

const hash = (string) => {
    const crypto = require('crypto-js')
    return crypto.SHA256(string)
      .toString(crypto.enc.Hex)
  }
  
module.exports={
    registerPartner:(req, res) => {
        const data = req.body
        
        data.password = hash(data.password)
        userModel.cekPartner(data)
            .then(result=>{
                if(result.length === 0) {
                    return userModel.registerPartner(data)
                        .then(result=>res.status(200).json({message:'Register successful'}))
                        .catch(err=>res.status(500).json({message:err}))
                }else{
                    return res.status(403).json({
                        message:'email already taken'
                    })
                }
            })
            
            
            .catch(err=>res.status(500).json({message:err}))
            
    },
    getBook: (req, res) => {
        // cache.get("books:0",  (err, obj)=> {}
        cache.hvals("books:0",  (err, obj)=> {
            
            if (obj.length !== 0) {
                console.log(obj)
                let data = JSON.parse(obj)
                console.log('get');
                res.json(data)
            } else {
                userModel.getAll()
                    .then(result =>{
                        result.map(
                            (val, index) =>{
                                cache.hmset('books:'+index, 'value', JSON.stringify(val))                            }
                        )
                        // cache.set('asd',JSON.stringify(result))
                        // console.log('server');
                        
                        res.json(result)
                    })
                    .catch(err => console.log(err))
            }
        });
      },
}