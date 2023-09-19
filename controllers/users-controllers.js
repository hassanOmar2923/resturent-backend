const { usermodel } = require('../models/users-model');
const { loginvalidtion } = require('../validations/loginvalidation');
const { Uservalidtion } = require('../validations/users-validations');
let bcrypt = require('bcrypt');
const daysjs = require('dayjs');
const jwt = require('jsonwebtoken');
const UserGet = async (req, res) => {
  try {
    const userget = await usermodel.find();
    res.status(200).send(userget);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
// get by id
const UserGetById = async (req, res) => {
  try {
    let { id } = req.params;
    const getdata = await usermodel.findById(id);
    if (!getdata) return res.status(404).send('this user not found');
    res.status(200).send(getdata);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
// Singup
const Singup = async (req, res) => {
  try {
    // validation
    const { error } = Uservalidtion(req.body);
    if (error) return res.send(error.message);

    const existuser = await usermodel.findOne({ UserName: req.body.UserName });
    if (existuser)
      return res
        .status(400)
        .send({ message: 'User already exists please login !' });
    const userdata = await usermodel(req.body);
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    userdata.password = await bcrypt.hash(userdata.password, salt);
    //save data
    await userdata.save();
    res.status(200).send({
      status: true,
      message: 'successfully saved singup',
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};
//login
const LOGIN = async (req, res, next) => {
  try {
    // input validation from request
    let { error } = loginvalidtion(req.body);
    if (error) return res.send(error.message);
    // check email user
    const usergetdata = await usermodel.findOne({
      UserName: req.body.UserName,
    });
    if (!usergetdata)
      return res.send({ status: false, message: 'invalid email or password' });
    // check password
    let checkpas = await bcrypt.compare(
      req.body.password,
      usergetdata.password
    );
    if (!checkpas)
      return res.send({ status: false, message: 'invalid email or password' });
    // check the user active or pending
    if (usergetdata.status === 'pending') {
      return res.send({
        message:
          'sorry , This User Has Been Banned please contact the administrator ',
      });
    }
    // expiretoken
    const current = daysjs();
    const TokenExpiration = current.add(1, 'hours');
    // return console.log('TokenExpiration', TokenExpiration);
    // token and expiration
    let token = jwt.sign(
      {
        id: usergetdata._id,
        name: usergetdata.name,
        tokenExpireDate: TokenExpiration,
      },
      'ResturentKey'
    );

    res.send({ status: true, message: 'succefully login', token });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  UserGet,
  UserGetById,
  Singup,
  LOGIN,
};
