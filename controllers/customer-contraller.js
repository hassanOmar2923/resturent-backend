const { custTrsnsectionModel } = require("../models/cust-transection-model")
const { custPaymentModel } = require("../models/customer-payments-model")
const { customerModel } = require("../models/customers-model")
const { custValidator } = require("../validations/customer-validation")
const moment=require("moment")
const getAll=async(req,res)=>{
    try {
        const data=await customerModel.find()
        
    res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error.message)
    }
    
}
const getById=async(req,res)=>{
    try {
        const {id}=req.params
    const data=await customerModel.findById(id)
    res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error.message)
    }
    
}

const Post=async(req,res)=>{
    try {
        const {error}=custValidator(req.body)
        if(error) return res.status(400).send(error.message)
        const postData=new customerModel(req.body)
    await postData.save()
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
        const {error}=custValidator(req.body)

        if(error) return res.status(400).json(error.message)
        const PutData=await customerModel.findByIdAndUpdate(id,req.body,{new:true})
      
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
    const data=await customerModel.findByIdAndDelete(id)
    res.status(201).json({
        status:true,
        message:'deleted!!',
        data
    })
    } catch (error) {
        res.status(404).send(error.message)
    }
    
}
const getBySelection=async(req,res)=>{
    try {
        const {id}=req.params
        const cust=await customerModel.findById(id) 
        const balance=cust.TotalAmount
        const deyman=await custTrsnsectionModel.find({customerId:id}).populate({
            path: "customerId",
            model: "customer",
            select: "customerName TotalAmount _id",
          });
          
        const payment=await custPaymentModel.find({customerId:id}).populate({
            path: "customerId",
            model: "customer",
            select: "customerName TotalAmount _id",
          });
          let totalPayment=0
          if(payment){
            payment.forEach((item)=>{
                totalPayment+=item.Amount
            })
        }
        let TotalDeyn=0
        if(deyman){
            deyman.forEach((item)=>{
                TotalDeyn+=item.Amount
          })
      }
    res.status(200).send({deyman,payment,amountPaid:totalPayment,Totalamount:TotalDeyn})
    } catch (error) {
        res.status(404).send(error.message)
    }
    
}
const getByfilter=async(req,res)=>{
    try {
        const startDate = req.body.startDate;
    // const endDate = req.body.endDate;
    const endDate = moment(req.body.endDate).add(1, 'days');
        const cust=await customerModel.findById(req.body.Id) 
        const deyman=await custTrsnsectionModel.find({
            // customerId:req.body.Id,
            Date: {
            $gte: startDate,
            $lte: endDate,
          },})
        const payment=await custPaymentModel.find({
            // customerId:req.body.Id,
            Date: {
            $gte: startDate,
            $lte: endDate,
          },})
        const filteredDeyman=deyman?.filter((item)=>item.customerId == req.body.Id)
        const filteredPayment=payment?.filter((item)=>item.customerId == req.body.Id)

          let totalPayment=0
          if(filteredPayment){
            filteredPayment.forEach((item)=>{
                totalPayment+=item.Amount
            })
        }
        let TotalDeyn=0
        if(filteredDeyman){
            filteredDeyman.forEach((item)=>{
                TotalDeyn+=item.Amount
                 item.customerId == req.body.Id
          })
                 
        }
    res.status(200).send({deyman:filteredDeyman,payment:filteredPayment,amountPaid:totalPayment,Totalamount:TotalDeyn})
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
    getBySelection,
    getByfilter

}