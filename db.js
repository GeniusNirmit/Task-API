const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect( process.env.URL, { }).then(
    console.log("Database connection established")
)