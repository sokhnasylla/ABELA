import * as React from 'react';
import {ListItemButton,ListItemIcon,ListItemText} from "@mui/material"
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import NoteIcon from '@mui/icons-material/Note';
import LayersIcon from '@mui/icons-material/Layers';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';
import { FaChartLine } from "react-icons/fa";


export default function NestedList( ) {
 

 


  return (
    <React.Fragment
    >
       <Link href="/admin/audit" color="initial" underline='none'></Link>
          <ListItemButton>
            <ListItemIcon>
              <FaChartLine size={25}/>
            </ListItemIcon>
            <ListItemText primary="Audit" />
          </ListItemButton>
        <Link/>
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
        <ListItemText primary="Gestion des activités" />
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
      <Link to="/admin/role" style={{textDecoration: 'inherit', color: 'inherit'}}>
         <ListItemButton >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Roles"  />
          </ListItemButton>
      </Link>
      <Link to="/admin/user" style={{textDecoration: 'inherit', color: 'inherit'}}  >
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