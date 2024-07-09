import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


export default function FormUser({isUpdate, handleInputChange, formData }) {
  
  console.log("TEST UPDATE ----------", formData);
  return (
    <Grid container spacing={3} sx={{ marginBottom: 6 }}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="firstName"
          name="prenom"
          label="Prenom"
          fullWidth
          autoComplete="given-name"
          variant="standard"
          onChange={handleInputChange}
          value={formData.prenom}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="lastName"
          name="nom"
          label="Nom"
          fullWidth
          autoComplete="family-name"
          variant="standard"
          onChange={handleInputChange}
          value={formData.nom}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="telephone"
          name="telephone"
          label=" Téléphone"
          fullWidth
          autoComplete="telephone"
          variant="standard"
          onChange={handleInputChange}
          value={formData.telephone}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="login"
          name="login"
          label="Login Windows"
          disabled={isUpdate}
          autoComplete="Login Windows"
          variant="standard"
          onChange={handleInputChange}
          value={formData.login}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="structure"
          name="structure"
          label="Structure"
          fullWidth
          autoComplete="Structure"
          variant="standard"
          onChange={handleInputChange}
          value={formData.structure}
        />
      </Grid>
    </Grid>
  );
}
