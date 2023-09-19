// const Joi = require("joi");
const joi = require('joi');
// validation usermodel
function loginvalidtion(userobj) {
  let userval = joi.object({
    UserName: joi.string().required(),
    password: joi.string().required(),
  });
  return userval.validate(userobj);
}
module.exports = {
  loginvalidtion,
};
