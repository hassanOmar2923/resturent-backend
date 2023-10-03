const joi = require('joi')
//users validation
function usersValidation(user){
    const userVal=joi.object({
        name:joi.string().required(),
        email:joi.string().email({ tlds: { allow: false } }),
        password:joi.string().required(),
        status:joi.string(),
        role:joi.string().required(),
    })
    return userVal.validate(user)
}
module.exports={usersValidation}