const Patient = require('../Modules/patientModel');
const mongoose = require('mongoose');

const getPatient = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid patient ID' });
    }

    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error); 
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllPatient = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error); 
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getPatient, getAllPatient };
