const joi = require('joi');
// validation
function StoreItemValidator(storeitemval) {
  const storeval = joi.object({
    InvoiceID: joi.string().required(),
    InvoiceTotal: joi.number().required(),
    Description: joi.string().required(),
  });
  return storeval.validate(storeitemval);
}
module.exports = {
  StoreItemValidator,
};
