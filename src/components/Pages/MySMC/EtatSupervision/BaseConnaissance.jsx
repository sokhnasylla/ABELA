import React,{useState} from 'react'
import Header from '../../../Header/Header'
import MenuPersoEtatSup from './MenuPersoEtatSup';
import NavigatePersoEtatSup from './NavigatePersoEtatSup';
import useAuth from '../../Auth/useAuth';
import {  FaHome, FaList, FaBook,FaCheckCircle,FaPlusCircle} from 'react-icons/fa';
import { IoIosAlert } from "react-icons/io";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import {Container,Col,Row} from 'react-bootstrap'
import Title from '../../../Card/Title/Title';
import { MenuItem,Select,TextField } from '@mui/material';
import TableBaseConnaissance from './TableEtatSup/TableBaseConnaissance'

const etatSupervisionItemsMenu =[
    {label: " Journal Etat Supervision", link: "/mysmc/etatsupervision",icon:FaBook},
    { label: " Alarme Centreon temps", link: "/etatsupervision/creeralarme",icon:IoIosAlert},
    { label: " Groupe d'alarmes", link: "/etatsupervision/groupealarme",icon:FaList},
    ];

  const gestionIncidentItemsNavigate =[
  {label: " Gestion Incidents", link: "/mysmc/gestionincident",icon:ReportProblemIcon},
  { label: " Gestion Probleme", link: "/mysmc/gestionprobleme",icon:ReportProblemIcon},
  { label: " Etat Supervision", link: "/mysmc/etatsupervision", icon:RiDashboard3Line},
  { label: " Consignes Orchestrées", link: "#"},
  { label: " Suivi Activités ", link: "#", icon:IoStatsChart},
  { label: " Page d'acceuil", link: "/mysmc",icon: FaHome },
  ];


function BaseConnaissance() {
    useAuth()
    const [nombre, setNombre] = React.useState('10');
    const [currentForm, setCurrentForm] = useState("")

    const handleMenuClick = (link)=>{
      setCurrentForm(link);
      console.log(link);
    }
    
  
    const handleChange = (event) => {
      setNombre(event.target.value);
    };
    const [checked, setChecked] = React.useState(true);

    const handleChanges = (event) => {
      setChecked(event.target.checked);
    };
  return (
    <div id='home'>
        <div>
         <Header/>
        </div>
        <div>
        <MenuPersoEtatSup  propsMenuItems={etatSupervisionItemsMenu} onItemClick={handleMenuClick}  />
        </div>
        <div style={{position:"relative",top:"40%"}}>
        <NavigatePersoEtatSup propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick}  />
        </div>
        <Container>
        <div id='title'>
              <Row>
              <Col xs={10} className='content'>
              <Title text="Base de connaissance alarmes"/>
              </Col> 
              </Row>
        </div>
        <br />
        <div style={{marginLeft:"2%"}}>
          <label className='=label'> Afficher</label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
            size='small'
            value={nombre} >
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="25">25</MenuItem>
                <MenuItem value="50">50</MenuItem>
                <MenuItem value="100">100</MenuItem>         
          </Select><label>elements</label>
        </div>
        <div style={{marginLeft:"49%",position:"absolute",top:"25%"}}>
       <label >Rechercher: </label> &nbsp;
       <TextField  variant='outlined' size='small'/>
       </div>
       <br />
       <TableBaseConnaissance/>
        </Container>
    </div>
  )
}

export default BaseConnaissance