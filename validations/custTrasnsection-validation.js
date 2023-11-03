const joi = require("joi");

function custTransectionValidation(body){
    const val=joi.object({
        customerId:joi.string().required(),
        Amount:joi.number().required(),
        orderId:joi.string().required(),
        Date:joi.string(),
    })
    return val.validate(body)
}

module.exports ={custTransectionValidation}