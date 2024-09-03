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
import "./StatistiqueIncident.css";
import Title from "../../../Card/Title/Title";
import React, { useEffect, useState } from "react";
import useAuth from "../../Auth/useAuth";
import { getTokenFromLocalStorage } from "../../Auth/authUtils";
import axios from "axios";
import RechercheAvis from "./RechercheAvis";
import DetailsIncident from "./DetailsIncident";
import AddIncident from "./AddIncident";
import StatistiqueIncident from "./StatistiqueIncident";

function GestionIncident() {
  useAuth();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [histo, setHisto] = useState("Aucune recherche récente.");
  const [etat, setEtat] = useState("");

  const getCurrentMonthAndYear = () => {
    const date = new Date();
    const mois = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
    console.log(histo);
    const moisActuel = mois[date.getMonth()];
    const anneeActuelle = date.getFullYear();
    return `${moisActuel} ${anneeActuelle}`;
  };
  const [dataUrl, setDataUrl] = useState(
    "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents"
  );
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayTarget, setOverlayTarget] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [isLoading, setIsLoading] = useState(true);

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
    setEtat("");
    setDataUrl(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents"
    );
    setShowModal(false);
  };
  const [selectedAvis, setSelectedAvis] = useState(null);
  const token = getTokenFromLocalStorage();
  const [error, setError] = useState(null);

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
        setIsLoading(false);
      } catch (error) {
        setError(`Erreur: ${error.message}`);
      }
    };

    fetchData();
  }, [dataUrl, token]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleAddShow = () => setShowAddModal(true);
  const handleAddClose = () => setShowAddModal(false);

  const handleShowDetails = (avis) => {
    console.log(`Avis with id ${avis.id} was double-clicked`);
    setShowDetailsModal(true);
    setSelectedAvis(avis);
  };
  const handleCloseDetails = () => setShowDetailsModal(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <MenuMysmc />
      <Container className="body" style={{ marginLeft: "5%" }}>
        <Col>
          <StatistiqueIncident />
        </Col>
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
            {histo === "Aucune recherche récente." && (
              <div>
                <Button variant="primary" onClick={handleShow} className="btn">
                  Recherche
                </Button>
                <div
                  className="alert alert-info mt-3 d-flex align-items-center"
                  style={{
                    fontSize: "14px",
                    fontFamily: "inherit",
                    fontWeight: "500",
                    color: "#31708F",
                    textAlign: "center",
                  }}
                >
                  Aucune recherche récente.
                </div>
              </div>
            )}

            {histo !== "Aucune recherche récente." && (
              <div>
                <div className="">
                <Button variant="primary" onClick={handleShow} className="btn">
                  Recherche
                </Button>
                  <Button
                    variant="danger"
                    onClick={reinitHisto}
                    className="btn pl-3"
                  >
                    Supprimer filtre
                  </Button>
                </div>
                
                <div
                  className="alert alert-info mt-3 d-flex align-items-center"
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
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <div>
            <Button variant="secondary" style={{ marginLeft: "10px" }}>
              Exporter Reporting incident
            </Button>
            <Button variant="secondary" style={{ marginLeft: "10px" }}>
              Exporter Plan d'action incident
            </Button>
          </div>
          <div>
            <Button variant="primary" onClick={handleAddShow}>
              Ajouter un avis
              <img src="../../../../assets/plus-symbole-noir.png" alt="" />
            </Button>
          </div>
        </div>

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
        {isLoading ? (
          <div className="d-flex justify-content-center align-item-center mt-2">
            Chargement...
            <div
              className="spinner-border text-center"
              style={{ color: "#148C8A" }}
            >
            </div>
          </div>
        ) : (
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
                  onDoubleClick={() => handleShowDetails(item)}
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
        )}
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
        <Pagination className="d-flex justify-content-center mt-4">
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
        <Modal
          show={showDetailsModal}
          onHide={handleCloseDetails}
          dialogClassName="custom-modal"
          size="xl"
          style={{ width: "100%", textAlign: "" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ textAlign: "center" }}>
              Details de l'avis
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DetailsIncident avis={selectedAvis} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseDetails}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showAddModal}
          onHide={handleAddClose}
          dialogClassName="custom-modal"
          size="xl"
          style={{ width: "100%", textAlign: "" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ textAlign: "center" }}>
              Ajouter un avis incident
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddIncident />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleAddClose}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default GestionIncident;
