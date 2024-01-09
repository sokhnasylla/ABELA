import React from 'react'
import { Button, Container, Card, CardContent, TextField, InputLabel,Select,MenuItem} from '@mui/material';
function FormMasseGetInfo() {
    return (
        <div className="">
         <Container sx={{ marginLeft:'12%',marginTop:"10px", width:"50%"}} >
               <Card className='form'  sx={{borderRadius:'8px'}}>
               <p  className="title">Extraction en masse des infos HLR</p>
                 <CardContent className='p-3' sx={{padding:"0px"}}>
                   <form>
                     <div className='mb-4'>
                     <InputLabel id="demo-simple-select-label">Choix du fichier csv à charger :</InputLabel>
                       <TextField type='file' variant='outlined'  fullWidth/>
                     </div>
                     <div className='mb-4 text-center'>
                       <Button variant='contained' color='success' size='large' sx={{backgroundColor:'#148C8A '}} >Lancer le traitement</Button>
                     </div>
                     <span>"FORMAT : MSISDN"<br />
                       Ne pas mettre d entete
                       </span>
                   </form>
                 </CardContent>
               </Card>
             </Container>
           </div>
       );
}

export default FormMasseGetInfo