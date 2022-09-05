const express = require('express')
const router = express.Router()

//Controller

const AuthController = require('../controller/AuthController')

const { eAdmin } = require('../helpers/eAdmin')

router.get('/login', AuthController.login)
router.post('/login', AuthController.loginPost)
router.get('/logout', AuthController.logout)
router.get('/show',  AuthController.showUser)
router.get('/register',  AuthController.register)
router.post('/register',  AuthController.registerPost)
router.get('/edit/:id',  AuthController.editUser)
router.post('/edit/:id',  AuthController.editUserPost)
router.get('/delete/:id', AuthController.deleteUser)

module.exports = router