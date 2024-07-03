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
import { addUser } from '../Dashboard/user.service';
import { AlertService } from '../../../utils/alert.service';

const steps = ['User', 'Sécurité'];

function AddUser({ onFormSubmit, onClose }) {
 const [alertService, setAlertService] = useState(new AlertService())
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    login: '',
    telephone: '',
    structure: '',
    roles: '',
    profils: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRolesAndTbRolesReady = (roles, tbRoles) => {
    console.log('Role', roles);
    console.log("TbRole", tbRoles);
    setFormData((prevData) => ({
      ...prevData,
      roles,
      tbroles: tbRoles,
    }));
  };

  const handleNext = async () => {
    console.log(formData);
    if (
      (activeStep === 0 &&
        formData.prenom &&
        formData.nom &&
        formData.telephone &&
        formData.login &&
        formData.structure) ||
      activeStep === 1
    ) {
      if (activeStep === steps.length - 1) {
        console.log(formData);
        addUser(formData).then(response => {
          if (response) {
            if (response.success) {
              console.log(response.data);
              if (onFormSubmit) {
                onFormSubmit(response.data);
              }
              setFormData({
                prenom: '',
                nom: '',
                login: '',
                telephone: '',
                structure: '',
                roles: '',
                profils: []
              });
              setActiveStep(0);
            } else {
              alertService.showNotificationAlertError(response.message || 'Une erreur s\'est produite');
            }
          }
        }).finally(() => {
          onClose();
        })
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      // Afficher un message d'erreur ou empêcher la progression
      alert('Veuillez remplir tous les champs obligatoires.');
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
        return 'Unknown step';
    }
  }

  return (
    <Paper id='auth' sx={{}} >
      <CustomizedSteppers activeStep={activeStep} steps={steps} />
      <React.Fragment>
        <CssBaseline />
        <Container sx={{paddingBottom: 1}} component="main">
          <Paper variant="outlined" sx={{ my: { xs: 1, md: 2 }, p: { xs: 2, md: 3 }  }}>
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

export default AddUser;
