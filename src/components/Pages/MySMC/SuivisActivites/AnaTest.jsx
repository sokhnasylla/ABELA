import React,{useState} from 'react'
import useAuth from '../../Auth/useAuth'
import Header from '../../../Header/Header'
import MenuPersoEtatSup from '../EtatSupervision/MenuPersoEtatSup'
import NavigatePersoEtatSup from '../EtatSupervision/NavigatePersoEtatSup'
import Title from '../../../Card/Title/Title'
import {  FaHome, FaPlusCircle, } from 'react-icons/fa';
import { IoIosAlert } from "react-icons/io";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import {Container,Col,Row, Button} from "react-bootstrap"
import {InputLabel,TextField,MenuItem,Select} from "@mui/material"
import TableAnaTest from './TableSuiviActivites/TableAnaTest'

 const etatSupervisionItemsMenu =[
     { label: " Nouvelle analyse", link: "/anatest/nouvelleanalyse",icon:FaPlusCircle},
    { label: " Acceuil-Suivi Activites", link: "",icon:FaHome},
    ];
  const gestionIncidentItemsNavigate =[
  {label: " Gestion Incidents", link: "/mysmc/gestionincident",icon:ReportProblemIcon},
  { label: " Gestion Probleme", link: "/mysmc/gestionprobleme",icon:ReportProblemIcon},
  { label: " Etat Supervision", link: "/mysmc/etatsupervision", icon:RiDashboard3Line},
  { label: " Consignes Orchestrées", link: "#"},
  { label: " Suivi Activités ", link: "/mysmc/suivisactivites", icon:IoStatsChart},
  { label: " Page d'acceuil", link: "/mysmc",icon: FaHome },
  ];

function AnaTest() {
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
        <div>
        <MenuPersoEtatSup  propsMenuItems={etatSupervisionItemsMenu} onItemClick={handleMenuClick}  />
        </div>
        <div style={{position:"relative",top:"35%"}}>
        <NavigatePersoEtatSup propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick}  />
        </div>
        <Container>
            <div id='title'>
                <Row>
                <Col xs={10} className='content'>
                <Title text="Supervision ressenti utilisateur - Analyse des résultats de l'outil Newtest"/>
                </Col> 
                </Row>
            </div>
              <br />
            <div style={{display:"flex"}}>
              <div className='mb-4' >
             <InputLabel sx={{marginLeft:"6%"}} id="demo-simple-select-label">Date début</InputLabel>&nbsp;
             <TextField variant='outlined'  size='small' type='date' sx={{width:"250px",marginRight:"35px"}}/>
             </div>
             <div className='mb-4' >
             <InputLabel sx={{marginLeft:"6%"}} id="demo-simple-select-label">Date Fin</InputLabel>&nbsp;
             <TextField variant='outlined'  size='small' type='date' sx={{width:"250px",marginRight:"35px"}}/>
             </div>
             <div  className='mb-4' id='search'>
              <Button style={{ backgroundColor:"#5CB85C", borderColor: "#5CB85C",width:"15p0x"}}>Rechercher</Button> 
             </div> 
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
        <div style={{marginLeft:"49%",position:"absolute",top:"43%"}}>
       <label >Rechercher: </label> &nbsp;
       <TextField  variant='outlined' size='small'/>
       </div><br />
       <TableAnaTest/>
        </Container>

    </div>
  )
}

export default AnaTest