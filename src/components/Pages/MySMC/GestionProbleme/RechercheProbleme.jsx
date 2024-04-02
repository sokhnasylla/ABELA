import React, { useState } from 'react';
import Header from '../../../Header/Header';
import { FaList, FaSearch, FaHome,FaDownload } from "react-icons/fa";
import { Container, Row, Col, Button } from 'react-bootstrap';
import Title from '../../../Card/Title/Title';
import { InputLabel, TextField, Grid } from '@mui/material';
import MenuPersoGesProbleme from './MenuPersoGesProbleme';
import { IoIosWarning } from "react-icons/io";
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import NavigatePerso from '../GestionIncident/NavigatePerso';
import Get from '../../../API/Get';
import "../GestionIncident/ajoutavis.css"

const ajoutAvisItemsMenu = [
  { label: " Lister les problemes", link: "/mysmc/gestionprobleme", icon: FaList },
];

function RechercheProbleme() {
  const [currentForm, setCurrentForm] = useState("");
  const [text,setText]=useState(" Information : Merci d'effectuer une recherche au préalable pour afficher les avis");
  const  [url,setUrl]=useState("")

  const handleMenuClick = (link) => {
    setCurrentForm(link);
    console.log(link);
  };

  const handleSearchClick = () => {
    // Récupérer les valeurs saisies dans les champs de texte
    const numeroProbleme = document.getElementById('numeroProbleme').value;
    const dateDebut = document.getElementById('dateDebut').value;
    const dateFin = document.getElementById('dateFin').value;
    const application = document.getElementById('application').value;
     setUrl(`http://localhost:8082/ABELA-MYSMC/api/gestionproblemes/probleme/searchedProblemeByDate?dateDebut=${dateDebut}&dateFin=${dateFin}`);
     setText(`Resultat de la dernière recherche : | Date Fin : ${dateFin}| Date début : ${dateDebut}` )


    
    // Utiliser les valeurs récupérées comme nécessaire
    console.log("Numéro problème:", numeroProbleme);
    console.log("Date début:", dateDebut);
    console.log("Date fin:", dateFin);
    console.log("Application:", application);

   
  };

  const gestionIncidentItemsNavigate =[
    {label: " Gestion Incidents", link: "/mysmc/gestionincident",icon:IoIosWarning},
    { label: " Gestion Probleme", link: "/mysmc/gestionprobleme",icon:IoIosWarning},
    { label: " Etat Supervision", link: "/mysmc/etatsupervision", icon:RiDashboard3Line},
    { label: " Consignes Orchestrées", link: "#"},
    { label: " Suivi Activités ", link: "/mysmc/suivisactivites", icon:IoStatsChart},
    { label: " Page d'acceuil", link: "/mysmc",icon: FaHome },
    ];

    
  const columns = [
    // Définissez les colonnes de votre DataTable
    { name: 'N°Probleme', selector: 'id', sortable: true },
    { name: 'Application', selector: 'application', sortable: true },
    { name: 'Date Création', selector: 'dateCreation', sortable: true },
    { name: 'Etat', selector: 'etat', sortable: true },
    { name: 'Action', selector: 'av', sortable: true },
  ]
  return (
    <div>
      <Header />
      <Container>
        <div id='title'>
          <Row>
            <Col xs={8} className='content'>
              <Title text="Recherche des Problemes" />

              <br />
              <div style={{ display: "flex" }}>
                <div className='mb-3' >
                  <InputLabel sx={{ marginLeft: "4%" }} id="demo-simple-select-label">Numéro problème</InputLabel>&nbsp;
                  <TextField id="numeroProbleme" variant='outlined' size='small' placeholder='Ex:XXX' sx={{ width: "120px", marginRight: "25px" }} />
                </div>
                <div className='mb-3' >
                  <InputLabel sx={{ marginLeft: "4%"}} id="demo-simple-select-label">Date début</InputLabel>&nbsp;
                  <TextField id="dateDebut" variant='outlined' size='small' type='date' sx={{ marginRight: "25px" }} />
                </div>
                <div className='mb-3' >
                  <InputLabel sx={{ marginLeft: "4%"}} id="demo-simple-select-label">Date Fin</InputLabel>&nbsp;
                  <TextField id="dateFin" variant='outlined' size='small' type='date' />
                </div>
                <div className='mb-3' >
                  <InputLabel sx={{ marginLeft: "4%"}} id="demo-simple-select-label">Application</InputLabel>&nbsp;
                  <TextField id="application" variant='outlined' size='small' placeholder='Ex:OrangeMoney' sx={{ width: "155px", marginRight: "25px" }} />
                </div>
                <div className='mb-3' id='search' >
                  <Button onClick={handleSearchClick} style={{ backgroundColor: " #C9302C", borderColor: " #C9302C" }}><FaSearch /></Button>
                </div>
              </div>
              <div className='col-xs-12 col-sm-6 col-md-4' style={{ position: "absolute", width: "58%" }}>
                <Grid >
                  <h5 className=' alert alert-info' style={{marginBottom:"5px", fontSize: "14px", fontFamily: "inherit", fontWeight: "500", color: "#31708F" }}>
                     {text}
                  </h5>
                </Grid>
              </div>
            </Col>
            <Col xs={4} style={{marginTop:"4%"}}>
              <MenuPersoGesProbleme propsMenuItems={ajoutAvisItemsMenu} onItemClick={handleMenuClick} />
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
                <br />
                <br />
                <br />
                 {url && 
                 (<div>
                    <Button variant='danger'><FaDownload/> Exporter problèmes au format Excel </Button>
                    <Get url={url} columns={columns} showTable={true} />
                 </div>)
                 }
            </Col>
            <Col xs={4}>
                <NavigatePerso propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick}  />

            </Col>
          </Row>
        </div>
        <div>
        </div>
      </Container>
    </div>
  )
}

export default RechercheProbleme;
