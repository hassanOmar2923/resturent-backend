const mongoose = require('mongoose');
const employee = new mongoose.Schema(
  {
    
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
   
      required: true,
    },
  },
  { timestamps: true }
);
const employeeModel = mongoose.model('employee', employee);

module.exports = {
    employeeModel,
};
