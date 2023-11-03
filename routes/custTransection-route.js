const express = require('express');
const { getAll, getById, Post, Delete, Put, ordersById } = require('../controllers/custTransection-controller');


const route=express.Router()

route.get('',getAll)
route.get('/ordersById',ordersById)
route.get('/:id',getById)
route.post('',Post)
route.put('/:id',Put)
route.delete('/:id',Delete)


module.exports=route