const express = require('express');
const moment = require('moment');
const { orderModel } = require("../models/order-model");



const report= async (req, res) => {
    const startDate = req.body.startDate;
    const endDate = moment(req.body.endDate).add(1, 'days');
    const data = await orderModel.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
  
    res.send(data);
    
  }


module.exports = report;