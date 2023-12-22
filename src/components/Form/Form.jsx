import React from 'react';
import { Button, Container, Card, CardContent, TextField, InputLabel,Select,MenuItem} from '@mui/material';
import './form.css'

function Form() {

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
   <div className="">
    <Container sx={{ marginLeft:'12%',marginTop:"10px", width:"50%"}} >
          <Card className='form'>
          <p  className="title">Export des transactions MaxIT</p>
            <CardContent className='p-3' sx={{padding:"0px"}}>
              <form>
                <div className='mb-4'>
                <InputLabel id="demo-simple-select-label"> Date achat</InputLabel>
                  <TextField type='date' variant='outlined'  fullWidth/>
                </div>
                <div className='mb-4'>
                <InputLabel id="demo-simple-select-label" > Transaction Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="TRANSACTION TYPE"
                      onChange={handleChange}
                     fullWidth
                        >
                      <MenuItem >Ten</MenuItem>
                      <MenuItem >Twenty</MenuItem>
                      <MenuItem>Thirty</MenuItem>
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

export default Form;
