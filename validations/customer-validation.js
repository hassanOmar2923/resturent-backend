const joi = require('joi');
// validation
function custValidator(outmval) {
  const outval = joi.object({
    customerName: joi.string().required(),
    TotalAmount: joi.number(),
    number: joi.number().required(),
    email:joi.string().email({ tlds: { allow: false } }),
  });
  return outval.validate(outmval);
}
module.exports = {
    custValidator,
};
