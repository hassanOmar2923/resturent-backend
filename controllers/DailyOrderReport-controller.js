const moment = require("moment");
const { orderModel } = require("../models/order-model");

const Dailyreport = async (req, res) => {
  try {
    yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const data = await orderModel.aggregate([
      {
        $match: {
          Date: moment().format("L"),
          // createdAt: {
          //   $gte: yesterday,
          //   $lt: new Date()
          // }
        },
      },
      {
        $group: {
          _id: "$orderId",
          status: { $addToSet: "$status" },
          date: { $addToSet: "$createdAt" },
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
  try {
    // await orderModel.deleteMany({orderId:req.body.orderId})
    res.status(201).send({
status:true,
message:'successfully deleted'
    });
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = {Dailyreport,deleteByOrderId};
