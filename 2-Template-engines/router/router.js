var express = require('express')
var router = express.Router()
var validate = require('../validate/user.validate')

const controller = require('../controller/user.controller')

router.get('/', controller.index)

router.get('/users/index', controller.users)

router.get('/users/search', controller.usersSearch)

router.get('/users/create', controller.userCreateGet)

router.get('/users/:id', controller.getParams)

router.post('/users/create',validate.createUserPost, controller.userCreatePost)

module.exports = router