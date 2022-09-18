const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport');
const initializePassport = require('./passport-config')

const app = express()
const PORT = 3000

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(session({
    secret: 'secretkey-123',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
initializePassport(passport)
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/', authRouter)
app.use('/user', userRouter)

// connect to database mongoDB
mongoose.connect("mongodb://localhost/pertemuan2_users", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', () => console.log('Database Connected'))

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))