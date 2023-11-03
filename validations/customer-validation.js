const joi = require('joi');
// validation
function custValidator(outmval) {
  const outval = joi.object({
    customerName: joi.string().required(),
    TotalAmount: joi.number(),
    number: joi.number().required(),
  });
  return outval.validate(outmval);
}
module.exports = {
    custValidator,
};
