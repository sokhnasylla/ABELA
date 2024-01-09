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
import { FaChartLine } from "react-icons/fa";


export default function NestedList( ) {
 

 


  return (
    <React.Fragment
    >
      <ListItemButton>
        <ListItemIcon>
          <FaChartLine size={25}/>
        </ListItemIcon>
        <ListItemText primary="Audit" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Gestion de mon équipe" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Gestion des acitivités" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Gestion des application" />
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
      <Link href="/admin/user" color="initial" underline='none'>
         <ListItemButton >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Utilisateurs"  />
          </ListItemButton>
      </Link>
     
    </React.Fragment>
  );
}