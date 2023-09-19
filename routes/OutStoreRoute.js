const express = require('express');
const {
  OutStoreget,
  OutStoregetById,
  OutStorePost,
  updateoutStoreItem,
  deleteoutstoreitem,
} = require('../controllers/OutStoreCtrl');

const router = express.Router();
router.get('/', OutStoreget);
router.get('/:id', OutStoregetById);
router.post('/', OutStorePost);
router.put('/:id', updateoutStoreItem);
router.delete('/:id', deleteoutstoreitem);

module.exports = router;
