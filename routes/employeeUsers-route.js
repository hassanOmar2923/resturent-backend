const express = require('express');
const {
    Get,
    GetById,
    Post,
    Put,
    Delete,
    verify
} = require('../controllers/employeeUser-controller');

const router = express.Router();
router.get('/', Get);
router.get('/:id', GetById);
router.post('/', Post);
router.post('/verify', verify);
router.put('/:id', Put);
router.delete('/:id', Delete);

module.exports = router;
