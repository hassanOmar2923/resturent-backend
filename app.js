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
const foodRoute=require('./routes/food-route')
const orderRoute=require('./routes/order-route')
const foodCategoryRoute=require('./routes/footCategort-route')
const orderReport=require('./routes/orderReport-route')
const Dailyreport=require('./routes/DailyOrderReport-route')
const cartRoute=require('./routes/cart-route')
const loginRoute=require('./routes/login-route')
const userRoute=require('./routes/users-route');
const customerRoute=require('./routes/customer-route');
const custTransectionRoute=require('./routes/custTransection-route');
const custPaymentRoute=require('./routes/cust-payment-route');
const { Authentication } = require('./middlewares/Auth');
app.use(express.json());
app.use(cors());
require('dotenv').config()
mongoDB();

app.get('/', function (req, res) {
  res.send('EndPoint');
});
app.use('/login',loginRoute)
app.use('/users',userRoute)

// app.use(Authentication())
app.use('/DailyOrderReport',Dailyreport)
app.use('/cart',cartRoute)

app.use('/user', userRouter);
app.use('/storeItem', StoreItemRouter);
app.use('/outstore', outStorerouter);
app.use('/report', reportrouter);
app.use('/foods',foodRoute)
app.use('/order',orderRoute)
app.use('/orderReport',orderReport)
app.use('/foodCat',foodCategoryRoute)
app.use('/customers',customerRoute)
app.use('/custTransection',custTransectionRoute)
app.use('/custPayment',custPaymentRoute)
app.listen(process.env.PORT,()=>{
    console.log(`listining on Port ${process.env.PORT}`);
});
