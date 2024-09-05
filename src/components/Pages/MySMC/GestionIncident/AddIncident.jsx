import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import "./ajoutavis.css";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import "../../../Pages/MySMC/Menu/menumysmc.css";
import { TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import { Button } from "react-bootstrap";
import axios from "axios";
import Title from "../../../Card/Title/Title";
import { getTokenFromLocalStorage } from "../../Auth/authUtils";

function AddIncident() {
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

  const [nature, setNature] = useState("");
  const [valide, setValide] = useState("");
  const [diffusion, setDiffusion] = useState("");
  const [causeRetard, setCauseRetard] = useState("");
  const [origine, setOrigine] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateDetection, setDateDetection] = useState("");
  const [currentForm, setCurrentForm] = useState("");
  const [typesAvis, setTypesAvis] = useState([]); // State pour stocker les types d'avis récupérés depuis l'API
  const [selectedType, setSelectedType] = useState(""); // State pour stocker le type d'avis sélectionné dans le Select
  const [serviceImpacte, setServiceImpacte] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [listValidation, setListValidation] = useState([]);
  const [selectedValide, setSelectedValide] = useState("");
  const [listDiffusion, setListDiffusion] = useState([]);
  const [selectedDiffusion, setSelectedDiffusion] = useState("");
  const [typeCause, setTypeCause] = useState([]);
  const [selectedCause, setSelectedCause] = useState("");
  const token = getTokenFromLocalStorage();
  const [error, setError] = useState("");

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

    fetchData(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/typeavisincidents",
      setTypesAvis
    );
    fetchData(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/applicationSI/list",
      setServiceImpacte
    );
    fetchData(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/listValidations",
      setListValidation
    );
    fetchData(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/listDiffusions",
      setListDiffusion
    );
    fetchData(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/typeCauseAvis",
      setTypeCause
    );
  }, [token]);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = () => {
    const objet = document.getElementById("objet").value;
    const dateDebut = document.getElementById("dateDebut").value;
    const dateDetection = document.getElementById("dateDetection").value;
    const ticketEzv = document.getElementById("ticketEzv").value;
    const ticketOceane = document.getElementById("ticketOceane").value;
    const impact = document.getElementById("impact").value;
    const causeProbable = document.getElementById("causeProbable").value;
    const observations = document.getElementById("observation").value;
    // const natures= document.getElementById("natures").value

    const formData = {
      objet,
      nature,
      typeAvisIncident: { id: selectedType },
      serviceImpacte: { id: selectedService },
      valide: selectedValide,
      diffusion: selectedDiffusion,
      dateDebut,
      dateDetection,
      ticketEzv,
      ticketOceane,
      impact,
      causeRetard: { id: selectedCause },
      origine: { id: selectedCause },
      causeProbable,
      observations,
    };

    console.log(formData);

    // Effectuez la requête vers l'API ici en utilisant fetch ou Axios
    fetch(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Ajoutez des headers supplémentaires si nécessaire
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        if (response.ok) {
          // Gérez la réponse en cas de succès
          console.log("Avis créé avec succès");
        } else {
          // Gérez la réponse en cas d'erreur
          console.error("Erreur lors de la création de l'avis");
        }
      })
      .catch((error) => {
        // Gérez les erreurs de requête
        console.error("Erreur lors de la requête", error);
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
        <Row>
          <Col sm={12} className="content">
            <Title text="Gestion des avis d'incidents - Formulaire de déclaration d'avis" />
            <br />
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
        <Row>
          <Col sm={12}>
            <Row>
              <Col>
                <Title text="Correspondance avis" />
                <form className="mt-5">
                  <div className="mb-3 form-group">
                    <label
                      htmlFor="objet"
                      style={{
                        fontSize: "14",
                        fontFamily: "fantasy",
                        color: "#000",
                      }}
                    >
                      Objet :
                    </label>
                    <input
                      type="text"
                      name="objet"
                      id="objet"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 form-group">
                    <label
                      htmlFor="natures"
                      style={{
                        fontSize: "14",
                        fontFamily: "fantasy",
                        color: "#000",
                      }}
                    >
                      Nature :
                    </label>
                    <select
                      name="natures"
                      id="natures"
                      className="form-control"
                    >
                      <option value="SI">SI</option>
                      <option value="DATA">DATA</option>
                      <option value="CONTENU">CONTENU</option>
                    </select>
                  </div>
                  <div className="mb-3 form-group">
                    <label
                      htmlFor="typeAvis"
                      style={{
                        fontSize: "14",
                        fontFamily: "fantasy",
                        color: "#000",
                      }}
                    >
                      Type avis :
                    </label>
                    <select
                      className="form-control"
                      onChange={handleChangeType}
                      size="small"
                      value={selectedType}
                      required
                    >
                      {/* Mappez les types d'avis dans des éléments option */}
                      {typesAvis.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3 form-group">
                    <label
                      htmlFor="serviceImpacte"
                      style={{
                        fontSize: "14",
                        fontFamily: "fantasy",
                        color: "#000",
                      }}
                    >
                      Services impactés :
                    </label>
                    <select
                      className="form-control"
                      onChange={handleChangeService}
                      size="small"
                      value={selectedService}
                      required
                    >
                      {serviceImpacte.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3 form-group">
                    <label
                      htmlFor="valide"
                      style={{
                        fontSize: "14",
                        fontFamily: "fantasy",
                        color: "#000",
                      }}
                    >
                      Liste Validation :
                    </label>
                    <select
                      id="textfield"
                      className="form-control"
                      onChange={handleChangeValide}
                      size="small"
                      value={selectedValide}
                      required
                    >
                      {listValidation.map((valide) => (
                        <option key={valide.id} value={valide.id}>
                          {valide.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3 form-group">
                    <label
                      htmlFor="diffusion"
                      style={{
                        fontSize: "14",
                        fontFamily: "fantasy",
                        color: "#000",
                      }}
                    >
                      Liste Diffusion :
                    </label>
                    <select
                      id="textfield"
                      className="form-control"
                      onChange={handleChangeDiffusion}
                      size="small"
                      value={selectedDiffusion}
                      required
                    >
                      {listDiffusion.map((diffusion) => (
                        <option key={diffusion.id} value={diffusion.id}>
                          {diffusion.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3 form-group">
                    <label
                      htmlFor="dateDebut"
                      style={{
                        fontSize: "14",
                        fontFamily: "fantasy",
                        color: "#000",
                      }}
                    >
                      Date Début :
                    </label>
                    <TextField
                      className="form-control"
                      id="dateDebut"
                      variant="outlined"
                      size="small"
                      type="date"
                      value={dateDebut}
                      onChange={(e) => setDateDebut(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 form-group">
                    <label
                      htmlFor="dateDetection"
                      style={{
                        fontSize: "14",
                        fontFamily: "fantasy",
                        color: "#000",
                      }}
                    >
                      Date Détection :
                    </label>
                    <TextField
                      className="form-control"
                      id="dateDetection"
                      variant="outlined"
                      size="small"
                      type="date"
                      value={dateDetection}
                      onChange={(e) => setDateDetection(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 form-group">
                    <label
                      htmlFor="ticketEzv"
                      style={{
                        fontSize: "14",
                        fontFamily: "fantasy",
                        color: "#000",
                      }}
                    >
                      Ticket EZV :
                    </label>
                    <TextField
                      className="form-control"
                      id="ticketEzv"
                      variant="outlined"
                      size="small"
                      placeholder="Numero ticket EasyVista"
                    />
                  </div>
                  <div className="mb-3 form-group">
                    <label
                      htmlFor="ticketOceane"
                      style={{
                        fontSize: "14",
                        fontFamily: "fantasy",
                        color: "#000",
                      }}
                    >
                      Ticket Oceane :
                    </label>
                    <TextField
                      className="form-control"
                      id="ticketOceane"
                      variant="outlined"
                      size="small"
                      placeholder="Numero ticket Oceane"
                    />
                  </div>
                </form>
              </Col>
              <Col>
                <Title text="Causes et impacts" />
                <form className="mt-5">
                  <div className="form-group">
                    <label
                      htmlFor="impact"
                      style={{
                        fontSize: "14",
                        fontFamily: "fantasy",
                        color: "#000",
                      }}
                    >
                      Impacts :
                    </label>
                    <textarea
                      id="impact"
                      className="form-control"
                      variant="outlined"
                      size="small"
                      placeholder="Comment les utisateurs perçoivent le dysfonctionnement"
                      required
                    />
                  </div>
                  <div className="mb-3 form-group">
                    <label>Cause Retard Notif :</label>
                    <select
                      className="form-control"
                      onChange={handleChangeCause}
                      size="small"
                      value={causeRetard}
                      required
                    >
                      <option value="Cause Retard Notification">
                        Cause Retard Notification
                      </option>
                      <option value="Non Supervisé">Non Supervisé</option>
                      <option value="Retard Diffusion">Retard Diffusion</option>
                    </select>
                  </div>
                  <div className="mb-3 form-group">
                    <label
                      htmlFor="origine"
                      style={{
                        fontSize: "14",
                        fontFamily: "fantasy",
                        color: "#000",
                      }}
                      value={origine}
                    >
                      Origine Cause :
                    </label>
                    <select
                      className="form-control"
                      onChange={handleChangeOrigine}
                      size="small"
                      value={selectedCause}
                      required
                    >
                      {typeCause.map((cause) => (
                        <option key={cause.id} value={cause.id}>
                          {cause.intitule}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3 form-group">
                    <label
                      style={{
                        fontSize: "14",
                        fontFamily: "fantasy",
                        color: "#000",
                      }}
                    >
                      Causes Problables :
                    </label>
                    <textarea
                      id="causeProbable"
                      className="form-control"
                      variant="outlined"
                      size="small"
                      placeholder="(*) Demander systématiquement aux TMC(s) les causes probables
                      (*) Eviter les expressions « Investigations en Cours » ; « causes inconnues » et préférer mettre « constat : xxxxxxxx »"
                      required
                    />
                  </div>
                  <div className="mb-3 form-group">
                    <label>Observations :</label>
                    <TextareaAutosize
                      id="observation"
                      className="form-control"
                      variant="outlined"
                      size="small"
                      placeholder="Renseigner les observations"
                      required
                    />
                  </div>
                </form>
              </Col>
            </Row>
          </Col>
          <Col sm={4}>
            {/* <NavigatePerso
              propsoptions={gestionIncidentItemsNavigate}
              onItemClick={handleMenuClick}
            /> */}
          </Col>
        </Row>
        <div
          className="col-sm-12"
          id="bouton"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <Button
            variant="success"
            onClick={handleSubmit} // Appel de la fonction handleSubmit lors du clic sur le bouton
          >
            Creation avis
          </Button>
          {error && <div className="error-message">{error}</div>}
        </div>
      </Container>
    </div>
  );
}

export default AddIncident;
