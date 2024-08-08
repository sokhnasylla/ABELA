import * as React from 'react';
import {ListItemButton,ListItemIcon,ListItemText} from "@mui/material"
import PersonIcon from '@mui/icons-material/Person';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';
import { FaChartLine } from 'react-icons/fa';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ContactsIcon from '@mui/icons-material/Contacts';
import { getTokenDecode } from '../Auth/authUtils';
import { RoleConstants } from '../../../config/role.constants';


export default function NestedList( ) {

  const userToken = getTokenDecode();

  console.log("--------MENU ADMIN---ACCESS-------- ", RoleConstants.admin.code, " --------- ", userToken.roles, userToken.roles.includes(RoleConstants.admin.code));


  return (
    <React.Fragment
    >
      { userToken.roles.includes(RoleConstants.mysmc.code) && (<Link to="/admin/audit" style={{textDecoration: 'inherit', color: 'inherit'}}>
        <ListItemButton>
            <ListItemIcon>
              <FaChartLine size={25}/>
            </ListItemIcon>
            <ListItemText primary="Audit" />
        </ListItemButton>
      </Link>)}
      {/* <ListItemButton>
        <ListItemIcon>
          <RowingIcon />
        </ListItemIcon>
        <ListItemText primary="Gestion des activités" />
      </ListItemButton> */}
      {/* <ListItemButton>
        <ListItemIcon>
          <FilterNoneOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Organisation" />
      </ListItemButton> */}
      {userToken.roles.includes(RoleConstants.mysmc.code) && (<ListItemButton>
        <ListItemIcon>
          <ContactsIcon />
        </ListItemIcon>
        <ListItemText primary="Carnet D'adresse" />
      </ListItemButton>)}
      {userToken.roles.includes(RoleConstants.mysmc.code) && (<ListItemButton>
        <ListItemIcon>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <ListItemText primary="Supervision Metier" />
      </ListItemButton>)}
      {userToken.roles.includes(RoleConstants.mysmc.code) && (<ListItemButton>
        <ListItemIcon>
          <SyncAltIcon />
        </ListItemIcon>
        <ListItemText primary="Supervision Technique" />
      </ListItemButton>)}
      {userToken.roles.includes(RoleConstants.superAdmin.code) && (<Link to="#" style={{textDecoration: 'inherit', color: 'inherit'}}>
         <ListItemButton >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Gestion des Profils"  />
          </ListItemButton>
      </Link>)}
      {userToken.roles.includes(RoleConstants.superAdmin.code) && (<Link to="/admin/role" style={{textDecoration: 'inherit', color: 'inherit'}}>
         <ListItemButton >
                <ListItemIcon>
                  <BuildIcon />
                </ListItemIcon>
                <ListItemText primary="Gestion des Rôles"  />
          </ListItemButton>
      </Link>)}
      {userToken.roles.includes(RoleConstants.admin.code) && (<Link to="/admin/user" style={{textDecoration: 'inherit', color: 'inherit'}}  >
         <ListItemButton >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Mon équipe" />
          </ListItemButton>
      </Link>)}
     
    </React.Fragment>
  );
}