import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


export default function FormUser({ handleInputChange, formData }) {
  
  return (
    <Grid container spacing={3} sx={{ marginBottom: 6 }}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="firstName"
          name="firstName"
          label="Prenom"
          fullWidth
          autoComplete="given-name"
          variant="standard"
          onChange={handleInputChange}
          defaultValue={formData.prenom}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="lastName"
          name="lastName"
          label="Nom"
          fullWidth
          autoComplete="family-name"
          variant="standard"
          onChange={handleInputChange}
          defaultValue={formData.nom}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          type="email"
          id="email"
          name="email"
          label="Adresse Email"
          fullWidth
          autoComplete="email"
          variant="standard"
          onChange={handleInputChange}
          defaultValue={formData.email}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="loginWindows"
          name="loginWindows"
          label="Login Windows"
          autoComplete="Login Windows"
          variant="standard"
          onChange={handleInputChange}
          defaultValue={formData.loginWindows}
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
          defaultValue={formData.structure}
        />
      </Grid>
    </Grid>
  );
}
