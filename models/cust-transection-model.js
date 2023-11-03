
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
orderId:{
    type:String,
    // required:true
    default:""
},
Date:{
    type: Date,
    default:Date.now()
}
},{timestamps:true})

const custTrsnsectionModel=mongoose.model('custTrsnsection',schema)

module.exports={custTrsnsectionModel}