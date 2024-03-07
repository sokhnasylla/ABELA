import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Typography,Box, FormControlLabel } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { getTokenFromLocalStorage } from '../authUtils';
import axios from 'axios';

export default function FormRoles({ onRolesAndTbRolesReady, formData }) {
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
            const apiUrl = "http://localhost:8000";
            const roles = await Promise.all(
              index.roles.map(async (roleLink) => {
                try {
                  const roleDetailsResponse = await axios.get(`${apiUrl}${roleLink}`, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  });
                  return {
                    id: roleDetailsResponse.data.id,
                    label: roleDetailsResponse.data.description,
                  };
                } catch (error) {
                  console.error('Error fetching role details:', error);
                  return null; // Gérer l'erreur selon vos besoins
                }
              })
            );

            return {
              id: index.id,
              label: index.nomApp,
              childrenLabels: roles.filter(role => role !== null), // Filtrer les résultats null
            };
          })
        );

        setData(rolesWithDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Aucune dépendance nécessaire ici, car cela doit être exécuté une seule fois au montage

  const handleChange = (itemId) => (event) => {
    setIsChecked((prev) => ({ ...prev, [itemId]: event.target.checked }));
    console.log(checked);
      
  };

  const handleChildChange = (itemId, childIndex) => (event) => {
    setChildChecked((prev)=>({...prev,[childIndex]:event.target.checked}))
  
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

    const updatedChildChecked = { ...childChecked };
    const item = data.find((item) => item.id === value);
    if (item) {
      item.childrenLabels.forEach((child) => {
        updatedChildChecked[child.id] = newChecked.includes(value);
      });
    }
    setChildChecked(updatedChildChecked);
  };

  useEffect(() => {
    if (onRolesAndTbRolesReady) {
      const renderRoles = () => {
        const roles = [];
        checked.forEach((elementId) => {
          let foundElement = data.find((element) => element.id === elementId);
          if (foundElement) {
            if (foundElement.label === "Support Technique") {
              foundElement.label = "Support";
            }
            roles.push(`ROLE_${foundElement.label.toUpperCase()}`);
          }
        });
        console.log(roles);
      };

      const rendertbroles = () => {
        const tbRole = [];
        for (const key in childChecked) {
          const object = childChecked[key];
          for (const value in object) {
            if (object[value] === true) {
              tbRole.push(value);
            }
          }
        }
        return tbRole;
      };

      const myrole=renderRoles()
      console.log(myrole);
      onRolesAndTbRolesReady(renderRoles(), rendertbroles());
    }
  }, [checked, childChecked, data, formData, onRolesAndTbRolesReady]);

  const renderChildren = (itemId) => {
    const childrenLabels = data.find((item) => item.id === itemId)?.childrenLabels || [];
   
    return childrenLabels.map((roles) => (
      <FormControlLabel
        key={roles.id}
        label={roles.label}
        control={
          <Checkbox
            checked={childChecked[itemId]?.[roles.id]}
            onChange={handleChildChange(itemId, roles.id)}
          />
        }
      />
    ));
  };

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
