const express = require('express');
const { mongoDB } = require('./helpers/DBconnection');
const app = express();
require('dotenv').config()
app.use(express.json());
mongoDB();
app.get('/', function (req, res) {
  res.send('welcome to resturent backen');
});

app.listen(process.env.PORT,()=>{
    console.log(`listining on Port ${process.env.PORT}`);
});

