
import React, { Component } from 'react';
import { Container, Grid, Paper, Fab, Modal, Box } from '@mui/material';
import { FilterAlt, AddCircle as AddCircleIcon } from '@mui/icons-material';
import ListRole from './ListRole';
import Update from '../../Auth/Update/Update';
import { getRolesService, getUsersService } from '../user.service';
import { AlertService } from '../../../../utils/alert.service';
import AddRole from './AddRole';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'silver',
  boxShadow: 24,
  // p: 4,
};

class RoleTab extends Component {

  alertService = new AlertService();

  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      showUpdate: false,
      editRoleData: null,
      roles: [], 
      error: ""
    };
  }

  componentDidMount() {
    this.fetchRoles(); 
  }

  fetchRoles = () => {
    getRolesService()
      .then((response) => {
        if(response) {
          if(response.success) {
            this.setState({roles: response.data})
            console.log("GET ROLES ::: ", this.state.roles);
          } else {
            this.alertService.showNotificationAlertError(response.message || 'Une erreur s\'est produite');
          }
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  handleAddClick = () => {
    this.setState({ showForm: true });
  };

  handleFormSubmit = () => {
    this.setState({ showForm: false });
    this.fetchRoles(); // Mettre à jour la liste des utilisateurs après avoir ajouté un nouvel utilisateur
  };

  handleEditRole = (userData) => {
    this.setState({
      editRoleData: userData,
      showUpdate: true,
    });
  };

  render() {
    const { showForm, showUpdate, editRoleData, roles } = this.state;

    return (
      <Container maxWidth="" sx={{ mt: 2, mb: 2, mr: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Grid sx={{ display: 'flex', justifyContent: 'space-between', mb: 5 }}>
                <Fab variant="extended" sx={{ backgroundColor: '#148C8A', color: 'white' }}>
                  <FilterAlt sx={{ mr: 1, color: 'white' }} />
                  Filtrer
                </Fab>
                <Fab variant="extended" onClick={this.handleAddClick} sx={{ backgroundColor: '#148C8A', color: 'white' }}>
                  <AddCircleIcon sx={{ mr: 1, color: 'white' }} />
                  Ajouter
                </Fab>
              </Grid>
              <ListRole roles={roles} fetchRoles={this.fetchRoles} onEditUser={this.handleEditRole} /> 
            </Paper>
          </Grid>
        </Grid>

        <Modal
          open={showForm}
          onClose={() => this.setState({ showForm: false })}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <AddRole onFormSubmit={this.handleFormSubmit} onClose={() => this.setState({ showForm: false })} />
          </Box>
        </Modal>

        <Modal
          open={showUpdate}
          onClose={() => this.setState({ showUpdate: false })}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Update editRoleData={editRoleData} />
          </Box>
        </Modal>
      </Container>
    );
  }
}

export default RoleTab;