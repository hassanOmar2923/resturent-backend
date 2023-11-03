const express = require('express');
const { getAll, getById, Post, Delete, Put, updateStatus, getActiveFood, addImg} = require('../controllers/foods-controller');
const multer = require('multer');


const route=express.Router()

route.get('',getAll)
route.get('/getActiveFood',getActiveFood)
route.get('/:id',getById)
route.put('/status/:id',updateStatus)
route.put('/uplaod/:id',addImg)
route.post('',Post)
route.put('/:id',Put)
route.delete('/:id',Delete)


module.exports=route