const joi = require('joi');
// validation
function employeeUserValidator(outmval) {
  const outval = joi.object({
    employeeId: joi.string().required(),
    pin: joi.number().required().min(6),
    status: joi.string(),
  });
  return outval.validate(outmval);
}
function employeeUserLoginValidator(outmval) {
  const outval = joi.object({
    pin: joi.number().required().min(6),
    status: joi.string(),
  });
  return outval.validate(outmval);
}
module.exports = {
    employeeUserValidator,
    employeeUserLoginValidator
};
