const express = require('express');
const {  getAll,
    getById,
    Post,
    Put,
    Delete,
    verify, } = require('../controllers/verifyCustomer-controller');


const route=express.Router()

route.get('',getAll)
route.get('/:id',getById)
route.post('',Post)
route.put('/:id',Put)
route.delete('',Delete)
route.post('/verify',verify)


module.exports=route