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
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy HH:mm:ss');
};
 
function ListUsers({onEditUser}) {
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
        const response = await axios.get("http://127.0.0.1:8083/api/v1/users", config);
        setData(response.data[0]);
      } catch (error) {
        setError(`Erreur: ${error.message}`);
      }
    };
 
    fetchData();
  }, [token]);
 console.log(data);
  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8083/api/users/${id}/deactivate`, {
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
      console.error('Une erreur s\'est produite lors de la suppression de l\'utilisateur : ', error);
    }
  };
 
  const handleEditClick = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`http://127.0.0.1:8083/api/users/${id}`, config);
      onEditUser(response.data);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données de l\'utilisateur : ', error);
    }
  };
 
  return (
    <React.Fragment>
      <Title>Utilisateurs</Title>
      <Table size="small">
  <TableHead>
    <TableRow>
      <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Nom d'utilisateur</TableCell>
      <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Adresse mail</TableCell>
      <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Groupes</TableCell>
      <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Active</TableCell>
      <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Créé le</TableCell>
      <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Action</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {data?.map((user) => (
      <TableRow key={user.id}>
        <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>{user?.username}</TableCell>
        <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>{user?.email}</TableCell>
        <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>{user?.groups.join(", ")}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color={user.isActive ? "secondary" : "primary"}
            sx={{ fontWeight: 'bold', color: 'black' }}
            onMouseEnter={(event) => event.target.style.color = 'blue'}
            onMouseLeave={(event) => event.target.style.color = 'black'}
            onClick={() => handleDeleteClick(user.id)}
          >
            {user.isActive ? "Désactiver" : "Activer"}
          </Button>
        </TableCell>
        <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>{formatDate(user?.createdAt)}</TableCell>
        <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>
          <IconButton aria-label="edit" size="small" onClick={() => handleEditClick(user.id)}>
            <EditIcon fontSize="inherit" sx={{ color: '#FF6600' }} />
          </IconButton>
          <IconButton aria-label="delete" size="small" onClick={() => handleDeleteClick(user.id)}>
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
 
export default ListUsers;
     