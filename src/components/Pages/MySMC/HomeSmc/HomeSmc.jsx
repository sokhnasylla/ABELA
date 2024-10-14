import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import menupng from "../../../../assets/menu.png";
import MenuLeft from "../../../Card/MenuLeft/MenuLeft";
import { TfiBlackboard } from "react-icons/tfi";
import { FaLink, FaSignal, FaPlusCircle } from "react-icons/fa";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Modal } from "react-bootstrap";
import "./homesmc.css";
import useAuth from "../../Auth/useAuth";
import axios from "axios";
import { getTokenDecode } from "../../Auth/authUtils";

const submenu = [
  { text: "Informations", icon: TfiBlackboard },
  { text: "Liens Utiles", icon: FaLink },
  { text: "Automatique reporting", icon: FaSignal },
];

function HomeSmc() {
  useAuth();
  const [informations, setInformations] = useState([]);
  const [modalInfo, setModalInfo] = useState(false);
  const [etat, setEtat] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const user = getTokenDecode().sub;
  const [formData, setFormData] = useState({
    titre: "",
    user: user,
    message: "",
    etat: "",
  });

  const handleOpenModal = () => {
    setModalInfo(true);
  };

  const handleCloseModal = () => {
    setModalInfo(false);
  };

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
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/infos/etat",
      setEtat
    );
  }, [token]);

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
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/infos",
      setInformations
    );
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
        "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/infos",
        formData,
        config
      );
      console.log(response.data);
      handleCloseModal();
    } catch (error) {
      localStorage.setItem("error", error.message);
      setError(`Erreur: ${error.message}`);
    }
  };

  return (
    <div id="homsmc">
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
            >
              <span style={{ float: "left", marginRight: "10px" }}>
                <img src={menupng} />
              </span>{" "}
              Rubrique des informations utiles
            </legend>
          </fieldset>
          <br />
        </Col>
      </Row>
      <Row>
        <Col>
          <MenuLeft submenu={submenu} />
        </Col>
        <Col xs={10}>
          <Container
            className="blockinf"
            style={{ borderBottom: "1px solid #e5e5e5" }}
          >
            <Button
              style={{
                backgroundColor: "#5cb85c",
                border: "#449D44",
                fontSize: "14px",
                fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
              }}
              onClick={handleOpenModal}
            >
              <FaPlusCircle /> &nbsp; Partager une information
            </Button>
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
                      name="type"
                      onChange={handleChange}
                      className="form-control"
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
                      name="etat"
                      onChange={handleChange}
                      className="form-control"
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
                    <TimelineDot variant="outlined" color="primary" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent
                    sx={{ fontSize: "14px", fontFamily: "inherit" }}
                  >
                    <div key={info.id}>
                      <b>{info.titre}</b>
                      &nbsp;
                      {info.etat === "Faible" ? (
                        <span
                          style={{
                            backgroundColor: "#148C8A",
                            color: "white",
                            borderRadius: "5px",
                            fontSize: "14px",
                            padding: "2px",
                          }}
                        >
                          Criticité : {info.etat}
                        </span>
                      ) : info.etat === "Moyen" ? (
                        <span
                          style={{
                            backgroundColor: "#FFA500",
                            color: "white",
                            borderRadius: "5px",
                            fontSize: "14px",
                            padding: "2px",
                          }}
                        >
                          Criticité : {info.etat}
                        </span>
                      ) : (
                        <span
                          style={{
                            backgroundColor: "#C9302C",
                            color: "white",
                            borderRadius: "5px",
                            fontSize: "14px",
                            padding: "2px",
                          }}
                        >
                          Criticité : {info.etat}
                        </span>
                      )}
                      <h6 style={{ color: "#ea7714", fontSize: "12px" }}>
                        {formatDate(info.datePublication)}, {info.user}
                      </h6>
                      <i> {info.message}</i>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              ))}
              {/* <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent
                  sx={{ fontSize: "14px", fontFamily: "inherit" }}
                >
                  <b> nouveau lien ELK</b>
                  &nbsp;
                  <span
                    style={{
                      backgroundColor: "#148C8A",
                      color: "white",
                      borderRadius: "5px",
                      fontSize: "14px",
                      padding: "2px",
                    }}
                  >
                    Criticité : Faible
                  </span>
                  <h6 style={{ color: "#ea7714", fontSize: "12px" }}>
                    2023-05-10 19:11:47, TMP_CISSE58568
                  </h6>
                  <i>
                    {" "}
                    https://observability.seetlu.orange-sonatel.com/spaces/space_selector
                  </i>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent
                  sx={{ fontSize: "14px", fontFamily: "inherit" }}
                >
                  {" "}
                  <b> CONFIGURATION ANSIBLE SUR LES DEMANDES DE SUPERVISION </b>
                  &nbsp;
                  <span
                    style={{
                      backgroundColor: "#148C8A",
                      color: "white",
                      borderRadius: "5px",
                      fontSize: "14px",
                      padding: "2px",
                    }}
                  >
                    Criticité : Haute
                  </span>
                  <h6 style={{ color: "#ea7714", fontSize: "12px" }}>
                    2023-04-26 11:08:52, FALL028018
                  </h6>
                  <i>
                    Bonjour, Pour les nouvelles demandes de Supervision , Merci
                    de configurer systématiquement dans MYSMC l'orchestration
                    ansible des partitions / pour linux et C ou systéme pour
                    windows
                  </i>
                </TimelineContent>
              </TimelineItem>
              <br />
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent
                  sx={{ fontSize: "14px", fontFamily: "inherit" }}
                >
                  {" "}
                  <b>Test </b>
                  &nbsp;
                  <span
                    style={{
                      backgroundColor: "#148C8A",
                      color: "white",
                      borderRadius: "5px",
                      fontSize: "14px",
                      padding: "2px",
                    }}
                  >
                    Criticité : Faible
                  </span>
                  <h6 style={{ color: "#ea7714", fontSize: "12px" }}>
                    2023-04-19 08:44:18, admin
                  </h6>
                  <i>Test</i>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent
                  sx={{ fontSize: "14px", fontFamily: "inherit" }}
                >
                  {" "}
                  <b>DEPOSE MESSAGERIE PRO </b>
                  &nbsp;{" "}
                  <span
                    style={{
                      backgroundColor: "#148C8A",
                      color: "white",
                      borderRadius: "5px",
                      fontSize: "14px",
                      padding: "2px",
                    }}
                  >
                    Criticité : Moyen
                  </span>
                  <h6 style={{ color: "#ea7714", fontSize: "12px" }}>
                    2023-03-16 10:08:33, FALL028018
                  </h6>
                  <i>
                    Bonjour, La messagerie Pro est deposée. j'ai mis les
                    scenarii en maintenance. Les clients sont migré sur
                    Hostopiacloud qu'on supervise déja.
                  </i>
                </TimelineContent>
              </TimelineItem>
              <br />
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="primary" />
                </TimelineSeparator>
                <TimelineContent
                  sx={{ fontSize: "14px", fontFamily: "inherit" }}
                >
                  {" "}
                  <b>
                    BOUCLE DE DIFFUSION DES INCIDENTS SUR API MANAGEMENT OU
                    TANGO: API MANAGEMENT-TANGO
                  </b>
                  &nbsp;
                  <span
                    style={{
                      backgroundColor: "#148C8A",
                      color: "white",
                      borderRadius: "5px",
                      fontSize: "14px",
                      padding: "2px",
                    }}
                  >
                    Criticité : Haute
                  </span>
                  <h6 style={{ color: "#ea7714", fontSize: "12px" }}>
                    2023-03-08 15:47:24, FALL028018
                  </h6>
                  <i>
                    Bonjour, Merci d'utiliser la boucle de diffusion ''API
                    MANAGEMENT-TANGO'' pour les incidents sur API Management ou
                    Tango
                  </i>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="primary" />
                </TimelineSeparator>
                <TimelineContent
                  sx={{ fontSize: "14px", fontFamily: "inherit" }}
                >
                  {" "}
                  <b>
                    NOUVELLES APPLICATIONS PRESENTES SUR RAS ET NON SUR NEWTEST
                  </b>
                  &nbsp;
                  <span
                    style={{
                      backgroundColor: "#148C8A",
                      color: "white",
                      borderRadius: "5px",
                      fontSize: "14px",
                      padding: "2px",
                    }}
                  >
                    Criticité : Haute
                  </span>
                  <h6 style={{ color: "#ea7714", fontSize: "12px" }}>
                    2023-02-23 12:04:06, Diatta028833
                  </h6>
                  <i>
                    Bonjour team, pour info, merci de trouver ci-dessous les
                    nouvelles applications intègrées sur RAS et qui ne sont pas
                    prèsentes sur NEWTEST (A documenter sur CONFLUENCE) ASRC GDI
                    QREDIC QUBEOGB QUBEOSL SIGNATURE70 ET 71 SWAPCHECK
                    TESTMICROSERVICE TIDJI YILLI NEW INFORMAT RIAKTR 3cloud
                    SONATEL.SN SYSWIN NIFIPRD1, 2 et 3
                  </i>
                </TimelineContent>
              </TimelineItem>
              <br />
              <br />
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="primary" />
                </TimelineSeparator>
                <TimelineContent
                  sx={{ fontSize: "14px", fontFamily: "inherit" }}
                >
                  {" "}
                  <b>IRIS devient SYSWIN </b>
                  &nbsp;
                  <span
                    style={{
                      backgroundColor: "#148C8A",
                      color: "white",
                      borderRadius: "5px",
                      fontSize: "14px",
                      padding: "2px",
                    }}
                  >
                    Criticité : Moyen
                  </span>
                  <h6 style={{ color: "#ea7714", fontSize: "12px" }}>
                    2023-02-22 10:42:38, Diatta028833
                  </h6>
                  <i>
                    Bonjour chers superviseurs, pour info IRIS devient SYSWIN
                    merci d'en tenir compte
                  </i>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="primary" />
                </TimelineSeparator>
                <TimelineContent
                  sx={{ fontSize: "14px", fontFamily: "inherit" }}
                >
                  {" "}
                  <b>DEMARRAGE SUPERVISION SUR RAS</b>
                  &nbsp;
                  <span
                    style={{
                      backgroundColor: "#148C8A",
                      color: "white",
                      borderRadius: "5px",
                      fontSize: "14px",
                      padding: "2px",
                    }}
                  >
                    Criticité : Haute
                  </span>
                  <h6 style={{ color: "#ea7714", fontSize: "12px" }}>
                    2023-02-22 10:40:30, Diatta028833
                  </h6>
                  <i>
                    Chers Superviseurs, nous vous informons que la supervision
                    sur le nouveau outil RAS a dèmarré, merci d'en tenir compte
                  </i>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="primary" />
                </TimelineSeparator>
                <TimelineContent
                  sx={{ fontSize: "14px", fontFamily: "inherit" }}
                >
                  {" "}
                  <b>Déploiement Release 3.2 MySMC </b>
                  &nbsp;
                  <span
                    style={{
                      backgroundColor: "#148C8A",
                      color: "white",
                      borderRadius: "5px",
                      fontSize: "14px",
                      padding: "2px",
                    }}
                  >
                    Criticité : Haute
                  </span>
                  <h6 style={{ color: "#ea7714", fontSize: "12px" }}>
                    2021-12-28 22:35:37, admin
                  </h6>
                  <i>
                    La release 3.2 a été déployé. Merci de remonter tous les
                    dysfonctionnements notés à l'équipe des intégrateurs. Merci
                  </i>
                </TimelineContent>
              </TimelineItem> */}
            </Timeline>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default HomeSmc;
