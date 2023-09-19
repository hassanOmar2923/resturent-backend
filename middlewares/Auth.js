let jwt = require('jsonwebtoken');
const { usermodel } = require('../models/users-model');
const dayjs = require('dayjs');

const Authotications = async (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) return res.send('sorry not authorized');
  const token = header.split(' ')[1];

  try {
    const Decoded = jwt.verify(token, 'ResturentKey');
    // console.log(Decoded);
    const { tokenExpireDate } = Decoded;
    let todays = dayjs();
    let tokendate = dayjs(tokenExpireDate);
    remendidsecondToken = tokendate.diff(todays, 'seconds');
    // console.log('remendidsecondToken', remendidsecondToken);
    if (remendidsecondToken < 0)
      return res
        .status(403)
        .send({ message: 'tokenExpired please logout!  then login ' });

    const userdata = await usermodel.findById(Decoded.id);
    if (!userdata) return res.status(404).send('user not found');
    // console.log(userdata);
    if (userdata.status == 'pending')
      return res.status(403).send({
        message:
          'sorry , This User Has Been Banned please contact the administrator ',
      });

    next();
  } catch (error) {
    res.status(401).send(error.message);
  }
};
module.exports = Authotications;
