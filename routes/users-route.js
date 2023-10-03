const express=require('express')
const route=express.Router()
const { get, Post ,updateStatus,Put,getaById,Delete}=require('../controllers/users-controllers')
//get user data
route.get('/',get)
route.get('/:id',getaById)
//post
route.post('/',Post)
//put
route.put('/:id',Put)
route.put('/status/:id',updateStatus)
//delete
route.delete('/:id',Delete)


module.exports = route