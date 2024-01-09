import React from 'react'
import { Button, Container, Card, CardContent, TextField, InputLabel,Select,MenuItem} from '@mui/material';

function FormConversion() {
    const [mode, setMode] = React.useState('APPEND');
    const [type, setType] = React.useState('VOIX');

    const handleChange = (event) => {
      setMode(event.target.value);
    };
    const handleChanges = (event) => {
       setType(event.target.value);
      };
    return (
        <div className="">
         <Container sx={{ marginLeft:'12%',marginTop:"10px", width:"50%"}} >
               <Card className='form'  sx={{borderRadius:'8px'}}>
               <p  className="title">Conversion format ICB</p>
                 <CardContent className='p-3' sx={{padding:"0px"}}>
                   <form>
                   <div className='mb-4'>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={handleChange}
                       fullWidth
                       value={mode}
                          >
                        <MenuItem value="APPEND">APPEND</MenuItem>
                        <MenuItem value="RESET">RESET</MenuItem>
                        
                      </Select>
                  </div>
                
                     <div className='mb-4'>
                     <InputLabel id="demo-simple-select-label"> Compteur :</InputLabel>
                       <TextField  variant='outlined'  fullWidth/>
                     </div>
                     <div className='mb-4'>
                     <InputLabel id="demo-simple-select-label"> Durée de validité :</InputLabel>
                       <TextField  variant='outlined'  fullWidth/>
                     </div>
                     <div className='mb-4'>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={handleChanges}
                       fullWidth
                       value={type}
                          >
                        <MenuItem value="VOIX">VOIX</MenuItem>
                        <MenuItem value="DATA">DATA</MenuItem>
                        
                      </Select>
                  </div>
                     <div className='mb-4'>
                     <InputLabel id="demo-simple-select-label">Nom du fichier de sortie :</InputLabel>
                       <TextField  variant='outlined'  fullWidth/>
                     </div>
                     <div className='mb-4'>
                     <InputLabel id="demo-simple-select-label">Choix du fichier csv à charger :</InputLabel>
                       <TextField type='file' variant='outlined'  fullWidth/>
                     </div>
                     <div className='mb-4 text-center'>
                       <Button variant='contained' color='success' size='large' sx={{width:'20%',backgroundColor:'#148C8A '}}>Convertir</Button>
                     </div>
                   </form>
                 </CardContent>
               </Card>
             </Container>
           </div>
       );
}

export default FormConversion