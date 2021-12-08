const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: Boolean,
        default: false,
    },
    author: String,
    deletedAt: Date,
    updatedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', taskSchema);