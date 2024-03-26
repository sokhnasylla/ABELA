import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Typography,Box, FormControlLabel  } from '@mui/material';
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
  const [rolesWithChildren, setRolesWithChildren] = useState({});

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

        const formattedRolesWithChildren = response.data.reduce((acc, role) => {
          console.log(role);
          const formattedRole = {
            id: role.id,
            label: role.nomApp,
            children: role.roles.map((childRole) => ({
              id: childRole.id,
              label: childRole.description,
              checked: false, // Initial state for children
            })),
          };
          acc[role.id] = formattedRole;
          return acc;
        }, {});

        setRolesWithChildren(formattedRolesWithChildren);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    // Update children checked state
    const updatedRolesWithChildren = { ...rolesWithChildren };
    const role = updatedRolesWithChildren[value];
    if (role) {
      role.children.forEach((child) => {
        child.checked = newChecked.includes(value);
      });
    }
    setRolesWithChildren(updatedRolesWithChildren);
    console.log(updatedRolesWithChildren);
  };

  const handleChildChange = (parentId, childId) => (event) => {
    const updatedRolesWithChildren = { ...rolesWithChildren };
    const role = updatedRolesWithChildren[parentId];
    if (role) {
      const child = role.children.find((c) => c.id === childId);
      if (child) {
        child.checked = event.target.checked;
      }
    }
    setRolesWithChildren(updatedRolesWithChildren);
  };

  useEffect(() => {
    if (onRolesAndTbRolesReady) {
      // Extract selected roles and their children
      const selectedRoles = checked.map((roleId) => {
        const role = rolesWithChildren[roleId];
        if (role) {
          return {
            id: role.id,
            label: role.label,
            children: role.children.filter((child) => child.checked).map((child) => child.id),
          };
        }
        return null;
      }).filter((role) => role !== null);

      onRolesAndTbRolesReady(selectedRoles);
    }
  }, [checked, rolesWithChildren, onRolesAndTbRolesReady]);

  return (
    <Grid container spacing={3}>
      <Grid container direction="column" justifyContent="center" alignSelf="center" width="70">
        <Typography align='center' sx={{ backgroundColor: "#148C8A", color: "white", width: "104%" }}>
          Roles
        </Typography>
      </Grid>
      <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
        {Object.values(rolesWithChildren).map((role) => (
          <ListItem key={role.id} disablePadding>
            <ListItemButton role={undefined} onClick={handleToggle(role.id)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(role.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': `checkbox-list-label-${role.id}` }}
                />
              </ListItemIcon>
              <ListItemText id={`checkbox-list-label-${role.id}`} primary={role.label} />
            </ListItemButton>
            <Box sx={{ display: checked.indexOf(role.id) !== -1 ? 'flex' : 'none', flexDirection: 'column', ml: 3 }}>
              {role.children.map((child) => (
                <FormControlLabel
                  key={child.id}
                  label={child.label}
                  control={
                    <Checkbox
                      checked={child.checked}
                      onChange={handleChildChange(role.id, child.id)}
                    />
                  }
                />
              ))}
            </Box>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}
