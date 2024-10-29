import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Nav, Row, Tab } from "react-bootstrap";
import menupng from "../../../../assets/logorubriques.png";
import logocentreon from "../../../../assets/logo-centreon.jpg";
import logografana from "../../../../assets/logografana.jpg";
import { TfiBlackboard } from "react-icons/tfi";
import {
  FaLink,
  FaSignal,
  FaPlusCircle,
  FaDownload,
  FaArrowRight,
} from "react-icons/fa";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Modal, Alert } from "react-bootstrap";
import "./homesmc.css";
import useAuth from "../../Auth/useAuth";
import axios from "axios";
import { getTokenDecode } from "../../Auth/authUtils";
import { abelaURL } from "../../../../config/global.constant";

function HomeSmc() {
  useAuth();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [informations, setInformations] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [etat, setEtat] = useState([]);
  const [links, setLinks] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const user = getTokenDecode().sub;
  const [formData, setFormData] = useState({
    titre: "",
    user: user,
    message: "",
    etat: "",
  });

  useEffect(() => {
    const message = localStorage.getItem("alertMessage");
    const type = localStorage.getItem("alertType");

    if (message && type) {
      setAlertMessage(message);
      setAlertType(type);
      setShowAlert(true);

      localStorage.removeItem("alertMessage");
      localStorage.removeItem("alertType");

      setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => {
        clearTimeout();
      };
    }
  }, []);

  const handleOpenModal = () => {
    setModalInfo(true);
  };

  const handleCloseModal = () => {
    setModalInfo(false);
  };

  const fetchState = async (url, setter) => {
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

  const fetchInfos = async (url, setter) => {
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

  const fetchLinks = async (url, setter) => {
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

  useEffect(() => {
    fetchInfos(`${abelaURL}/avisIncidents/infos`, setInformations);
    fetchState(`${abelaURL}/avisIncidents/infos/etat`, setEtat);
    fetchLinks(`${abelaURL}/links`, setLinks);
  }, [token]);

  // Format date to yyyy-mm-dd hh:mm:ss
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(date).toLocaleDateString("fr-FR", options);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "etat") {
      setFormData({
        ...formData,
        etat: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log(formData);

      const response = await axios.post(
        `${abelaURL}/avisIncidents/infos`,
        formData,
        config
      );
      console.log(response.data);

      if (response.status !== 200) {
        throw new Error("Erreur lors de l'enregistrement");
      }

      setModalInfo(false);
      localStorage.setItem(
        "alertMessage",
        "Information enregistrée avec succès"
      );
      localStorage.setItem("alertType", "success");
      window.location.reload();
    } catch (error) {
      localStorage.setItem("alertMessage", "Erreur lors de l'enregistrement");
      localStorage.setItem("alertType", "danger");
      window.location.reload();
      setError(`Erreur: ${error.message}`);
    }
  };

  return (
    <div id="homsmc">
      <Container className="body">
        <Row>
          <Col>
            <fieldset>
              <legend
                style={{
                  fontSize: "21px",
                  color: "#333",
                  borderBottom: "1px solid #e5e5e5",
                  fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                }}
                className="d-flex align-items-center"
              >
                <span style={{ float: "left" }}>
                  <img
                    src={menupng}
                    style={{ width: "50px", height: "50px" }}
                  />
                </span>
                Rubrique des informations utiles
              </legend>
            </fieldset>
            <br />
          </Col>
        </Row>
        <div className="container mt-3">
          {showAlert && (
            <Alert
              variant={alertType}
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {alertMessage}
            </Alert>
          )}
        </div>
        <Row>
          <Col>
            <Tab.Container defaultActiveKey="first">
              <Row>
                <Col sm={3}>
                  <Nav
                    variant="pills"
                    className="custom-nav d-flex flex-column align-items-lg-stretch justify-content-center"
                  >
                    <Nav.Item className="nav-item">
                      <Nav.Link
                        eventKey="first"
                        className="d-flex align-items-center justify-content-center custom-tab-item"
                      >
                        <div className="d-block text-center">
                          <TfiBlackboard style={{ fontSize: "2em" }} /> <br />
                          Informations
                        </div>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item className="nav-item">
                      <Nav.Link
                        eventKey="second"
                        className="d-flex align-items-center justify-content-center custom-tab-item"
                      >
                        <div className="d-block text-center">
                          <FaLink style={{ fontSize: "2em" }} /> <br />
                          Liens Utiles
                        </div>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item className="nav-item">
                      <Nav.Link
                        eventKey="third"
                        className="d-flex align-items-center justify-content-center custom-tab-item"
                      >
                        <div className="d-block text-center">
                          <FaSignal style={{ fontSize: "2em" }} /> <br />
                          Automatique reporting
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <Container
                        className="blockinf"
                        style={{ borderBottom: "1px solid #e5e5e5" }}
                      >
                        <Button
                          style={{
                            backgroundColor: "#5cb85c",
                            border: "#449D44",
                            fontSize: "14px",
                            fontFamily:
                              "Helvetica Neue,Helvetica,Arial,sans-serif",
                            marginTop: "8px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          onClick={handleOpenModal}
                        >
                          <FaPlusCircle /> &nbsp; Partager une information
                        </Button>
                        <hr />
                        <Timeline
                          sx={{
                            [`& .${timelineItemClasses.root}:before`]: {
                              flex: 0,
                              padding: 0,
                            },
                            height: "350px",
                            overflowY: "auto",
                            position: "relative",
                          }}
                        >
                          {informations.map((info) => (
                            <TimelineItem>
                              <TimelineSeparator>
                                <TimelineDot
                                  variant="outlined"
                                  color="primary"
                                />
                                <TimelineConnector />
                              </TimelineSeparator>
                              <TimelineContent
                                sx={{ fontSize: "14px", fontFamily: "inherit" }}
                              >
                                <div key={info.id}>
                                  <b>{info.titre}</b>
                                  &nbsp;
                                  {info.etat === "FAIBLE" ? (
                                    <span className="faible">
                                      Criticité : Faible
                                    </span>
                                  ) : info.etat === "MOYENNE" ? (
                                    <span className="moyenne">
                                      Criticité : Moyenne
                                    </span>
                                  ) : (
                                    <span className="haute">
                                      Criticité : Haute
                                    </span>
                                  )}
                                  <h6
                                    style={{
                                      color: "#ea7714",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {formatDate(info.datePublication)},{" "}
                                    {info.user}
                                  </h6>
                                  <i> {info.message}</i>
                                </div>
                              </TimelineContent>
                            </TimelineItem>
                          ))}
                        </Timeline>
                      </Container>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Container
                        className="blockinf"
                        style={{ borderBottom: "1px solid #e5e5e5" }}
                      >
                        <Timeline>
                          {links.map((link, index) => (
                            <div className="link">
                              <a href={link.url}>{link.name}</a>
                            </div>
                          ))}
                        </Timeline>
                      </Container>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <Container
                        className="blockinf"
                        style={{ borderBottom: "1px solid #e5e5e5" }}
                      >
                        <Row className="justify-content-center mx-auto">
                          {/* Alarmes Critiques Centreon Card */}
                          <Col
                            xs={12}
                            md={6}
                            lg={4}
                            className="d-flex justify-content-center mb-4"
                          >
                            <div
                              style={{
                                width: "18rem",
                                border: "1px solid #dff0d8",
                                borderRadius: "5px",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor: "#dff0d8",
                                  width: "100%",
                                  padding: "10px 0",
                                  textAlign: "center",
                                  fontWeight: "bold",
                                  fontSize: "1.1em",
                                  margin: "0",
                                  color: "#3c763d",
                                }}
                              >
                                Alarmes Critiques Centreon
                              </div>
                              <img
                                src={logocentreon}
                                style={{
                                  display: "block",
                                  margin: "20px auto 10px",
                                }}
                                alt="Centreon Logo"
                              />
                              <div
                                style={{
                                  padding: "0 15px 15px",
                                }}
                              >
                                <p style={{ fontSize: "1em", color: "#333" }}>
                                  Cette fonctionnalité permet d'extraire en
                                  temps réels les alarmes critiques sur
                                  Centreon.
                                </p>
                                <a
                                  variant="success"
                                  style={{
                                    backgroundColor: "#5cb85c",
                                    borderColor: "#4cae4c",
                                    width: "100%",
                                    color: "#fff",
                                  }}
                                  className="btn"
                                  href="https://portailsmc.orange-sonatel.com/extract/alarmes/centreon/critique"
                                >
                                  <FaDownload /> Download Excel
                                </a>
                              </div>
                            </div>
                          </Col>

                          {/* Reporting Incidents Card */}
                          <Col
                            xs={12}
                            md={6}
                            lg={4}
                            className="d-flex justify-content-center mb-4"
                          >
                            <div
                              style={{
                                width: "18rem",
                                border: "1px solid #dff0d8",
                                borderRadius: "5px",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor: "#dff0d8",
                                  width: "100%",
                                  padding: "10px 0",
                                  textAlign: "center",
                                  fontWeight: "bold",
                                  fontSize: "1.1em",
                                  margin: "0",
                                  color: "#3c763d",
                                }}
                              >
                                Reporting Incidents
                              </div>
                              <img
                                src={logografana} // Assurez-vous de définir cette variable pour l'image Grafana
                                style={{
                                  display: "block",
                                  margin: "20px auto 10px",
                                }}
                                alt="Grafana Logo"
                              />
                              <div
                                style={{
                                  padding: "0 15px 15px",
                                }}
                              >
                                <p style={{ fontSize: "0.9em", color: "#333" }}>
                                  Cette fonctionnalité permet d'accéder au
                                  reporting des incidents pilotés par SMC-IT sur
                                  Grafana.
                                </p>
                                <a
                                  variant="success"
                                  style={{
                                    backgroundColor: "#5cb85c",
                                    borderColor: "#4cae4c",
                                    width: "100%",
                                    color: "#fff",
                                  }}
                                  className="btn"
                                  href="https://reporting-smc-it.orange-sonatel.com/d/I0dABlM7z/reporting-incident?orgId=1"
                                >
                                  <FaArrowRight /> Access Grafana
                                </a>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
      </Container>

      <Modal
        show={modalInfo}
        onHide={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modal.Header closeButton>
          <Modal.Title>Partager une information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <div className="form-group">
              <label htmlFor="titre">Titre</label>
              <input
                id="titre"
                name="titre"
                variant="outlined"
                size="small"
                className="form-control"
                placeholder="minimum 3 caratéres"
                required
                value={formData.titre}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                name="type"
                onChange={handleChange}
                className="form-select"
                value={formData.type}
                size="small"
                required
              >
                <option value="">Choisir le type</option>
                <option value="ATP">ATP</option>
                <option value="Supervision">Supervision</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Nouveautés">Nouveautés</option>
              </select>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="message">Message</label>
              <input
                id="message"
                name="message"
                variant="outlined"
                size="small"
                className="form-control"
                placeholder="minimum 3 caratéres"
                required
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="etat">Criticité</label>
              <select
                id="etat"
                name="etat"
                onChange={handleChange}
                className="form-select"
                value={formData.etat}
                size="small"
                required
              >
                <option value="">Choisir la criticité</option>
                {etat.map((etat) => (
                  <option key={etat} value={etat}>
                    {etat}
                  </option>
                ))}
              </select>
            </div>
          </form>
          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            {" "}
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HomeSmc;
