const express = require('express');
const { getAll, getById, Post, Delete, Put, getBySelection, getByfilter} = require('../controllers/customer-contraller');


const route=express.Router()

route.get('',getAll)
route.get('/getBySelection/:id',getBySelection)
route.get('/:id',getById)
route.post('/getBySelection',getByfilter)
route.post('/',Post)
route.put('/:id',Put)
route.delete('/:id',Delete)


module.exports=route