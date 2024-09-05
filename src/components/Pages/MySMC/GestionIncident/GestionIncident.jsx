import {
  Button,
  Col,
  Container,
  Row,
  Modal,
  Pagination,
  Overlay,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import MenuMysmc from "../Menu/MenuMysmc";
import "./StatistiqueIncident.css";
import Title from "../../../Card/Title/Title";
import React, { useEffect, useState } from "react";
import useAuth from "../../Auth/useAuth";
import { getTokenFromLocalStorage } from "../../Auth/authUtils";
import axios from "axios";
import RechercheAvis from "./RechercheAvis";
import AddIncident from "./AddIncident";
import StatistiqueIncident from "./StatistiqueIncident";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPlus, FaSearch, FaThumbsUp } from "react-icons/fa";
import svgRefresh from "../../../../assets/refresh-ccw-alt-svgrepo-com.svg";

function GestionIncident() {
  useAuth();
  const [notOpenAvis, setNotOpenAvis] = useState([]);
  const [openAvis, setOpenAvis] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [histo, setHisto] = useState("Aucune recherche récente.");
  const [etat, setEtat] = useState("");
  const navigate = useNavigate();

  const [dataUrl, setDataUrl] = useState("");
  const [dataUrlEnCours, setDataUrlEnCours] = useState(
    "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/encours"
  );
  const [dataUrlNotOpen, setDataUrlNotOpen] = useState(
    "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/clos/ferme/annule"
  );
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
    setDataUrlNotOpen(url);
    console.log(`Data URL: ${url}`);
    setShowModal(false);
    setHisto(histo);
    setEtat(etat);
  };
  const reinitHisto = () => {
    setHisto("Aucune recherche récente.");
    setEtat("");
    setDataUrl(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/enCours"
    );
    setDataUrlNotOpen(
      "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/clos/ferme/annule"
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

    fetchData(dataUrlEnCours, setOpenAvis);
    fetchData(dataUrlNotOpen, setNotOpenAvis);
  }, [dataUrl, dataUrlNotOpen, token]);

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
              <div className="d-flex align-items-center">
                <Button variant="primary" onClick={handleAddShow}>
                  <FaPlus /> &nbsp; Ajouter un avis
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
                text={`Liste des avis d'incident / d'information annulés (${notOpenAvis.length})`}
              />
            )}
            {etat === "Cloturé" && (
              <Title
                text={`Liste des avis d'incident / d'information clôturés (${notOpenAvis.length})`}
              />
            )}
            {etat === "Fermé" && (
              <Title
                text={`Liste des avis d'incident / d'information fermés (${notOpenAvis.length})`}
              />
            )}
            {etat !== "Annulé" &&
              etat !== "Cloturé" &&
              etat !== "Fermé" &&
              etat != "Encours" && (
                <Title
                  text={`Liste des avis fermés, clotûrés ou annulés (${notOpenAvis.length})`}
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
                      <FaSearch />
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
                  <th style={{ textAlign: "center" }}>Actions</th>
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
                    <td className="text-center">
                      {(item.etat == "Fermé" && (
                        <>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-2">
                              Reouverture de l'avis
                            </Tooltip>
                          }
                        >
                          <Button
                            style={{
                              backgroundColor: "#d74f4a",
                              border: "#d74f4a",
                            }}
                          >
                            <svg
                              width={15}
                              height={15}
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3 12C3 16.9706 7.02944 21 12 21C14.3051 21 16.4077 20.1334 18 18.7083L21 16M21 12C21 7.02944 16.9706 3 12 3C9.69494 3 7.59227 3.86656 6 5.29168L3 8M21 21V16M21 16H16M3 3V8M3 8H8"
                                stroke="#000000"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </Button></OverlayTrigger>
                          &nbsp;
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="tooltip-2">
                                Ajouter un P.A
                              </Tooltip>
                            }
                          >
                            <Button
                              style={{
                                backgroundColor: "#5ab65a",
                                border: "#5ab65a",
                              }}
                            >
                              <svg
                                width={15}
                                height={15}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                  stroke="#000000"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M12.9046 3.06005C12.6988 3 12.4659 3 12 3C11.5341 3 11.3012 3 11.0954 3.06005C10.7942 3.14794 10.5281 3.32808 10.3346 3.57511C10.2024 3.74388 10.1159 3.96016 9.94291 4.39272C9.69419 5.01452 9.00393 5.33471 8.36857 5.123L7.79779 4.93281C7.3929 4.79785 7.19045 4.73036 6.99196 4.7188C6.70039 4.70181 6.4102 4.77032 6.15701 4.9159C5.98465 5.01501 5.83376 5.16591 5.53197 5.4677C5.21122 5.78845 5.05084 5.94882 4.94896 6.13189C4.79927 6.40084 4.73595 6.70934 4.76759 7.01551C4.78912 7.2239 4.87335 7.43449 5.04182 7.85566C5.30565 8.51523 5.05184 9.26878 4.44272 9.63433L4.16521 9.80087C3.74031 10.0558 3.52786 10.1833 3.37354 10.3588C3.23698 10.5141 3.13401 10.696 3.07109 10.893C3 11.1156 3 11.3658 3 11.8663C3 12.4589 3 12.7551 3.09462 13.0088C3.17823 13.2329 3.31422 13.4337 3.49124 13.5946C3.69158 13.7766 3.96395 13.8856 4.50866 14.1035C5.06534 14.3261 5.35196 14.9441 5.16236 15.5129L4.94721 16.1584C4.79819 16.6054 4.72367 16.829 4.7169 17.0486C4.70875 17.3127 4.77049 17.5742 4.89587 17.8067C5.00015 18.0002 5.16678 18.1668 5.5 18.5C5.83323 18.8332 5.99985 18.9998 6.19325 19.1041C6.4258 19.2295 6.68733 19.2913 6.9514 19.2831C7.17102 19.2763 7.39456 19.2018 7.84164 19.0528L8.36862 18.8771C9.00393 18.6654 9.6942 18.9855 9.94291 19.6073C10.1159 20.0398 10.2024 20.2561 10.3346 20.4249C10.5281 20.6719 10.7942 20.8521 11.0954 20.94C11.3012 21 11.5341 21 12 21C12.4659 21 12.6988 21 12.9046 20.94C13.2058 20.8521 13.4719 20.6719 13.6654 20.4249C13.7976 20.2561 13.8841 20.0398 14.0571 19.6073C14.3058 18.9855 14.9961 18.6654 15.6313 18.8773L16.1579 19.0529C16.605 19.2019 16.8286 19.2764 17.0482 19.2832C17.3123 19.2913 17.5738 19.2296 17.8063 19.1042C17.9997 18.9999 18.1664 18.8333 18.4996 18.5001C18.8328 18.1669 18.9994 18.0002 19.1037 17.8068C19.2291 17.5743 19.2908 17.3127 19.2827 17.0487C19.2759 16.8291 19.2014 16.6055 19.0524 16.1584L18.8374 15.5134C18.6477 14.9444 18.9344 14.3262 19.4913 14.1035C20.036 13.8856 20.3084 13.7766 20.5088 13.5946C20.6858 13.4337 20.8218 13.2329 20.9054 13.0088C21 12.7551 21 12.4589 21 11.8663C21 11.3658 21 11.1156 20.9289 10.893C20.866 10.696 20.763 10.5141 20.6265 10.3588C20.4721 10.1833 20.2597 10.0558 19.8348 9.80087L19.5569 9.63416C18.9478 9.26867 18.6939 8.51514 18.9578 7.85558C19.1262 7.43443 19.2105 7.22383 19.232 7.01543C19.2636 6.70926 19.2003 6.40077 19.0506 6.13181C18.9487 5.94875 18.7884 5.78837 18.4676 5.46762C18.1658 5.16584 18.0149 5.01494 17.8426 4.91583C17.5894 4.77024 17.2992 4.70174 17.0076 4.71872C16.8091 4.73029 16.6067 4.79777 16.2018 4.93273L15.6314 5.12287C14.9961 5.33464 14.3058 5.0145 14.0571 4.39272C13.8841 3.96016 13.7976 3.74388 13.6654 3.57511C13.4719 3.32808 13.2058 3.14794 12.9046 3.06005Z"
                                  stroke="#000000"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </Button>
                          </OverlayTrigger>
                        </>
                      )) ||
                        (item.etat == "Cloturé" && (
                          <FaThumbsUp color="green" />
                        )) ||
                        (item.etat == "Annulé" && (
                          <Button variant="primary">
                            <i class="fa fa-refresh" aria-hidden="true"></i>
                          </Button>
                        ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* <Overlay
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
          </Overlay> */}
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
