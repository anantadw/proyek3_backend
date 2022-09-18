const express = require('express')
const router = express.Router()
const connectEnsureLogin = require('connect-ensure-login')

const userController = require('../controllers/UserController');

router.get('/', (req, res) => {
    res.redirect('/user/dashboard')
})

router.get('/dashboard', connectEnsureLogin.ensureLoggedIn('/login'), userController.dashboard)

module.exports = router