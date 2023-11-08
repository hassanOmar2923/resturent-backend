const { jwtSign } = require("../helpers/jwt_generator");
const { customerModel } = require("../models/customers-model");
const { verifyCustomerModel } = require("../models/verifyCustomer-model");
const {
  verifyCustomerValidation,
} = require("../validations/verifyCustomer-validation");
const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const currentDate = dayjs();
var nodemailer = require("nodemailer");

const getAll = async (req, res) => {
  try {
    const data = await verifyCustomerModel.find();

    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await verifyCustomerModel.findById(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const Post = async (req, res) => {
  try {
    const { error } = verifyCustomerValidation(req.body);
    if (error) return res.status(400).send(error.message);
    const findCustomer = await customerModel.find({email:req.body.email})
    if(findCustomer.length == 0) return res.status(404).send({status: false, message:"Customer not found"});
// return console.log(findCustomer[0].email)
    function generateRandom4DigitNumber() {
      return Math.floor(1000 + Math.random() * 9000);
    }
    const randomNumber = generateRandom4DigitNumber();
    req.body.OTPcode = randomNumber;

    let data = req.body;

    const postData = new verifyCustomerModel(data);
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "xasancumar491@gmail.com",
        pass: `xmbj sxxa fpik xeve`,
      },
    });

    // return console.log(Email)
    var mailOptions = {
      from: "xasancumar491@gmail.com",
      to: findCustomer[0].email,
      subject: "Verify your email",
      html: `<!DOCTYPE html>

  <html
   
  lang="en">
  
  <head>
  
      
  <meta
   
  charset="UTF-8">
  
      
  <meta
   
  name="viewport"
   
  content="width=device-width, initial-scale=1.0">
  
      
  <title>OTP Verification</title>
      <style>
          body {
              font-family: sans-serif;
          }
  
          .container {
              width: 80%;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ccc;
          }
  
          .header {
              text-align: center;
              margin-bottom: 20px;
          }
  
          .logo {
              width: 150px;
              display: block;
              margin: 0 auto;
          }
  
          .message {
              font-size: 16px;
              line-height: 1.5;
          }
  
          .otp-code {
              font-size: 24px;
              font-weight: bold;
              text-align: center;
              background-color: #f2f2f2;
              padding: 10px;
              margin: 20px 0;
          }
  
          .footer {
              text-align: center;
              margin-top: 20px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <img src="https://logowik.com/content/uploads/images/restaurant9491.logowik.com.webp" alt=" Logo" class="logo">
          </div>
  
          <div class="message">
              <p>Hi there,</p>
              <p>Thank you for using our product. Please use the following OTP code to verify your email address:</p>
          </div>
  
          <div class="otp-code">
             ${randomNumber}
          </div>
  
          <div class="footer">
              <p>This OTP code will expire in 5 minutes.</p>
              <p>If you did not request this OTP, please ignore this email.</p>
          </div>
      </div>
  </body>
  </html>`,
    };

    transporter.sendMail(mailOptions).catch((err) => {
      console.log(err);
    });
    await postData.save().then(() => {
      res.status(201).send({
        status: true,
        message: "OTP code was sent!!",
      });
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};
const verify = async (req, res) => {
  try {
    // console.log(req.body);
    const findcustomer = await customerModel.find({ email: req.body.email });

    if (findcustomer.length === 0)
      return res
        .status(404)
        .send({ status: false, message: "invalid customer" });
// console.log(findcustomer)
    const findOTPcode = await verifyCustomerModel.find({
      email: findcustomer[0].email,
    }).sort({"createdAt":-1}).limit(1)
    console.log('validotp',findOTPcode);
    if (findOTPcode.length === 0)
      return res
        .status(404)
        .send({
          status: false,
          message:
            "the code was expired, or not sent yet,plz resend your otp code",
        });
    function compareCode(code, body) {
      if (code === body) return true;
      return false;
    }
    const isValidcode = compareCode(findOTPcode[0].OTPcode, req.body.OTPcode);
    console.log(findOTPcode[0].OTPcode, req.body.code)
    console.log(isValidcode);
    if (!isValidcode)
      return res.status(404).send({ status: false, message: "invalid code" });
    const token = jwt.sign(
      {
        id: findcustomer._id,
        name: findcustomer.email,
        Role: "customer",
      },
      process.env.token
    );
    res.status(200).send({
      status: true,
      token: token,
      id:findcustomer[0]._id,
      message: "success login in!!",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const Put = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = verifyCustomerValidation(req.body);
    if (error) return res.status(400).json(error.message);

    const PutData = await verifyCustomerModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).send({
      status: true,
      message: "updated!!",
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const Delete = async (req, res) => {
  try {
    const { id } = req.params;
    //delete specific databyId
    const deletedata = await verifyCustomerModel.findByIdAndDelete(id);
    res.status(200).send({
      status: true,
      message: "cart is cleared!!",
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  getAll,
  getById,
  Post,
  Put,
  Delete,
  verify,
};
