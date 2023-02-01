const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    taskDescription: {
        type: String,
        required: true,
        trim: true
    },
    taskStatus: {
        type: Boolean,
        default: false
    },
    taskOwner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task