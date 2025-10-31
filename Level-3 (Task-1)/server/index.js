const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { connect } = require('./Database/dbconnect');
const userRoutes = require('./routes/UserRoutes');
const orderRoutes = require('./routes/OrderRoutes');
const app = express();

// Enable CORS for the frontend origin and allow common headers used by fetch
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// Parse JSON bodies
app.use(express.json());

// Connect to database
connect();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});