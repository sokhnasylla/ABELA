import React, { useState, useEffect } from 'react';
import Header from '../../../Header/Header';
import useAuth from '../../Auth/useAuth';
import MenuPersoGesIncident from './MenuPersoGesIncident';
import NavigatePerso from './NavigatePerso';
import { FaList, FaSearch, FaHome, FaChartLine, FaDownload } from "react-icons/fa";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import { Container, Row, Col, Button } from 'react-bootstrap';
import Title from '../../../Card/Title/Title';
import { InputLabel, TextField, Grid } from '@mui/material';
import Get from '../../../API/Get';
import "./ajoutavis.css";
import { Message } from '@mui/icons-material';

const ajoutAvisItemsMenu = [
    { label: "Lister les avis d'incidents", link: "/mysmc/gestionincident", icon: FaList },
    { label: "Rechercher avis", link: "/gestionincident/rechercheavis", icon: FaSearch },
    { label: "Statistique avis d'incidents", link: "/gestionincident/statistique", icon: FaChartLine },
];
const gestionIncidentItemsNavigate = [
    { label: "Gestion Incidents", link: "/mysmc/gestionincident", icon: ReportProblemIcon },
    { label: "Gestion Probleme", link: "/mysmc/gestionprobleme", icon: ReportProblemIcon },
    { label: "Etat Supervision", link: "/mysmc/etatsupervision", icon: RiDashboard3Line },
    { label: "Consignes Orchestrées", link: "#" },
    { label: "Suivi Activités ", link: "/mysmc/suivisactivites", icon: IoStatsChart },
    { label: "Page d'acceuil", link: "/mysmc", icon: FaHome },
];

function RechercheAvis() {

    const [currentForm, setCurrentForm] = useState("");
    const [text, setText] = useState("Information : Merci d'effectuer une recherche au préalable pour afficher les avis");
    const [url, setUrl] = useState("");
    const [data, setData] = useState([]);
    const [noData, setNoData] = useState(false);

    const handleMenuClick = (link) => {
        setCurrentForm(link);
        console.log(link);
    };

    const handleSearchClick = (link) => {
        const numeroAvis = document.getElementById('numeroAvis').value;
        const dateDebut = document.getElementById('dateDebut').value;
        const dateFin = document.getElementById('dateFin').value;
        const application = document.getElementById('application').value;

        if (numeroAvis) {
            setUrl(`http://localhost:8082/abela-mysmc/api/gestionIncidents/avisIncident/searchedAvisByNumber?numAvis=${numeroAvis}`);
            setText(`Resultat de la dernière recherche : | Numéro Avis : ${numeroAvis}`);
        }
        else if (dateDebut || dateFin) {
            setUrl(`http://localhost:8082/abela-mysmcC/api/gestionIncidents/avisIncidents/searchedAvis?dateDebut=${dateDebut}&dateFin=${dateFin}`);
            setText(`Resultat de la dernière recherche : | Date Fin : ${dateFin}| Date début : ${dateDebut}`);
        }
        else if (application) {
            setUrl(`http://localhost:8082/abela-mysmc/api/gestionIncidents/avisIncident/searchedAvisByAppName?nom=${application}`);
            setText(`Resultat de la derniere recherche : | Application : ${application}`);
        }
       
    };

    const columns = [
        { name: 'Date Création', selector: 'dateCreation', sortable: true },
        { name: 'N°Avis', selector: 'numAvis', sortable: true },
        { name: 'Titre', selector: 'titre', sortable: true },
        { name: 'Etat', selector: 'etat', sortable: true },
        { name: 'Action', selector: '', sortable: true },
    ];

    useEffect(() => {
        if (url) {
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    setData(result);
                    setNoData(result.length === 0);
                })
                .catch(error => console.error('Error:', error));
        }
    }, [url]);

    return (
        <div id='home'>
            <Header />
            <br />
            <Container>
                <Row>
                    <Col sm={8} style={{ marginTop: "-3%" }}>
                        <Title text="Recherche des avis" />
                        <br />
                        <div style={{ display: "flex" }}>
                            <div className='mb-3' >
                                <InputLabel sx={{ marginLeft: "6%" }} id="demo-simple-select-label">Numéro avis</InputLabel>&nbsp;
                                <TextField id='numeroAvis' variant='outlined' size='small' placeholder='Ex:XXX' sx={{ width: "120px", marginRight: "20px" }} />
                            </div>
                            <div className='mb-3' >
                                <InputLabel sx={{ marginLeft: "6%" }} id="demo-simple-select-label">Date début</InputLabel>&nbsp;
                                <TextField id='dateDebut' variant='outlined' size='small' type='date' sx={{ marginRight: "20px" }} />
                            </div>
                            <div className='mb-3' >
                                <InputLabel sx={{ marginLeft: "6%" }} id="demo-simple-select-label">Date Fin</InputLabel>&nbsp;
                                <TextField id='dateFin' variant='outlined' size='small' type='date' sx={{ marginRight: "20px" }} />
                            </div>
                            <div className='mb-3' >
                                <InputLabel sx={{ marginLeft: "6%" }} id="demo-simple-select-label">Application</InputLabel>&nbsp;
                                <TextField id='application' variant='outlined' size='small' placeholder='Ex:OrangeMoney' sx={{ width: "150px", marginRight: "17px" }} />
                            </div>
                            <div className='mb-3' id='search' >
                                <Button onClick={handleSearchClick} style={{ backgroundColor: " #C9302C", borderColor: " #C9302C" }}><FaSearch /></Button>
                            </div>

                        </div>
                        <div className='col-xs-12 col-sm-6 col-md-4' style={{ position: "absolute", width: "58%" }}>
                            <Grid >
                                <h5 className=' alert alert-info' style={{ fontSize: "14px", fontFamily: "inherit", fontWeight: "500", color: "#31708F" }}>
                                    {text}
                                </h5>
                            </Grid>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <MenuPersoGesIncident propsMenuItems={ajoutAvisItemsMenu} onItemClick={handleMenuClick} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={8}>
                        <br />
                        <br />
                        <br />
                        {url && (
                         <div>
                            <Button variant='danger'><FaDownload/> Exporter problèmes au format Excel </Button>
                             &nbsp;
                            <Button variant='' style={{backgroundColor:"#f0ad4e",color:"white"}}><FaDownload/> Exporter P.A au format Excel </Button>
                            {data.length > 0 ? (
                            <Get url={url} columns={columns} showTable={true} />
                             ) : ( 
                            <table className="table">
                            <thead>
                            <tr>
                            {columns.map((column, index) => (
                            <th key={index}>{column.name}</th>
                            ))}
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                            <td colSpan={columns.length}>Aucune donnée disponible pour cette recherche.</td>
                            </tr>
                            </tbody>
                            </table>
                            )}
                            </div>
                        )}
                    </Col>
                    <Col xs={4}>
                        <NavigatePerso propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default RechercheAvis;
