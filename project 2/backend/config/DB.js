const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Project2");
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
};
module.exports = connectDB;
