

const moment = require("moment");
const { orderModel } = require("../models/order-model");



const Dailyreport= async (req, res) => {
    
   try {
   
    yesterday = new Date(new Date().setDate(new Date().getDate()-1));
    const data = await orderModel.aggregate([
        {
            $match: {
              createdAt: {
                $gte: yesterday,
                $lt: new Date()
              }
            }
          },      
        {
          $group: {
            _id: '$orderId',
            total: { $sum: '$totalAmount' }
          }
        },
        {"$sort":{"_id":-1}}
      ])
    const getData=await orderModel.find({
            "createdAt": {
                "$gte": yesterday,
                "$lt": new Date()
              }
        }).populate({
          path: 'food',
          model:'foods',
          select: '_id name',
        }).sort("-createdAt")
  
       
    
 
    res.send({byorderID:data,allData:getData});
   } catch (error) {
    res.send(error.message)
   }
    
    
  }


module.exports = Dailyreport;