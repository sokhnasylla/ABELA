import React, { useState } from 'react';
import {  FaSearch, FaHome,FaDownload } from "react-icons/fa";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { InputLabel, TextField, Grid } from '@mui/material';
import { searchProblemeByDate } from '../Mysmc.service';




function RechercheProbleme() {
  const [currentForm, setCurrentForm] = useState("");
  const [text,setText]=useState(" Information : Merci d'effectuer une recherche au préalable pour afficher les problemes");
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

    const dateDebutFormatted = new Date(dateDebut).toISOString().split('T')[0];
    const dateFinFormatted = new Date(dateFin).toISOString().split('T')[0];
  
    const data=searchProblemeByDate(dateDebutFormatted,dateFinFormatted)
    // console.log(data);
    // 

     setUrl(`http://localhost:8082/abela-mysmc/api/gestionproblemes/probleme/searchedProblemeByDate?dateDebut=${dateDebutFormatted}&dateFin=${dateFinFormatted}`);
     setText(`Resultat de la dernière recherche : | Date Fin : ${dateFin}| Date début : ${dateDebut}` )


    
    // Utiliser les valeurs récupérées comme nécessaire
    console.log("Numéro problème:", numeroProbleme);
    console.log("Date début:", dateDebut);
    console.log("Date fin:", dateFin);
    console.log("Application:", application);

   
  };


    
  return (
    <div>
      <Container>
        <div id='title'>
          <Row>
            <Col className='content'>
              {/* <Title text="Recherche des Problemes" /> */}

              <br />
              <div style={{ display: "flex" }}>
                <div className='mb-3' >
                  <InputLabel sx={{ marginLeft: "4%" }} id="demo-simple-select-label">Numéro problème</InputLabel>&nbsp;
                  <TextField id="numeroProbleme" variant='outlined' size='small' placeholder='Ex:XXX' sx={{ width: "100px", marginRight: "25px" }} />
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
                  <Button onClick={handleSearchClick} style={{ backgroundColor: " #FF6600", borderColor: "#FF6600",marginTop:"25px" }}><FaSearch /></Button>
                </div>
              </div>
              <div className='col-xs-12 col-sm-6 col-md-4' style={{ position: "absolute", width: "80%" }}>
                <Grid >
                  <h5 className=' alert alert-info' style={{marginBottom:"5px", fontSize: "14px", fontFamily: "inherit", fontWeight: "500", color: "#31708F" }}>
                     {text}
                  </h5>
                </Grid>
              </div>
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
