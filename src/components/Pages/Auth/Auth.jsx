import React from 'react'
import {Paper} from '@mui/material'
import "./auth.css"
import CustomizedSteppers from "./MyStep"
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormUser from './Signup/FormUser'
import FormRoles from './Signup/FormRoles';


const steps = ['User', 'Sécurité'];

function Auth({userData,onFormSubmit}) {


  
    const [activeStep, setActiveStep] = React.useState(0);

    const [formData, setFormData] = React.useState({
      firstName: '',
      lastName: '',
      email: '',
      loginWindows: '',
      structure: '',
      password: '',
      role:''
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    const handleChecked=()=>{
      console.log("checked");
    }


    const handleNext = () => {
      if (
        (activeStep === 0 &&
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.structure &&
          formData.password) ||
        activeStep === 1
      ) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
          return <FormUser handleInputChange={handleInputChange} formData={formData}/>;
        case 1:
          return <FormRoles handleChecked={handleChecked} formData={formData}/>;
        default:
          throw new Error('Unknown step');
      }
    }
  

  return (
    <Paper id='auth'>
      <CustomizedSteppers activeStep={activeStep}/>
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
            <Button variant="contained" color='success'  sx={{backgroundColor:"#148CA8"}} onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
            </Stack>
        </Paper>
      </Container>
    </React.Fragment>
    </Paper>

  )
}

export default Auth