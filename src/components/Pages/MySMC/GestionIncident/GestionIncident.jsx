import {
  Button,
  Col,
  Container,
  Row,
  Modal,
  Pagination,
  Overlay,
  Tooltip,
} from "react-bootstrap";
import MenuMysmc from "../Menu/MenuMysmc";
import Get from "../../../API/Get";
import Title from "../../../Card/Title/Title";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../Auth/useAuth";
import { getTokenFromLocalStorage } from "../../Auth/authUtils";
import axios from "axios";
import { Grid } from "@mui/material";
import RechercheAvis from "./RechercheAvis";
import addAvis from "../../../../assets/search.png";

function GestionIncident() {
  useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = React.useState("10");
  const [currentForm, setCurrentForm] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [histo, setHisto] = useState("Aucune recherche récente.");
  const [etat, setEtat] = useState("");
  const [dataUrl, setDataUrl] = useState(
    "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents"
  );

  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayTarget, setOverlayTarget] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const handleMouseEnter = (event) => {
    setOverlayTarget(event.target);
    setShowOverlay(true);
  };

  const handleMouseLeave = () => {
    setShowOverlay(false);
  };

  const handleSearchSubmit = (url, histo, etat) => {
    setDataUrl(url);
    setShowModal(false);
    setHisto(histo);
    setEtat(etat);
  };
  const reinitHisto = () => {
    setHisto("Aucune recherche récente.");
    setEtat("")
    setDataUrl(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents"
    );
    setShowModal(false);
  };
  const token = getTokenFromLocalStorage();
  const [error, setError] = useState(null);
  const [tauxNotificationAvis, setTauxNotificationAvis] = useState(null);
  const [tauxDetectionAvis, setTauxDetectionAvis] = useState(null);
  const [tauxTraitement4H, setTauxTraitement4H] = useState(null);
  const [tauxTraitement24H, setTauxTraitement24H] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/taux-notification",
          config
        );
        setTauxNotificationAvis(response.data.tauxNotificationAvis);
        setTauxDetectionAvis(response.data.tauxDetectionAvis);
        setTauxTraitement4H(response.data.tauxTraitement4H);
        setTauxTraitement24H(response.data.tauxTraitement24H);
      } catch (error) {
        setError(`Erreur: ${error.message}`);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(dataUrl, config);
        setData(response.data);
        setFilteredData(response.data);
        console.log(response.data);
      } catch (error) {
        setError(`Erreur: ${error.message}`);
      }
    };

    fetchData();
  }, [dataUrl, token]);

  const handleRowClick = (id) => {
    console.log(`Row with id ${id} was clicked`);
    navigate(`/mysmc/gestionincident/details/${id}`);
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <MenuMysmc />
      <Container className="body" style={{ marginLeft: "5%" }}>
        <Title text="Gestion des avis d'incidents - Indicateurs du mois en cours : Janvier 2024" />
        <Row className="mb-4">
          <Col
            xs={12}
            sm={6}
            md={3}
            className="d-flex justify-content-center mb-3"
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              style={{
                backgroundColor: "#F2DEDE",
                border: "1px solid #F2DEDE",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#a94442",
                }}
              >
                {tauxNotificationAvis !== null
                  ? `${tauxNotificationAvis.toFixed(2)} %`
                  : "0 %"}
              </div>
              <div>Notification Avis</div>
            </Grid>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={3}
            className="d-flex justify-content-center mb-3"
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              style={{
                backgroundColor: "#D9EDF7",
                border: "1px solid #D9EDF7",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#31708F",
                }}
              >
                {tauxDetectionAvis !== null
                  ? `${tauxDetectionAvis.toFixed(2)} %`
                  : "0 %"}
              </div>
              <div>Détection Avis</div>
            </Grid>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={3}
            className="d-flex justify-content-center mb-3"
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              style={{
                backgroundColor: "#DFF0D8",
                border: "1px solid #DFF0D8",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#3C763D",
                }}
              >
                {tauxTraitement4H !== null
                  ? `${tauxTraitement4H.toFixed(2)} %`
                  : "0 %"}
              </div>
              <div>Traitement 4H</div>
            </Grid>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={3}
            className="d-flex justify-content-center mb-3"
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              style={{
                backgroundColor: "#DFF0D8",
                border: "1px solid #DFF0D8",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#3C763D",
                }}
              >
                {tauxTraitement24H !== null
                  ? `${tauxTraitement24H.toFixed(2)} %`
                  : "0 %"}
              </div>
              <div>Traitement 24H</div>
            </Grid>
          </Col>
        </Row>
        <Row>
          <Col sm={8} className="content">
            <Modal
              show={showModal}
              onHide={handleClose}
              dialogClassName="custom-modal"
            >
              <Modal.Header closeButton>
                <Modal.Title>Recherche d'avis</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <RechercheAvis onSearch={handleSearchSubmit} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Fermer
                </Button>
              </Modal.Footer>
            </Modal>
            <p >
              {histo === "Aucune recherche récente." && (
                <div >
                  <Button variant="primary" onClick={handleShow} className="btn">
                    Recherche
                  </Button>
                  <p className="alert alert-info mt-3 d-flex align-items-center"
                    style={{
                      fontSize: "14px",
                      fontFamily: "inherit",
                      fontWeight: "500",
                      color: "#31708F",
                      textAlign: "center",
                    }}
                  >
                    {/* Case avec le texte ou historique */}
                    Aucune recherche récente.
                  </p>
                </div>
              )}

              {histo !== "Aucune recherche récente." && (
                <div >
                  <Button variant="primary" onClick={handleShow} className="btn">
                    Recherche
                  </Button>
                  <Button variant="secondary" onClick={reinitHisto} className="btn">
                    Supprimer filtre
                  </Button>
                  <div className="alert alert-info mt-3 d-flex align-items-center"
                    style={{
                      fontSize: "14px",
                      fontFamily: "inherit",
                      fontWeight: "500",
                      color: "#31708F",
                      textAlign: "center",
                      marginRight: "10px", // Espacement entre la case d'historique et le bouton
                    }}
                  >
                    {histo}
                  </div>

                </div>
              )}
            </p>

          </Col>
        </Row>

        <Button variant="secondary" style={{ marginLeft: "10px" }}>
          Exporter Reporting incident
        </Button>
        <Button variant="secondary" style={{ marginLeft: "10px" }}>
          Exporter Plan d'action incident
        </Button>

        {etat === "Annulé" && (
          <Title text="Liste des avis d'incident / d'information annulés" />
        )}
        {etat === "Cloturé" && (
          <Title text="Liste des avis d'incident / d'information clôturés" />
        )}
        {etat === "Fermé" && (
          <Title text="Liste des avis d'incident / d'information fermés" />
        )}
        {etat !== "Annulé" && etat !== "Cloturé" && etat !== "Fermé" && (
          <Title text="Liste des avis d'incidents / d'information en cours" />
        )}

        {/* <Row>
          <Col sm={8} className="content">
            <Get url={dataUrl} columns={columns} />
          </Col>
        </Row> */}
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Date Création</th>
              <th>N°Avis</th>
              <th>Titre</th>
              <th>Etat</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr
                key={item.id}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onDoubleClick={() => handleRowClick(item.id)}
              >
                <td>
                  {item.dateCreation
                    ? new Date(item.dateCreation).toLocaleDateString("fr-FR")
                    : "N/A"}
                </td>
                <td>{item.numAvis}</td>
                <td>{item.titre}</td>
                <td>{item.etat}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Overlay
          show={showOverlay}
          target={overlayTarget}
          placement="top"
          containerPadding={20}
        >
          {(props) => (
            <Tooltip id="overlay-tooltip" {...props}>
              Double-cliquez pour voir les détails
            </Tooltip>
          )}
        </Overlay>
        <Pagination className="d-flex justify-content-center">
          <Pagination.Item
            active={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            1
          </Pagination.Item>

          {currentPage > 4 && <Pagination.Ellipsis />}

          {currentPage > 3 && (
            <Pagination.Item onClick={() => handlePageChange(currentPage - 2)}>
              {currentPage - 2}
            </Pagination.Item>
          )}
          {currentPage > 2 && (
            <Pagination.Item onClick={() => handlePageChange(currentPage - 1)}>
              {currentPage - 1}
            </Pagination.Item>
          )}

          {currentPage !== 1 && currentPage !== totalPages && (
            <Pagination.Item active>{currentPage}</Pagination.Item>
          )}

          {currentPage < totalPages - 1 && (
            <Pagination.Item onClick={() => handlePageChange(currentPage + 1)}>
              {currentPage + 1}
            </Pagination.Item>
          )}
          {currentPage < totalPages - 2 && (
            <Pagination.Item onClick={() => handlePageChange(currentPage + 2)}>
              {currentPage + 2}
            </Pagination.Item>
          )}

          {currentPage < totalPages - 3 && <Pagination.Ellipsis />}

          {totalPages > 1 && (
            <Pagination.Item
              active={currentPage === totalPages}
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </Pagination.Item>
          )}
        </Pagination>
      </Container>
    </div>
  );
}

export default GestionIncident;