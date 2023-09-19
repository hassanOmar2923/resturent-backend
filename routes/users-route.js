const express = require('express');
const {
  UserGet,
  UserGetById,
  Singup,
  LOGIN,
} = require('../controllers/users-controllers');
const Authotications = require('../middlewares/Auth');

const router = express.Router();

router.get('/', Authotications, UserGet);
router.get('/:id', UserGetById);
router.post('/singup', Singup);
router.post('/login', LOGIN);
module.exports = router;
