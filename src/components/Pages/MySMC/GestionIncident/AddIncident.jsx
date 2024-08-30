import React, { useState, useEffect } from "react";
import useAuth from "../../Auth/useAuth";
import Header from "../../../Header/Header";
import { Container, Row, Col, Table } from "react-bootstrap";
import "./ajoutavis.css";
import { FaList, FaSearch, FaHome, FaPaperclip } from "react-icons/fa";
import StackedLineChartTwoToneIcon from "@mui/icons-material/StackedLineChartTwoTone";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import "../../../Pages/MySMC/Menu/menumysmc.css";
import {
  Card,
  CardContent,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Title } from "@mui/icons-material";
import HeaderWithNavigate from "../../../Header/Header";

function AddIncident() {
  const ajoutAvisItemsMenu = [
    {
      label: " Lister les avis d'incidents",
      link: "/mysmc/gestionincident",
      icon: FaList,
    },
    {
      label: " Rechercher avis",
      link: "/gestionincident/rechercheavis",
      icon: FaSearch,
    },
    {
      label: " Statistique avis d'incidents",
      link: "/gestionincident/statistique",
      icon: StackedLineChartTwoToneIcon,
    },
  ];
  const gestionIncidentItemsNavigate = [
    {
      label: " Gestion incidents",
      link: "/mysmc/gestionincident",
      icon: ReportProblemIcon,
    },
    {
      label: " Gestion Probleme",
      link: "/mysmc/gestionprobleme",
      icon: ReportProblemIcon,
    },
    {
      label: " Etat Supervision",
      link: "/mysmc/etatsupervision",
      icon: RiDashboard3Line,
    },
    { label: " Consignes Orchestrées", link: "#", icon: FaPaperclip },
    {
      label: " Suivi Activités ",
      link: "/mysmc/suivisactivites",
      icon: IoStatsChart,
    },
    { label: " Page d'acceuil", link: "/mysmc", icon: FaHome },
  ];

  const [nature, setNature] = useState("SI");
  const [type, setType] = useState("choisir le type d'avis");
  const [service, setService] = useState("Application Test");
  const [valide, setValide] = useState("choisir la liste validation");
  const [diffusion, setDiffusion] = useState("choisir la liste diffusion");
  const [causeRetard, setCauseRetard] = useState("Cause Retard Notification");
  const [origine, setOrigine] = useState("Définir une origine");
  const [currentForm, setCurrentForm] = useState("");
  const [typesAvis, setTypesAvis] = useState([]); // State pour stocker les types d'avis récupérés depuis l'API
  const [selectedType, setSelectedType] = useState(""); // State pour stocker le type d'avis sélectionné dans le Select
  const [serviceImpact, setServiceImpacte] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [listValidation, setListValidation] = useState([]);
  const [selectedValide, setSelectedValide] = useState("");
  const [listDiffusion, setListDiffusion] = useState([]);
  const [selectedDiffusion, setSelectedDiffusion] = useState("");
  const [typeCause, setTypeCause] = useState([]);
  const [selectedCause, setSelectedCause] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/typeavisincidents"
      )
      .then((response) => {
        // Récupérez les données des types d'avis depuis la réponse de l'API
        const data = response.data;
        // Mettez à jour le state avec les types d'avis récupérés depuis l'API
        setTypesAvis(data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des types d'avis depuis l'API",
          error
        );
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/applicationSI/list"
      )
      .then((response) => {
        // Récupérez les données des types d'avis depuis la réponse de l'API
        const data = response.data;
        // Mettez à jour le state avec les types d'avis récupérés depuis l'API
        setServiceImpacte(data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des types d'avis depuis l'API",
          error
        );
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/listValidations"
      )
      .then((response) => {
        // Récupérez les données des types d'avis depuis la réponse de l'API
        const data = response.data;
        // Mettez à jour le state avec les types d'avis récupérés depuis l'API
        setListValidation(data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des types d'avis depuis l'API",
          error
        );
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/listDiffusions"
      )
      .then((response) => {
        // Récupérez les données des types d'avis depuis la réponse de l'API
        const data = response.data;
        // Mettez à jour le state avec les types d'avis récupérés depuis l'API
        setListDiffusion(data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des types d'avis depuis l'API",
          error
        );
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/typeCauseAvis"
      )
      .then((response) => {
        // Récupérez les données des types d'avis depuis la réponse de l'API
        const data = response.data;
        // Mettez à jour le state avec les types d'avis récupérés depuis l'API
        setTypeCause(data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des types d'avis depuis l'API",
          error
        );
      });
  }, []);

  const handleMenuClick = (link) => {
    setCurrentForm(link);
    console.log(link);
  };
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

    const typeAvisIncident = [
      {
        id: selectedType,
      },
    ];

    const applicationSis = [
      {
        id: selectedService,
      },
    ];

    const typeCauseIncident = [
      {
        id: selectedCause,
      },
    ];

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
      typeCauseIncident,

      // Ajoutez d'autres champs du formulaire si nécessaire
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
          <Col sm={4} style={{ marginTop: "3%" }}>
            {/* <MenuPersoGesIncident
              propsMenuItems={ajoutAvisItemsMenu}
              onItemClick={handleMenuClick}
            /> */}
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={12}>
            <Row>
              <Col>
                <Title text="Correspondance avis" />
                <form>
                  <div className="mb-4 align-right">
                    <InputLabel
                      sx={{
                        fontSize: "14",
                        fontFamily: "fantasy",
                        color: "#000",
                      }}
                      className="demo-simple-select-label"
                    >
                      Objet
                    </InputLabel>
                    &nbsp;
                    <TextField
                      className="textfield"
                      id="objet"
                      variant="outlined"
                      size="small"
                      placeholder="objet avis"
                      required
                    />
                  </div>
                  <div className="mb-4 align-right">
                    <InputLabel className="demo-simple-select-label">
                      Nature
                    </InputLabel>
                    &nbsp;
                    <Select
                      id="natures"
                      labelId="demo-simple-select-label"
                      className="textfield"
                      label="TYPE DE TRANSACTION"
                      onChange={handleChangeNature}
                      size="small"
                      value={nature}
                      required
                    >
                      <MenuItem value="SI">{nature}</MenuItem>
                      <MenuItem value="DATA">DATA</MenuItem>
                      <MenuItem value="CONTENU">CONTENU</MenuItem>
                    </Select>
                  </div>
                  <div className="mb-4 align-right">
                    <InputLabel className="demo-simple-select-label">
                      {" "}
                      Type avis
                    </InputLabel>
                    &nbsp;
                    <Select
                      labelId="demo-simple-select-label"
                      className="textfield"
                      onChange={handleChangeType}
                      size="small"
                      value={selectedType}
                      required
                    >
                      {/* Mappez les types d'avis dans des éléments MenuItem */}
                      {typesAvis.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.nom}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="mb-4 align-right">
                    <InputLabel className="demo-simple-select-label">
                      Services impactés
                    </InputLabel>
                    &nbsp;
                    <Select
                      labelId="demo-simple-select-label"
                      className="textfield"
                      onChange={handleChangeService}
                      small
                      value={selectedService}
                      required
                    >
                      {serviceImpact.map((service) => (
                        <MenuItem key={service.id} value={service.id}>
                          {service.nom}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="mb-4 align-right">
                    <InputLabel className="demo-simple-select-label">
                      Liste Validation
                    </InputLabel>
                    &nbsp;
                    <Select
                      labelId="demo-simple-select-label"
                      id="textfield"
                      onChange={handleChangeValide}
                      size="small"
                      value={selectedValide}
                      required
                    >
                      {listValidation.map((valide) => (
                        <MenuItem key={valide.id} value={valide.id}>
                          {valide.nom}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="mb-4 align-right">
                    <InputLabel className="demo-simple-select-label">
                      Liste Diffusion
                    </InputLabel>
                    &nbsp;
                    <Select
                      labelId="demo-simple-select-label"
                      id="textfield"
                      onChange={handleChangeDiffusion}
                      small
                      value={selectedDiffusion}
                      required
                    >
                      {listDiffusion.map((diffusion) => (
                        <MenuItem key={diffusion.id} value={diffusion.id}>
                          {diffusion.nom}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="mb-4 align-right">
                    <InputLabel className="demo-simple-select-label">
                      Date Début
                    </InputLabel>
                    &nbsp;
                    <TextField
                      className="textfield"
                      id="dateDebut"
                      variant="outlined"
                      size="small"
                      type="date"
                      required
                    />
                  </div>
                  <div className="mb-4 align-right">
                    <InputLabel className="demo-simple-select-label">
                      Date Détection
                    </InputLabel>
                    &nbsp;
                    <TextField
                      className="textfield"
                      id="dateDetection"
                      variant="outlined"
                      size="small"
                      type="date"
                      required
                    />
                  </div>
                  <div className="mb-4 align-right">
                    <InputLabel className="demo-simple-select-label">
                      Ticket EZV
                    </InputLabel>
                    &nbsp;
                    <TextField
                      className="textfield"
                      id="ticketEzv"
                      variant="outlined"
                      size="small"
                      placeholder="Numero ticket EasyVista"
                    />
                  </div>
                  <div className="mb-4 align-right">
                    <InputLabel className="demo-simple-select-label">
                      Ticket Oceane
                    </InputLabel>
                    &nbsp;
                    <TextField
                      className="textfield"
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
                <form>
                  <div className="mb-4 align-right" style={{ display: "flex" }}>
                    <InputLabel className="demo-simple-select-label">
                      Impacts
                    </InputLabel>
                    &nbsp;
                    <TextareaAutosize
                      id="impact"
                      className="textfield"
                      variant="outlined"
                      size="small"
                      placeholder="Comment les utisateurs perçoivent le dysfonctionnement"
                      required
                    />
                  </div>
                  <div className="mb-4 align-right" style={{ display: "flex" }}>
                    <InputLabel className="demo-simple-select-label">
                      Cause Retard Notif.
                    </InputLabel>
                    &nbsp;
                    <Select
                      labelId="demo-simple-select-label"
                      className="textfield"
                      onChange={handleChangeCause}
                      size="small"
                      value={causeRetard}
                      required
                    >
                      <MenuItem value="Cause Retard Notification">
                        {causeRetard}
                      </MenuItem>
                      <MenuItem value="Non Supervisé">Non Supervisé</MenuItem>
                      <MenuItem value="Retard Diffusion">
                        Retard Diffusion
                      </MenuItem>
                    </Select>
                  </div>
                  <div className="mb-4 align-right" style={{ display: "flex" }}>
                    <InputLabel
                      className="demo-simple-select-label"
                      value={origine}
                    >
                      Origine Cause
                    </InputLabel>
                    &nbsp;
                    <Select
                      labelId="demo-simple-select-label"
                      className="textfield"
                      onChange={handleChangeOrigine}
                      size="small"
                      value={selectedCause}
                      required
                    >
                      {typeCause.map((cause) => (
                        <MenuItem key={cause.id} value={cause.id}>
                          {cause.intitule}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="mb-4 align-right" style={{ display: "flex" }}>
                    <InputLabel className="demo-simple-select-label">
                      Causes Problables
                    </InputLabel>
                    &nbsp;
                    <TextareaAutosize
                      id="causeProbable"
                      className="textfield"
                      variant="outlined"
                      size="small"
                      placeholder="(*) Demander systématiquement aux TMC(s) les causes probables
                      (*) Eviter les expressions « Investigations en Cours » ; « causes inconnues » et préférer mettre « constat : xxxxxxxx »"
                      required
                    />
                  </div>
                  <div className="mb-4 align-right" style={{ display: "flex" }}>
                    <InputLabel className="demo-simple-select-label">
                      Observations
                    </InputLabel>
                    &nbsp;
                    <TextareaAutosize
                      id="observation"
                      className="textfield"
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
              propsMenuItems={gestionIncidentItemsNavigate}
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
        </div>
      </Container>
    </div>
  );
}

export default AddIncident;
