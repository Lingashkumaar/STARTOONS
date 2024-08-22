const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  patientId: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  affectedSide: { type: String, required: true },
  condition: { type: String, required: true },
  speciality: { type: String, required: true },
  medicalHistory: { type: String, required: true },
  goalReached: { type: Number, required: true }, 
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
