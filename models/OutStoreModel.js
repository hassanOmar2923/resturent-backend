const mongoose = require('mongoose');
const OutStoreSchema = new mongoose.Schema(
  {
    Description: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      default: Date,
      // required: true,
    },
  },
  { timestamps: true }
);
const OutStoreModel = mongoose.model('OutStore', OutStoreSchema);

module.exports = {
  OutStoreModel,
};
