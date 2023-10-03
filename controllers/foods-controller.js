const { foodCategoryModel } = require("../models/foodCategory-model")
const { foodModel } = require("../models/foods-model")
const { foodValidation } = require("../validations/foods-validations")

const getAll=async(req,res)=>{
    try {
        const data=await foodModel.find().populate({
            path:'category',
            model:'food-category',
            select:'category'
        })
    res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error.message)
    }
    
}
const getById=async(req,res)=>{
    try {
        const {id}=req.params
    const data=await foodModel.findById(id)
    res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error.message)
    }
    
}

const Post=async(req,res)=>{
    try {
        // const {error}=foodValidation(req.body)
        // if(error) res.status(400).send(error.message)
        const postData=await foodModel.insertMany(req.body.friends)

        res.status(201).send({
            status:true,
            message:'created!!',
            postData
        
           
        })

    } catch (error) {
        res.status(404).send(error.message)
    }
    
   
}

const Put=async(req,res)=>{
    try {
        const {id}=req.params
        const {error}=foodValidation(req.body)

        if(error) res.status(400).json(error.message)
        const PutData=await foodModel.findByIdAndUpdate(id,req.body,{new:true})
        // const allfoods=await foodModel.find({category:req.body.category})
        
        // let allQty=0;
        // allfoods.forEach((food)=>{
        //     allQty=parseInt(allQty)+parseInt(food.Qty)
        

        // })
        // const uppdateQty=await foodCategoryModel.findByIdAndUpdate(req.body.category,{
        //     Quantity:allQty
        // },{new:true})
        res.status(200).send({
            status:true,
            message:'updated!!',
            PutData
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
    
   
}

const Delete=async(req,res)=>{
    try {
        const {id}=req.params
    const data=await foodModel.findByIdAndDelete(id)
    res.status(201).json({
        status:true,
        message:'deleted!!',
        data
    })
    } catch (error) {
        res.status(404).send(error.message)
    }
    
}
const updateStatus=async(req,res)=>{
    try {
        const {id}=req.params
        const status=req.body.status
    const data=await foodModel.findByIdAndUpdate(id,{
        status:status
    },{new:true})
    res.status(201).json({
        status:true,
        message:'updated!!',
        data
    })
    } catch (error) {
        res.status(404).send(error.message)
    }
}

const getActiveFood = async (req, res) => {
    try {
      const { id } = req.params;
  
      
  
      const getData = await foodModel.find({status:"active" });
  
      
      res.status(200).send({ getData });
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
module.exports={
    getAll,
    getById,
    Post,
    Put,
    Delete,
    updateStatus,
    getActiveFood
}