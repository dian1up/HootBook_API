const userModel = require('../Models/user')
const cache = require('../Configs/redis')
require('dotenv').config()

const hash = (string) => {
    const crypto = require('crypto-js')
    return crypto.SHA256(string)
      .toString(crypto.enc.Hex)
  }
  
module.exports={
    updatePartner:(req, res) =>{
        const data = req.body

        userModel.updatePartner(data)
            .then(result=>res.json(result))
            .catch(err=>res.json(err))
    },

    loginPartner:(req,res) => {
        const data = req.body

        data.password = hash(data.password)
        userModel.loginPartner(data)
            .then(result=>{
                if (result.length !== 0) {
                    console.log(result);
                    const jwt = require('jsonwebtoken')
                    const payload = {
                      id: result[0].id,  
                      name: result[0].name,
                      email: result[0].email,
                      level: 'partner',
                    }
                    jwt.sign(payload, process.env.SECRET,(err, result)=>{
                        if (!err) {
                            return res.status(200).json({
                                    message:'Login successful',
                                    token:`Bearer ${result}`
                                })
                            
       
                        } else {
                            return res.status(500).json({
                                message: err
                            })
                        }
  
                    })
  
                }else{
                    return res.status(500).json({
                        message: "Email or Password is Wrong"
                    })
                }
                
            }).catch(err=>{
                return res.status(500).json({
                    message: err
                })
            })
    },
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
    loginUser:(req,res) => {
        userModel.loginUser(req.body.email, hash(req.body.password))
            .then(result => {
                if(result.length !== 0){
                    const payload = {
                        id: result[0].id,
                        name: result[0].name,
                        email: result[0].email,
                        level: 'user',
                    }
                    const jwt = require('jsonwebtoken')
                    jwt.sign(payload, process.env.SECRET, (err, token) => {
                        if (err) {
                          console.error(err)
                        }
                        res.json({ 
                            token: `Bearer ${token}`,
                            message: 'Login successfull'
                        })
                      })
                    } else { return res.status(404).json({message: 'Email or Password is wrong'}) }
                }
            )
            .catch(err => {
                console.error(err)
                return res.status(500).json({message:err})
            })
    },
    updateUser: (req, res) => {
        const data = {
            name: req.body.name,
            email: req.body.email,
        }
        userModel.updateUser(req.params.id,data)
        .then(result => {
            if(result.affectedRows !== 0){
                data.id = req.params.id
                const response = {
                    message: 'Updated successfully',
                    data
                }
                return res.status(201).json(response)
            }else{
                data.id = req.params.id
                const response = {
                    message: 'Update failed',
                    data
                }
                return res.status(201).json(response)
            }
        })
        .catch(err =>{
            return res.status(500).json({message:err})
        })

    },
}