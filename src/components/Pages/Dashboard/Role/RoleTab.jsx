// Importez le composant FormRole depuis son emplacement réel
import React, { useState } from 'react';
import { Container, Grid, Paper, Fab } from '@mui/material';
import { FilterAlt, AddCircle as AddCircleIcon } from '@mui/icons-material';
import SignUp from '../../Auth/SignUp';
import Auth from '../../Auth/Auth';
import Update from '../../Auth/Update/Update';
import ListRoles from './ListRole';
import FormRole from './FormRole';

function RoleTab() {
  const [showFormRole, setShowFormRole] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [editUserData, setEditUserData] = useState(null);

  const formDataRole = {
    code: '',
    name: '',
  };

  const handleAddClick = () => {
    setShowFormRole(true);
  };

  const handleFormSubmit = () => {
    setShowFormRole(false);
  };

  const handleEditUser = (userData) => {
    setEditUserData(userData);
    setShowUpdate(true);
  };

  let content;

  if (showFormRole) {
    content = <Auth onFormSubmit={handleFormSubmit} />;
  } else if (showUpdate) {
    content = <Update editUserData={editUserData} />;
  } else {
    content = (
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Grid sx={{ display: 'flex', justifyContent: 'space-between', mb: 5 }}>
          <Fab variant="extended" sx={{ backgroundColor: '#148C8A', color: 'white' }}>
            <FilterAlt sx={{ mr: 1, color: 'white' }} />
            Filtrer
          </Fab>
          <div>
            {showFormRole && <FormRole formDataRole={formDataRole} />}
            <Fab variant="extended" onClick={handleAddClick} sx={{ backgroundColor: '#148C8A', color: 'white' }}>
              <AddCircleIcon sx={{ mr: 1, color: 'white' }} />
              Ajouter
            </Fab>
          </div>
        </Grid>
        <ListRoles onEditUser={handleEditUser} />
      </Paper>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2, mr: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {content}
        </Grid>
      </Grid>
    </Container>
  );
}

export default RoleTab;
 