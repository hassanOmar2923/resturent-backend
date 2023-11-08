
const  mongoose  = require("mongoose");

const schema=new mongoose.Schema({

employeeId:{
    type:mongoose.Types.ObjectId,
    ref:'employee',
    required:true
},
pin:{
    type:Number,
    required:true
},
status:{
    type:String,
    enum:['active','pending',],
    default: 'active',

},
},{timestamps:true})

const employeeUsersModel=mongoose.model('employee-users',schema)

module.exports={employeeUsersModel}