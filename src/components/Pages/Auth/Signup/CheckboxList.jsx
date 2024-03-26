import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Box, FormControlLabel } from '@mui/material';

export default function CheckboxList() {
  const items = [
    { id: 1, label: 'Admin', childrenLabels:["Gestion de mon équipe", "Gestion actions TMC",
                                              "Gestion des Applications","Gestion des Serveurs",
                                              "Gestion des utilisateurs"] },
    { id: 2, label: 'Maxit', childrenLabels: ["Child 3", "Child 4"] },
    { id: 3, label: 'Mysmc', childrenLabels: ["Child 5", "Child 6"] },
    { id: 4, label: 'Network', childrenLabels: ["Child 7", "Child 8"] },
    { id: 5, label: 'Support Technique', childrenLabels: ["Child 9", "Child 10"] },
  ];

  const [checked, setChecked] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState({});
  const [childChecked, setChildChecked] = React.useState({});

  const handleChange = (itemId) => (event) => {
    setIsChecked((prev) => ({ ...prev, [itemId]: event.target.checked }));
  };

  const handleChildChange = (itemId, childIndex) => (event) => {
    setChildChecked((prev) => ({
      ...prev,
      [itemId]: { ...(prev[itemId] || {}), [childIndex]: event.target.checked },
    }));
    console.log(childChecked);
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
    const childrenLabels = items.find((item) => item.id === itemId)?.childrenLabels || [];

    return childrenLabels.map((label, index) => (
      <FormControlLabel
        key={index}
        label={label}
        control={<Checkbox checked={childChecked[itemId]?.[index] || false} onChange={handleChildChange(itemId, index)} />}
      />
    ));
  };

  return (
    <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
      {items.map((item) => {
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
  );
}
