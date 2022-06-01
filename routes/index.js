const express = require('express')
const router = express.Router()

const todos = require('./modules/todos')
const home = require('./modules/home')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

router.use('/users',  users)
router.use('/todos', authenticator, todos)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router