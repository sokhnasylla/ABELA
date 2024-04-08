import React, { useState,useEffect } from 'react';
import Header from '../../Header/Header';
import { FaUserGroup } from 'react-icons/fa6';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Title from '../../Card/Title/Title';
import MenuPersoGesIncident from '../MySMC/GestionIncident/MenuPersoGesIncident';
import { InputLabel, TextField } from '@mui/material';
import { FaSearch, FaHome } from 'react-icons/fa';
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
        { label: "Consignes Orchestrées", link: "#" },
        { label: "Suivi Activités ", link: "/mysmc/suivisactivites", icon: IoStatsChart },
        { label: "Page d'acceuil", link: "/mysmc", icon: FaHome },
    ];

    const [vendeur, setVendeur] = useState([]);
    const token = getTokenFromLocalStorage();


    const GetData = async (url,token) => {
        const response = await axios.get(url,{
            headers:{
                Authorization:`Bearer ${token}`
            },
        });
        console.log(response.data.data.userKaabu);
        setVendeur(response.data.data.userKaabu);
       
        return response.data; 
      };

    const handleSearchClick = () => {
        const identifiant = document.getElementById('identifiant').value;
        const url=`http://localhost:8084/abela-selfservice/api/v1/kaabu/verification-user/${identifiant}`
        GetData(url,token)
    };
    useEffect(() => {
        console.log(vendeur);
    }, [vendeur ]);

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
                                <InputLabel sx={{ }} id="demo-simple-select-label">Identifiant</InputLabel>
                                <TextField id='identifiant' variant='outlined' size='small' placeholder='Ex:MISSDN/LOGIN' sx={{ width: "500px" }} />
                            </div>
                            <div className='mb-3' id='search' style={{ marginLeft: "25%" }} >
                                <Button onClick={handleSearchClick} style={{ backgroundColor: " #C9302C", borderColor: " #C9302C" }}><FaSearch /></Button>
                            </div>
                        </div>
                    </Col>
                    <Col sm={4} style={{ marginTop: "40px" }}>
                        <MenuPersoGesIncident propsMenuItems={gestionIncidentItemsNavigate} onItemClick={() => { }} />
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        {vendeur && (
                            <div>
                                <Title text="Informations du client" />
                                <br />
                                <div style={{ display: "flex" }}>
                                    <FormKaabu vendeur={vendeur} />
                                    <FormSiplissimo/>
                                </div>
                                <br />
                            </div>
                        )}
                    </Col>
                    <Col sm={4} style={{ marginTop: "3%" }}>
                        <NavigatePerso propsMenuItems={gestionIncidentItemsNavigate} onItemClick={() => { }} />
                        {/* Ajustez la propriété `columns` en fonction de vos besoins */}
                        {/* <Get columns={columns} showTable={true}/> */}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default EspaceVendeur;
