const localStrategy = require('passport-local').Strategy
const User = require('./models/User')
const bcrypt = require('bcrypt')

function initialize(passport) {
    const authenticateUser = (email, password, done) => {
        User.findOne({email: email}, async function (error, user) {
            if (error) return done(error)
            if (!user) return done(null, false, {message: 'Email or password is incorrect'})
            try {
                if (await bcrypt.compare(password, user.password)) {
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Email or password is incorrect'})
                }
            } catch (error) {
                done(error)
            }
        })
    }

    passport.use(new localStrategy({usernameField: 'email'}, authenticateUser))

    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        User.findById(id, function (error, user){
            done(error, user)
        })
    })
}

module.exports = initialize