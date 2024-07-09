import React, { Component } from 'react';
import { Container, Grid, Paper, Fab, Modal, Box } from '@mui/material';
import { FilterAlt, AddCircle as AddCircleIcon } from '@mui/icons-material';
import ListUsers from './ListUser';
import AddUser from '../../Auth/AddUser';
import Update from '../../Auth/Update/Update';
import axios from 'axios';
import { getUsersService } from '../user.service';
import { AlertService } from '../../../../utils/alert.service';

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

class Utilisateurs extends Component {

  alertService = new AlertService();


  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      showUpdate: false,
      editUserData: null,
      users: [], 
      error: ""
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    getUsersService()
      .then((response) => {
        if(response) {
          if(response.success) {
            this.setState({users: response.data})
            console.log(" GET USERS ::: ", this.state.users);
          } else {
            console.log("------------ERRORR ::: ", response);
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
    this.fetchUsers(); 
  };

  handleEditUser = (userData) => {
    this.setState({
      editUserData: userData,
      showUpdate: true,
    });
  };

  render() {
    const { showForm, showUpdate, editUserData, users } = this.state;

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
              <ListUsers users={users} fetchUsers={this.fetchUsers} onEditUser={this.handleEditUser} />
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
            <AddUser onFormSubmit={this.handleFormSubmit} onClose={() => this.setState({ showForm: false })} />
          </Box>
        </Modal>

        <Modal
          open={showUpdate}
          onClose={() => this.setState({ showUpdate: false })}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Update editUserData={editUserData} />
          </Box>
        </Modal>
      </Container>
    );
  }
}

export default Utilisateurs;
