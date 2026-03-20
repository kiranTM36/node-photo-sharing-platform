const express = require('express')
const db = require('./db')
const bcrypt = require('bcrypt')
const session = require('express-session')
const app = express()

const userModel = require('./model/userModel')
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({extended : true}))

const userRoute = require('./route/userRoute')
const postRoute = require('./route/postRoute')
app.use(session({
    secret : 'mySession',
    resave : false,
    saveUninitialized : false
}))
const logTime = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Requested to ${req.originalUrl}`)
    next()
}

const authUser = (req, res, next) => {
    if(!req.session.user){
        res.send("Please login")
    }
    next()
}

app.use(logTime)
app.get('/', (req, res) => {
    res.send("Welcome❤️")
})

app.use('/user',userRoute)
app.use('/post',authUser,postRoute)

const PORT = 11000
app.listen(PORT , () => {
    console.log("Project started...")
})