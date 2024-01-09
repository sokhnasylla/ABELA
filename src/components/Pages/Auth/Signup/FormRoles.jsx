import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Box, FormControlLabel } from '@mui/material';
import { getTokenFromLocalStorage } from '../authUtils';
import axios from 'axios';

export default function FormRoles() {
  const [checked, setChecked] = useState([]);
  const [isChecked, setIsChecked] = useState({});
  const [childChecked, setChildChecked] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getTokenFromLocalStorage();
        const url = "http://127.0.0.1:8000/api/applications/roles";
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const rolesWithDetails = await Promise.all(
          response.data.map(async (index) => {
            const roleDetailsResponse = await axios.get(index);
            return {
              id: roleDetailsResponse.data.id,
              label: roleDetailsResponse.data.nomApp,
              childrenLabels: roleDetailsResponse.data.roles
            };
          })
        );
  
        setData(rolesWithDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  console.log(data);

  const handleChange = (itemId) => (event) => {
    setIsChecked((prev) => ({ ...prev, [itemId]: event.target.checked }));
  };

  const handleChildChange = (itemId, childIndex) => (event) => {
    setChildChecked((prev) => ({
      ...prev,
      [itemId]: { ...(prev[itemId] || {}), [childIndex]: event.target.checked },
    }));
    // console.log(childChecked);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const renderChildren = (itemId) => {
    const childrenLabels = data.find((item) => item.id === itemId)?.childrenLabels || [];
    
    return childrenLabels.map((roles) => (
      
     
      <FormControlLabel
        key={roles.id}
        label={roles.description}
        control={<Checkbox checked={childChecked[itemId]?.[roles.id] || false} onChange={handleChildChange(itemId, roles.id)} />}
      />
    ));
  };

  return (
    <Grid container spacing={3}>
      <Grid container direction="column" justifyContent="center" alignSelf="center" width="70">
        <Typography align='center' sx={{ backgroundColor: "#148C8A", color: "white", width: "104%", borderRadius: "3px" }}>
          Roles
        </Typography>
      </Grid>
      <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
        {data.map((item) => {
          const labelId = `checkbox-list-label-${item.id}`;

          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton role={undefined} onClick={handleToggle(item.id)} dense>
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
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
}
