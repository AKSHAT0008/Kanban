const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    todoTitle: {
        type: String,
        // unique: true,
        required: true,
        trim: true
    },
    description: {
        type: String,
    },
    listID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
        required: true
    }, 
    orderKey: {                   
        type: Number,
        required: true
    },
    isArchived: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true,
})

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo