

import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


export default function FormRole({ handleInputChange, formData }) {
  
  return (
    <Grid container spacing={3} sx={{ marginBottom: 6 }}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="code"
          name="code"
          label="Code"
          fullWidth
          autoComplete="given-name"
          variant="standard"
          onChange={handleInputChange}
          defaultValue={formData.code}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="name"
          name="name"
          label="Nom"
          fullWidth
          autoComplete="family-name"
          variant="standard"
          onChange={handleInputChange}
          defaultValue={formData.name}
        />
      </Grid>
    </Grid>
  );
}
