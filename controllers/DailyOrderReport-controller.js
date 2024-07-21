const moment = require("moment");
const { orderModel } = require("../models/order-model");
const { custTrsnsectionModel } = require("../models/cust-transection-model");
const { customerModel } = require("../models/customers-model")

const db = require("mongoose");

const Dailyreport = async (req, res) => {
  try {
    yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const data = await orderModel.aggregate([
      {
        $match: {
          Date: moment().format("L"),

        },
      },
      {
        $group: {
          _id: "$orderId",
          status: { $addToSet: "$status" },
          date: { $addToSet: "$createdAt" },
          userName: { $addToSet: "$userName" },
          total: { $sum: "$totalAmount" },
          // "Date":"$createdAt",
        },
      },
      { $sort: {date:-1} },
    ]);
    // console.log(data)
    const getData = await orderModel.find({Date: moment().format("L")})
      .populate({
        path: "food",
        model: "foods",
        select: "_id name",
      })
      .sort("-createdAt");
      let tot=0
      if(data){
        data.forEach((item)=>{
          tot+=item.total
        })
         
      }
    res.send({ byorderID: data, allData: getData,totalByOrderID: tot});
  } catch (error) {
    res.send(error.message);
  }
};
const deleteByOrderId=async(req,res)=>{
  const SESSION = await db.startSession();
  await SESSION.startTransaction();
  try {
    //orderka in uu yahay mid qof lagu dalacay
    const findIsUnpaid=await orderModel.find({orderId:req.body.orderId})
    if(!findIsUnpaid) {
      res.send({status:false,message:"not found"});
      await SESSION.abortTransaction();
    } 
    //hadii qof lagu dalaacy if ayaa ku shaqo leh
    if(findIsUnpaid[0].status === 'unpaid'){
      //soo hel qofkii lagu dalacay orderkaan, iyo qiimaheeda si looga jaro 
    const findCustomerlaguDalacay=await custTrsnsectionModel.find({orderId:req.body.orderId})
    if(!findCustomerlaguDalacay) {
      res.send({status:false,message:"not found"});
      await SESSION.abortTransaction();
    } 
    const findCustomer=await customerModel.findById(findCustomerlaguDalacay[0].customerId)
    if(!findCustomer) {
      res.send({status:false,message:"not found"});
      await SESSION.abortTransaction();
    } 
   const newBalance=parseFloat(findCustomer.TotalAmount)-parseFloat(findCustomerlaguDalacay[0].Amount)
    //update customer balance
const updateCustomerBalance=await customerModel.findByIdAndUpdate(findCustomerlaguDalacay[0].customerId,
{
  TotalAmount:newBalance
},{new:true})
//delete Order Lagudalacay Customer
const deleteOrderLagudalacayCustomer=await custTrsnsectionModel.findByIdAndDelete(findCustomerlaguDalacay[0]._id)

    }
    await orderModel.deleteMany({orderId:req.body.orderId}).then(async() => {
  await SESSION.commitTransaction();
      res.status(201).send({
        status:true,
        message:'successfully deleted'
            });
    })

   
  } catch (error) {
    res.send(error.message);
  } finally {
  SESSION.endSession();
} 
}

module.exports = {Dailyreport,deleteByOrderId};
