const express = require('express');
const mongoose = require('mongoose');
const UserSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:"Please Enter Your Name"
        },
        email:{
            type:String,
            required:"Please Enter Your Email"
        },
        password:{
            type:String,
            required:"Please Enter Your Password"
        }
    }
)
module.exports = mongoose.model('User',UserSchema);