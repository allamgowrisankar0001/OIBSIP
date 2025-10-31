const express= require('express');
const User = require('../models/usermodel.js');
const bcrypt = require('bcrypt')
const router = express.Router();
router.post("/signup",async(req,res)=>{
    try{

        const {name,email,password} = req.body;
        console.log(req.body)
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({

            name,email,password:hashPassword
        })
         res.status(201).json({
      message: 'User created successfully!',
      user
    });
    }
    catch(err){
        console.log(err);
    }
})
router.post("/signin",async(req,res)=>{
    try{

        const {email,password} = req.body;
        console.log(req.body)

        const user = await User.findOne({email})
        if(!user){
           return res.status(400).json({message:"user not found"})
        }
        const ismatch = await bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.status(400).json({message:"wrong credentials"})
        }
         res.status(201).json({
      message: 'User logged in successfully!',
      user
    });
    }
    catch(err){
        console.log(err);
    }
})
module.exports = router;