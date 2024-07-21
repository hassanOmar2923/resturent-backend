const joi = require("joi");

function cartValidation(body){
    const val=joi.object({
        

        Qty:joi.number().required(),
        orderId:joi.string().required(),
        totalAmount:joi.number().required(),
        price:joi.number().required(),
        food:joi.string().required(),
        name:joi.string(),
        Date:joi.string(),
        userName:joi.string().required(),
        userID:joi.string().required(),
      
    })
    return val.validate(body)
}

module.exports ={cartValidation}