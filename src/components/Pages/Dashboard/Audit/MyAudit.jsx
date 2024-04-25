import { Fab, Grid, Paper } from '@mui/material'
import React from 'react'
import { Container } from 'react-bootstrap';
import { FilterAlt, AddCircle as AddCircleIcon } from '@mui/icons-material';


function MyAudit() {
  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2, mr: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
       
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Grid sx={{ display: 'flex', justifyContent: 'space-between', mb: 5 }}>
          <Fab variant="extended" sx={{ backgroundColor: '#148C8A', color: 'white' }}>
            <FilterAlt sx={{ mr: 1, color: 'white' }} />
            Filtrer
          </Fab>
          <Fab variant="extended"  sx={{ backgroundColor: '#148C8A', color: 'white' }}>
            <AddCircleIcon sx={{ mr: 1, color: 'white' }} />
            Ajouter
          </Fab>
        </Grid>
      
      </Paper>
    
        </Grid>
      </Grid>
    </Container>
  )
}

export default MyAudit