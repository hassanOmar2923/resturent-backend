const   crypto = require('crypto')

 const sectkey = crypto.randomBytes(32).toString('hex')
//  console.log(sectkey);
 module.exports={sectkey}