// frontend/src/pages/ProfilePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ViewProfile from '../component/ViewProfile';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { IoMdArrowBack } from "react-icons/io";

const ProfilePage = () => {
    const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {

      try {
        const { data } = await axios.get(`http://localhost:5000/api/patients/${id}`);
        setPatient(data);
      } catch (error) {
        console.error('Error fetching patient data', error);
      }
    };

    fetchPatient();
  }, []);

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <Button
        
        onClick={() => navigate(-1)} 
        style={{ marginBottom: '20px' , 'color':'black'}} 
        startIcon={<IoMdArrowBack />}
      >
         View Patient
      </Button>
      <ViewProfile patient={patient} />
    </div>
  );
};

export default ProfilePage;
