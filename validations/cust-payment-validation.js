const joi = require("joi");

function custPaymentValidation(body){
    const val=joi.object({
        customerId:joi.string().required(),
        Amount:joi.number().required(),
        Date:joi.string()
    })
    return val.validate(body)
}

module.exports ={custPaymentValidation}