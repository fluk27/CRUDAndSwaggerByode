const route = require('express').Router()
const {modify,deleteUser,findAll,findByID} = require('../controllers/user.controllers')
route.get('/user',findAll)
route.get('/user/:id',findByID)
route.put('/user/:id',modify)
route.delete('/user/:id',deleteUser)
module.exports=route