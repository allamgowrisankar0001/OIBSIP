const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL);
        console.log('connected to database:', db.connection.name);
    } catch (err) {
        console.error('DB connection error:', err);
    }
}

module.exports = { connect };
