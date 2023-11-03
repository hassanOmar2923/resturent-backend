const { foodCategoryModel } = require("../models/foodCategory-model")
const { foodCategoryValidation } = require("../validations/foodCategory-validation")

const getAll=async(req,res)=>{
    try {
        const data=await foodCategoryModel.find()
    res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error.message)
    }
    
}
const getById=async(req,res)=>{
    try {
        const {id}=req.params
    const data=await foodCategoryModel.findById(id)
    res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error.message)
    }
    
}

const Post=async(req,res)=>{
    try {
        const {error}=foodCategoryValidation(req.body)
        if(error) return res.status(400).json(error.message)
        const postData=new foodCategoryModel(req.body)
        await postData.save()
        res.status(201).json({
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
        const {error}=foodCategoryValidation(req.body)
        if(error) return res.status(400).json(error.message)
        const PutData=foodCategoryModel.findByIdAndUpdate(id,req.body,{new:true})
        
        res.status(200).json({
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
    const data=await foodCategoryModel.findByIdAndDelete(id)
    res.status(201).json({
        status:true,
        message:'deleted!!',
        data
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
    Delete
}