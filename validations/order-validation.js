const joi = require("joi");

function orderValidation(body){
    const val=joi.object({
        

        Qty:joi.number().required(),
        food:joi.string().required(),
    })
    return val.validate(body)
}

module.exports ={orderValidation}