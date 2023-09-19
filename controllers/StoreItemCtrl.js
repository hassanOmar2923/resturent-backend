const { StoreItemModel } = require('../models/StoreItemmodel');
const { StoreItemValidator } = require('../validations/StoreItemValidation');

const StoreItemget = async (req, res) => {
  try {
    const storedata = await StoreItemModel.find();
    res.status(200).send(storedata);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
// get by id
const StoreItemgetById = async (req, res) => {
  try {
    const { id } = req.params;
    const storedata = await StoreItemModel.findById(id);
    if (!storedata) return res.status(404).send('not found');
    res.status(200).send(storedata);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
// post
const StoreitemPost = async (req, res) => {
  try {
    const { error } = StoreItemValidator(req.body);
    if (error) return res.status(400).send(error.message);
    const Storepost = await StoreItemModel(req.body);
    await Storepost.save();
    res.status(200).send({
      status: true,
      message: 'successfully inserted data ',
      Storepost,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};
// update
const updateStoreItem = async (req, res) => {
  try {
    const { error } = StoreItemValidator(req.body);
    if (error) return res.status(400).send(error.message);
    const { id } = req.params;
    const updateItem = await StoreItemModel.findByIdAndUpdate(
      id,
      {
        InvoiceID: req.body.InvoiceID,
        InvoiceTotal: req.body.InvoiceTotal,
        Description: req.body.Description,
      },
      { new: true }
    );
    res.status(200).send({
      status: true,
      message: 'Updated item successfully',
      updateItem,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};
// delete
const deletestoreitem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedata = await StoreItemModel.findByIdAndDelete(id);
    res.status(200).send({
      status: true,
      message: 'Deleted item successfully',
      deletedata,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};
module.exports = {
  StoreItemget,
  StoreItemgetById,
  StoreitemPost,
  updateStoreItem,
  deletestoreitem,
};
