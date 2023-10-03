const { jwtSign } = require("../helpers/jwt_generator");
const { usersModel } = require("../models/users-model");
const { loginValidation } = require("../validations/login-validtion")
const bcrypt=require('bcrypt')
let jwt = require('jsonwebtoken');
require('dotenv').config();

//login function
const login = async (req, res) => {
    try {
        // validation
        const { error } = loginValidation(req.body);
        if (error) return res.status(449).send(error.message);
    
        // find user data
        const usergetdata = await usersModel.findOne({
            email: req.body.email,
        });
        if (!usergetdata)
          return res.status(401).send({
            status: false,
            message: 'username or password is incorrect',
          });
        // check password
        const checkpass = await bcrypt.compare(
          req.body.password,
          usergetdata.password
        );
        if (!checkpass)
          return res.status(401).send({
            status:false,
            message: 'username or password is incorrect',
          });
          // console.log(usergetdata);
        if(usergetdata.status === "pending") return res.status(401).send({status: false, message:'this user is already pending,pls contact the administrator'})

        // token using jwt
        const ourToken=jwtSign(usergetdata)
        
    
        res.status(200).header('authorization', ourToken).json({
          status: true,
          message: 'successfully logged in',
          token: ourToken,
          Role:usergetdata.role
        });
      } catch (error) {
        res.status(400).send(error.message);
      }
};

module.exports = {login};