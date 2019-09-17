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
                        .then(result=>res.status(200).send({message:'Register successful'}))
                        .catch(err=>res.send(err))
                }else{
                    return res.status(403).json({
                        message:'email already taken'
                    })
                }
            })
            
            
            .catch(err=>res.send(err))
            
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
    registerUser: (req, res) => {
        const userData = {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            created_at: new Date()
        }
        userModel.cekUser(userData.email)
            .then(result =>{
                if(result.length !== 0) {
                    return res.status(409).json({message:'Email already registered'})
                }
                userData.password = hash(userData.password)
                userModel.registerUser(userData)
                .then(result => {
                    console.log(result)
                    return res.status(201).json({message: 'Success registering new user'})
                })
                .catch(err =>{
                    console.error(err)
                    return res.status(500).json({message:err})
                })
            })
    },
}