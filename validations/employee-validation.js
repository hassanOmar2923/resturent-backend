const joi = require('joi');
// validation
function employeeValidator(outmval) {
  const outval = joi.object({
    name: joi.string().required(),
    number: joi.number().required(),
  });
  return outval.validate(outmval);
}
module.exports = {
    employeeValidator,
};
