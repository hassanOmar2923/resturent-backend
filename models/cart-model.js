
const  mongoose  = require("mongoose");

const schema=new mongoose.Schema({

food:{
    type:mongoose.Types.ObjectId,
    ref:'foods',
    required:true
},

name:{
    type:String,
    // ref:'foods',
    // required:true
},
price:{
    type:Number,
    required:false
},
Qty:{
   type:Number,
        default:1,
},
totalAmount:{
    type:Number,
    default:0
},
orderId:{
    type:String,
    // required:true
    default:""
}
},{timestamps:true})

const cartModel=mongoose.model('cart',schema)

module.exports={cartModel}