import React from 'react'
import { Button, Container, Card, CardContent, TextField, InputLabel,Select,MenuItem} from '@mui/material';

function FormLoadZsmart() {
    return (
        <div className="">
         <Container sx={{ marginLeft:'12%',marginTop:"10px", width:"50%"}} >
               <Card className='form'  sx={{borderRadius:'8px'}}>
               <p  className="title">Load ZSMART IN</p>
                 <CardContent className='p-3' sx={{padding:"0px"}}>
                   <form>
                     <div className='mb-4'>
                     <InputLabel id="demo-simple-select-label">Choix fichier Masse au format csv :</InputLabel>
                       <TextField type='file' variant='outlined'  fullWidth/>
                     </div>
                     <div className='mb-4 text-center'>
                       <Button variant='contained' color='success' size='large' sx={{width:'20%',backgroundColor:'#148C8A '}}>Soumettre</Button>
                     </div>
                   </form>
                 </CardContent>
               </Card>
             </Container>
           </div>
       );
}

export default FormLoadZsmart