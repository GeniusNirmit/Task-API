const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    task_title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },
    task_description: {
        type: String,
        required: true,
        trim: true
    },
    task_status: {
        type: Boolean,
        default: false
    },
    task_owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task