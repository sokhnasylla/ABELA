import React from 'react'
import { Button, Container, Card, CardContent, TextField, InputLabel,Select,MenuItem} from '@mui/material';

function FormHistKassai() {
    const [type, setType] = React.useState('MSISDN');

    const handleChange = (event) => {
      setType(event.target.value);
    };
    return (
        <div className="">
         <Container sx={{ marginLeft:'12%',marginTop:"10px", width:"50%"}} >
               <Card className=''  sx={{borderRadius:'8px'}}>
               <p  className="title">Historique des depots KASSAI - OPTIMA PRO</p>
                 <CardContent className='p-3' sx={{padding:"0px"}}>
                   <form>
                   <div className='mb-4'>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={handleChange}
                       fullWidth
                       value={type}
                          >
                        <MenuItem value="MSISDN">MSISDN</MenuItem>
                        <MenuItem value="FLOTTE">FLOTTE</MenuItem>
                        
                      </Select>
                  </div>
                     <div className='mb-4'>
                     <InputLabel id="demo-simple-select-label">MSISDN : </InputLabel>
                       <TextField  variant='outlined'  fullWidth/>
                     </div>
                     <div className='mb-4'>
                     <InputLabel id="demo-simple-select-label">Nom du client : </InputLabel>
                       <TextField  variant='outlined'  fullWidth/>
                     </div><div className='mb-4'>
                     <InputLabel id="demo-simple-select-label"> Mois</InputLabel>
                       <TextField type='month' variant='outlined'  fullWidth/>
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

export default FormHistKassai