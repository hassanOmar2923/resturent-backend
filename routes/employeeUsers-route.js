const express = require('express');
const {
    Get,
    GetById,
    Post,
    Put,
    Delete,
    verify,
    updateStatus
} = require('../controllers/employeeUser-controller');

const router = express.Router();
router.get('/', Get);
router.get('/:id', GetById);
router.post('/', Post);
router.post('/verify', verify);
router.put('/:id', Put);
router.put('/status/:id', updateStatus);
router.delete('/:id', Delete);

module.exports = router;
