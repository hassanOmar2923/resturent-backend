const express = require('express');
const { mongoDB } = require('./helpers/DBconnection');
const app = express();
const foodRoute=require('./routes/food-route')
const orderRoute=require('./routes/order-route')
const foodCategoryRoute=require('./routes/footCategort-route')
const orderReport=require('./routes/orderReport-route')
require('dotenv').config()
const cors=require('cors')
app.use(express.json());
app.use(cors())
mongoDB();
app.get('/', function (req, res) {
  res.send('welcome to resturent backen');
});
app.use('/foods',foodRoute)
app.use('/order',orderRoute)
app.use('/orderReport',orderReport)
app.use('/foodCat',foodCategoryRoute)
app.listen(process.env.PORT,()=>{
    console.log(`listining on Port ${process.env.PORT}`);
});

