import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Container, Row, Col, Button } from "react-bootstrap";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";

function RechercheAvis({ onSearch }) {
  const [error, setError] = useState("");
  const [numeroAvis, setNumeroAvis] = useState("");
  const [application, setApplication] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [etat, setEtat] = useState("");

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

    if (dateDebut && dateFin && new Date(dateDebut) > new Date(dateFin)) {
      setError(
        "La date de début ne doit pas être supérieure à la date de fin."
      );
      return;
    }

    let newUrl = "";
    let newHisto = "";
    let errorMessage = "";

    try {
      if (numeroAvis) {
        newUrl = `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncident/searchedAvisByNumber?numAvis=${numeroAvis}`;
        newHisto = `Résultat de la dernière recherche, Numéro Avis : ${numeroAvis}`;
        errorMessage = "Aucun avis trouvé pour le numéro spécifié";
      } else if (application && dateDebut && dateFin) {
        newUrl = `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/searchedAvisByPeriodAndApp?name=${application}&date_debut=${dateDebut}&date_fin=${dateFin}`;
        newHisto = `Résultat de la dernière recherche, Application : ${application} | Date Début : ${dateDebut} | Date Fin : ${dateFin}`;
        errorMessage = `Aucun avis trouvé pour l'application ${application} sur la période spécifiées`;
      } else if (application) {
        newUrl = `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncident/searchedAvisByAppName?nom=${application}`;
        newHisto = `Résultat de la dernière recherche, Application : ${application}`;
        errorMessage = "Aucun avis trouvé pour l'application spécifiée";
      } else if (dateDebut && dateFin) {
        newUrl = `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/searchedAvis?dateDebut=${dateDebut}&dateFin=${dateFin}`;
        newHisto = `Résultat de la dernière recherche, Date Début : ${dateDebut} | Date Fin : ${dateFin}`;
        errorMessage = "Aucun avis trouvé pour la période spécifiée";
      } else if (etat) {
        newUrl = `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncident/searchedAvisByState?etat=${etat}`;
        newHisto = `Résultat de la dernière recherche, Etat : ${etat}`;
        errorMessage = "Aucun avis trouvé pour l'état spécifié";
      } else {
        throw new Error("Veuillez remplir au moins un champ de recherche");
      }

      await fetchData(newUrl, errorMessage);
      setError("");
      console.log(newUrl);
      onSearch(newUrl, newHisto, etat);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div id="home">
      <Container>
        <Row>
          <Col sm={12} style={{ marginTop: "10px" }}>
            <form
              onSubmit={handleSearch}
              style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <div className="mb-3" style={{ flex: "1 1 200px" }}>
                  <InputLabel
                    sx={{ marginLeft: "6%" }}
                  >
                    Numéro avis
                  </InputLabel>
                  &nbsp;
                  <TextField
                    id="numeroAvis"
                    variant="outlined"
                    size="small"
                    placeholder="Ex:XXX"
                    sx={{ width: "100%" }}
                    value={numeroAvis}
                    onChange={(e) => setNumeroAvis(e.target.value)}
                  />
                </div>
                <div className="mb-3" style={{ flex: "1 1 200px" }}>
                  <InputLabel
                    sx={{ marginLeft: "6%" }}
                  >
                    Application
                  </InputLabel>
                  &nbsp;
                  <TextField
                    id="application"
                    variant="outlined"
                    size="small"
                    placeholder="Ex:OrangeMoney"
                    sx={{ width: "100%" }}
                    value={application}
                    onChange={(e) => setApplication(e.target.value)}
                  />
                </div>
                <div className="mb-3" style={{ flex: "1 1 200px" }}>
                  <InputLabel
                    sx={{ marginLeft: "6%" }}
                  >
                    Date début
                  </InputLabel>
                  &nbsp;
                  <TextField
                    id="dateDebut"
                    variant="outlined"
                    size="small"
                    type="datetime-local"
                    sx={{ width: "100%" }}
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                  />
                </div>
                <div className="mb-3" style={{ flex: "1 1 200px" }}>
                  <InputLabel
                    sx={{ marginLeft: "6%" }}
                  >
                    Date Fin
                  </InputLabel>
                  &nbsp;
                  <TextField
                    id="dateFin"
                    variant="outlined"
                    size="small"
                    type="date"
                    sx={{ width: "100%" }}
                    value={dateFin}
                    onChange={(e) => setDateFin(e.target.value)}
                  />
                </div>
                <div className="mb-3" style={{ flex: "1 1 200px" }}>
                  <InputLabel
                    sx={{ marginLeft: "6%" }}
                  >
                    Etat
                  </InputLabel>
                  &nbsp;
                  <Select
                    id="etat"
                    variant="outlined"
                    size="small"
                    sx={{ width: "100%" }}
                    value={etat}
                    onChange={(e) => setEtat(e.target.value)}
                  >
                    <MenuItem value="Fermé">Fermé</MenuItem>
                    <MenuItem value="Annulé">Annulé</MenuItem>
                    <MenuItem value="Cloturé">Cloturé</MenuItem>
                  </Select>
                </div>
              </div>
              <div className="mb-3" style={{ flex: "1 1 100px" }}>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#C9302C",
                    borderColor: "#C9302C",
                    width: "100%",
                  }}
                >
                  <FaSearch />
                </Button>
              </div>
            </form>
            {error && (
              <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RechercheAvis;
