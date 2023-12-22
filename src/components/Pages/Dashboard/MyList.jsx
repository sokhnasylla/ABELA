import * as React from 'react';
import {ListItemButton,ListItemIcon,ListItemText,Collapse} from "@mui/material"
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import BarChartIcon from '@mui/icons-material/BarChart';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import NoteIcon from '@mui/icons-material/Note';
import LayersIcon from '@mui/icons-material/Layers';
import List from '@mui/material/List/';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PeopleIcon from '@mui/icons-material/People';
// import { Link } from 'react-router-dom';
import { Link } from '@mui/material';


export default function NestedList( ) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };



  return (
    <React.Fragment
    >
      <ListItemButton>
        <ListItemIcon>
          <SettingsApplicationsIcon />
        </ListItemIcon>
        <ListItemText primary="Parametrage" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Incident Management" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <FilterNoneOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Organisation" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <NoteIcon />
        </ListItemIcon>
        <ListItemText primary="Carnet D'adresse" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Supervision Metier" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Supervision Technique" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <PeopleIcon/>
        </ListItemIcon>
        <ListItemText primary="Utilisateurs" />
        {open ? <ExpandLess /> : <ExpandMore
        />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href="/admin/user" color="initial" underline='none'>
              <ListItemButton sx={{ pl: 4 }}  >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Utilisateurs"  />
              </ListItemButton>
          </Link>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
             <FileCopyIcon />
            </ListItemIcon>
            <ListItemText primary="Groupes" />
          </ListItemButton>
        </List>
      </Collapse>
    </React.Fragment>
  );
}