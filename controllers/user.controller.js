const express = require('express')
const User = require('../models/user.models')
const router = new express.Router()

// Create User
router.post('/users', async (req,res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send({user})
    }
    catch(e) {
        res.status(400).send(e)
    }
})

// Read All Users
router.get('/users',async (req,res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    }
    catch(e) {
        res.status(400).send()
    }
})

// Read User
router.get('/users/:id', async (req, res) => {
    console.log(req)
    try {
        const user = await User.findById(req.params.id)
        res.status(200).send(user)
    }
    catch(e) {
        res.status(400).send(e)
    }
})

// Update User
router.patch('/users/:id', async(req,res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body, { new: true, runValidators: true})    
        if(!user)
        {
            return res.status(404).send()
        }
        res.status(200).send(user)
    }
    catch(e) {
        res.status(400).send(e)
    }
})

// Delete Task
router.delete('/users/:id', async (req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.send(200)
    }
    catch(e) {
        res.status(500).send()
    }
})

module.exports = router