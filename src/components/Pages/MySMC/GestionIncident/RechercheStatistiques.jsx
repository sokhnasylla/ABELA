import React, { useState } from 'react';
import useAuth from '../../Auth/useAuth';
import { FaSearch } from "react-icons/fa";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { InputLabel, TextField } from '@mui/material';

function RechercheStatistiques({ onSearch }) { 
    const [error, setError] = useState(""); // State for error messages

    // Helper function to handle API requests
    const fetchData = async (url, errorMessage) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Erreur lors de la recherche");
            const result = await response.json();
            if (result.length === 0) throw new Error(errorMessage);
            return result;
        } catch (err) {
            throw new Error(err.message || "Erreur réseau");
        }
    };
    
    // Handle form submission
    const handleSearch = async (event) => {
        event.preventDefault(); 
    
        const dateDebut = document.getElementById('dateDebut').value;
        const dateFin = document.getElementById('dateFin').value;

        if (dateDebut && dateFin && new Date(dateDebut) > new Date(dateFin)) {
            setError("La date de début ne doit pas être supérieure à la date de fin.");
            return; 
        }
    
        let newUrl = "";
        let newHisto = "";
        let errorMessage = "";
    
        try {
            if (dateDebut && dateFin) {
                newUrl = `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/searchedAvis?dateDebut=${dateDebut}&dateFin=${dateFin}`;
                newHisto = `Résultat de la dernière recherche, Date Début : ${dateDebut} | Date Fin : ${dateFin}`;
                errorMessage = "Aucun avis trouvé pour la période spécifiée";
            } else {
                throw new Error("Veuillez remplir au moins un champ de recherche");
            }
    
            await fetchData(newUrl, errorMessage);
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

export default RechercheStatistiques;