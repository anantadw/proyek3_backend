const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')

const app = express()
const PORT = 3000

const authRouter = require('./routes/auth')

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

// routes
app.use('/', authRouter)

// connect to database mongoDB
mongoose.connect("mongodb://localhost/pertemuan2_users", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', () => console.log('Database Connected'))

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))