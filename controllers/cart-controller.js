const { cartModel } = require("../models/cart-model");

const { cartValidation } = require("../validations/cart-validation");


const getAll = async (req, res) => {
  try {
    const data = await cartModel.find()
    let total=0
    if(data){
      data.forEach(async(element) => {
        if(element.Qty<=0){
          await cartModel.findByIdAndRemove({_id:element._id})
        }else{
          total += element.Qty*element.price

        }
      });
    }
    const cartData = await cartModel.find().populate({
      path: "food",
      model: "foods",
      select: "name status _id",
    });
    res.status(200).send({data:cartData,total:total});
  } catch (error) {
    res.status(404).send(error.message);
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await cartModel.findById(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const Post = async (req, res) => {
  try {
    const {error}=cartValidation(req.body)
    if(error) return res.status(400).send(error.message)
    let data = req.body;
const postData= new cartModel(data)
await postData.save().then(()=>{
  res.status(201).send({
    status: true,
    message: "added to the cart!!",
  
  });
})



 
  

  } catch (error) {
    res.status(404).send(error.message);
  }
};

const Put = async (req, res) => {
  try {
    const { id } = req.params;
    // const {error}=foodValidation(req.body)
    // if(error) res.status(400).json(error.message)
    if(req.body.Qty <=0){
      await cartModel.findByIdAndRemove({_id:id})
    return res.send({status:false,message:`${req.body?.name} has been removed from cart`})
      
    }else{
      const PutData = await cartModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
    }
    
   
    
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
    if(cartModel.length > 0) {
    await cartModel.deleteMany()
    res.status(200).send({
      status: true,
      message: "cart is cleared!!",
  
    });
    }
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
