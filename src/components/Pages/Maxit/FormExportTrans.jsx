import React from 'react'
import { Button, Container, Card, CardContent, TextField, InputLabel,Select,MenuItem} from '@mui/material';
//import './form.css'
function FormExportTrans() {
    const [type, setType] = React.useState('B2W');

    const handleChange = (event) => {
      setType(event.target.value);
    };
    return (
     <div className="">
      <Container sx={{ marginLeft:'12%',marginTop:"10px", width:"50%"}} >
            <Card className='form'  sx={{borderRadius:'8px'}}>
            <p  className="title">Export des transactions MaxIT</p>
              <CardContent className='p-3' sx={{padding:"0px"}}>
                <form>
                  <div className='mb-4'>
                  <InputLabel id="demo-simple-select-label"> Date achat :</InputLabel>
                    <TextField type='date' variant='outlined'  fullWidth/>
                  </div>
                  <div className='mb-4'>
                  <InputLabel id="demo-simple-select-label" > Transaction Type :</InputLabel>
                  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="TYPE DE TRANSACTION"
    onChange={handleChange}
    fullWidth
    value={type} // Remplacez selectedTransactionType par la valeur de l'option par défaut
>
    <MenuItem value="B2W">{type}</MenuItem>
    <MenuItem value="B2W_BALANCE">B2W_BALANCE</MenuItem>
    <MenuItem value="B2W_STATEMENT">B2W_STATEMENT</MenuItem>
</Select>
                  </div>
                  <div className='mb-4 text-center'>
                    <Button variant='contained' color='success' size='large' sx={{width:'20%',backgroundColor:'#148C8A '}}>GO</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </Container>
        </div>
    );
  }
  
  export default FormExportTrans;
  