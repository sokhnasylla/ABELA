
import React, { Component } from 'react';
import { deleteRolesService,  } from '../user.service';
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

class ListRole extends Component {
  alertService = new AlertService();

  handleDeleteClick = (id) => {
    deleteRolesService(id)
      .then((response) => {
        console.log("DELETE ::: ", response);
        this.props.fetchRoles(); // Refresh the list after deleting
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
    const { roles, error } = this.props;

    return (
      <React.Fragment>
        <Title>Roles</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Code</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles?.map((role) => (
              <TableRow key={role.id}>
                <TableCell sx={{ color: 'black' }}>{role?.code}</TableCell>
                <TableCell sx={{ color: 'black' }}>{role?.name}</TableCell>
                <TableCell sx={{ color: 'black' }}>
                  <IconButton disabled="true" aria-label="edit" size="small" onClick={() => this.handleEditClick(role.id)}>
                    <EditIcon fontSize="inherit" sx={{ color: '#FF6600' }} />
                  </IconButton>
                  <IconButton disabled="true" aria-label="delete" size="small" onClick={() => this.handleDeleteClick(role.id)}>
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

export default ListRole;

