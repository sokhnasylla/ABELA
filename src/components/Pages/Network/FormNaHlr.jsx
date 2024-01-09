import React from 'react'
import { Button, Container, Card, CardContent, TextField, InputLabel,Select,MenuItem} from '@mui/material';
function FormNaHlr() {
  return (
    <div className="">
     <Container sx={{ marginLeft:'12%',marginTop:"10px", width:"50%"}} >
           <Card className='form'  sx={{borderRadius:'8px'}}>
           <p  className="title">NA HLR PREPAID</p>
             <CardContent className='p-3' sx={{padding:"0px"}}>
               <form>
                 <div className='mb-4'>
                 <InputLabel id="demo-simple-select-label">Choix du fichier csv à charger :</InputLabel>
                   <TextField type='file' variant='outlined'  fullWidth/>
                 </div>
                 <div className='mb-4 text-center'>
                   <Button variant='contained' color='success' size='large' sx={{backgroundColor:'#148C8A '}} >Lancer le traitement</Button>
                 </div>
                 <span>
                 "FORMAT : <br />
                    MSISDN;IMSI;IMSI_KEY;PUK1;PUK2" <br />
                    Ces champs sont à extraire depuis NESSICO <br />
                    Ne pas mettre d'entête
                 </span>
               </form>
             </CardContent>
           </Card>
         </Container>
       </div>
   );
}

export default FormNaHlr