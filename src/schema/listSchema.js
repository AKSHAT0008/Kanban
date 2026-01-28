const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    title:{
        type: String,
        // unique: true,
        required: true,
        trim: true
    },
    boardID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    },
    isArchived: {
        type: Boolean,
        required: true,
        default: false
    },
    orderKey:{
        type: Number,
        required: true,
    }
},{
    timestamps: true,
})

const List = mongoose.model('List', listSchema);
module.exports = List