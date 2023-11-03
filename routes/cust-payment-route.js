const express = require('express');
const { getAll, getById, Post, Delete, Put, } = require('../controllers/cust-payment-controller');


const route=express.Router()

route.get('',getAll)
route.get('/:id',getById)
route.post('',Post)
route.put('/:id',Put)
route.delete('/:id',Delete)


module.exports=route