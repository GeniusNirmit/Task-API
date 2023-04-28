const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./db')
const userRouter = require('./routes/user.routes')
const taskRouter = require('./controllers/task.controllers')    
const passport = require('passport')

const app = express()

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.use(passport.initialize())
app.use(passport.session())

app.listen(process.env.PORT, () => {
    console.log('Server is up and running on ' + process.env.PORT)
})  

module.exports = app