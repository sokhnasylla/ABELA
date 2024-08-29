<<<<<<< HEAD
import { Button, Col, Container, Row, Modal } from 'react-bootstrap';
import MenuMysmc from '../Menu/MenuMysmc';
import Get from '../../../API/Get';
import Title from '../../../Card/Title/Title';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import useAuth from '../../Auth/useAuth';
import { getTokenFromLocalStorage } from '../../Auth/authUtils';
import axios from 'axios';
import { Grid } from '@mui/material';
import RechercheAvis from './RechercheAvis';
import RechercheStatistiques from './RechercheStatistiques';
=======
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
>>>>>>> c2d66f3f3dd9d7e6e7c0de87062c68f3a3f37b04

function GestionIncident() {
  useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = React.useState("10");
  const [currentForm, setCurrentForm] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showStatModal, setShowStatModal] = useState(false);
  const [histo, setHisto] = useState("Aucune recherche récente.");
  const [dataUrl, setDataUrl] = useState(
    "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents"
  );

<<<<<<< HEAD
=======
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

>>>>>>> c2d66f3f3dd9d7e6e7c0de87062c68f3a3f37b04
  const handleSearchSubmit = (url, histo) => {
    setDataUrl(url);
    setShowModal(false);
    setHisto(histo);
  };
<<<<<<< HEAD

=======
  const reinitHisto = () => {
    setHisto("Aucune recherche récente.");
    setDataUrl(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents"
    );
    setShowModal(false);
  };
>>>>>>> c2d66f3f3dd9d7e6e7c0de87062c68f3a3f37b04
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
        // setFilteredData(response.data);
      } catch (error) {
        setError(`Erreur: ${error.message}`);
      }
    };

    fetchData();
  }, [token]);

  // Recuperation des données de dataUrl
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

  const CelluleAction = ({ id }) => (
    <div>
      <Link to={`/mysmc/gestionincident/details/${id}`}>
        <Button
          variant="info"
          style={{
            backgroundColor: "#31B0D5",
            padding: "1px 5px",
            lineHeight: "1.2",
            borderRadius: "3px",
          }}
          title="Voir les détails de l'avis"
        >
          <FaEye color="white" />
        </Button>
      </Link>
    </div>
  );

  const handleRowClick = (id) => {
    console.log(`Row with id ${id} was clicked`);
    navigate(`/mysmc/gestionincident/details/${id}`);
  };

  const columns = [
    {
      name: "Date Création",
      selector: (row) => row.dateCreation,
      sortable: true,
      cell: (row) =>
        row.dateCreation ? (
          <span>{new Date(row.dateCreation).toLocaleDateString("fr-FR")}</span>
        ) : (
          <span>N/A</span>
        ),
      wrap: true,
    },
    {
      name: "N°Avis",
      selector: (row) => row.numAvis,
      sortable: true,
      wrap: true,
    },
    { name: "Titre", selector: (row) => row.titre, sortable: true, wrap: true },
    { name: "Etat", selector: (row) => row.etat, sortable: true, wrap: true },
    {
      name: "Action",
      selector: "",
      sortable: true,
      cell: (row) => <CelluleAction id={row.id} />,
      wrap: true,
    },
  ];

<<<<<<< HEAD
  const handleShowSearchModal = () => setShowModal(true);
  const handleCloseSearchModal = () => setShowModal(false);
  const handleShowStatModal = () => setShowStatModal(true);
  const handleCloseStatModal = () => setShowStatModal(false);
  
=======
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

>>>>>>> c2d66f3f3dd9d7e6e7c0de87062c68f3a3f37b04
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
              <Button variant="primary" onClick={handleShowStatModal}>Stats</Button>
            </Grid>
          </Col>
        </Row>
        <Row>
<<<<<<< HEAD
          <Col sm={8} className='content'>
            <Button variant="primary" onClick={handleShowSearchModal}>Rechercher</Button>
            <Button variant="secondary" style={{ marginLeft: "10px" }}>Exporter Reporting incident</Button>
            <Button variant="secondary" style={{ marginLeft: "10px" }}>Exporter Plan d'action incident</Button>

            <Modal show={showModal} onHide={handleCloseSearchModal} dialogClassName="custom-modal">
=======
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
>>>>>>> c2d66f3f3dd9d7e6e7c0de87062c68f3a3f37b04
              <Modal.Header closeButton>
                <Modal.Title>Recherche d'avis</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <RechercheAvis onSearch={handleSearchSubmit} />
              </Modal.Body>
              <Modal.Footer>
<<<<<<< HEAD
                <Button variant="danger" onClick={handleCloseSearchModal}>Fermer</Button>
              </Modal.Footer>
            </Modal>

            <Modal show={showStatModal} onHide={handleCloseStatModal} dialogClassName="custom-modal">
              <Modal.Header closeButton>
                <Modal.Title>Statistiques</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <RechercheStatistiques onSearch={handleSearchSubmit} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleCloseStatModal}>Fermer</Button>
              </Modal.Footer>
            </Modal>

            <div className='col-12 alert alert-info' style={{ textAlign: "center", fontSize: "14px", fontFamily: "inherit", fontWeight: "500", color: "#31708F" }}>
              {histo}
=======
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
>>>>>>> c2d66f3f3dd9d7e6e7c0de87062c68f3a3f37b04
            </div>
          </Col>
        </Row>
        <Title text="Liste des avis d'incidents / d'information en cours" />
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
