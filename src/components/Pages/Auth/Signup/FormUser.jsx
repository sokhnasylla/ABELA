import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';




export default function FormUser({handleInputChange, formData}) {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Prénom"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={handleInputChange}
            value={formData.firstName}
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
            value={formData.lastName}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            type='email'
            id="email"
            name="email"
            label="Adresse Email"
            fullWidth
            autoComplete="Adresse Email"
            variant="standard"
            onChange={handleInputChange}
            value={formData.email}

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
            value={formData.loginWindows}

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
        <Grid item xs={12}>
          <TextField
            required
            type='password'
            id="password"
            name="password"
            label="Mot de Passe"
            fullWidth
            autoComplete="Mot de Passe"
            variant="standard"
            onChange={handleInputChange}
            value={formData.password}

          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
