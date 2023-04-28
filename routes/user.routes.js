const express = require('express')
const User = require('../models/user.models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const auth = require("../middleware/auth")
const router = new express.Router()


router.post('/register', async(req,res) => {
    const { user_name, user_email, user_password } = req.body
    try {

        const old_user = await User.findOne({user_email})

        if(old_user)
            return res.status(409).send("You are already a user. Please login")

        encrypted_password = await bcrypt.hash(user_password, 8)

        const user = new User({
            user_name,
            user_email,
            user_password: encrypted_password,
            source: "local"
        })
        await user.save()

        const token = await jwt.sign(
            {user_id: user._id,user_email},
            process.env.TOKEN_KEY,
            { expiresIn: "1h" }
        )
        user.user_token = token 
        await user.save()

        res.json({ token: token }).status(201)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.post('/login', async(req,res) => {
    const { entered_email, entered_password } = req.body
    try
    {
        const user = await User.findOne({entered_email})
        
        if(user && (await bcrypt.compare(entered_password, user.user_password)))
        {
            const token = jwt.sign(
                {user_id:user._id, entered_email},
                process.env.TOKEN_KEY,
                { expiresIn: "1h" }
            )
            
            user.token = token
            await user.save()
            return res.json({ token: token }).status(200)
        }
        else
            res.status(404).send("User Not Found. Enter valid credentials.")
    }
    catch(e) {
        res.status(400).send(e)
    }
})

// router.get('/logout', (req,res) => {
//     res.status(200).send({ auth: false, token: NULL}) 
// })

router.get('/g', (req,res) => {
    res.render('google.ejs')
})

router.get('/auth/google', 
    passport.authenticate('google', {
        scope: ["profile", "email"]
    })
)

router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: "/g",
        successRedirect: "/profile",
        failureFlash: true,
        successFlash: "Successfully logged in!!!"
    })
)

router.get('/home', auth, (req,res) => {
    res.status(200).send("Welcome to the Home Page")
})

module.exports = router