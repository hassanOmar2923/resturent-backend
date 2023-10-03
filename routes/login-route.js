const express=require('express')
const route=express.Router()
const {login}=require('../controllers/login-controller')
//login
route.post('/',login)


module.exports = route