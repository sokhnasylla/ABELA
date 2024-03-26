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
import { IconButton } from '@mui/material';
import SignUp from '../../Auth/SignUp';
import { useNavigate } from 'react-router-dom';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy HH:mm:ss');
};






function ListUsers({onEditUser}) {
  const [data, setData] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = getTokenFromLocalStorage();
  const navigate=useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get("http://127.0.0.1:8000/api/getAllUsers", config);

        setData(response.data[0]);
      } catch (error) {
        setError(`Erreur: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleDeleteClick = async(id)=>{
    const $token=getTokenFromLocalStorage()
   
    console.log(id);
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${id}/deactivate`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

          },
        });
        if(response.ok){
          // return navigate('/admin/user')
        }
    }catch (error) {
      // Gérez les erreurs ici
      console.error('Une erreur s\'est produite lors de la récupération des données de l\'utilisateur : ', error);
    }
 
   
 }


  const handleEditClick = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`http://127.0.0.1:8000/api/users/${id}`, config);
      console.log(response.data);
      onEditUser(response.data);
    } catch (error) {
      // Gérez les erreurs ici
      console.error('Une erreur s\'est produite lors de la récupération des données de l\'utilisateur : ', error);
    }
  };


    return (
      <React.Fragment>
        <Title>Utilisateurs</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Prenom</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Login</TableCell>
              <TableCell>Email</TableCell>
              {/* <TableCell>Roles</TableCell> */}
              <TableCell>Structure</TableCell>
              <TableCell>Créé le</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user?.prenom}</TableCell>
                <TableCell>{user?.nom}</TableCell>
                <TableCell>{user?.loginWindows}</TableCell>
                <TableCell>{user?.email}</TableCell>
                {/* <TableCell>{user?.roles}</TableCell> */}
                <TableCell>{user?.structure}</TableCell>
                <TableCell>{formatDate(user?.dateCreation)}</TableCell>
                <TableCell sx={{display:'flex',flexDirection:"row"}}>
                  <IconButton aria-label="edit" size="small" onClick={()=>handleEditClick(user.id)}>
                      <EditIcon fontSize="inherit" sx={{color:'#FF6600'}}  />
                  </IconButton>
                  <IconButton aria-label="delete" size="small" onClick={()=>handleDeleteClick(user.id)}>
                      <DeleteIcon fontSize="inherit" sx={{color:'#FF6600'}} />
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
