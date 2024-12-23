import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Container, Row, Col, Button } from "react-bootstrap";
import { TextField } from "@mui/material";
import { abelaURL } from "../../../../config/global.constant";

function RechercheAvisFerme({ onSearch }) {
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

    // Format Date from yyyy-mm-ddThh:mm to something more readable like 01 Jan 2022 00:00
    const formatDate = (date) => {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    try {
      if (numeroAvis) {
        newUrl = `${abelaURL}/avisIncident/searchedAvisByNumberNotOpen?numAvis=${numeroAvis}`;
        newHisto = `Résultat de la dernière recherche, Numéro Avis : ${numeroAvis}`;
        errorMessage = "Aucun avis trouvé pour le numéro spécifié";
      } else if (application && dateDebut && dateFin) {
        newUrl = `${abelaURL}/avisIncidents/notOpen/searchedAvisByPeriodAndApp?name=${application}&date_debut=${dateDebut}&date_fin=${dateFin}`;
        newHisto = `Résultat de la dernière recherche, Application : ${application} | Date Début : ${formatDate(
          dateDebut
        )} | Date Fin : ${formatDate(dateFin)}`;
        errorMessage = `Aucun avis trouvé pour l'application ${application} sur la période spécifiées`;
      } else if (application) {
        newUrl = `${abelaURL}/avisIncident/searchedAvisByAppName/notOpen?nom=${application}`;
        newHisto = `Résultat de la dernière recherche, Application : ${application}`;
        errorMessage = "Aucun avis trouvé pour l'application spécifiée";
      } else if (dateDebut && dateFin) {
        newUrl = `${abelaURL}/avisIncidents/searchedAvisNotOpen?dateDebut=${dateDebut}&dateFin=${dateFin}`;
        newHisto = `Résultat de la dernière recherche, Date Début : ${formatDate(
          dateDebut
        )} | Date Fin : ${formatDate(dateFin)}`;
        errorMessage = "Aucun avis trouvé pour la période spécifiée";
      } else if (etat) {
        newUrl = `${abelaURL}/avisIncidents/searchedAvisByState?etat=${etat}`;
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
                <div className="mb-3 form-group" style={{ flex: "1 1 200px" }}>
                  <label htmlFor="numeroAvis" sx={{ marginLeft: "6%" }}>
                    Numéro avis :
                  </label>
                  &nbsp;
                  <TextField
                    id="numeroAvis"
                    variant="outlined"
                    size="small"
                    className="form-control"
                    placeholder="Ex:XXX"
                    sx={{ width: "100%" }}
                    value={numeroAvis}
                    onChange={(e) => setNumeroAvis(e.target.value)}
                  />
                </div>
                <div className="mb-3 form-group" style={{ flex: "1 1 200px" }}>
                  <label htmlFor="application" sx={{ marginLeft: "6%" }}>
                    Application :
                  </label>
                  &nbsp;
                  <TextField
                    id="application"
                    variant="outlined"
                    size="small"
                    className="form-control"
                    placeholder="Ex:OrangeMoney"
                    sx={{ width: "100%" }}
                    value={application}
                    onChange={(e) => setApplication(e.target.value)}
                  />
                </div>
                <div className="mb-3 form-group" style={{ flex: "1 1 200px" }}>
                  <label htmlFor="dateDebut" sx={{ marginLeft: "6%" }}>
                    Date début :
                  </label>
                  &nbsp;
                  <TextField
                    id="dateDebut"
                    variant="outlined"
                    size="small"
                    className="form-control"
                    type="datetime-local"
                    sx={{ width: "100%" }}
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                  />
                </div>
                <div className="mb-3 form-group" style={{ flex: "1 1 200px" }}>
                  <label htmlFor="dateFin" sx={{ marginLeft: "6%" }}>
                    Date Fin :
                  </label>
                  &nbsp;
                  <TextField
                    id="dateFin"
                    variant="outlined"
                    size="small"
                    className="form-control"
                    type="datetime-local"
                    sx={{ width: "100%" }}
                    value={dateFin}
                    onChange={(e) => setDateFin(e.target.value)}
                  />
                </div>
                <div className="mb-3 form-group" style={{ flex: "1 1 200px" }}>
                  <label htmlFor="etat" sx={{ marginLeft: "6%" }}>
                    Etat :
                  </label>
                  &nbsp;
                  <select
                    id="etat"
                    variant="outlined"
                    className="form-select"
                    size="small"
                    sx={{ width: "100%" }}
                    value={etat}
                    onChange={(e) => setEtat(e.target.value)}
                  >
                    <option value="">Sélectionner un état</option>
                    <option value="FERME">Fermé</option>
                    <option value="CLOTURE">Clôturé</option>
                    <option value="ANNULE">Annulé</option>
                  </select>
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

export default RechercheAvisFerme;
