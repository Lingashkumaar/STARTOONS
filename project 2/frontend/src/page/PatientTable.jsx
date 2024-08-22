import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PatientTable = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients/all');
        setPatients(response.data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;
  if (error) return <Typography variant="h6" sx={{ textAlign: 'center', color: 'red', my: 4 }}>{error}</Typography>;

  const handleRowClick = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 'lg', mx: 'auto', my: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
        Patient Data
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Patient ID</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Affected Side</TableCell>
            <TableCell>Condition</TableCell>
            <TableCell>Speciality</TableCell>
            <TableCell>Medical History</TableCell>
            <TableCell>Goal Reached</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow
              key={patient._id}
              onClick={() => handleRowClick(patient._id)} 
              sx={{ cursor: 'pointer' }} 
            >
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.patientId}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.affectedSide}</TableCell>
              <TableCell>{patient.condition}</TableCell>
              <TableCell>{patient.speciality}</TableCell>
              <TableCell>{patient.medicalHistory}</TableCell>
              <TableCell>{patient.goalReached}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PatientTable;
