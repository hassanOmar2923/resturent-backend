
const  mongoose  = require("mongoose");

const schema=new mongoose.Schema({

category:{
    type:mongoose.Types.ObjectId,
    ref:'food-category',
    required:true
},
name:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
img:{
    type:String,
    required:false,
    default:'.png'
},
status:{
    type:String,
    default:'active',
    enum:['active', 'inactive']
    // required:true
}
},{timestamps:true})

const foodModel=mongoose.model('foods',schema)

module.exports={foodModel}