import React, { Component } from 'react';
import { activerOrDesactiverUsersService, cloturerUsersService, deleteUsersService } from '../user.service';
import { AlertService } from '../../../../utils/alert.service';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { format } from 'date-fns';
import { IconButton, Modal, Box } from '@mui/material';
import { Dropdown } from 'react-bootstrap';
import AddUser from '../../Auth/AddUser';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,  // Augmenter la largeur
  bgcolor: 'silver',
  boxShadow: 24,
  // p: 4,
};

const formatDate = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy HH:mm:ss');
  } else {
    return "";
  }
};

const formatEtat = (etat) => {
  switch (etat) {
    case "0":
      return "Activé"
    case "-1":
      return "Désactivé"
    case "1":
      return "Suspendu"
    case "2":
      return "Cloturé"
    default:
      return "";
  }
}

const getEtatColor = (etat) => {
  switch (etat) {
    case "0":
      return "green";
    case "-1":
      return "red";
    case "1":
      return "orange";
    case "2":
      return "gray";
    default:
      return "black";
  }
}

class ListUsers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      userToUpdate: null,
    };
  }

  alertService = new AlertService();

  handleDeleteClick = (id) => {
    deleteUsersService(id)
      .then((response) => {
        console.log("DELETE ::: ", response);
        this.props.fetchUsers(); // Refresh the list after deleting
      })
      .catch((error) => {
        this.alertService.showNotificationAlertError(error.message);
      });
  };

  handleActiverORDesactiverClick = (id) => {
    activerOrDesactiverUsersService(id)
      .then((response) => {
        console.log("ACTIVER / DESACTIVER ::: ", response);
        this.props.fetchUsers(); // Refresh the list after deleting
      })
      .catch((error) => {
        this.alertService.showNotificationAlertError(error.message);
      });
  };

  handleCloturerClick = (id) => {
    this.alertService.showPromptAlert({
      title: 'Etes-vous sûre de vouloir Clôturer ?',
    }).then((result) => {
      if (result.isConfirmed) {
        cloturerUsersService(id)
          .then((response) => {
            console.log("CLOTURER ::: ", response);
            this.props.fetchUsers(); // Refresh the list after deleting
          })
          .catch((error) => {
            this.alertService.showNotificationAlertError(error.message);
          });
      }
    });
  };

  handleEditClick = (user) => {
    this.setState({ showForm: true, userToUpdate: user });
  };

  handleFormSubmit = (user) => {
    // Logic to handle form submission (update user)
    // Close the modal after submission
    this.setState({ showForm: false, userToUpdate: null });
    this.props.fetchUsers(); // Refresh the list after updating
  };

  render() {
    console.log("--------------PROPS-----------", this.props);
    const { users, error } = this.props;
    const { showForm, userToUpdate } = this.state;
    console.log("------------USER----------- ", users);
    return (
      <React.Fragment>
        <Title>Mon Equipe</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Prenom</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Nom</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Login</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Téléphone</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Structure</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Créé le</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Etat</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ color: 'black' }}>{user?.prenom}</TableCell>
                <TableCell sx={{ color: 'black' }}>{user?.nom}</TableCell>
                <TableCell sx={{ color: 'black' }}>{user?.login}</TableCell>
                <TableCell sx={{ color: 'black' }}>{user?.telephone}</TableCell>
                <TableCell sx={{ color: 'black' }}>{user?.structure}</TableCell>
                <TableCell sx={{ color: 'black' }}>{formatDate(user?.dateCreation)}</TableCell>
                <TableCell sx={{ color: getEtatColor(user?.status) }}>{formatEtat(user?.status)}</TableCell>
                <TableCell sx={{ color: 'black' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton aria-label="edit" size="small" onClick={() => this.handleEditClick(user)}>
                      <EditIcon fontSize="inherit" sx={{ color: '#FF6600' }} />
                    </IconButton>
                    <Dropdown>
                      <Dropdown.Toggle style={{ backgroundColor: 'transparent', border: 'none', padding: 0 }} variant="custom" id="dropdown-basic" className="profile-toggle">
                        <MoreVertIcon sx={{ color: '#FF6600' }} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item disabled={user?.status === "1" || user?.status === "2"} onClick={() => this.handleActiverORDesactiverClick(user?.id)}>{user?.status === "0" ? "Désactiver" : "Activer"}</Dropdown.Item>
                        <Dropdown.Item disabled={user?.status === "2"} onClick={() => this.handleCloturerClick(user?.id)}>Clôturer</Dropdown.Item>
                        <Dropdown.Item disabled="false" onClick={() => { }}>Suspendre</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {error && <Link color="#FF6600" href="#" sx={{ mt: 3 }}>{error}</Link>}
        <Modal
          open={showForm}
          onClose={() => this.setState({ showForm: false })}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <AddUser user={userToUpdate} onFormSubmit={this.handleFormSubmit} onClose={() => this.setState({ showForm: false })} />
          </Box>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ListUsers;
