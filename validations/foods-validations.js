const joi = require("joi");

function foodValidation(body){
    const val=joi.object({
        
        price:joi.number().required(),
        category:joi.string().required(),
        name:joi.string().required(),
    })
    return val.validate(body)
}

module.exports ={foodValidation}