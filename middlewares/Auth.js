const { usersModel } = require("../models/users-model");

const jwt=require('jsonwebtoken')

require('dotenv').config()
const Authentication =(AuthirzedUsers)=>{
    return async(req,res,next)=>{
        try {
            let Token=req.headers['authorization']
        if(!Token) return res.status(401).send({status:false,message:'no access token provided'})
        let token=Token.split(' ')[1]
        let tokenVerify=jwt.verify(token,process.env.token)
        if(!tokenVerify) return res.status(401).send({status:false,message:'fake token'})
   
        const isValidUser=await usersModel.findById(tokenVerify.id)
        if(!isValidUser) return res.status(401).send({status:false,message:'invalid user'})
        if(isValidUser.status !== 'active') return res.status(401).send({status:false,message:'inactive user,please contact administrator'})
        // if(!AuthirzedUsers.includes(isValidUser.role)) return res.status(401).send({status:false,message:'u have no permisions to this route'})
        next()
        } catch (error) {
            res.status(401).send({status:false,message:"un-Authrized"})
        }
        

    }
}
module.exports ={Authentication}