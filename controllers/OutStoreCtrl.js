const { OutStoreModel } = require('../models/OutStoreModel');
// const { StoreItemModel } = require('../models/StoreItemmodel');
const { OutStoreValidator } = require('../validations/OutStoreValidation');

const OutStoreget = async (req, res) => {
  try {
    const outstoredata = await OutStoreModel.find();
    res.status(200).send(outstoredata);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
// get by id
const OutStoregetById = async (req, res) => {
  try {
    const { id } = req.params;
    const outStoredata = await OutStoreModel.findById(id);
    if (!outStoredata) return res.status(404).send('not found');
    res.status(200).send(outStoredata);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
// post
const OutStorePost = async (req, res) => {
  try {
    const { error } = OutStoreValidator(req.body);
    if (error) return res.status(400).send(error.message);
    const outStorepost = await OutStoreModel(req.body);
    await outStorepost.save();
    res.status(200).send({
      status: true,
      message: 'successfully inserted data ',
      outStorepost,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};
// update
const updateoutStoreItem = async (req, res) => {
  try {
    const { error } = OutStoreValidator(req.body);
    if (error) return res.status(400).send(error.message);
    const { id } = req.params;
    const updateoutItem = await OutStoreModel.findByIdAndUpdate(
      id,
      {
        Description: req.body.Description,
      },
      { new: true }
    );
    res.status(200).send({
      status: true,
      message: 'Updated item successfully',
      updateoutItem,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};
// delete
const deleteoutstoreitem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedata = await OutStoreModel.findByIdAndDelete(id);
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
  OutStoreget,
  OutStoregetById,
  OutStorePost,
  updateoutStoreItem,
  deleteoutstoreitem,
};
