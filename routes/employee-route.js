const express = require('express');
const {
    Get,
    GetById,
    Post,
    Put,
    Delete,
} = require('../controllers/employee-controller');

const router = express.Router();
router.get('/', Get);
router.get('/:id', GetById);
router.post('/', Post);
router.put('/:id', Put);
router.delete('/:id', Delete);

module.exports = router;
