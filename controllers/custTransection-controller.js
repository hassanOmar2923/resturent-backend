const db = require("mongoose");
const { custTrsnsectionModel } = require("../models/cust-transection-model");
const { custTransectionValidation } = require("../validations/custTrasnsection-validation");
const { customerModel } = require("../models/customers-model");
const { orderModel } = require("../models/order-model");
const moment=require("moment")


const getAll = async (req, res) => {
  try {
    const data = await custTrsnsectionModel.find().populate({
      path: "customerId",
      model: "customer",
      select: "customerName TotalAmount _id",
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await custTrsnsectionModel.findById(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const Post = async (req, res) => {
  const SESSION = await db.startSession();
  await SESSION.startTransaction();
  try {
    const {error}=custTransectionValidation(req.body)
    if(error){
      await SESSION.abortTransaction();
      return res.status(400).json(error.message)
    } 


const postData=new custTrsnsectionModel(req.body)
const getCustomer=await customerModel.findById(req.body.customerId)

if(!getCustomer){
  await SESSION.abortTransaction();

 return res.status(200).send({status: false,message: "not found !!", });
}
let currAmount=parseFloat(getCustomer.TotalAmount)+parseFloat(req.body.Amount)
// console.log(req.body)
 const findOrders=await orderModel.find({orderId:req.body.orderId})
 if(!findOrders){
  await SESSION.abortTransaction();
   return;
 }
 findOrders.forEach(async(item) => {
await orderModel.findByIdAndUpdate(item._id,{
  status:"unpaid"
},{new:true})
 })
//  console.log(findOrders)
        // Date
await postData.save().then(async() =>{
    await customerModel.findByIdAndUpdate(getCustomer._id,{
        TotalAmount:currAmount
    })
  await SESSION.commitTransaction();
  res.status(201).send({
    status: true,
    message: "Done!!",
    
  
  });

})
  } catch (error) {
    res.status(404).send(error.message);
    await SESSION.abortTransaction();
  } finally {
    SESSION.endSession();
}    
};

const Put = async (req, res) => {
  const SESSION = await db.startSession();
  await SESSION.startTransaction();
  try {
    const { id } = req.params;
    const {error}=custTransectionValidation(req.body)
    if(error) return res.status(400).json(error.message)
    const PutData = await custTrsnsectionModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    
    res.status(200).send({
      status: true,
      message: "updated!!",
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const Delete = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await custTrsnsectionModel.findByIdAndDelete(id);
    res.status(201).json({
      status: true,
      message: "deleted!!",
      data,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};
const ordersById = async (req, res) => {
  try {
    // yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const data = await orderModel.aggregate([
      {
        $match: {
          status: "paid",
        },
      },
      {
        $group: {
          _id: "$orderId",
          total: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: -1 } },
    ]);
    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
};
module.exports = {
  getAll,
  getById,
  Post,
  Put,
  Delete,
  ordersById

};
