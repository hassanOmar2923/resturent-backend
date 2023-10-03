const express = require('express');
const { getAll, getById, Post, Delete, Put, getByCat } = require('../controllers/cart-controller');


const route=express.Router()

route.get('',getAll)
route.get('/:id',getById)
route.post('',Post)
route.put('/:id',Put)
route.delete('',Delete)


module.exports=route