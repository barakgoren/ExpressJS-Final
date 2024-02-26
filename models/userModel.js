const express = require('express');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    tasks: {
        type: Array,
        ref: 'Task',
        default: []
    },
    role: {
        type: Array,
        default: ["User"]
    },
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;