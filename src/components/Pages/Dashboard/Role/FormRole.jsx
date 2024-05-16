import { Grid, TextField } from '@mui/material'
import React from 'react'

function FormRole(handleInputChange,formDataRole) {
  return (
    <div>
     <Grid container spacing={3} sx={{ marginBottom: 6 }}>
      <Grid item xs={12}>
        <TextField
          required
          id="code"
          name="code"
          label="Code"
          fullWidth
          autoComplete="code"
          variant="standard"
          onChange={handleInputChange}
          defaultValue={formDataRole.code}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          type="name"
          id="name"
          name="name"
          label="Name"
          fullWidth
          autoComplete="name"
          variant="standard"
          onChange={handleInputChange}
          defaultValue={formDataRole.name}
        />
      </Grid>
    </Grid>
    </div>
  )
}

export default FormRole