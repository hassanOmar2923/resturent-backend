const { employeeModel } = require('../models/employee-model');
const { employeeValidator } = require('../validations/employee-validation');

const Get = async (req, res) => {
  try {
    const Get = await employeeModel.find();
    res.status(200).send(Get);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
// get by id
const GetById = async (req, res) => {
  try {
    const { id } = req.params;
    const GetById = await employeeModel.findById(id);
    // if (!outStoredata) return res.status(404).send('not found');
    res.status(200).send(GetById);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
// post
const Post = async (req, res) => {
  try {
    const { error } = employeeValidator(req.body);
    if (error) return res.status(400).send(error.message);
    const Post = await employeeModel(req.body);
    await Post.save();
    res.status(200).send({
      status: true,
      message: 'successfully inserted  ',
      Post,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};
// update
const Put = async (req, res) => {
  try {
    const { error } = employeeValidator(req.body);
    if (error) return res.status(400).send(error.message);
    const { id } = req.params;
    const Put = await employeeModel.findByIdAndUpdate(
      id,req.body,
      { new: true }
    );
    res.status(200).send({
      status: true,
      message: 'Updated item successfully',
      Put,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};
// delete
const Delete = async (req, res) => {
  try {
    const { id } = req.params;
    const Delete = await employeeModel.findByIdAndDelete(id);
    res.status(200).send({
      status: true,
      message: 'Deleted successfully',
      Delete,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  Get,
  GetById,
  Post,
  Put,
  Delete,
};
