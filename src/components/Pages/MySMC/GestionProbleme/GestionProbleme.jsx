import React,{useState} from 'react'
import useAuth from '../../Auth/useAuth';
import Header from '../../../Header/Header';
import MenuPersoGesIncident from '../GestionIncident/MenuPersoGesIncident';
import NavigatePerso from '../GestionIncident/NavigatePerso';
import { FaPlusCircle, FaSearch, FaHome} from 'react-icons/fa';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import Title from '../../../Card/Title/Title';
import { Container,Row,Col,Button } from 'react-bootstrap'
import { Grid,Select,MenuItem, InputLabel,TextField } from '@mui/material';
import TableGesProbleme from './TableGesProbleme/TableGesProbleme'


const gestionProblemeItemsMenu =[
    {label: " Scanner un probleme", link: "/gestionprobleme/scannerprobleme",icon:FaPlusCircle},
    { label: " Rechercher probleme", link: "/gestionincident/rechercheavis",icon:FaSearch},
    ];
  
  
  const gestionIncidentItemsNavigate =[
  {label: " Gestion Incidents", link: "/mysmc/gestionincident",icon:ReportProblemIcon},
  { label: " Gestion Probleme", link: "/mysmc/gestionprobleme",icon:ReportProblemIcon},
  { label: " Etat Supervision", link: "/mysmc/etatsupervision", icon:RiDashboard3Line},
  { label: " Consignes Orchestrées", link: "#"},
  { label: " Suivi Activités ", link: "/mysmc/suivisactivites", icon:IoStatsChart},
  { label: " Page d'acceuil", link: "/mysmc",icon: FaHome },
  ];
  

function GestionProbleme() {
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
  return (
    <div id='home'>
        <div>
         <Header/>
        </div>
       
        <div  style={{position:"relative"}}>
        <MenuPersoGesIncident  propsMenuItems={gestionProblemeItemsMenu} onItemClick={handleMenuClick}  />
        </div>
        <div style={{position:"relative",top:"30%"}}>
        <NavigatePerso propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick}  />
        </div>
        <Container>
        <div id='title'>
            <Row>
            <Col xs={9} className='content'>
            <Title text="Liste des problémes en cours"/>
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
        <div style={{marginLeft:"40%",position:"absolute",top:"25%"}}>
       <label >Rechercher: </label> &nbsp;
       <TextField  variant='outlined' size='small'/>
       </div>
       <br />
       <div>
       <TableGesProbleme/>
       <br />
       </div>
       <div id='title'>
            <Row>
            <Col xs={9} className='content'>
            <Title text="Les problémes clotûrés ou annulés récemment"/>
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
        <div style={{marginLeft:"40%",position:"absolute",top:"81.5%"}}>
       <label >Rechercher: </label> &nbsp;
       <TextField  variant='outlined' size='small'/>
       </div>
       <br />
       <div>
       <TableGesProbleme/>
       <br />
       </div>
        </Container>
    </div>

  
  )
}

export default GestionProbleme