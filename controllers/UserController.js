const User = require('../models/User')
const validator = require('express-validator')

const register = (req, res) => {
    const errors = validator.validationResult(req)

    // check if there is error
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    // check if data already exist
    User.findOne({email: req.body.email}, (err, doc) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        } else if (doc) {
            return res.status(409).json({
                error: 'User sudah terdaftar'
            })
        } else {
            const newUser = new User(req.body)
            newUser.save()
                .then(item => {
                    res.status(201).json({
                        message: 'User berhasil diregistrasi'
                    });
                })
                .catch(err => {
                    res.status(400).json({
                        message: 'User gagal diregistrasi: ' + err
                    });
                })
        }
    })
}

const login = (req, res) => {
  const errors = validator.validationResult(req)

    // check if there is error
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    // check if data already exist
    User.findOne({email: req.body.email}, (err, doc) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        } else if (doc) {
            return res.status(409).json({
                error: 'User sudah terdaftar'
            })
        } else {
            return res.status(200).json({
                message: 'Success'
            })
        }
    })
}

module.exports = {register, login}