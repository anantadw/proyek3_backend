const express = require('express')
const router = express.Router()

const authController = require('../controllers/AuthController')
const authValidator = require('../validation/auth')

router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/login', (req, res) => {
    res.render('login', {title: 'Login'})
})

router.get('/register', (req, res) => {
    res.render('register', {title: 'Register Account'})
})

router.post('/register', authValidator.validateRegister, authController.register)

router.post('/login', authValidator.validateLogin, authController.login)

module.exports = router