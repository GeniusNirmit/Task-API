const mongoose = require("mongoose")

const userSchema = new mongoose.Schema ({
    userName: 
    {
        type: String,
        required: true,
        trim: true
    },
    userEmail: 
    {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase:true,
        validate(email) {
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
            if(!emailRegex.test(email)) {
                throw new Error('Invalid email')
            }
        }
    },
    userPassword: 
    {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(password) {
            if(password.toLowerCase().includes('password')) {
                throw new Error('Password cannnot contain "password"')
            }
        }
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User