const express = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Please Enter the Name"
    },
    email: {
        type: String,
        required: "Please Enter The Email"
    },
    password: {
        type: String,
        required: "Please Enter The Password"
    }
});

// ✅ Export the model correctly
module.exports = mongoose.model("User", userSchema);
