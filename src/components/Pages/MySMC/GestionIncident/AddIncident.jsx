import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import "./ajoutavis.css";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import "../../../Pages/MySMC/Menu/menumysmc.css";
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import axios from "axios";
import Title from "../../../Card/Title/Title";
import { getTokenFromLocalStorage } from "../../Auth/authUtils";

function AddIncident() {
  const token = getTokenFromLocalStorage();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    objet: '',
    nature: '',
    typeAvisIncident: { id: 0 },
    serviceImpacte: '',
    valide: '',
    diffusion: '',
    dateDebut: '',
    dateDetection: '',
    ticketEzv: '',
    ticketOceane: '',
    impact: '',
    causeRetard: { id: 0 },
    origine: { id: 0 },
    causeProbable: '',
    observations: ''
  });

  const [nature, setNature] = useState('SI');
  const [type, setType] = useState("choisir le type d'avis");
  const [service, setService] = useState("Application Test");
  const [valide, setValide] = useState("choisir la liste validation");
  const [diffusion, setDiffusion] = useState("choisir la liste diffusion");
  const [causeRetard, setCauseRetard] = useState("Cause Retard Notification");
  const [origine,setOrigine]=useState("Définir une origine");
  const [currentForm, setCurrentForm] = useState("")
  const [typesAvis, setTypesAvis] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [serviceImpact, setServiceImpacte] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [listValidation, setListValidation] = useState([]);
  const [selectedValide, setSelectedValide] = useState("");
  const [listDiffusion, setListDiffusion] = useState([]);
  const [selectedDiffusion, setSelectedDiffusion] = useState("");
  const [typeCause, setTypeCause] = useState([]);
  const [selectedCause, setSelectedCause] = useState("");

  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(url, config);
        setter(response.data);
      } catch (error) {
        setError(`Erreur: ${error.message}`);
      }
    };

    fetchData("http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/typeavisincidents", setTypesAvis);
    fetchData("http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/applicationSI/list", setServiceImpacte);
    fetchData("http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/listValidations", setListValidation);
    fetchData("http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/listDiffusions", setListDiffusion);
    fetchData("http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/typeCauseAvis", setTypeCause);
  }, [token]);

  // Handle form submission
  const handleSubmit = () => {
    const objet = document.getElementById("objet").value;
    const dateDebut = document.getElementById("dateDebut").value;
    const dateDetection = document.getElementById("dateDetection").value;
    const ticketEzv = document.getElementById("ticketEzv").value;
    const ticketOceane = document.getElementById("ticketOceane").value;
    const impact = document.getElementById("impact").value;
    const causeProbable = document.getElementById("causeProbable").value;
    const observations = document.getElementById("observation").value;

    const typeAvisIncident = [{ id: selectedType }];
    const applicationSis = [{ id: selectedService }];
    const typeCauseIncident = [{ id: selectedCause }];

    const formData = {
      objet,
      dateDebut,
      dateDetection,
      impact,
      observations,
      ticketEzv,
      ticketOceane,
      nature,
      typeAvisIncident,
      applicationSis,
      valide,
      diffusion,
      origine,
      causeRetard,
      causeProbable,
      typeCauseIncident
    };

    // API request using fetch
    fetch('http://localhost:8082/ABELA-MYSMC/api/gestionIncidents/avisIncidents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        console.log('Avis créé avec succès');
      } else {
        console.error('Erreur lors de la création de l\'avis');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la requête', error);
    });
  };

  const handleChangeNature = (event) => {
    setNature(event.target.value);
  };
  const handleChangeType = (event) => {
    setSelectedType(event.target.value);
  };
  const handleChangeService = (event) => {
    setSelectedService(event.target.value);
  };
  const handleChangeValide = (event) => {
    setSelectedValide(event.target.value);
  };
  const handleChangeDiffusion = (event) => {
    setSelectedDiffusion(event.target.value);
  };
  const handleChangeCause = (event) => {
    setCauseRetard(event.target.value);
  };

  const handleChangeOrigine = (event) => {
    setSelectedCause(event.target.value);
  };

  return (
    <div id="home">
      <Container className="body">
        {/* Gestion des avis section */}
        <Row>
          <Col sm={12}>
            <Title text="Gestion des avis d'incidents - Formulaire de déclaration d'avis" />
            <Table className="custom-table" bordered striped id="ajoutavis">
              <thead>
                <tr>
                  <th colSpan={3} id="text">
                    {" "}
                    <ReportProblemIcon sx={{ height: "18px" }} />
                    Consignes obligatoires à respecter
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontSize: ".9em", fontWeight: "500" }}>
                <tr>
                  <td> Delai de diffusion</td>
                  <td colSpan={2}>
                    45 minutes après détection même si les TMC ne valident pas.
                  </td>
                </tr>
                <tr>
                  <td>Delai de traitement</td>
                  <td colSpan={2}>
                    4 heures après détection - Envoyez un état d'avancement
                    chaque 4h.
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        {/* Correspondance and Causes & Impacts sections */}
        <Row>
        <Col sm={6}>
            <Title text="Correspondance Avis" />
            <form className="mt-5">
              <div className="mb-3 form-group">
                <label htmlFor="typeAvis">Type Avis :</label>
                <select
                  id="typeAvis"
                  className="form-control"
                  onChange={handleChangeType}
                  value={selectedType}
                  required
                >
                  {typesAvis.map((type) => (
                    <option key={type.id} value={type.nom}>
                      {type.nom}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 form-group">
                <label htmlFor="diffusion">Liste Diffusion :</label>
                <select
                  id="diffusion"
                  className="form-control"
                  onChange={handleChangeDiffusion}
                  size="small"
                  value={selectedDiffusion}
                  required
                >
                  {listDiffusion.map((diffusion) => (
                    <option key={diffusion.id} value={diffusion.nom}>
                      {diffusion.nom}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 form-group">
                <label htmlFor="valide">Validation :</label>
                <select
                  id="valide"
                  className="form-control"
                  onChange={handleChangeValide}
                  value={selectedValide}
                  required
                >
                  {listValidation.map((valide) => (
                    <option key={valide.id} value={valide.nom}>
                      {valide.nom}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 form-group">
                <label htmlFor="dateDebut">Date Début :</label>
                <input
                  type="date"
                  id="dateDebut"
                  className="form-control"
                />
              </div>
              <div className="mb-3 form-group">
                <label htmlFor="dateDetection">Date Détection :</label>
                <input
                  type="date"
                  id="dateDetection"
                  className="form-control"
                />
              </div>
              <div className="mb-3 form-group">
                <label htmlFor="ticketEzv">Ticket EZV :</label>
                <input
                  type="text"
                  id="ticketEzv"
                  className="form-control"
                />
              </div>
              <div className="mb-3 form-group">
                <label htmlFor="ticketOceane">Ticket Océane :</label>
                <input
                  type="text"
                  id="ticketOceane"
                  className="form-control"
                />
              </div>
            
            </form>
          </Col>

          <Col sm={6}>
            <Title text="Causes & Impacts" />
            <form className="mt-5">
              <div className="mb-3 form-group">
                <label htmlFor="causeProbable">Cause probable :</label>
                <input
                  type="text"
                  id="causeProbable"
                  className="form-control"
                />
              </div>
              <div className="mb-3 form-group">
                <label htmlFor="impact">Impact :</label>
                <input
                  type="text"
                  id="impact"
                  className="form-control"
                />
              </div>
              <div className="mb-3 form-group">
                <label htmlFor="origine">Origine :</label>
                <select
                  className="form-control"
                  onChange={handleChangeOrigine}
                  size="small"
                  value={selectedCause}
                  required
                >
                  {typeCause.map((cause) => (
                    <option key={cause.id} value={cause.nom}>
                      {cause.nom}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 form-group">
                <label htmlFor="observation">Observations :</label>
                <textarea
                  className="form-control"
                  id="observation"
                  cols="30"
                  rows="5"
                ></textarea>
              </div>
              <Button variant="primary" onClick={handleSubmit}  type="submit">
                Submit
              </Button>
            </form>
          </Col>

                 </Row>
      </Container>
    </div>
  );
}

export default AddIncident;
