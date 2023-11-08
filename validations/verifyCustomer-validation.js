const joi = require("joi");

function verifyCustomerValidation(body){
    const val=joi.object({
        email:joi.string().email({ tlds: { allow: false } }),
        OTPcode:joi.number(),
        Date:joi.string()
    })
    return val.validate(body)
}

module.exports ={verifyCustomerValidation}