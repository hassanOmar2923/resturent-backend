const express = require('express');
const Dailyreport = require('../controllers/DailyOrderReport-controller');


const route=express.Router()


route.get('',Dailyreport)



module.exports=route