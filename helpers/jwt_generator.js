const jwt = require('jsonwebtoken');
require('dotenv').config();
// const dayjs=require('dayjs');
const jwtSign=(user)=>{
//   let current=dayjs();
//   let TokenDateExpired = current.add(600, 'seconds');
    const token = jwt.sign(
        {
          id: user._id,
          name: user.email,
          Role:user.role
        },
        process.env.token
   
      );
      return token
}
module.exports={jwtSign}