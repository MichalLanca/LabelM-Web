require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database")
  })
  .catch((error) => {
    console.log(error)
  })
}

module.exports = connectDB;


