const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    name:{
        type: String,
        // unique: true,
        required: true,
        trim: true,
        default: 'default'

    },
    ownerId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isArchived: {
        type: Boolean,
        required: true,
        default: false
    }
},{
    timestamps: true,
})

const Board = mongoose.model('Board', boardSchema);
module.exports = Board