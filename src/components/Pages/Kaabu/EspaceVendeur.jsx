import React, { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import {FaSearch, FaHome, FaPaperclip } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Title from '../../Card/Title/Title';
import MenuPersoGesIncident from '../MySMC/GestionIncident/MenuPersoGesIncident';
import { InputLabel, TextField } from '@mui/material';
import NavigatePerso from '../MySMC/GestionIncident/NavigatePerso';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import FormKaabu from './FormKaabu';
import { getTokenFromLocalStorage } from '../Auth/authUtils';
import axios from 'axios';
import FormSiplissimo from './FormSiplissimo';

function EspaceVendeur() {
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

    const GetData = async (url,token) => {
        const response = await axios.get(url,{
            headers:{
                Authorization:`Bearer ${token}`
            },
        });
        console.log(response.data.data.userKaabu);
        setUserkaabu(response.data.data.userKaabu);
        setSimplissimo(response.data.data.userSimplissimo)
       
        return response.data; 
      };
      
      const handleSearchClick = async () => {
        const identifiant = document.getElementById('identifiant').value;
        const url = `http://localhost:8082/abela-selfservice/api/v1/kaabu/verification-user/${identifiant}`;
        console.log('URL:', url); // Vérifiez si l'URL est correcte
        try {
            if (!identifiant || identifiant.trim() === "") {
                alert('Veuillez saisir un identifiant valide');
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
        
    };
    
    useEffect(() => {
        
    }, [userkaabu,simplissimo]);

    return (
        <div id='home'>
            <Header />
            <Container>
                <Row>
                    <Col sm={8}>
                        <Title text="Vérification par numéro ou login" />
                        <br />
                        <div style={{ display: "flex" }}>
                            <div className='mb-3'>
                                <InputLabel id="demo-simple-select-label">Identifiant</InputLabel>
                                <TextField id='identifiant' variant='outlined' size='small' placeholder='Ex:MSISDN/LOGIN' sx={{ width: "450px" }} />
                            </div>
                            <div className='mb-3' id='search' style={{ marginLeft: "20%" }} >
                                <Button onClick={handleSearchClick} style={{ backgroundColor: " #C9302C", borderColor: " #C9302C" }}><FaSearch /></Button>
                            </div>
                        </div>
                        {userNotFound && !userkaabu.length && (
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
                                <Title text="Informations du client" />
                                <br />
                                <div style={{ display: "flex" }}>
                                    <FormKaabu userkaabu={userkaabu} />
                                    <FormSiplissimo simplissimo={simplissimo}/>
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
}

export default EspaceVendeur;
