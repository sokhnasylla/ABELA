import React, { Component } from 'react';
import { deleteUsersService,  } from '../user.service';
import { AlertService } from '../../../../utils/alert.service';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { IconButton, Button } from '@mui/material';

const formatDate = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy HH:mm:ss');
  } else {
    return "";
  }
};

class ListUsers extends Component {

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

  handleEditClick = (id) => {
    // Logic to handle edit
  };

  render() {
    console.log("--------------PROPS-----------", this.props);
    const { users, error } = this.props;

    return (
      <React.Fragment>
        <Title>Utilisateurs</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Prenom</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Nom</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Login</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Structure</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Créé le</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ color: 'black' }}>{user?.prenom}</TableCell>
                <TableCell sx={{ color: 'black' }}>{user?.nom}</TableCell>
                <TableCell sx={{ color: 'black' }}>{user?.login}</TableCell>
                <TableCell sx={{ color: 'black' }}>{user?.structure}</TableCell>
                <TableCell sx={{ color: 'black' }}>{formatDate(user?.dateCreation)}</TableCell>
                <TableCell sx={{ color: 'black' }}>
                  <IconButton aria-label="edit" size="small" onClick={() => this.handleEditClick(user.id)}>
                    <EditIcon fontSize="inherit" sx={{ color: '#FF6600' }} />
                  </IconButton>
                  <IconButton aria-label="delete" size="small" onClick={() => this.handleDeleteClick(user.id)}>
                    <DeleteIcon fontSize="inherit" sx={{ color: '#FF6600' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {error && <Link color="#FF6600" href="#" sx={{ mt: 3 }}>{error}</Link>}
      </React.Fragment>
    );
  }
}

export default ListUsers;
