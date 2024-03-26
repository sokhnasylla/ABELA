import React from 'react'
import { Button, Container, Card, CardContent, TextField, InputLabel,Select,MenuItem} from '@mui/material';
function FormSupCompte() {
  const [type, setType] = React.useState('MOBILE');

    const handleChange = (event) => {
      setType(event.target.value);
    };
    return (
        <div className="">
         <Container sx={{ marginLeft:'12%',marginTop:"10px", width:"50%"}} >
               <Card className='form'  sx={{borderRadius:'8px'}}>
               <p  className="title">Suppression Sous Compte</p>
                 <CardContent className='p-3' sx={{padding:"0px"}}>
                   <form>
                   <div className='mb-4'>
                  <InputLabel id="demo-simple-select-label" > Type :</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="TRANSACTION TYPE"
                        onChange={handleChange}
                       fullWidth
                       value={type}
                          >
                        <MenuItem value="MOBILE">MOBILE</MenuItem>
                        <MenuItem value="FIXE">FIXE</MenuItem>
                        
                      </Select>
                  </div>
                
                     <div className='mb-4'>
                     <InputLabel id="demo-simple-select-label"> Principal</InputLabel>
                       <TextField  variant='outlined'  fullWidth/>
                     </div>
                     <div className='mb-4'>
                     <InputLabel id="demo-simple-select-label"> Numero Rattache</InputLabel>
                       <TextField  variant='outlined'  fullWidth/>
                     </div>
                     <div className='mb-4 text-center'>
                       <Button variant='contained' color='success' size='large' sx={{width:'20%',backgroundColor:'#148C8A '}}>Executer</Button>
                     </div>
                   </form>
                 </CardContent>
               </Card>
             </Container>
           </div>
       );
  
}

export default FormSupCompte