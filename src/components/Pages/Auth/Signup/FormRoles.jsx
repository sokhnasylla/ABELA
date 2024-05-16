import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Typography, Box, FormControlLabel, FormGroup } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { getTokenFromLocalStorage } from '../authUtils';
import axios from 'axios';
import GetData from '../../../API/GetData';

export default function FormRoles({ onRolesAndTbRolesReady ,formData}) {
  const [checked, setChecked] = useState([]);
  const [isChecked, setIsChecked] = useState({});
  const [childChecked, setChildChecked] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:8082/abela-usermanagement/api/v1/users/roles";
        const responseData = await GetData(url);
        setData(responseData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const formattedRoles = checked.map((item) => ({ id: item.id }));
    formData.roles = formattedRoles;
  }, [checked]);



  const handleChange = (itemId) => (event) => {
      setIsChecked((prev) => ({ ...prev, [itemId]: event.target.checked }));
     // Vérifier si l'ID est déjà dans le tableau
      const index = checked.findIndex((item) => item.id === itemId);
      
      // Si l'ID n'est pas trouvé, l'ajouter au tableau
      if (index === -1 && event.target.checked) {
        setChecked((prev) => [...prev, { id: itemId }]);

  }else {
    // Si l'élément est décoché, le supprimer du tableau
    setChecked((prev) => prev.filter((item) => item.id !== itemId));
  }
         };
         
      console.log(formData);
  return (
    <Grid container spacing={3}>
      <Grid container direction="column" justifyContent="center" alignSelf="center" width="70">
        <Typography align='center' sx={{ backgroundColor: "#148C8A", color: "white", width: "104%" }}>
          Roles
        </Typography>
      </Grid>
      <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
        {data.map((item) => {
          const labelId = `checkbox-list-label-${item.id}`;
          

          return (
            <ListItem key={item.id} >
              <FormGroup>
                <FormControlLabel
                 control={<Checkbox onChange={handleChange(item.id)}/>} label={item.name} />
              </FormGroup>
              {/* <ListItemButton role={undefined} onClick={handleToggle(item.id)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(item.id) !== -1}
                    onChange={handleChange(item.id)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={item.label} />
              </ListItemButton>
              <Box sx={{ display: isChecked[item.id] ? 'flex' : 'none', flexDirection: 'column', ml: 3 }}>
                {renderChildren(item.id)}
              </Box> */}
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
}
