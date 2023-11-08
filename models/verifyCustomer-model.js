
const  mongoose  = require("mongoose");

const schema=new mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    OTPcode:{
        type:Number,
        required:true
    },
   
},)
schema.add({ createdAt: { type: Date, default: Date.now } });
schema.index({ createdAt: 1 }, { expireAfterSeconds: 900 });
const verifyCustomerModel=mongoose.model('verify-Customer',schema)

module.exports={verifyCustomerModel}