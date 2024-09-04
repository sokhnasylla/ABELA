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
import { useNavigate } from "react-router-dom";

function GestionIncident() {
  useAuth();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [notOpenAvis, setNotOpenAvis] = useState([]);
  const [openAvis, setOpenAvis] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [histo, setHisto] = useState("Aucune recherche récente.");
  const [etat, setEtat] = useState("");
  const navigate = useNavigate();

  const [dataUrl, setDataUrl] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayTarget, setOverlayTarget] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageNotOpen, setCurrentPageNotOpen] = useState(1);
  const [itemsPerPageOpen, setItemsPerPageOpen] = useState(10);
  const [itemsPerPageNotOpen, setItemsPerPageNotOpen] = useState(10);

  const handleItemsChangeOpen = (event) => {
    setItemsPerPageOpen(Number(event.target.value));
  };
  const handleItemsChangeNotOpen = (event) => {
    setItemsPerPageNotOpen(Number(event.target.value));
  };

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingNotOpen, setIsLoadingNotOpen] = useState(true);

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
  const token = getTokenFromLocalStorage();
  const [error, setError] = useState(null);

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
        setIsLoading(false);
        setIsLoadingNotOpen(false);
      } catch (error) {
        setError(`Erreur: ${error.message}`);
      }
    };

    fetchData(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents",
      setData
    );
    fetchData(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/encours",
      setOpenAvis
    );
    fetchData(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/clos/ferme/annule",
      setNotOpenAvis
    );
  }, [token]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleAddShow = () => setShowAddModal(true);
  const handleAddClose = () => setShowAddModal(false);

  const handleShowDetails = (avis) => {
    console.log(`Avis with id ${avis.id} was double-clicked`);
    navigate(`/mysmc/gestionincident/details/${avis.id}`, { state: { avis } });
  };

  const indexOfLastItem = currentPage * itemsPerPageOpen;
  const indexOfFirstItem = indexOfLastItem - itemsPerPageOpen;
  const currentItems = openAvis.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(openAvis.length / itemsPerPageOpen);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItemNotOpen = currentPageNotOpen * itemsPerPageNotOpen;
  const indexOfFirstItemNotOpen = indexOfLastItemNotOpen - itemsPerPageNotOpen;
  const currentItemsNotOpen = notOpenAvis.slice(
    indexOfFirstItemNotOpen,
    indexOfLastItemNotOpen
  );
  const totalPagesNotOpen = Math.ceil(notOpenAvis.length / itemsPerPageNotOpen);

  const handlePageChangeNotOpen = (pageNumber) =>
    setCurrentPageNotOpen(pageNumber);

  return (
    <div>
      <MenuMysmc />
      <Container className="body" style={{ marginLeft: "5%" }}>
        <Col sm={12} className="content">
          <Row sm={7}>
            <div className="d-flex justify-content-between">
              <div className="d-flex justify-content-between">
                <Button variant="secondary">Exporter Reporting incident</Button>
                &nbsp;
                <Button variant="secondary">
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
          </Row>
          <Row className="mt-3">
            <Title
              text={`Liste des avis d'incident / d'information en cours (${openAvis.length})`}
            />
          </Row>

          <Row sm={12}>
            <Col sm={12} className="content">
              <div className="mt-2 d-flex justify-content-between align-items-center">
                <div>
                  <label htmlFor="items">Afficher </label> &nbsp;
                  <select
                    id="items"
                    name="items"
                    value={itemsPerPageOpen}
                    onChange={handleItemsChangeOpen}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </select>
                  &nbsp;
                  <label>éléments</label>
                </div>
              </div>
            </Col>
          </Row>
          {isLoading ? (
            <div className="d-flex justify-content-center align-item-center mt-2">
              Chargement...
              <div
                className="spinner-border text-center"
                style={{ color: "#148C8A" }}
              ></div>
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
                        ? new Date(item.dateCreation).toLocaleDateString(
                            "fr-FR"
                          )
                        : "N/A"}
                    </td>
                    <td>{item.numAvis}</td>
                    <td>{item.titre}</td>
                    {item.etat == "ENCOURS" && <td>En Cours</td>}
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
              <Pagination.Item
                onClick={() => handlePageChange(currentPage - 2)}
              >
                {currentPage - 2}
              </Pagination.Item>
            )}
            {currentPage > 2 && (
              <Pagination.Item
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {currentPage - 1}
              </Pagination.Item>
            )}

            {currentPage !== 1 && currentPage !== totalPages && (
              <Pagination.Item active>{currentPage}</Pagination.Item>
            )}

            {currentPage < totalPages - 1 && (
              <Pagination.Item
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {currentPage + 1}
              </Pagination.Item>
            )}
            {currentPage < totalPages - 2 && (
              <Pagination.Item
                onClick={() => handlePageChange(currentPage + 2)}
              >
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
          <Row className="mt-3">
            {etat === "Annulé" && (
              <Title
                text={`Liste des avis d'incident / d'information annulés (${filteredData.length})`}
              />
            )}
            {etat === "Cloturé" && (
              <Title
                text={`Liste des avis d'incident / d'information clôturés (${filteredData.length})`}
              />
            )}
            {etat === "Fermé" && (
              <Title
                text={`Liste des avis d'incident / d'information fermés (${filteredData.length})`}
              />
            )}
            {etat === "Encours" && (
              <Title
                text={`Liste des avis d'incident / d'information en cours (${filteredData.length})`}
              />
            )}
            {etat !== "Annulé" &&
              etat !== "Cloturé" &&
              etat !== "Fermé" &&
              etat != "Encours" && (
                <Title
                  text={`Liste des avis d'incidents / d'information (${notOpenAvis.length})`}
                />
              )}
          </Row>
          <Row sm={12}>
            <Col sm={12} className="content">
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
              <div className="mt-2 d-flex justify-content-between align-items-center">
                <div>
                  {/* Un label affichant "Nombre d'items" suivi d'un select qui permet de choisir le nombre d'items */}
                  <label htmlFor="items">Afficher </label> &nbsp;
                  <select
                    id="items"
                    name="items"
                    value={itemsPerPageNotOpen}
                    onChange={handleItemsChangeNotOpen}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </select>
                  &nbsp;
                  <label>éléments</label>
                </div>

                <div className="d-flex align-items-center">
                  <span
                    style={{
                      fontSize: "14px",
                      fontFamily: "inherit",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    <button onClick={handleShow} className="btn btn-primary">
                      Recherche
                    </button>
                  </span>

                  {histo === "Aucune recherche récente." ? (
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
                      <span>Aucune recherche récente.</span>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center">
                      <span
                        style={{
                          fontSize: "14px",
                          fontFamily: "inherit",
                          fontWeight: "500",
                          textAlign: "center",
                        }}
                      >
                        <button
                          onClick={reinitHisto}
                          className="btn btn-danger pl-3"
                          style={{ marginRight: "10px" }} // Space between history and button
                        >
                          Supprimer filtre
                        </button>
                      </span>
                      <div
                        className="alert alert-info d-flex align-items-center"
                        style={{
                          fontSize: "14px",
                          fontFamily: "inherit",
                          fontWeight: "500",
                          color: "#31708F",
                          textAlign: "center",
                        }}
                      >
                        {histo}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
          {isLoadingNotOpen ? (
            <div className="d-flex justify-content-center align-item-center mt-2">
              Chargement...
              <div
                className="spinner-border text-center"
                style={{ color: "#148C8A" }}
              ></div>
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
                {currentItemsNotOpen.map((item) => (
                  <tr
                    key={item.id}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onDoubleClick={() => handleShowDetails(item)}
                  >
                    <td>
                      {item.dateCreation
                        ? new Date(item.dateCreation).toLocaleDateString(
                            "fr-FR"
                          )
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
              active={currentPageNotOpen === 1}
              onClick={() => handlePageChangeNotOpen(1)}
            >
              1
            </Pagination.Item>

            {currentPageNotOpen > 4 && <Pagination.Ellipsis />}

            {currentPageNotOpen > 3 && (
              <Pagination.Item
                onClick={() => handlePageChangeNotOpen(currentPageNotOpen - 2)}
              >
                {currentPageNotOpen - 2}
              </Pagination.Item>
            )}
            {currentPageNotOpen > 2 && (
              <Pagination.Item
                onClick={() => handlePageChangeNotOpen(currentPageNotOpen - 1)}
              >
                {currentPageNotOpen - 1}
              </Pagination.Item>
            )}

            {currentPageNotOpen !== 1 &&
              currentPageNotOpen !== totalPagesNotOpen && (
                <Pagination.Item active>{currentPageNotOpen}</Pagination.Item>
              )}

            {currentPageNotOpen < totalPagesNotOpen - 1 && (
              <Pagination.Item
                onClick={() => handlePageChangeNotOpen(currentPageNotOpen + 1)}
              >
                {currentPageNotOpen + 1}
              </Pagination.Item>
            )}
            {currentPageNotOpen < totalPagesNotOpen - 2 && (
              <Pagination.Item
                onClick={() => handlePageChangeNotOpen(currentPageNotOpen + 2)}
              >
                {currentPageNotOpen + 2}
              </Pagination.Item>
            )}

            {currentPageNotOpen < totalPagesNotOpen - 3 && (
              <Pagination.Ellipsis />
            )}

            {totalPagesNotOpen > 1 && (
              <Pagination.Item
                active={currentPageNotOpen === totalPagesNotOpen}
                onClick={() => handlePageChangeNotOpen(totalPagesNotOpen)}
              >
                {totalPagesNotOpen}
              </Pagination.Item>
            )}
          </Pagination>
        </Col>
        <Col>
          <StatistiqueIncident />
        </Col>
        {/* <Modal
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
        </Modal> */}
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
