const mongoose = require('mongoose');
const userShema = new mongoose.Schema(
  {
    FullName: {
      type: String,
      required: true,
    },
    UserName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'pending'],
    },
  },
  { timestamps: true }
);

// model
const usermodel = mongoose.model('users', userShema);

module.exports = {
  usermodel,
};
