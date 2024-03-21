import React, { useState,useEffect } from 'react'
import { Container, Paper, Typography, Button ,AppBar,Toolbar,IconButton} from '@mui/material'
import FormUser from '../Signup/FormUser'
import FormRoles from '../Signup/FormRoles'
import Avatar from '@mui/material/Avatar';
import { FaUserEdit } from "react-icons/fa";


function Update({ editUserData }) {
  
  const [data, setData] = useState({
    prenom: editUserData.prenom || '',
    nom: editUserData.nom || '', 
    email: editUserData.email || '', 
    loginWindows: editUserData.loginWindows || '', 
    structure: editUserData.structure || '', 
    password: '', 
    roles:'',
    tbroles:''

  });

 
  const handleInputChange =(e)=>{
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const handleRolesAndTbRolesReady = (roles, tbRoles) => {
    console.log("okay");
    setData((prevData) => ({
      ...prevData,
      roles,
      tbroles:tbRoles, // Join array elements into a string
    }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

 
  return (
    <Container component="main" maxWidth="md" sx={{width:"70%" }}>
        <AppBar position="static" sx={{backgroundColor:'#148C8A'}}>
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <FaUserEdit /> 
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
                Modifier les informations de l'utilisateur
            </Typography>
          </Toolbar>
        </AppBar>
      <Paper variant="outlined" sx={{ my: { xs: 1}, p: { xs: 2, md: 3 }}}>
        <Typography variant="h5" gutterBottom>
          <FormUser handleInputChange={handleInputChange} formData={editUserData} />
          <FormRoles handleRolesAndTbRolesReady={handleRolesAndTbRolesReady} formData={editUserData}/>
            <div className="" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <Button sx={{ backgroundColor: "#148C8A", color: "white",marginLeft:"20px"}}>
                Valider
              </Button>
            </div>
        </Typography>
      </Paper>
    </Container>
  )
}

export default Update
