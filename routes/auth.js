const express = require('express')
const router = express.Router()
const passport = require('passport')
const connectEnsureLogin = require('connect-ensure-login')

const authController = require('../controllers/AuthController')
const authValidator = require('../validation/auth')

router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/login', connectEnsureLogin.ensureLoggedOut('/user'), authController.loginPage)

router.get('/register', connectEnsureLogin.ensureLoggedOut('/user'), authController.registerPage)

router.post('/register', authValidator.validateRegister, authController.register)

router.post('/login', authValidator.validateLogin, authController.login, passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/login',
    failureFlash: true
}))

router.post('/logout', authController.logout)

module.exports = router