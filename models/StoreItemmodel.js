const mongoose = require('mongoose');
const StoreItemSchema = new mongoose.Schema(
  {
    InvoiceID: {
      type: String,
      required: true,
    },
    InvoiceTotal: {
      type: Number,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const StoreItemModel = mongoose.model('StoreItem', StoreItemSchema);

module.exports = {
  StoreItemModel,
};
