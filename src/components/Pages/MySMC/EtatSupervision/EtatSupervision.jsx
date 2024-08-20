import React,{useState} from 'react'
import Header from '../../../Header/Header'
import useAuth from '../../Auth/useAuth'
import {  FaHome, FaList, FaShare, FaBook, 
 FaDownload,FaCheckCircle,FaChartLine, FaBan} from 'react-icons/fa';
import { IoIosAlert } from "react-icons/io";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import Title from '../../../Card/Title/Title';
import {Row,Col,Container,Button} from 'react-bootstrap'
import { GoAlertFill } from "react-icons/go";
import MenuPersoEtatSup from './MenuPersoEtatSup';
import NavigatePersoEtatSup from './NavigatePersoEtatSup';
import {Grid,MenuItem,InputLabel,Select,Card,TextField} from '@mui/material'
import TableEtatSup from './TableEtatSup/TableEtatSup'


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
  

function EtatSupervision() {
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
{/*         <Header/>
 */}        
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
              <Title text="Journal de la supervision technique et applicative"/>
              </Col> 
              </Row>
          </div>
              <br />
          <div style={{display:"flex"}}>
             <div  className='mb-4'>
              <Button href='/etatsupervision/alarmesok' style={{ backgroundColor:"#5CB85C", borderColor: " #5CB85C",marginRight:"5px",fontSize:"14px",fontWeight:"400"}}><FaCheckCircle /> Alarmes Ok</Button>
             </div>
             <div  className='mb-4'>
              <Button href='/etatsupervision/vr04service' style={{ backgroundColor:" #337ab7", borderColor: " #337ab7",marginRight:"5px",fontSize:"14px",fontWeight:"400"}}><FaChartLine/> VR04H Service</Button>
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
        <div style={{marginLeft:"49%",position:"absolute",top:"35%"}}>
       <label >Rechercher: </label> &nbsp;
       <TextField  variant='outlined' size='small'/>
       </div>
       <br />
        <TableEtatSup/>
        </Container>
    </div>

  )
}

export default EtatSupervision