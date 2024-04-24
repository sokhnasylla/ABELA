import React,{useEffect, useState} from 'react'
import useAuth from '../Auth/useAuth';
import Header from '../../Header/Header'
import { Container,Row,Col, Button } from 'react-bootstrap'
import MenuPersoGesIncident from '../MySMC/GestionIncident/MenuPersoGesIncident';
import Title from '../../Card/Title/Title';
import Get from '../../API/Get';
import { FaSearch, FaHome, FaPaperclip} from "react-icons/fa";
import "../MySMC/GestionIncident/ajoutavis.css"
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import { FaUserGroup } from 'react-icons/fa6';
import NavigatePerso from '../MySMC/GestionIncident/NavigatePerso';
import { getTokenFromLocalStorage } from '../Auth/authUtils';
import axios from 'axios';
import { InputLabel, TextField } from '@mui/material';
import FormKaabu from './FormKaabu';
import FormSimplissimo from './FormSimplissimo';
import httpClient from '../../../config/interceptor.config';

const kaabuItemsMenus=[

    {label:"Espace Client",link:"/kaabu/espace/client",icon:FaUserGroup},
    {label:"Espace Vendeur",link:"/kaabu/espace/vendeur",icon:FaUserGroup},
   
];

function Kaabu() {

  const gestionIncidentItemsNavigate = [
    { label: "Gestion Incidents", link: "/mysmc/gestionincident", icon: ReportProblemIcon },
    { label: "Gestion Probleme", link: "/mysmc/gestionprobleme", icon: ReportProblemIcon },
    { label: "Etat Supervision", link: "/mysmc/etatsupervision", icon: RiDashboard3Line },
    { label: "Consignes Orchestrées", link: "#",icon: FaPaperclip },
    { label: "Suivi Activités ", link: "/mysmc/suivisactivites", icon: IoStatsChart },
    { label: "Page d'acceuil", link: "/mysmc", icon: FaHome },
];
const kaabuItemsMenus=[
    {label:"Espace Client",link:"/kaabu/espace/client",icon:FaUserGroup},
    {label:"Espace Vendeur",link:"/kaabu/espace/vendeur",icon:FaUserGroup}, 
];

const [userkaabu, setUserkaabu] = useState([]);
const [simplissimo, setSimplissimo] = useState([]);
const [userNotFound, setUserNotFound] = useState(false);
const token = getTokenFromLocalStorage();

const [loading, setLoading] = useState(false);

// const GetData = async (url,token) => {
//     const response = await axios.get(url,{
//         headers:{
//             Authorization:`Bearer ${token}`
//         },
//     });
//     console.log(response.data.data.userKaabu);
//     setUserkaabu(response.data.data.userKaabu);
//     setSimplissimo(response.data.data.userSimplissimo)
   
//     return response.data; 
//   };

  const GetData = async (url,token) => {
    const response = await httpClient.get(url);
    console.log(response.data.data.userKaabu);
    setUserkaabu(response.data.data.userKaabu);
    setSimplissimo(response.data.data.userSimplissimo)
    return response.data; 
  };
  
  const handleSearchClick = async () => {
    setLoading(true);
    const identifiant = document.getElementById('identifiant').value;
    const url = `http://localhost:8082/abela-selfservice/api/v1/kaabu/verification-user/${identifiant}`;
    console.log('URL:', url); // Vérifiez si l'URL est correcte
    try {
        if (!identifiant || identifiant.trim() === "") {
            alert('Veuillez saisir un identifiant valide');
            setLoading(false);
            return;
        }

        const response = await GetData(url, token);
        console.log('Response:', response); // Vérifiez la réponse de l'API

        if (response.data.data && response.data.data.userKaabu && response.data.data.userKaabu.length) {
            setUserkaabu(response.data.data.userKaabu);
            setSimplissimo(response.data.data.userSimplissimo);
            setUserNotFound(false); // Réinitialiser l'état userNotFound
        } else {
            setUserNotFound(true);
        }
    } catch (error) {
        console.error('Error fetching data:', error); // Gérez les erreurs de requête
    }
    finally {
        setLoading(false); // Réinitialiser l'état de chargement une fois que la requête est terminée
    }
    
};

useEffect(() => {
    
}, [userkaabu,simplissimo]);

return (
    <div id='home'>
        <Header />
        <Container className='body'>
            <Row>
                <Col sm={8}>
                    <Title text="Espace Kaabu Mobile" />
                    <br />
                    <div style={{ display: "flex" }}>
                        <div className='mb-3'>
                            <InputLabel id="demo-simple-select-label">Identifiant</InputLabel>
                            <TextField id='identifiant' variant='outlined' size='small' placeholder='Login, Msisdn...' sx={{ width: "500px", maxWidth: "100%"}} />
                        </div>
                        <div className='mb-3' id='search' style={{ marginLeft: "83px" }} >
                            <Button onClick={handleSearchClick} style={{ height: "40px", marginTop: "3px", width: "140px", backgroundColor: "#FF6600", borderColor: " #FF6600" }}>Rechercher</Button>
                        </div>
                    </div>
                    {loading && (
                        <div style={{ marginTop: "10px" }}>Chargement en cours...</div>
                    )}
                    {userNotFound && !userkaabu.length && !loading && (
                        <div style={{ color: 'red' }}>L'utilisateur n'existe pas sur Kaabu</div>
                    )}
                </Col>
                <Col sm={4} style={{ marginTop: "40px" }}>
                    <MenuPersoGesIncident propsMenuItems={kaabuItemsMenus} onItemClick={() => { }} />
                </Col>
            </Row>
            <Row>
            <Col sm={8}>
                    {userkaabu && (
                        <div>
                            <br />
                            <div >
                                <FormKaabu userkaabu={userkaabu} />
                                <FormSimplissimo simplissimo={simplissimo}/>
                            </div>
                            <br />
                        </div>
                    )}
                </Col>
                <Col sm={4} style={{ marginTop: "3%" }}>
                    <NavigatePerso propsMenuItems={gestionIncidentItemsNavigate} onItemClick={() => { }} />
                </Col>
            </Row>
        </Container>
    </div>
);















  //   useAuth()
  //   const [currentForm, setCurrentForm] = useState("")
  
  //   const handleMenuClick = (link)=>{
  //     setCurrentForm(link);
  //     console.log(link);
  //   }
  //   const gestionIncidentItemsNavigate = [
  //     { label: "Gestion Incidents", link: "/mysmc/gestionincident", icon: ReportProblemIcon },
  //     { label: "Gestion Probleme", link: "/mysmc/gestionprobleme", icon: ReportProblemIcon },
  //     { label: "Etat Supervision", link: "/mysmc/etatsupervision", icon: RiDashboard3Line },
  //     { label: "Consignes Orchestrées", link: "#",icon:FaPaperclip},
  //     { label: "Suivi Activités ", link: "/mysmc/suivisactivites", icon: IoStatsChart },
  //     { label: "Page d'acceuil", link: "/mysmc", icon: FaHome },
  // ];
  //   const columns = [
  //     { name: 'Date Création', selector: 'dateCreation', sortable: true },
  //     { name: 'N°Avis', selector: 'numAvis', sortable: true },
  //     { name: 'Titre', selector: 'titre', sortable: true },
  //     { name: 'Etat', selector: 'etat', sortable: true },
  // ];
  
  // return (
  //   <div>
  //     <Header/>
  //     <br /><br />
  //     <Container className='body'>
  //     <Row>
  //       <Col>
  //       </Col>
  //       <Col  sm={4}>
  //       <MenuPersoGesIncident propsMenuItems={kaabuItemsMenus} onItemClick={handleMenuClick} />
  //       </Col>
  //     </Row>
  //     <Row>
  //       <Col>
  //       </Col>
  //       <Col sm={4}>
  //         <NavigatePerso propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick}/>
  //       </Col>
  //     </Row>
  //     </Container>
        
        
  //       {/* <div>
  //       {currentForm === "verifnumsimplissimo" ?<FormVerifNum/> : null}
  //       {currentForm === "veriflogsimplissimo" ?<FormVerifLogin/> : null}
  //       {currentForm === "verifnumhlr" ?<FormVerifNumHlr/> : null}
  //       {currentForm === "veriflogkaabu" ?<FormVerifLogKaabu/> : null}
  //     </div> */}

  //   </div>
  // )

}

export default Kaabu;