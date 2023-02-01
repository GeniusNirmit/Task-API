const express = require('express')
require('dotenv').config()
require('./db')
const userRouter = require('./controllers/user.controller')
const taskRouter = require('./controllers/task.controllers')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(process.env.PORT, () => {
    console.log('Server is up and running on ' + process.env.PORT)
})  

module.exports = app