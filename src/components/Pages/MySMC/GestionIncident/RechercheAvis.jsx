import React, { useState } from 'react';
import useAuth from '../../Auth/useAuth';
import { FaSearch } from "react-icons/fa";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { InputLabel, TextField } from '@mui/material';

function RechercheAvis({ onSearch }) { 
    const [error, setError] = useState(""); // State for error messages

    // Helper function to handle API requests
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Erreur lors de la recherche");
            const result = await response.json();
            if (result.length === 0) throw new Error("Aucun avis trouvé");
            return result;
        } catch (err) {
            throw new Error(err.message || "Erreur réseau");
        }
    };

    // Handle form submission
    const handleSearch = async (event) => {
        event.preventDefault(); 

        const numeroAvis = document.getElementById('numeroAvis').value;
        const dateDebut = document.getElementById('dateDebut').value;
        const dateFin = document.getElementById('dateFin').value;
        const application = document.getElementById('application').value;

        let newUrl = "";
        let newHisto = "";
        let errorMessage = "";

        try {
            if (numeroAvis) {
                newUrl = `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncident/searchedAvisByNumber?numAvis=${numeroAvis}`;
                newHisto = `Résultat de la dernière recherche : Numéro Avis : ${numeroAvis}`;
                await fetchData(newUrl);
            } else if (application && dateDebut && dateFin) {
                newUrl = `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/searchedAvisByPeriodAndApp?name=${application}&date_debut=${dateDebut}&date_fin=${dateFin}`;
                newHisto = `Résultat de la dernière recherche : Application : ${application} | Date Début : ${dateDebut} | Date Fin : ${dateFin}`;
                await fetchData(newUrl);
            } else if (application) {
                newUrl = `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncident/searchedAvisByAppName?nom=${application}`;
                newHisto = `Résultat de la dernière recherche : Application : ${application}`;
                await fetchData(newUrl);
            } else if (dateDebut && dateFin) {
                newUrl = `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/searchedAvis?dateDebut=${dateDebut}&dateFin=${dateFin}`;
                newHisto = `Résultat de la dernière recherche : Date Début : ${dateDebut} | Date Fin : ${dateFin}`;
                await fetchData(newUrl);
            } else {
                throw new Error("Veuillez remplir au moins un champ de recherche");
            }

            setError("");
            onSearch(newUrl, newHisto);

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div id='home'>
            <Container>
                <Row>
                    <Col sm={12} style={{ marginTop: "10px" }}>
                        <form onSubmit={handleSearch} style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                            <div className='mb-3' style={{ flex: "1 1 200px" }}>
                                <InputLabel sx={{ marginLeft: "6%" }} id="demo-simple-select-label">Numéro avis</InputLabel>&nbsp;
                                <TextField id='numeroAvis' variant='outlined' size='small' placeholder='Ex:XXX' sx={{ width: "100%" }} />
                            </div>
                            <div className='mb-3' style={{ flex: "1 1 200px" }}>
                                <InputLabel sx={{ marginLeft: "6%" }} id="demo-simple-select-label">Application</InputLabel>&nbsp;
                                <TextField id='application' variant='outlined' size='small' placeholder='Ex:OrangeMoney' sx={{ width: "100%" }} />
                            </div>
                            <div className='mb-3' style={{ flex: "1 1 200px" }}>
                                <InputLabel sx={{ marginLeft: "6%" }} id="demo-simple-select-label">Date début</InputLabel>&nbsp;
                                <TextField id='dateDebut' variant='outlined' size='small' type='date' sx={{ width: "100%" }} />
                            </div>
                            <div className='mb-3' style={{ flex: "1 1 200px" }}>
                                <InputLabel sx={{ marginLeft: "6%" }} id="demo-simple-select-label">Date Fin</InputLabel>&nbsp;
                                <TextField id='dateFin' variant='outlined' size='small' type='date' sx={{ width: "100%" }} />
                            </div>
                            <div className='mb-3' style={{ flex: "1 1 100px" }}>
                                <Button type="submit" style={{ backgroundColor: "#C9302C", borderColor: "#C9302C", width: "100%" }}>
                                    <FaSearch />
                                </Button>
                            </div>
                        </form>
                        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default RechercheAvis;
