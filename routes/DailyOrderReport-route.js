const express = require('express');
const {Dailyreport, deleteByOrderId} = require('../controllers/DailyOrderReport-controller');


const route=express.Router()


route.get('',Dailyreport)
route.post('',deleteByOrderId)



module.exports=route