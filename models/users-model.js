const mongoose=require('mongoose')
//schema
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['active','pending',],
        default: 'active',
   
    },
    role:{
        type:String,
        // enum:['superAdmin','Admin','customercare',],
        required:true
    },
    

})
//model
const usersModel=mongoose.model('users', userSchema)
//export
module.exports={usersModel}