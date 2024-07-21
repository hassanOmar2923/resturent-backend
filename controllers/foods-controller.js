const { foodCategoryModel } = require("../models/foodCategory-model")
const { foodModel } = require("../models/foods-model")
const { foodValidation } = require("../validations/foods-validations")
const cloudinary=require("../helpers/cloudinary")
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
        // if(error) return res.status(400).send(error.message)
        const postData=await foodModel.insertMany(req.body.friends)
        // console.log(req.body.friends)

        res.status(201).send({
            status:true,
            message:'created!!',
            // postData
        
           
        })

    } catch (error) {
        res.status(404).send(error.message)
    }
    
   
}

const Put=async(req,res)=>{
    try {
        const {id}=req.params
        const {error}=foodValidation(req.body)
        if(error) return res.status(400).json(error.message)
       
        const PutData=await foodModel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).send({
            status:true,
            message:'updated!!',
            Get
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
    
   
}

const Delete=async(req,res)=>{
    try {
        const {id}=req.params
        const get=await foodModel.findById(id)
        const data=await foodModel.findByIdAndDelete(id)
    const imgId = get?.image?.public_id;
    if (imgId) {
        await cloudinary.uploader.destroy(imgId);
    }
    res.status(201).json({
        status:true,
        message:'deleted!!',
        // data,
        get
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
  const addImg=async(req,res)=>{
    try {
        const {id}=req.params
        const Get=await foodModel.findById(req.params.id)
    // console.log("Get",Get.image.public_id.length)
    // if (Get.image.public_id.length>0) {
    //     const imgId = Get?.image?.public_id;
    //     await cloudinary.uploader.destroy(imgId);
    // }
        const PutData=await foodModel.findByIdAndUpdate(id,{
            image:req.body.image,
        },{new:true})
    //    console.log(req.body)

        res.status(200).send({
            status:true,
            message:'updated!!',
            // PutData
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
    
   
} 
module.exports={
    getAll,
    getById,
    Post,
    Put,
    Delete,
    updateStatus,
    getActiveFood,
    addImg
}