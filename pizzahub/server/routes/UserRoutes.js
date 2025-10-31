const express = require('express');
const bcrypt = require('bcrypt') 
const router = express.Router();
const User = require('../model/UserModel');
// const { hash } = require('bcrypt');
router.post('/signup',async (req,res)=>{
    const {name,email,password}= req.body;
    if(!name||!email||!password){
         res.status(401).json({
      message: 'Please enter all the fields',
    });
    }
     const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const hashpassword = await bcrypt.hash(password,10)
    const user = await User.create({name,email,password:hashpassword});
     res.status(201).json({
      message: '🎉 User created successfully',
      user
    });
}),
router.post('/signin',async (req,res)=>{
         const {email,password}= req.body;
    if(!email||!password){
         res.status(401).json({
      message: 'Please enter all the fields',
    });
    }
     const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'Email not registered' });
    }
     const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If everything is good
    res.status(200).json({
      message: '🎉 User logged in successfully',
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email
      }
    });
})


module.exports = router;