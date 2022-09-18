const User = require('../models/User')
const validator = require('express-validator')
const bcrypt = require('bcrypt')

const register = (req, res) => {
    const errors = validator.validationResult(req)

    // check validation errors
    if (!errors.isEmpty()) {
        req.flash('errors', errors.array())
        return res.redirect('/register')
    }

    // check if data already exist
    User.findOne({email: req.body.email}, (error, user) => {
        if (error) {
            req.flash('error', 'Error : ' + error)
            return res.redirect('/register')
        } else if (user) {
            req.flash('error', 'Email is already registered')
            return res.redirect('/register')
        } else {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);

            const newUser = new User({
                fullname: req.body.fullname,
                email: req.body.email,
                password: hashedPassword,
                isActive: true,
                role: 'user'
            })

            newUser.save()
                .then(user => {
                    req.flash('success', 'Account successfully registered')
                    return res.redirect('/login')
                })
                .catch(error => {
                    req.flash('error', 'Failed to register account: ' + error)
                    return res.redirect('/register')
                })
        }
    })
}

const login = (req, res) => {
    const errors = validator.validationResult(req)

    // check if there is error
    if (!errors.isEmpty()) {
        req.flash('errors', errors.array())
        return res.redirect('/login')
    }

    // check if data already exist
    User.findOne({email: req.body.email}, (error, user) => {
        if (error) {
            req.flash('error', 'Error: ' + error)
            return res.redirect('/login')
        } else if (user) {
            req.flash('success', 'User found')
            return res.redirect('/login')
        } else {
            req.flash('error', 'User not found')
            return res.redirect('/login')
        }
    })
}

module.exports = {register, login}