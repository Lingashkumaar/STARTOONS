const mongoose = require('mongoose');

const loginHistorySchema = new mongoose.Schema({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  count: { type: Number, default: 0 }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  lastLoginDate: { type: Date },
  role: { type: String, required: true },
  loginHistory: [loginHistorySchema]  
});

module.exports = mongoose.model('User', userSchema);
