const { cartModel } = require("../models/cart-model");
const db = require("mongoose");
const { foodCategoryModel } = require("../models/foodCategory-model");
const { foodModel } = require("../models/foods-model");
const { orderModel } = require("../models/order-model");


const getAll = async (req, res) => {
  try {
    const data = await orderModel.find().populate({
      path: "food",
      model: "foods",
      select: "name status _id",
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await orderModel.findById(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const Post = async (req, res) => {
  const SESSION = await db.startSession();
  await SESSION.startTransaction();
  try {
    
    const cartData=await cartModel.find()
    if(!cartData) {
      res.send({status:false,message:"can't order empty cart"})
      await SESSION.abortTransaction();
    } 

const postData=await orderModel.insertMany(cartData).then(async() =>{
  await SESSION.commitTransaction();
  res.status(201).send({
    status: true,
    message: "ordered!!",
    
  
  });
  await cartModel.deleteMany()
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
    // const {error}=foodValidation(req.body)
    // if(error) res.status(400).json(error.message)
    const PutData = await orderModel.findByIdAndUpdate(id, req.body, {
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
    const data = await orderModel.findByIdAndDelete(id);
    res.status(201).json({
      status: true,
      message: "deleted!!",
      data,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};
const getByCat = async (req, res) => {
  try {
    const { id } = req.params;

    const foodCat = await foodCategoryModel.findById(id);

    const getData = await foodModel.find({ category: foodCat._id,status:"active" });

    
    res.status(200).send({ getData });
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
  getByCat,
};
