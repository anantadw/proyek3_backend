const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000

const authRouter = require('./routes/auth')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// routes
app.use('/auth', authRouter)

app.get('/user', (req, res) => {
    res.render('user/index')
})

// connect to database mongoDB
mongoose.connect("mongodb://localhost/pertemuan2_users", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', () => console.log('Database Connected'))

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))