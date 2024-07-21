const joi = require("joi");

function orderValidation(body){
    const val=joi.object({
        

        Qty:joi.number().required(),
        orderId:joi.string().required(),
        totalAmount:joi.number().required(),
        price:joi.number().required(),
        food:joi.string().required(),
        userName:joi.string().required(),
        userID:joi.string().required(),
    })
    return val.validate(body)
}

module.exports ={orderValidation}