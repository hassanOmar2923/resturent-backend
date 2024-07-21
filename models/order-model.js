
const  mongoose  = require("mongoose");

const schema=new mongoose.Schema({

food:{
    type:mongoose.Types.ObjectId,
    ref:'foods',
    required:true
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
},
status:{
    type:String,
    enum:['unpaid','paid',],
    default: 'paid',

},
Date:{
    type: String,
    // default:Date.now()
},
userID:{
    type:String,
    default:0
},
userName:{
    type:String,
    default:0
},
},{timestamps:true})

const orderModel=mongoose.model('order',schema)

module.exports={orderModel}