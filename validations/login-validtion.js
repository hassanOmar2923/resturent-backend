const joi = require('joi')
//users validation
function loginValidation(user){
    const loginVal=joi.object({
        email:joi.string().email({ tlds: { allow: false } }).required(),
        password:joi.string().required(),
    })
    return loginVal.validate(user)
}
module.exports={loginValidation}