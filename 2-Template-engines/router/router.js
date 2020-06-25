var express = require('express')
var router = express.Router()

const controller = require('../controller/user.controller')

router.get('/', controller.index)

router.get('/users', controller.users)

router.get('/users/search', controller.usersSearch)

router.get('/users/create', controller.userCreateGet)

router.get('/users/:id', controller.getParams)

router.post('/users/create', controller.userCreatePost)

module.exports = router