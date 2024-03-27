import React, { useState } from "react";
import useAuth from "../Auth/useAuth";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import {Container,Col,Row, } from "react-bootstrap"
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import { FaHome } from 'react-icons/fa';
import Title from "../../Card/Title/Title";
import NavigatePersoEtatSup from "../MySMC/EtatSupervision/NavigatePersoEtatSup";

const gestionIncidentItemsNavigate = [
    { label: "Gestion Incidents", link: "/mysmc/gestionincident", icon: ReportProblemIcon },
    { label: "Gestion Probleme", link: "/mysmc/gestionprobleme", icon: ReportProblemIcon },
    { label: "Etat Supervision", link: "/mysmc/etatsupervision", icon: RiDashboard3Line },
    { label: "Consignes Orchestrées", link: "#" },
    { label: "Suivi Activités", link: "/mysmc/suivisactivites", icon: IoStatsChart },
    { label: "Page d'acceuil", link: "/mysmc", icon: FaHome },
];

function MonProfil() {
    useAuth()

    const [ setCurrentForm] = useState("");

    const handleMenuClick = (link) => {
        setCurrentForm(link);
        console.log(link);
    }

    return (
        <div>
            <div>
                <Header />
                <Footer />

            </div>
            <Container>
            <div id='title'>
                <Row>
                <Col xs={10} className='content'>
                <Title text="Formulaire de changement de mot de passe"/>
                </Col> 
                </Row>
            </div>
            </Container>
            <div style={{ position: "relative", top: "35%" }}>
                <NavigatePersoEtatSup propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick} />
            </div>
        </div>
    );
}

export default MonProfil;
