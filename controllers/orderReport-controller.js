const express = require('express');
const moment = require('moment');
const { orderModel } = require("../models/order-model");



const report= async (req, res) => {
  try {
    const startDate = req.body.startDate;
    const endDate = moment(req.body.endDate).add(1, 'days');
   
    let data = await orderModel.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    }).populate({
      path: 'food',
      model:'foods',
      select: '_id name',
    })
    let total=0;
    if(data){
      data.forEach((item)=>{
        total=total+ parseFloat(item.price)*parseFloat(item.Qty)
      })
    }
 
    res.send({data:data,total:total});
  } catch (error) {
    res.send('err');
  }
    
    
  }


module.exports = report;