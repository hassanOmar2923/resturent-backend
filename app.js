const express = require('express');
const { mongoDB } = require('./helpers/DBconnection');
const app = express();

require('dotenv').config();
const cors = require('cors');
// routes exported
const userRouter = require('./routes/users-route');
const StoreItemRouter = require('./routes/StoreItemRouter');
const outStorerouter = require('./routes/OutStoreRoute');
const reportrouter = require('./routes/reportrouter');
app.use(express.json());
app.use(cors());
app.use('/user', userRouter);
app.use('/storeItem', StoreItemRouter);
app.use('/outstore', outStorerouter);
app.use('/report', reportrouter);

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


app.listen(process.env.PORT, () => {
  console.log(`listining on Port ${process.env.PORT}`);
});
app.use('/foods',foodRoute)
app.use('/order',orderRoute)
app.use('/orderReport',orderReport)
app.use('/foodCat',foodCategoryRoute)
app.listen(process.env.PORT,()=>{
    console.log(`listining on Port ${process.env.PORT}`);

});
