import React from 'react'
import {Container,Card,CardContent,TextField,InputLabel,Button} from '@mui/material'
function FormVerifLogKaabu() {
  return (
    <div className="">
         <Container sx={{ marginLeft:'12%',marginTop:"10px", width:"50%"}} >
               <Card className='form' sx={{borderRadius:'8px'}}>
               <p  className="title">Verification login sur Kaabu</p>
                 <CardContent className='p-3' sx={{padding:"0px"}}>
                   <form>
                     <div className='mb-4'>
                     <InputLabel id="demo-simple-select-label"> LOGIN : </InputLabel> 
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
  )
}

export default FormVerifLogKaabu