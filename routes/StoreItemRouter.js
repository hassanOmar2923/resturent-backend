const express = require('express');
const {
  StoreItemget,
  StoreItemgetById,
  StoreitemPost,
  updateStoreItem,
  deletestoreitem,
} = require('../controllers/StoreItemCtrl');
const Authotications = require('../middlewares/Auth');

const router = express.Router();
router.get('/', StoreItemget);
router.get('/:id', StoreItemgetById);
router.post('/', StoreitemPost);
router.put('/:id', updateStoreItem);
router.delete('/:id', deletestoreitem);

module.exports = router;
