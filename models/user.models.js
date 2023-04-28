const mongoose = require("mongoose")

const userSchema = new mongoose.Schema ({
    user_name: 
    {
        type: String,
        required: true,
        trim: true
    },
    user_email: 
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
    user_password: 
    {
        type: String,
        trim: true,
        minlength: 8,
        validate(password) {
            if(password.toLowerCase().includes('password')) {
                throw new Error('Password cannnot contain "password"')
            }
        }
    },
    source: 
    {
        type: String, 
        required: true,
    },
    user_token:
    {
        type: String
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User