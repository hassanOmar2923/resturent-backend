const joi = require("joi");

function foodCategoryValidation(body){
    const val=joi.object({
        
        category:joi.string().required(),
        
        
    })
    return val.validate(body)
}

module.exports ={foodCategoryValidation}