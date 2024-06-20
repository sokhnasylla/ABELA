import React, { useState } from 'react';
import { Paper } from '@mui/material';
import "./auth.css";
import CustomizedSteppers from "./MyStep";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormUser from './Signup/FormUser';
import FormRoles from './Signup/FormRoles';
import axios from 'axios';
import { getTokenFromLocalStorage } from './authUtils';

const steps = ['User', 'Sécurité'];

function Auth({ onFormSubmit }) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    login: '',
    structure: '',
    roles:'',
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRolesAndTbRolesReady = (roles, tbRoles) => {
    console.log('Role',roles)
    console.log("TbRole",tbRoles);
    setFormData((prevData) => ({
      ...prevData,
      roles,
      tbroles:tbRoles, // Join array elements into a string
    }));
  };

  const handleNext = async () => {
    console.log(formData);
    if (
      (activeStep === 0 &&
        formData.prenom &&
        formData.nom &&
        formData.email &&
        formData.structure) ||
      activeStep === 1
    ) {
      if (activeStep === steps.length - 1) {

        const token = getTokenFromLocalStorage();
        const url = 'http://10.137.15.78:8082/abela-usermanagement/api/v1/auth/register';
        // const url = 'http://localhost:8082/abela-usermanagement/api/v1/auth/register';
        console.log(formData);
        try {
          const response = await axios.post(url, formData, {
            headers: {
              Authorization: `Bearer ${token}`,  
            },
          });
          // Handle the response as needed
          console.log(response.data);
          // Call the onFormSubmit function if provided
          if (onFormSubmit) {
            onFormSubmit(response.data);
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      // // Afficher un message d'erreur ou empêcher la progression
      // alert('Veuillez remplir tous les champs obligatoires.');
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FormUser handleInputChange={handleInputChange} formData={formData} />;
      case 1:
        return <FormRoles onRolesAndTbRolesReady={handleRolesAndTbRolesReady} formData={formData} />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <Paper id='auth'>
      <CustomizedSteppers activeStep={activeStep} />
      <React.Fragment>
        <CssBaseline />
        <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 1, md: 2 }, p: { xs: 2, md: 3 } }}>
            <Typography variant="h5" gutterBottom>
              {getStepContent(activeStep)}
            </Typography>
            <Stack sx={{ }} direction="row" spacing={2} justifyContent="flex-end">
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color='success' sx={{ backgroundColor: "#148CA8" }} onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Stack>
          </Paper>
        </Container>
      </React.Fragment>
    </Paper>
  );
}

export default Auth;
