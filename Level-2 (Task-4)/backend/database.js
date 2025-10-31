const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
async function Database() {
   const connect = await  mongoose.connect(process.env.MONGODB_URI)
   console.log("data base connected")
}
module.exports = Database;