
const  mongoose  = require("mongoose");

const schema=new mongoose.Schema({

    customerId:{
        type:mongoose.Types.ObjectId,
        ref:'customer',
        required:true
    },
    Amount:{
        type:Number,
        required:false
    },
    Date:{
        type: Date,
       default:Date.now()
    }
},{timestamps:true})

const custPaymentModel=mongoose.model('customer-payments',schema)

module.exports={custPaymentModel}