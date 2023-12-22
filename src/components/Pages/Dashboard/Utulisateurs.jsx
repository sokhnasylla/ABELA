import React, { useState } from 'react';
import { Container, Grid, Paper, Fab } from '@mui/material';
import { FilterAlt, AddCircle as AddCircleIcon } from '@mui/icons-material';
import ListUsers from './ListUser';
import SignUp from '../Auth/SignUp';

function Utulisateurs() {
  const [showForm, setShowForm] = useState(false);
  const [editUserData, setEditUserData] = useState(null);

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditUserData(null);;
  };

  const handleEditUser = (userData) => {
    setEditUserData(userData); // Définir les données de l'utilisateur en cours d'édition lorsqu'on clique sur le bouton "edit"
    setShowForm(true); // Afficher le formulaire de SignUp
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2, mr: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {showForm ? (
            <SignUp  userData={editUserData} onFormSubmit={handleFormSubmit} />
          ) : (
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Grid sx={{ display: 'flex', justifyContent: 'space-between', mb: 5 }}>
                <Fab variant="extended" sx={{backgroundColor:"#148C8A" ,color:"white"}}>
                  <FilterAlt sx={{ mr: 1, color: 'white' }} />
                  Filtrer
                </Fab>
                <Fab variant="extended" onClick={handleAddClick} sx={{backgroundColor:"#148C8A" ,color:"white"}}>
                  <AddCircleIcon sx={{ mr: 1, color: 'white' }} />
                  Ajouter
                </Fab>
              </Grid>
              <ListUsers onEditUser={handleEditUser} />
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Utulisateurs;
