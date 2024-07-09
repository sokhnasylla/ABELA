import React, { Component } from 'react';
import { Paper, CssBaseline, Container, Button, Typography, Stack } from '@mui/material';
import "./auth.css";
import CustomizedSteppers from "./MyStep";
import FormUser from './Signup/FormUser';
import FormRoles from './Signup/FormRoles';
import { addUser, editUsersService } from '../Dashboard/user.service';
import { AlertService } from '../../../utils/alert.service';

const steps = ['User', 'Sécurité'];

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      formData: {
        prenom: '',
        nom: '',
        login: '',
        telephone: '',
        structure: '',
        roles: [],
        profils: []
      },
      alertService: new AlertService()
    };
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      this.setState({
        formData: {
          prenom: user.prenom || '',
          nom: user.nom || '',
          login: user.login || '',
          telephone: user.telephone || '',
          structure: user.structure || '',
          roles: user.roles || [],
          profils: user.profils || []
        }
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user && this.props.user) {
      const { user } = this.props;
      this.setState({
        formData: {
          prenom: user.prenom || '',
          nom: user.nom || '',
          login: user.login || '',
          telephone: user.telephone || '',
          structure: user.structure || '',
          roles: user.roles || [],
          profils: user.profils || []
        }
      });
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      }
    }));
  };

  handleRolesChange = (roles) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        roles,
      }
    }));
  };

  handleNext = async () => {
    const { formData, activeStep } = this.state;
    const { user, onFormSubmit, onClose } = this.props;

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
        try {
          let response;
          if (user) {
            response = await editUsersService(user.id, formData);
          } else {
            response = await addUser(formData);
          }

          if (response && response.success) {
            onFormSubmit(response.data);
            this.resetForm();
            this.state.alertService.showNotificationAlertSuccess(response.message);
          } else {
            this.state.alertService.showNotificationAlertError(response.message || 'Une erreur s\'est produite');
          }
        } catch (error) {
          this.state.alertService.showNotificationAlertError('Une erreur s\'est produite');
        } finally {
          onClose();
        }
      } else {
        this.setState((prevState) => ({
          activeStep: prevState.activeStep + 1
        }));
      }
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  };

  resetForm = () => {
    this.setState({
      formData: {
        prenom: '',
        nom: '',
        login: '',
        telephone: '',
        structure: '',
        roles: [],
        profils: []
      },
      activeStep: 0
    });
  };

  handleBack = () => {
    this.setState((prevState) => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  getStepContent = (step) => {
    const { user } = this.props;
    const { formData } = this.state;

    switch (step) {
      case 0:
        return <FormUser isUpdate={!!user} handleInputChange={this.handleInputChange} formData={formData} />;
      case 1:
        return <FormRoles onRolesChange={this.handleRolesChange} formData={formData} />;
      default:
        return 'Unknown step';
    }
  };

  render() {
    const { activeStep } = this.state;

    return (
      <Paper id='auth'>
        <CustomizedSteppers activeStep={activeStep} steps={steps} />
        <React.Fragment>
          <CssBaseline />
          <Container sx={{ paddingBottom: 1 }} component="main">
            <Paper variant="outlined" sx={{ my: { xs: 1, md: 2 }, p: { xs: 2, md: 3 } }}>
              <Typography variant="h5" gutterBottom>
                {this.getStepContent(activeStep)}
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button disabled={activeStep === 0} onClick={this.handleBack}>
                  Back
                </Button>
                <Button variant="contained" color='success' sx={{ backgroundColor: "#148CA8" }} onClick={this.handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Stack>
            </Paper>
          </Container>
        </React.Fragment>
      </Paper>
    );
  }
}

export default AddUser;
