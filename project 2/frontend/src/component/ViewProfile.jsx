import React from 'react';
import { Box, Typography, Card, Avatar, Grid, Divider, IconButton } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const ViewProfile = ({ patient }) => {
  console.log(patient);

  return (
    <Box
      className="p-4 bg-white"
      sx={{
        maxWidth: 600,
        mx: 'auto',
        my: 4,
        boxShadow: 3, 
        maxWidth:"30%",
        borderRadius: 2 
      }}
    >
      {/* Header Section */}
      <Box display="flex" alignItems="center" mb={2}>
        <Box ml={2}>
          <Typography variant="h6" className="text-[#012E57]">
            {patient.name}, {patient.gender}/{patient.age}
          </Typography>
          <Typography variant="subtitle2" className="text-[#7D7D7D]">
            Patient ID: {patient.patientId}
          </Typography>
        </Box>
        <IconButton sx={{ ml: 'auto' }}>
          <Avatar sx={{ width: 56, height: 56, color: '#012E57', border: '2px solid #012E57', background: 'white' }} />

        </IconButton>
      </Box>

      <Card sx={{ 'background': '#002647', 'marginBottom': '1rem', 'padding': '1rem', 'borderRadius': '1rem', boxShadow: 3, borderRadius: 2 }} >
        <Typography variant="subtitle1" className="text-white">
          Goal reached
        </Typography>

        <Box display="flex" alignItems="center"  >
          <Gauge width={200} height={150} value={patient.goalReached} startAngle={-90} endAngle={90} 
           sx={{
            [`& .MuiGauge-valueText text`]: {  // Targeting the <text> element directly
              fill: '#FFFFFF',  // Set text color to white
              fontSize: 40,
            },
            [`& .MuiGauge-valueText tspan`]: {  // Ensure <tspan> also has the correct color
              fill: '#FFFFFF',  // Set text color to white
            },
            [`& .${gaugeClasses.valueArc}`]: {
              fill: '#FCB000',
            },
            [`& .${gaugeClasses.referenceArc}`]: {
              fill: (theme) => theme.palette.text.disabled,
            },
          }}  />
        </Box>
      </Card>

      {/* Contact Information */}
      <Grid container spacing={2} className="mb-4">
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" gap={5}>
            <Typography variant="body2" className="text-[#7D7D7D]">
              Phone
            </Typography>
            <div className='flex justify-center items-center'>
              <PhoneIcon className="text-[#012E57]" />
              <Typography variant="body1" className="ml-2">
                {patient.phone}
              </Typography>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" gap={5}>
            <Typography variant="body2" className="text-[#7D7D7D]">
              Email
            </Typography>
            <div className='flex justify-center items-center'>
              <EmailIcon className="text-[#012E57]" />
              <Typography variant="body1" className="ml-2">
                {patient.email}
              </Typography>
            </div>
          </Box>
        </Grid>
      </Grid>

      {/* Medical Details */}
      <Grid container spacing={2} className="mt-4">
        <Grid item xs={12} gap={5} display="flex" alignItems="center">
          <Typography variant="body2" className="text-[#7D7D7D]">
            Affected side
          </Typography>
          <Typography variant="body1" className="text-[#2C2B2B]">
            {patient.affectedSide}
          </Typography>
        </Grid>
        <Grid item xs={12} gap={5} display="flex" alignItems="center">
          <Typography variant="body2" className="text-[#7D7D7D]">
            Condition
          </Typography>
          <Typography variant="body1" className="text-[#2C2B2B]">
            {patient.condition}
          </Typography>
        </Grid>
        <Grid item xs={12} gap={5} display="flex" alignItems="center">
          <Typography variant="body2" className="text-[#7D7D7D]">
            Speciality
          </Typography>
          <Typography variant="body1" className="text-[#2C2B2B]">
            {patient.speciality}
          </Typography>
        </Grid>
        <div className=' border-b-2 border-gray-500 p-2 w-full'></div>
        <Grid item xs={12} gap={5} display="flex" alignItems="center">
          <Typography variant="body2" className="text-[#012E57] flex items-center">
            <MedicalServicesIcon className="mr-2" />
            Medical history
          </Typography>
          <Typography variant="body1" className="text-[#2C2B2B]">
            {patient.medicalHistory}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewProfile;
