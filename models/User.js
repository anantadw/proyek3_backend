const mongoose = require('mongoose')

const Schmea = mongoose.Schema

const User = new Schmea({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Users', User)