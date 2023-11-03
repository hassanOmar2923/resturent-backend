const mongoose = require('mongoose');
const customer = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
   
      required: true,
    },
    TotalAmount: {
      type: Number,
   default:0
    //   required: true,
    },
  },
  { timestamps: true }
);
const customerModel = mongoose.model('customer', customer);

module.exports = {
    customerModel,
};
