import React,{useState} from 'react'
import Header from '../../../Header/Header'
import Title from '../../../Card/Title/Title'
import {Container,Col,Row,Button} from'react-bootstrap'
import {TextField,InputLabel,Grid} from '@mui/material'
import MenuPersoEtatSup from './MenuPersoEtatSup'
import NavigatePersoEtatSup from './NavigatePersoEtatSup'
import useAuth from '../../Auth/useAuth'
import {  FaHome, FaList, FaShare, FaBook,FaPlusCircle,
FaDownload,FaCheckCircle,FaChartLine, FaBan,FaSearch} from 'react-icons/fa';
import { IoIosAlert } from "react-icons/io";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import { GoAlertFill } from "react-icons/go";

const etatSupervisionItemsMenu =[
    {label: " Export rapport", link: "",icon:FaDownload},
    { label: " Partager rapport", link: "",icon:FaShare},
    { label: " Creer groupe d'alarmes", link: "/etatsupervision/creeralarme",icon:IoIosAlert},
    { label: " Groupe d'alarmes", link: "/etatsupervision/groupealarme",icon:FaList},
    { label: " Base Connaissane", link: "/etatsupervision/baseconnaissance",icon:FaBook},
    ];
  
  
  const gestionIncidentItemsNavigate =[
  {label: " Gestion Incidents", link: "/mysmc/gestionincident",icon:ReportProblemIcon},
  { label: " Gestion Probleme", link: "/mysmc/gestionprobleme",icon:ReportProblemIcon},
  { label: " Etat Supervision", link: "/mysmc/etatsupervision", icon:RiDashboard3Line},
  { label: " Consignes Orchestrées", link: "#"},
  { label: " Suivi Activités ", link: "/mysmc/suivisactivites", icon:IoStatsChart},
  { label: " Page d'acceuil", link: "/mysmc",icon: FaHome },
  ];

function VR04Service() {
    useAuth()
    const [currentForm, setCurrentForm] = useState("")

    const handleMenuClick = (link)=>{
      setCurrentForm(link);
      console.log(link);
    }
  return (
    <div id='home'>
        <div>
            <Header/>
        </div>
        <div>
        <MenuPersoEtatSup  propsMenuItems={etatSupervisionItemsMenu} onItemClick={handleMenuClick}  />
        </div>
        <div style={{position:"relative",top:"50%"}}>
        <NavigatePersoEtatSup propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick}  />
        </div>
        <Container>
        <div id='title'>
              <Row>
              <Col xs={10} className='content'>
              <Title text="Scoring 4H par Structure" />
              </Col> 
              </Row>
          </div>
          <br />
          <div style={{display:"flex"}}>
             <div  className='mb-4'>
              <Button href='/mysmc/etatsupervision' style={{ backgroundColor:" #d9534f", borderColor: " #d9534f",marginRight:"5px",fontSize:"14px",fontWeight:"400"}}><GoAlertFill /> Alarmes Critiques</Button>
             </div>
             <div  className='mb-4'>
              <Button href='/etatsupervision/alarmesok' style={{ backgroundColor:"#5CB85C", borderColor: " #5CB85C",marginRight:"5px",fontSize:"14px",fontWeight:"400"}}><FaCheckCircle/> Alarmes ok</Button>
             </div>
             <div  className='mb-4'>
              <Button href='/etatsupervision/vr24service' style={{ backgroundColor:" #337ab7", borderColor: " #337ab7",marginRight:"5px",fontSize:"14px",fontWeight:"400"}}><FaChartLine/> VR24H Service</Button>
             </div>
             <div  className='mb-4'>
              <Button href='/etatsupervision/vr04application' style={{ backgroundColor:"#337ab7", borderColor: "#337ab7",marginRight:"5px",fontSize:"14px",fontWeight:"400"}}><FaChartLine/> VR04 Application</Button>
             </div>
             <div  className='mb-4'>
              <Button href='/etatsupervision/gestionmaintenance' style={{ backgroundColor:"#f0ad4e", borderColor: "#f0ad4e",marginRight:"5px",fontSize:"14px",fontWeight:"400"}}><GoAlertFill/> Gestion Maintenance</Button>
             </div>
             <div  className='mb-4'>
              <Button href='/etatsupervision/historiquedesactivation' style={{ backgroundColor:" #d9534f", borderColor: " #d9534f",fontSize:"14px",fontWeight:"400"}}><FaBan/> Historique Désactivation</Button>
             </div>
          </div>
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
              <Button style={{ backgroundColor:"#d9534f", borderColor: " #d9534f",width:"70px"}}><FaSearch/></Button> 
             </div>     
        </div><br />
          <div className='col-xs-12 col-sm-6 col-md-4' style={{position:"absolute",width:"66%"}}>
              <Grid >
                <h5 className=' alert alert-info' style={{fontSize:"14px",fontFamily:"inherit",fontWeight:"500",color:"#31708F"}}>
                    Information : Merci d'effectuer une recherche au préalable pour afficher les alarmes
                 </h5>
              </Grid>
            </div>
          
        </Container>

    </div>
  )
}

export default VR04Service