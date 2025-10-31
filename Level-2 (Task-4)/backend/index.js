const express = require('express');
const Database = require('./database');
const cors = require('cors')
const dotenv = require('dotenv').config();
const userRouter = require('./routes/userRoutes.js');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRouter); // ✅ Connect router
Database();
const PORT = process.env.PORT||5001;
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})