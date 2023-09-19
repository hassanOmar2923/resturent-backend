const express = require('express');
const { getAll, getById, Post, Delete, Put, updateStatus, getActiveFood} = require('../controllers/foods-controller');
const multer = require('multer');
const { storage, updateImg } = require('../controllers/uplaoding-controller');


const route=express.Router()

route.get('',getAll)
route.get('/getActiveFood',getActiveFood)
route.get('/:id',getById)
route.put('/status/:id',updateStatus)
const uplaod=multer({
    storage:storage
})
route.put('/uplaod/:id',uplaod.single('file'),updateImg)
route.post('',Post)
route.put('/:id',Put)
route.delete('/:id',Delete)


module.exports=route