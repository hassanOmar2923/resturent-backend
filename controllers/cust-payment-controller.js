const db = require("mongoose");
const { customerModel } = require("../models/customers-model");
const { custPaymentModel } = require("../models/customer-payments-model");
const { custPaymentValidation } = require("../validations/cust-payment-validation");
const moment=require("moment")


const getAll = async (req, res) => {
  try {
    const data = await custPaymentModel.find().populate({
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
    const data = await custPaymentModel.findById(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const Post = async (req, res) => {
  const SESSION = await db.startSession();
  await SESSION.startTransaction();
  try {
    const {error}=custPaymentValidation(req.body)
    if(error){
      await SESSION.abortTransaction();
      return res.status(400).json(error.message)
    } 


const postData=new custPaymentModel(req.body)
const getCustomer=await customerModel.findById(req.body.customerId)

if(!getCustomer){
  await SESSION.abortTransaction();

 return res.status(200).send({status: false,message: "not found !!", });
}
let currAmount=parseFloat(getCustomer.TotalAmount)-parseFloat(req.body.Amount)


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
    const {error}=custPaymentValidation(req.body)
    if(error) return res.status(400).json(error.message)
    const PutData = await custPaymentModel.findByIdAndUpdate(id, req.body, {
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
    const data = await custPaymentModel.findByIdAndDelete(id);
    res.status(201).json({
      status: true,
      message: "deleted!!",
      data,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  getAll,
  getById,
  Post,
  Put,
  Delete,


};
