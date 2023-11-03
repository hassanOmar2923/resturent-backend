
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
image: {
    public_id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }

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