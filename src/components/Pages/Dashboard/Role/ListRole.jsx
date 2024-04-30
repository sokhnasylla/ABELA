import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getTokenFromLocalStorage } from '../../Auth/authUtils';
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
  if(dateString){
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy HH:mm:ss');
  }
  else{
    return " ";
  }
 
};

function ListRole(onEditUser) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const token = getTokenFromLocalStorage();
   
    useEffect(() => {
      const fetchData = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get("http://localhost:8082/abela-usermanagement/api/v1/users/roles", config);
          setData(response.data.data);
        } catch (error) {
          setError(`Erreur: ${error.message}`);
        }
      };
   
      fetchData();
    }, [token]);
   console.log(data);
   console.log(error);
    const handleDeleteClick = async (id) => {
      try {
        const response = await fetch(`http://localhost:8082/abela-usermanagement/api/v1/users/roles/${id}/deactivate`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        if (response.ok) {
          // You might want to refresh the user list or take some other action upon successful deletion
        }
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la suppression d\'un role : ', error);
      }
    };
   
    const handleEditClick = async (id) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`http://localhost:8082/abela-usermanagement/api/v1/users/roles/${id}`, config);
        onEditUser(response.data);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données de l\'utilisateur : ', error);
      }
    };
   
    return (
      <React.Fragment>
        <Title>Roles</Title>
        <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Code</TableCell>
        <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Name</TableCell>
       
        {/* <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Active</TableCell> */}
        <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Action</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data?.map((role) => (
        <TableRow key={role.id}>
          <TableCell sx={{color: 'black' }}>{role?.code}</TableCell>
          <TableCell sx={{color: 'black' }}>{role?.name}</TableCell>
          <TableCell sx={{color: 'black' }}>
            <IconButton aria-label="edit" size="small" onClick={() => handleEditClick(role.id)}>
              <EditIcon fontSize="inherit" sx={{ color: '#FF6600' }} />
            </IconButton>
            <IconButton aria-label="delete" size="small" onClick={() => handleDeleteClick(role.id)}>
              <DeleteIcon fontSize="inherit" sx={{ color: '#FF6600' }} />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
   
        <Link color="#FF6600" href="#" sx={{ mt: 3 }}>
          {error}
        </Link>
      </React.Fragment>
    );
  }


export default ListRole