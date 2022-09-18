const express = require('express')
const router = express.Router()

const userController = require('../controllers/UserController')
const authValidator = require('../validation/auth')

router.get('/login', (req, res) => {
    res.render('login', {title: 'Login'})
})

router.get('/register', (req, res) => {
    res.render('register', {title: 'Register'})
})

router.post('/register', authValidator.validateRegister, userController.register)

router.post('/login', authValidator.validateLogin, userController.login)

router.get('/logout', (req, res) => {
    res.redirect('/login')
})

module.exports = router