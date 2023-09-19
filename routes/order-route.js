const express = require('express');
const { getAll, getById, Post, Delete, Put, getByCat } = require('../controllers/order-controller');


const route=express.Router()

route.get('',getAll)
route.get('/:id',getById)
route.get('/getByCat/:id',getByCat)
route.post('',Post)
route.put('/:id',Put)
route.delete('',Delete)


module.exports=route