import React,{useState} from 'react'
import Header from '../../../Header/Header'
import useAuth from '../../Auth/useAuth';
import {  FaHome, FaList, FaBook,FaCheckCircle,FaPlusCircle} from 'react-icons/fa';
import { IoIosAlert } from "react-icons/io";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import MenuPersoEtatSup from './MenuPersoEtatSup';
import NavigatePersoEtatSup from './NavigatePersoEtatSup';
import {Container,Col,Row} from 'react-bootstrap'
import Title from '../../../Card/Title/Title';
import { Grid } from '@mui/material';
import '../GestionIncident/ajoutavis.css'
import TableGroupeAlarme from './TableEtatSup/TableGroupeAlarme'

const etatSupervisionItemsMenu =[
    {label: " Creer groupe d'alarmes", link: "",icon:FaPlusCircle},
    { label: " Alarme Centreon temps", link: "/etatsupervision/creeralarme",icon:IoIosAlert},
    { label: " Groupe d'alarmes", link: "/etatsupervision/groupealarme",icon:FaList},
    { label: " Base Connaissane", link: "/etatsupervision/baseconnaissance",icon:FaBook},
    ];

  const gestionIncidentItemsNavigate =[
  {label: " Gestion Incidents", link: "/mysmc/gestionincident",icon:ReportProblemIcon},
  { label: " Gestion Probleme", link: "/mysmc/gestionprobleme",icon:ReportProblemIcon},
  { label: " Etat Supervision", link: "/mysmc/etatsupervision", icon:RiDashboard3Line},
  { label: " Consignes Orchestrées", link: "#"},
  { label: " Suivi Activités ", link: "#", icon:IoStatsChart},
  { label: " Page d'acceuil", link: "/mysmc",icon: FaHome },
  ];

function GroupeAlarme() {
    useAuth()
    const [currentForm, setCurrentForm] = useState("")

    const handleMenuClick = (link)=>{
      setCurrentForm(link);
      console.log(link);
    }
    
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
        <div style={{position:"relative",top:"45%"}}>
        <NavigatePersoEtatSup propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick}  />
        </div>
        <Container>
            <div id='title'>
                <Row>
                <Col xs={10} className='content'>
                <Title text="Gestion des groupes d'alarmes centreon - Indicateurs du mois en cours : Janvier 2024"/>
                </Col> 
                </Row>
            </div>
            <br />
            <div className='col-xs-12 col-sm-6 col-md-2' style={{position:"absolute"}}>
         <Grid className='grid' sx={{backgroundColor:"#F2DEDE",color:"#A94451"}}>
            <h5 style={{fontSize:"14px",fontFamily:"inherit",fontWeight:"500"}}>Groupe Alarmes</h5>
         </Grid>
         <center><h2>12</h2></center>
        </div>
        <div className='col-xs-12 col-sm-6 col-md-2' style={{position:"absolute",marginLeft:"18%"}}>
         <Grid className='grid' sx={{backgroundColor:"#DFF0D8",border:"#DFF0D8"}}>
            <h5 style={{fontSize:"14px",fontFamily:"inherit",fontWeight:"500",color:"#3C763D"}}>Nombres Alarmes</h5>
         </Grid>
         <center><h2>96</h2></center>
        </div>
        <div className='col-xs-12 col-sm-6 col-md-2' style={{position:"absolute",marginLeft:"36%"}}>
         <Grid className='grid' sx={{backgroundColor:"#D9EDF7",border:"#D9EDF7"}}>
            <h5 style={{fontSize:"14px",fontFamily:"inherit",fontWeight:"500",color:"#31708F"}}>Alarmes en cours</h5>
         </Grid>
         <center><h2>64</h2></center>
        </div>
        <div className='col-xs-12 col-sm-6 col-md-2' style={{position:"absolute",marginLeft:"54%"}}>
         <Grid className='grid' sx={{backgroundColor:"#D9EDF7",border:"#D9EDF7"}}>
            <h5 style={{fontSize:"14px",fontFamily:"inherit",fontWeight:"500",color:"#31708F"}}>Alarmes Cloturés</h5>
         </Grid>
         <center><h2>32</h2></center>
        </div>
        <br /> <br /> <br />
        <div id='title'>
                <Row>
                <Col xs={10} className='content'>
                <Title text="Groupe d'alarmes en cours"/>
                </Col> 
                </Row>
            </div>
            <br />
            <TableGroupeAlarme/>
            
        </Container>

    </div>
  )
}

export default GroupeAlarme