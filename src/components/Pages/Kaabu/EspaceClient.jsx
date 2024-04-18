import React,{useState,useEffect} from 'react'
import Header from '../../Header/Header'
import { Container,Row,Col, Button } from 'react-bootstrap'
import Title from '../../Card/Title/Title'
import { InputLabel, TextField } from '@mui/material'
import MenuPersoGesIncident from '../MySMC/GestionIncident/MenuPersoGesIncident'
import "../MySMC/GestionIncident/ajoutavis.css"
import { FaUserGroup } from 'react-icons/fa6'
import NavigatePerso from '../MySMC/GestionIncident/NavigatePerso'
import { FaSearch, FaHome, FaPaperclip} from "react-icons/fa";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import FormKaabu from './FormKaabu'
import FormSiplissimo from './FormSiplissimo'
import { getTokenFromLocalStorage } from '../Auth/authUtils'
import axios from 'axios'
import FormSimplissimoClient from './FormSimplissimoClient'

function EspaceClient() {
  const gestionIncidentItemsNavigate = [
    { label: "Gestion Incidents", link: "/mysmc/gestionincident", icon: ReportProblemIcon },
    { label: "Gestion Probleme", link: "/mysmc/gestionprobleme", icon: ReportProblemIcon },
    { label: "Etat Supervision", link: "/mysmc/etatsupervision", icon: RiDashboard3Line },
    { label: "Consignes Orchestrées", link: "#" ,icon: FaPaperclip},
    { label: "Suivi Activités ", link: "/mysmc/suivisactivites", icon: IoStatsChart },
    { label: "Page d'acceuil", link: "/mysmc", icon: FaHome },
];

const kaabuItemsMenus=[
  {label:"Espace Client",link:"/kaabu/espace/client",icon:FaUserGroup},
  {label:"Espace Vendeur",link:"/kaabu/espace/vendeur",icon:FaUserGroup},  
];
   
    const [userSimplissimo,setUserSimplissimo]=useState([]);
    const token = getTokenFromLocalStorage();
    
    const [loading,setLoading] =useState(false);

    const GetData = async (url,token) => {
      const response = await axios.get(url,{
          headers:{
              Authorization:`Bearer ${token}`
          },
      });
      console.log(response.data);
      setUserSimplissimo(response.data)
      console.log(userSimplissimo);
     
      return response.data; 
    };
    const isInteger = (value) => {
      return /^\d+$/.test(value);
  };

    const handleSearchClick = async() => {
      setLoading(true);
      const numero=document.getElementById('numero').value ; 
       if (!isInteger(numero)) {
        setLoading(false);
        alert('Veuillez saisir un numéro valide (entier)');
        return;
    }
      const url = `http://localhost:8082/abela-selfservice/api/v1/kaabu/verification-client/${numero}`;
      console.log('URL:', url); // Vérifiez si l'URL est correcte
      try {
          const response = await GetData(url, token);
          console.log('Response:', response); // Vérifiez la réponse de l'API
      }
      catch (error) {
          console.error('Error fetching data:', error); // Gérez les erreurs de requête
      }
      finally{
        setLoading(false);
      }
    };
     
    useEffect(() => {
        
    }, [userSimplissimo]);

  return (
    <div id='home'>
        <Header/>
        <Container className='body'>
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
                   sx={{ width: "500px", maxWidth: "100%" }}
                    s
                    />
                 </div>
                 <div className='mb-3 float-end' id='search' style={{ marginLeft: "17%" }}>
                  <Button onClick={handleSearchClick} style={{ backgroundColor: "#C9302C", borderColor: "#C9302C" }}>Rechercher</Button>
                 </div>

                 </div>
                </Col>
                <Col sm={4} style={{marginTop:"40px"}}>
                    <MenuPersoGesIncident propsMenuItems={kaabuItemsMenus}  onItemClick={() => { }}/>
                </Col>
            </Row>
            <Row>
              <Col sm={8}>
              {loading && (
                            <div style={{ marginTop: "10px" }}>Chargement en cours...</div>
                        )}
                    {userSimplissimo && !loading && (
                      <div>
                        <br />
                        <div>
                           <FormSimplissimoClient userSimplissimo={userSimplissimo}/>
                         </div>   
                             <br />
                           
                          
                      </div>
                      )}
              </Col>
              <Col sm={4} style={{ marginTop: "3%" }}>
                <NavigatePerso propsMenuItems={gestionIncidentItemsNavigate} onItemClick={() => { }}/>
              </Col>
            </Row>
        </Container>

    </div>
  )
}

export default EspaceClient