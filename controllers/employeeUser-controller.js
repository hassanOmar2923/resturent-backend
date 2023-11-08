const { employeeModel } = require('../models/employee-model');
const { employeeUsersModel } = require('../models/employeeUser-model');
const { employeeUserValidator, employeeUserLoginValidator } = require('../validations/employeeUser-validation');
const jwt = require("jsonwebtoken");

const Get = async (req, res) => {
  try {
    const Get = await employeeUsersModel.find().populate({
        path: "employeeId",
        model: "employee",
        select: "name _id",
      });
    res.status(200).send(Get);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
// get by id
const GetById = async (req, res) => {
  try {
    const { id } = req.params;
    const GetById = await employeeUsersModel.findById(id);
    // if (!outStoredata) return res.status(404).send('not found');
    res.status(200).send(GetById);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
// post
const Post = async (req, res) => {
  try {
    const { error } = employeeUserValidator(req.body);
    if (error) return res.status(400).send(error.message);
    const findEmployee = await employeeUsersModel.find({employeeId:req.body.employeeId})
    if(findEmployee.length >0) return res.send({status: false,message: 'this user has been already a pin',});
    const isPinUsed = await employeeUsersModel.find({pin:req.body.pin})
    if(isPinUsed.length >0) return res.send({status: false,message: 'this pin has already used',});
    const Post = await employeeUsersModel(req.body);
    await Post.save();
    res.status(200).send({
      status: true,
      message: 'successfully inserted ',
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};
const verify = async (req, res) => {
    try {
      const { error } = employeeUserLoginValidator(req.body);
      if (error) return res.status(400).send(error.message);
      const isValid = await employeeUsersModel.find({pin:req.body.pin})
      if(isValid.length ===0) return res.status(401).send({status: false,message: 'pinka ma ahan mid saxan',});
    //   console.log(isValid[0].employeeId)
      req.body.employeeId = isValid[0].employeeId
      const employee = await employeeModel.findById(isValid[0].employeeId);

    const token = jwt.sign(
        {
          id: employee._id,
          name: employee.name,
          Role: "waiter",
        },
        process.env.token
      );
      res.status(200).send({
        status: true,
        message: 'successfully Logged in',
        token:token
      });
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
// update
const Put = async (req, res) => {
  try {
    const { error } = employeeUserValidator(req.body);
    if (error) return res.status(400).send(error.message);
    const { id } = req.params;
    const Put = await employeeUsersModel.findByIdAndUpdate(
      id,req.body,
      { new: true }
    );
    res.status(200).send({
      status: true,
      message: 'Updated item successfully',
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};
// delete
const Delete = async (req, res) => {
  try {
    const { id } = req.params;
    const Delete = await employeeUsersModel.findByIdAndDelete(id);
    res.status(200).send({
      status: true,
      message: 'Deleted successfully',
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
  verify
};
