const { foodCategoryModel } = require("../models/foodCategory-model");
const { foodModel } = require("../models/foods-model");
const { orderModel } = require("../models/order-model");
const { foodValidation } = require("../validations/foods-validations");
const { orderValidation } = require("../validations/order-validation");

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
  try {
    // const {error}=orderValidation(req.body)
    // if(error) res.status(400).send(error.message)
    const allorders = await orderModel.find()
    let data = req.body;

   

    data.map(async(order)=>{
      try{

      
      const getFood = await foodModel.find({ _id: order.food });
      if(!getFood) return;
      // console.log("getFood",getFood)
      getFood.forEach(food =>{
      // console.log(food)
      const allordersLenght = parseInt(allorders.length)+100
  const orderid="PL" + allordersLenght
      order.totalAmount=parseFloat(food.price)*parseFloat(order.Qty)
      order.orderId=orderid
      order.price=food.price

      })
     
     const postData=await orderModel.insertMany(order)
    //  console.log("order",order)
    }catch(error){
      res.status(404).send(error.message);
    }
      
    })
 

    res.status(201).send({
      status: true,
      message: "posted!!",
     
    });
    // data.totalAmount=parseFloat(data.price)*parseFloat(data.Qty)
    // console.log(data)
    // const postData=await orderModel.insertMany(data)
    
    // data.map(async (data) => {
    //   const reqData = data;
    //   const getFood = await foodModel.find({ _id: reqData.food });
    //   getFood.map((d) => {
    //     let arr = [d];
       
    //     arr.forEach((D) => {
    //       if (reqData.Qty > D.Qty) {
    //         res.send({
    //           status: false,
    //           message: `kuguma filno ${D.name} waxa ka hartay ${D.Qty} `,
    //         });
    //         return;
    //       }
    //     });
    //   });
    // });

  } catch (error) {
    res.status(404).send(error.message);
  }
};

const Put = async (req, res) => {
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
    const data = await foodModel.findByIdAndDelete(id);
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
