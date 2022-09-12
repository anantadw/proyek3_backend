const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const validator = require('express-validator')
const passport = require('passport')

const app = express()
const PORT = 3000

const userController = require('./controllers/UserController')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// connect to database mongoDB
mongoose.connect("mongodb://localhost/pertemuan2_users", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', () => console.log('Database Connected'))

// validation
var validateRegister = [
    validator.body('fullname')
        .exists().withMessage('Nama perlu diisi').bail()
        .isLength({min: 3}).withMessage('Nama minimal 3 karakter').bail()
        .isAlpha().withMessage('Nama hanya berisi huruf').bail()
        .trim().escape(),
    validator.body('email')
        .exists().withMessage('Email perlu diisi').bail()
        .isEmail().withMessage('Email tidak valid').bail()
        .trim().escape().normalizeEmail(),
    validator.body('password')
        .exists().withMessage('Password perlu diisi').bail()
        .isLength({min: 8}).withMessage('Password minimal 8 karakter').bail()
        .matches('[0-9]').withMessage('Password harus ada angka').bail()
        .matches('[A-Z]').withMessage('Password harus ada karakter kapital').bail()
        .trim().escape()
]

var validateLogin = [
    validator.body('email')
        .exists().withMessage('Email perlu diisi').bail()
        .isEmail().withMessage('Email tidak valid')
        .trim().escape().normalizeEmail(),
    validator.body('password')
        .exists().withMessage('Password perlu diisi').bail()
        .trim().escape()
]

app.get('/login', (req, res) => {
    res.render('login', {title: 'Login'})
})

app.get('/register', (req, res) => {
    res.render('register', {title: 'Register'})
})

app.post('/register', validateRegister, userController.register)

app.post('/login', validateLogin, userController.login)

app.get('/user', (req, res) => {
    res.render('user/index')
})

app.get('/logout', (req, res) => {
    res.redirect('/login')
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))