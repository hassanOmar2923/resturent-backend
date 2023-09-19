const express = require('express');
const report = require('../controllers/orderReport-controller');


const route=express.Router()


route.post('',report)



module.exports=route