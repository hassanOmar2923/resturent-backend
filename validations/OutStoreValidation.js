const joi = require('joi');
// validation
function OutStoreValidator(outmval) {
  const outval = joi.object({
    Description: joi.string().required(),
    Date: joi.date(),
  });
  return outval.validate(outmval);
}
module.exports = {
  OutStoreValidator,
};
