import React,{useState,useEffect} from 'react'
import Header from '../../Header/Header'
import { Container,Row,Col, Button } from 'react-bootstrap'
import Title from '../../Card/Title/Title'
import { InputLabel, TextField } from '@mui/material'
import MenuPersoGesIncident from '../MySMC/GestionIncident/MenuPersoGesIncident'
import "../MySMC/GestionIncident/ajoutavis.css"
import { FaUserGroup } from 'react-icons/fa6'
import NavigatePerso from '../MySMC/GestionIncident/NavigatePerso'
import { FaSearch, FaHome} from "react-icons/fa";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import Get from '../../API/Get'
import FormKaabu from './FormKaabu'
import FormSiplissimo from './FormSiplissimo'


function EspaceClient() {
  const gestionIncidentItemsNavigate = [
    { label: "Gestion Incidents", link: "/mysmc/gestionincident", icon: ReportProblemIcon },
    { label: "Gestion Probleme", link: "/mysmc/gestionprobleme", icon: ReportProblemIcon },
    { label: "Etat Supervision", link: "/mysmc/etatsupervision", icon: RiDashboard3Line },
    { label: "Consignes Orchestrées", link: "#" },
    { label: "Suivi Activités ", link: "/mysmc/suivisactivites", icon: IoStatsChart },
    { label: "Page d'acceuil", link: "/mysmc", icon: FaHome },
];
    const [currentForm, setCurrentForm] = useState("");
    const [url, setUrl] = useState(false);
    

    const handleMenuClick = (link)=>{
        setCurrentForm(link);
        console.log(link);
      }
    const kaabuItemsMenus=[
        {label:"Espace Client",link:"/kaabu/espace/client",icon:FaUserGroup},
        {label:"Espace Vendeur",link:"/kaabu/espace/vendeur",icon:FaUserGroup},  
    ];
    const [identifiant, setIdentifiant] = useState('');
   
  
    const handleSearchClick = () => {
      
    };
  
  return (
    <div id='home'>
        <Header/>
        <Container>
            <Row>
                <Col sm={8}>
                 <Title text="Verification par Numéro"/>
                 <br />
                 <div style={{display:"flex"}}>
                 <div className='mb-3'>
                 <InputLabel sx={{ }} id="demo-simple-select-label">Numéro</InputLabel>
                 <TextField id='numero'
                  variant='outlined' 
                  size='small'
                   placeholder='Ex:MSISDN'
                    sx={{ width: "450px"}} 
                    value={identifiant}
                    />
                 </div>
                 <div className='mb-3' id='search' style={{marginLeft:"20%"}} >
                 <Button onClick={handleSearchClick} style={{ backgroundColor: " #C9302C", borderColor: " #C9302C" }}><FaSearch /></Button>
                 </div>
                 </div>
                </Col>
                <Col sm={4} style={{marginTop:"40px"}}>
                    <MenuPersoGesIncident propsMenuItems={kaabuItemsMenus} onItemClick={handleMenuClick}/>
                </Col>
            </Row>
            <Row>
              <Col sm={8}>
                    {url && (
                      <div>
                        <Title text="Informations du client"/>
                        <br />
                        <div style={{display:"flex"}}>
                           <FormKaabu />
                           <FormSiplissimo />
                         </div>   
                             <br />
                           
                          
                      </div>
                      )}
              </Col>
              <Col sm={4} style={{ marginTop: "3%" }}>
                <NavigatePerso propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick}/>
              </Col>
            </Row>
        </Container>

    </div>
  )
}

export default EspaceClient