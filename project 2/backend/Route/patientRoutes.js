const express = require('express');
const { getPatient, getAllPatient } = require('../Controller/patientController');
const router = express.Router();

router.get('/all',getAllPatient);
router.get('/:id', getPatient);
console.log("hi");

module.exports = router;
