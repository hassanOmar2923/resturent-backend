
const  mongoose  = require("mongoose");

const schema=new mongoose.Schema({

category:{
    type:String,
    required:true
},
// Quantity:{
//     type:Number,
//     default:0
// },

},{timestamps:true})

const foodCategoryModel=mongoose.model('food-category',schema)

module.exports={foodCategoryModel}