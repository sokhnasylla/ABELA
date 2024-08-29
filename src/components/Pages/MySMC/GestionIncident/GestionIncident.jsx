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
import addAvis from "../../../../assets/ajouter.gif";

function GestionIncident() {
  useAuth();
  const [nombre, setNombre] = React.useState('10');
  const [currentForm, setCurrentForm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [histo, setHisto] = useState("Aucune recherche récente.");
  const [dataUrl, setDataUrl] = useState("http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents");

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

  const handleSearchSubmit = (url, histo) => {
    setDataUrl(url);
    setShowModal(false);
    setHisto(histo);
  };
  const reinitHisto = () => {
    setHisto("Aucune recherche récente.");
    setDataUrl(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents"
    );
    setShowModal(false);
  };
  const token = getTokenFromLocalStorage();
  const [data, setData] = useState([]);
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
        const response = await axios.get("http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/taux-notification", config);
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

  const CelluleAction = ({ id }) => (
    <div>
      <Link to={`/mysmc/gestionincident/details/${id}`}>
        <Button
          variant='info'
          style={{ backgroundColor: "#31B0D5", padding: "1px 5px", lineHeight: "1.2", borderRadius: "3px" }}
          title="Voir les détails de l'avis">
          <FaEye color='white' />
        </Button>
      </Link>
    </div>
  );

  const columns = [
    { name: 'Date Création',
      selector: row => row.dateCreation,
      sortable: true,
      cell: row => row.dateCreation ? <span>{new Date(row.dateCreation).toLocaleDateString('fr-FR')}</span> : <span>N/A</span> },
    { name: 'N°Avis', selector: row => row.numAvis, sortable: true },
    { name: 'Titre', selector: row => row.titre, sortable: true },
    { name: 'Etat', selector: row => row.etat, sortable: true },
    { name: 'Action', selector: '', sortable: true, cell: row => <CelluleAction id={row.id} /> },
  ];

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
      <Container className='body' style={{ marginLeft: "5%" }}>
        <Title text="Gestion des avis d'incidents - Indicateurs du mois en cours : Janvier 2024" />
        <Row className="mb-4">
          <Col xs={12} sm={6} md={3} className="d-flex justify-content-center mb-3">
            <Grid container direction="column" alignItems="center" style={{ backgroundColor: "#F2DEDE", border: "1px solid #F2DEDE", borderRadius: "10px", padding: "10px" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#a94442" }}>
                {tauxNotificationAvis !== null ? `${tauxNotificationAvis.toFixed(2)} %` : '0 %'}
              </div>
              <div>Notification Avis</div>
            </Grid>
          </Col>
          <Col xs={12} sm={6} md={3} className="d-flex justify-content-center mb-3">
            <Grid container direction="column" alignItems="center" style={{ backgroundColor: "#D9EDF7", border: "1px solid #D9EDF7", borderRadius: "10px", padding: "10px" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#31708F" }}>
                {tauxDetectionAvis !== null ? `${tauxDetectionAvis.toFixed(2)} %` : '0 %'}
              </div>
              <div>Détection Avis</div>
            </Grid>
          </Col>
          <Col xs={12} sm={6} md={3} className="d-flex justify-content-center mb-3">
            <Grid container direction="column" alignItems="center" style={{ backgroundColor: "#DFF0D8", border: "1px solid #DFF0D8", borderRadius: "10px", padding: "10px" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#3C763D" }}>
                {tauxTraitement4H !== null ? `${tauxTraitement4H.toFixed(2)} %` : '0 %'}
              </div>
              <div>Traitement 4H</div>
            </Grid>
          </Col>
          <Col xs={12} sm={6} md={3} className="d-flex justify-content-center mb-3">
            <Grid container direction="column" alignItems="center" style={{ backgroundColor: "#DFF0D8", border: "1px solid #DFF0D8", borderRadius: "10px", padding: "10px" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#3C763D" }}>
                {tauxTraitement24H !== null ? `${tauxTraitement24H.toFixed(2)} %` : '0 %'}
              </div>
              <div>Traitement 24H</div>
            </Grid>
          </Col>
        </Row>
        <Row>
          <Col sm={8} className="content">
            <Button variant="primary" onClick={handleShow}>
              Rechercher
            </Button>
            <Button variant="secondary" style={{ marginLeft: "10px" }}>
              Exporter Reporting incident
            </Button>
            <Button variant="secondary" style={{ marginLeft: "10px" }}>
              Exporter Plan d'action incident
            </Button>

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
            <div className="d-flex">
              <div
                className="col-12 mt-3 alert alert-info"
                style={{
                  textAlign: "center",
                  fontSize: "14px",
                  fontFamily: "inherit",
                  fontWeight: "500",
                  color: "#31708F",
                }}
              >
                {histo}
              </div>

              {histo !== "Aucune recherche récente." && (
                <div
                  className="mt-3 alert alert-danger"
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    fontWeight: "500",
                    color: "#31708F",
                  }}
                >
                  <button onClick={reinitHisto} className="btn">
                    &times;
                  </button>
                </div>
              )}
            </div>
          </Col>
        </Row>
        <Title text="Liste des avis d'incidents / d'information en cours" />
        <Row>
          <Col sm={8} className='content'>
            <Get url={dataUrl} columns={columns} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default GestionIncident;
