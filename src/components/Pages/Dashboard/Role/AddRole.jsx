import React, { useState } from 'react';
import { Paper } from '@mui/material';
import "../../Auth/auth.css";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormRoles from './FormRole';
import { AlertService } from '../../../../utils/alert.service';
import { addRole } from "../user.service";

function AddRole({ onFormSubmit, onClose }) {
  const alertService = new AlertService();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    if (formData.name && formData.code) {
      try {
        const response = await addRole(formData);
        if (response && response.success) {
          console.log(response.data);
          if (onFormSubmit) {
            onFormSubmit(response.data);
          }
          setFormData({
            name: '',
            code: ''
          });
        } else {
          alertService.showNotificationAlertError(response.message || 'Une erreur s\'est produite');
        }
      } catch (error) {
        alertService.showNotificationAlertError(error.message || 'Une erreur s\'est produite');
      } finally {
        onClose();
      }
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  };

  return (
    <Paper id='auth'>
      <React.Fragment>
        <CssBaseline />
        <Container sx={{ paddingBottom: 1, paddingTop: 1 }} component="main">
          <Paper variant="outlined" sx={{ my: { xs: 1, md: 2 }, p: { xs: 2, md: 3 } }}>
            <Typography variant="h5" gutterBottom>
              <FormRoles handleInputChange={handleInputChange} formData={formData} />
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={onClose}>
                Annuler
              </Button>
              <Button variant="contained" color='success' sx={{ backgroundColor: "#148CA8" }} onClick={handleFormSubmit}>
                Ajouter
              </Button>
            </Stack>
          </Paper>
        </Container>
      </React.Fragment>
    </Paper>
  );
}

export default AddRole;
