const express = require('express')
const Task = require('../models/task.models')
const User = require('../models/user.models')
const router = new express.Router()

// Create Task
router.post('/tasks', async (req,res) => {  
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send({task})
    }
    catch(e) {
        res.status(400).send(e)
    }
})

// Read All Tasks
router.get('/tasks',async (req,res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    }
    catch(e) {
        res.status(400).send()
    }
})

// Read Task
router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.status(200).send(task)
    }
    catch(e) {
        res.status(400).send(e)
    }
})

// Update Task 
router.patch('/tasks/:id', async(req,res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id,req.body, { new: true, runValidators: true})    
        if(!task)
        {
            return res.status(404).send()
        }
        res.status(200).send(task)
    }
    catch(e) {
        res.status(400).send(e)
    }
})

// Delete Task
router.delete('/tasks/:id', async (req,res) => {
    try {
        await Task.findByIdAndDelete(req.params.id)
        res.send(200)
    }
    catch(e) {
        res.status(500).send()
    }
})

module.exports = router