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
  Alert,
  Tabs,
  Tab,
} from "react-bootstrap";
import MenuMysmc from "../Menu/MenuMysmc";
import "./StatistiqueIncident.css";
import Title from "../../../Card/Title/Title";
import React, { useEffect, useState } from "react";
import useAuth from "../../Auth/useAuth";
import { getTokenDecode, getTokenFromLocalStorage } from "../../Auth/authUtils";
import axios from "axios";
import RechercheAvis from "./RechercheAvis";
import RechercheAvisEnCours from "./RechercheAvisEnCours.jsx";
import AddIncident from "./AddIncident";
import addAvis from "../../../..//assets/addAvis.png";
import avisInactifs from "../../../..//assets/avisInactifs.png";
import avisActifs from "../../../..//assets/avisActifs.png";
import search from "../../../..//assets/search.png";
import statis from "../../../../assets/statis.png";
import StatistiqueIncident from "./StatistiqueIncident";
import { useNavigate } from "react-router-dom";
import { FaCog, FaPlus, FaSearch, FaSync, FaThumbsUp } from "react-icons/fa";

function GestionIncident() {
  useAuth();
  const [notOpenAvis, setNotOpenAvis] = useState([]);
  const [openAvis, setOpenAvis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingNotOpen, setIsLoadingNotOpen] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContenu] = useState("");
  const [operationType, setOperationType] = useState("");
  const [size, setSize] = useState("");
  const [selectedAvis, setSelectedAvis] = useState(false);
  const [histo, setHisto] = useState("Aucune recherche récente.");
  const [histoOpen, setHistoOpen] = useState("Aucune recherche récente.");
  const [etatOpen, setEtatOpen] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalPagesNotOpen, setTotalPagesNotOpen] = useState(1);
  const [totalElementsOpen, setTotalElementsOpen] = useState(0);
  const [totalElementsNotOpen, setTotalElementsNotOpen] = useState(0);
  const [etat, setEtat] = useState("");
  const navigate = useNavigate();
  const token = getTokenFromLocalStorage();
  const user = getTokenDecode().sub;
  const [searchParams, setSearchParams] = useState(null);
  const [searchParamsNotOpen, setSearchParamsNotOpen] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayTarget, setOverlayTarget] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageOpen, setItemsPerPageOpen] = useState(10);
  const [currentPageNotOpen, setCurrentPageNotOpen] = useState(1);
  const [itemsPerPageNotOpen, setItemsPerPageNotOpen] = useState(10);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    objet: "",
    nature: "",
    applicationSis: [],
    typeAvisIncident: { id: "" },
    listeValidation: { id: "" },
    listeDiffusion: { id: "" },
    typeCauseIncident: { id: "" },
    dateDebut: "",
    dateDetection: "",
    numTicketEZV: "",
    numTicketOceane: "",
    impact: "",
    causeRetardNotification: "",
    causeProbable: "",
    observations: "",
    user: user,
  });

  const dataUrlEnCours =
    "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/encours";
  const dataUrlNotOpen =
    "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/clos/ferme/annule";
  const [key, setKey] = useState("actifs");

  const handleItemsChangeOpen = (event) => {
    fetchDataOpen(
      `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/encours?page=1&limit=${event.target.value}`,
      setOpenAvis
    );
    setItemsPerPageOpen(Number(event.target.value));
  };

  const handleItemsChangeNotOpen = (event) => {
    fetchDataNotOpen(
      `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/clos/ferme/annule?page=1&limit=${event.target.value}`,
      setNotOpenAvis
    );
    setItemsPerPageNotOpen(Number(event.target.value));
  };

  const handleMouseEnter = (event, item) => {
    if (event.target.closest("td")?.classList.contains("text-center")) return;
    setOverlayTarget(event.target);
    setShowOverlay(true);
  };

  const handleMouseLeave = () => {
    setShowOverlay(false);
  };

  const handleSearchSubmitOpen = (url, histo, etat) => {
    fetchDataOpen(url, setOpenAvis);
    setShowModal(false);
    setHistoOpen(histo);
    setEtatOpen(etat);
    setSearchParams({ url, histo, etat });
  };

  const handleSearchSubmit = (url, histo, etat) => {
    fetchDataNotOpen(url, setNotOpenAvis);
    setShowModal(false);
    setHisto(histo);
    setEtat(etat);
    setSearchParamsNotOpen({ url, histo, etat });
  };

  const reinitHistoOpen = () => {
    setHistoOpen("Aucune recherche récente.");
    setEtatOpen("");
    fetchDataOpen(dataUrlEnCours, setOpenAvis);
  };

  const reinitHisto = () => {
    setHisto("Aucune recherche récente.");
    setEtat("");
    fetchDataNotOpen(dataUrlNotOpen, setNotOpenAvis);
    setShowModal(false);
  };

  const reouvertureAvis = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncident/reopen/${id}`,
        {},
        config
      );

      if (response.status !== 200) {
        throw new Error("Erreur lors de la reouverture");
      }
      setShowModal(false);
      localStorage.setItem("alertMessage", "Avis re-ouvert avec succès");
      localStorage.setItem("alertType", "success");
      window.location.reload();
      return response.data;
    } catch (err) {
      localStorage.setItem(
        "alertMessage",
        { err } || "Erreur lors de la reouverture"
      );
      localStorage.setItem("alertType", "danger");
    }
  };

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        [parentKey]: {
          ...prevState[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const message = localStorage.getItem("alertMessage");
    const type = localStorage.getItem("alertType");

    if (message) {
      setAlertMessage(message);
      setAlertType(type);
      setShowAlert(true);

      localStorage.removeItem("alertMessage");
      localStorage.removeItem("alertType");

      // Remove alert after 5 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => {
        clearTimeout();
      };
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents",
        formData,
        config
      );

      if (response.status === 200) {
        setShowModal(false);
        window.location.reload();
        localStorage.setItem("alertMessage", "Avis créé avec succès");
        localStorage.setItem("alertType", "success");
      } else {
        console.error("Erreur lors de la création de l'avis");
      }
    } catch (error) {
      console.error("Erreur lors de la requête", error);
      localStorage.setItem(
        "alertMessage",
        "Erreur lors de la création de l'avis"
      );
      localStorage.setItem("alertType", "danger");
    }
  };

  const fetchDataOpen = async (url, setter) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(url, config);
      setter(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalElementsOpen(response.data.totalElements);
      setIsLoading(false);
    } catch (error) {
      setError(`Erreur: ${error.message}`);
    }
  };

  const fetchDataNotOpen = async (url, setter) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(url, config);
      setter(response.data.content);
      setTotalPagesNotOpen(response.data.totalPages);
      setTotalElementsNotOpen(response.data.totalElements);
      setIsLoadingNotOpen(false);
    } catch (error) {
      setError(`Erreur: ${error.message}`);
    }
  };

  //  eslint-disable
  useEffect(() => {
    fetchDataOpen(dataUrlEnCours, setOpenAvis);
    fetchDataNotOpen(dataUrlNotOpen, setNotOpenAvis);
  }, []);
  // eslint-enable

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleHideAddModal = () => {
    setShowAddModal(false);
  };

  const handleShowModal = (title, content, operationType, size, avis) => {
    setTitle(title);
    setContenu(content);
    setOperationType(operationType);
    setSize(size);
    setSelectedAvis(avis);
    setShowModal(true);
  };
  const handleHideModal = () => setShowModal(false);

  const handleShowDetails = (avis) => {
    navigate(`/mysmc/gestionincident/details/${avis.id}`, { state: { avis } });
  };

  const handlePageChange = (pageNumber) => {
    if (searchParams) {
      const updatedUrl = `${searchParams.url}&page=${pageNumber}&limit=${itemsPerPageOpen}`;

      fetchDataOpen(updatedUrl, setOpenAvis);
      setCurrentPage(pageNumber);
    } else {
      fetchDataOpen(
        `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/encours?page=${pageNumber}&limit=${itemsPerPageOpen}`,
        setOpenAvis
      );
      setCurrentPage(pageNumber);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPageOpen;
  const indexOfFirstItem = indexOfLastItem - itemsPerPageOpen;

  const handlePageChangeNotOpen = (pageNumber) => {
    if (searchParamsNotOpen) {
      const updatedUrl = `${searchParamsNotOpen.url}&page=${pageNumber}&limit=${itemsPerPageOpen}`;

      fetchDataNotOpen(updatedUrl, setNotOpenAvis);
      setCurrentPageNotOpen(pageNumber);
    } else {
      fetchDataNotOpen(
        `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/clos/ferme/annule?page=${pageNumber}&limit=${itemsPerPageNotOpen}`,
        setNotOpenAvis
      );
      setCurrentPageNotOpen(pageNumber);
    }
  };

  const indexOfLastItemNotOpen = currentPageNotOpen * itemsPerPageNotOpen;
  const indexOfFirstItemNotOpen = indexOfLastItemNotOpen - itemsPerPageNotOpen;

  return (
    <div>
      <style>{`
        body {
          font-size: 12px; 
          font-family: Arial, sans-serif; 
        }

        .Button {
          font-size: 12px; 
          font-family: Arial, sans-serif; 
        }

        .table, .content {
          margin-bottom: 10px; 
        }
        
        .table th, .table td {
          padding: 8px;
        }

        .table-hover tbody tr:hover {
          background-color: #f1f1f1; /* Surlignage léger sur le hover */
        }

        .pagination {
          margin-top: 10px;
        }

       
        .modal-content {
          font-size: 12px;
        }

        .content {
          padding: 10px;
        }
        .nav-link.active {
         color: black !important;
         background-color: orange !important;
        }

        .nav-link {
          color: white !important;
          background-color: #009999 !important;
        }

      `}</style>
      <MenuMysmc />
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
      <Container className="body">
        <div className="d-flex justify-content-end align-items-center">
          <img
            height="40"
            width="40"
            style={{ cursor: "pointer" }}
            src={addAvis}
            alt=""
            onClick={handleShowAddModal}
          />

          {/* <Button className="Button" variant="primary" onClick={handleReOpen}>
  <FaPlus /> &nbsp; Reopen
  </Button> */}
        </div>

        <Tabs
          id="incident-switcher"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab
            eventKey="actifs"
            title={
              <>
                <img height="30" width="30" src={avisActifs} alt="" />
                <br />
                Avis Actifs
              </>
            }
          >
            <Row className="mt-3">
              <Title
                text={`Liste des avis d'incident / d'information en cours (${openAvis.length})`}
              />
            </Row>

            <Row>
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
                      <option value="40">40</option>
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
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          handleShowModal(
                            "Recherche d'avis en cours",
                            <RechercheAvisEnCours
                              onSearch={handleSearchSubmitOpen}
                            />,
                            "Recherche",
                            "md"
                          )
                        }
                      >
                        <FaSearch />
                      </button>
                    </span>
                    &nbsp;
                    {histoOpen === "Aucune recherche récente." ? (
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
                        <span>{histoOpen}</span>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center">
                        <div>
                          <span
                            style={{
                              fontSize: "14px",
                              fontFamily: "inherit",
                              fontWeight: "500",
                              textAlign: "center",
                            }}
                          >
                            <button
                              onClick={reinitHistoOpen}
                              className="btn btn-danger pl-3"
                              style={{ marginRight: "10px" }} // Space between history and button
                            >
                              &times;
                            </button>
                          </span>
                        </div>
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
                          {histoOpen}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {isLoading ? (
                  <div className="d-flex justify-content-center align-item-center mt-2">
                    Chargement des données... &nbsp;
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
                      {openAvis.map((item) => (
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
                          {item.etat === "ENCOURS" ? (
                            <td>En Cours</td>
                          ) : item.etat === "REOPEN" ? (
                            <td>ReOpen</td>
                          ) : (
                            <td>{item.etat}</td>
                          )}
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
                  modifiers={[
                    {
                      name: "preventOverflow",
                      options: {
                        boundary: "window", // Ensure it stays within the window
                      },
                    },
                    {
                      name: "offset",
                      options: {
                        offset: [0, 10], // Adjust the offset to position the tooltip
                      },
                    },
                  ]}
                >
                  {(props) => (
                    <Tooltip id="overlay-tooltip" {...props}>
                      Double-cliquez pour voir les détails
                    </Tooltip>
                  )}
                </Overlay>
                <div>
                  <div>
                    {totalElementsOpen === 0 ? (
                      <span>Aucun élément à afficher</span>
                    ) : totalElementsOpen < 10 ? (
                      <span>
                        Affichage de l'élément 1 à {totalElementsOpen} sur{" "}
                        {totalElementsOpen} éléments
                      </span>
                    ) : indexOfFirstItem === 0 ? (
                      <span>
                        Affichage de l'élément 1 à {itemsPerPageOpen} sur{" "}
                        {totalElementsOpen} éléments
                      </span>
                    ) : indexOfLastItem >= totalElementsOpen ? (
                      <span>
                        Affichage de l'élément {indexOfFirstItem + 1} à{" "}
                        {totalElementsOpen} sur {totalElementsOpen} éléments
                      </span>
                    ) : itemsPerPageOpen >= totalElementsOpen ? (
                      <span>
                        Affichage de l'élément {indexOfFirstItem + 1} à{" "}
                        {totalElementsOpen} sur {totalElementsOpen} éléments
                      </span>
                    ) : (
                      <span>
                        Affichage de l'élément {indexOfFirstItem + 1} à{" "}
                        {indexOfLastItem} sur {totalElementsOpen} éléments
                      </span>
                    )}
                  </div>
                  <div>
                    <Pagination className="d-flex justify-content-center mt-4">
                      {currentPage > 1 && (
                        <Pagination.Prev
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
                          Précédent
                        </Pagination.Prev>
                      )}
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
                      {currentPage < totalPages && (
                        <Pagination.Next
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
                          Suivant
                        </Pagination.Next>
                      )}
                    </Pagination>
                  </div>
                </div>
              </Col>
            </Row>
          </Tab>
          <Tab
            eventKey="inactifs"
            title={
              <>
                <img height="30" width="30" src={avisInactifs} alt="" />
                <br />
                Avis Inactifs
              </>
            }
          >
            <Row className="mt-3">
              <Title
                text={`Liste des avis fermés, clotûrés ou annulés (${notOpenAvis.length})`}
              />
            </Row>
            <Row sm={12}>
              <Col sm={12} className="content">
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
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
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
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          handleShowModal(
                            "Recherche d'avis fermés, clôturés ou annulés",
                            <RechercheAvis onSearch={handleSearchSubmit} />,
                            "Recherche",
                            "md"
                          )
                        }
                      >
                        <FaSearch />
                      </button>
                    </span>
                    &nbsp;
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
                        <div>
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
                              style={{ marginRight: "10px" }}
                            >
                              &times;
                            </button>
                          </span>
                        </div>
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
                          {histo}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {isLoadingNotOpen ? (
                  <div className="d-flex justify-content-center align-item-center mt-2">
                    Chargement des données... &nbsp;
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
                      {notOpenAvis.map((item) => (
                        <tr
                          key={item.id}
                          onMouseEnter={(e) => handleMouseEnter(e, item)}
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
                          <td>
                            {(item.etat === "FERME" && "Fermé") ||
                              (item.etat === "Annule" && "Annulé") ||
                              (item.etat === "CLOTURE" && "Clôturé") ||
                              item.etat}
                          </td>
                          <td className="text-center">
                            {(item.etat === "FERME" && (
                              <div className="text-center d-flex align-items-center justify-content-center">
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip id="tooltip-2">
                                      Reouverture de l'avis
                                    </Tooltip>
                                  }
                                >
                                  <button
                                    className="btn d-flex align-items-center"
                                    style={{
                                      backgroundColor: "#d74f4a",
                                    }}
                                    onClick={() =>
                                      handleShowModal(
                                        "Reouverture",
                                        <p>
                                          Etes vous sûr de vouloir re-ouvrir
                                          l'avis avec l'id{" "}
                                          <strong className="text-danger">
                                            {item.id}
                                          </strong>{" "}
                                          ?
                                        </p>,
                                        "Reouverture",
                                        "lg",
                                        item
                                      )
                                    }
                                  >
                                    <FaSync />
                                  </button>
                                </OverlayTrigger>
                                &nbsp;
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip id="tooltip-2">
                                      Ajouter un P.A
                                    </Tooltip>
                                  }
                                >
                                  <button
                                    className="btn d-flex align-items-center"
                                    style={{
                                      backgroundColor: "#5ab65a",
                                    }}
                                    onClick={() =>
                                      handleShowModal(
                                        "Ajouter un P.A",
                                        <p>message</p>,
                                        "AjouterPA",
                                        "lg"
                                      )
                                    }
                                  >
                                    <FaCog />
                                  </button>
                                </OverlayTrigger>
                              </div>
                            )) ||
                              (item.etat === "CLOTURE" && (
                                <FaThumbsUp color="green" size={25} />
                              )) ||
                              ((item.etat === "Annulé" ||
                                item.etat === "Annule") && <span>&nbsp;</span>)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <div>
                  <div>
                    {totalElementsNotOpen === 0 ? (
                      <span>Aucun élément à afficher</span>
                    ) : indexOfFirstItemNotOpen === 0 ? (
                      <span>
                        Affichage de l'élément 1 à {itemsPerPageNotOpen} sur{" "}
                        {totalElementsNotOpen} éléments
                      </span>
                    ) : indexOfLastItemNotOpen >= totalElementsNotOpen ? (
                      <span>
                        Affichage de l'élément {indexOfFirstItemNotOpen + 1} à{" "}
                        {totalElementsNotOpen} sur {totalElementsNotOpen}{" "}
                        éléments
                      </span>
                    ) : itemsPerPageNotOpen >= totalElementsNotOpen ? (
                      <span>
                        Affichage de l'élément {indexOfFirstItemNotOpen + 1} à{" "}
                        {totalElementsNotOpen} sur {totalElementsNotOpen}{" "}
                        éléments
                      </span>
                    ) : (
                      <span>
                        Affichage de l'élément {indexOfFirstItemNotOpen + 1} à{" "}
                        {indexOfLastItemNotOpen} sur {totalElementsNotOpen}{" "}
                        éléments
                      </span>
                    )}
                  </div>
                  <div>
                    <Pagination className="d-flex justify-content-center mt-4">
                      {currentPageNotOpen > 1 && (
                        <Pagination.Prev
                          onClick={() =>
                            handlePageChangeNotOpen(currentPageNotOpen - 1)
                          }
                        >
                          Précédent
                        </Pagination.Prev>
                      )}

                      <Pagination.Item
                        active={currentPageNotOpen === 1}
                        onClick={() => handlePageChangeNotOpen(1)}
                      >
                        1
                      </Pagination.Item>

                      {currentPageNotOpen > 4 && <Pagination.Ellipsis />}

                      {currentPageNotOpen > 3 && (
                        <Pagination.Item
                          onClick={() =>
                            handlePageChangeNotOpen(currentPageNotOpen - 2)
                          }
                        >
                          {currentPageNotOpen - 2}
                        </Pagination.Item>
                      )}
                      {currentPageNotOpen > 2 && (
                        <Pagination.Item
                          onClick={() =>
                            handlePageChangeNotOpen(currentPageNotOpen - 1)
                          }
                        >
                          {currentPageNotOpen - 1}
                        </Pagination.Item>
                      )}

                      {currentPageNotOpen !== 1 &&
                        currentPageNotOpen !== totalPagesNotOpen && (
                          <Pagination.Item active>
                            {currentPageNotOpen}
                          </Pagination.Item>
                        )}

                      {currentPageNotOpen < totalPagesNotOpen - 1 && (
                        <Pagination.Item
                          onClick={() =>
                            handlePageChangeNotOpen(currentPageNotOpen + 1)
                          }
                        >
                          {currentPageNotOpen + 1}
                        </Pagination.Item>
                      )}
                      {currentPageNotOpen < totalPagesNotOpen - 2 && (
                        <Pagination.Item
                          onClick={() =>
                            handlePageChangeNotOpen(currentPageNotOpen + 2)
                          }
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
                          onClick={() =>
                            handlePageChangeNotOpen(totalPagesNotOpen)
                          }
                        >
                          {totalPagesNotOpen}
                        </Pagination.Item>
                      )}
                      {currentPageNotOpen < totalPagesNotOpen && (
                        <Pagination.Next
                          onClick={() =>
                            handlePageChangeNotOpen(currentPageNotOpen + 1)
                          }
                        >
                          Suivant
                        </Pagination.Next>
                      )}
                    </Pagination>
                  </div>
                </div>
              </Col>
            </Row>
          </Tab>
          <Tab
            eventKey="stats"
            title={
              <>
                <img height="30" width="30" src={statis} alt="" />
                <br />
                Statistique Avis
              </>
            }
          >
            <Col>
              <StatistiqueIncident />
            </Col>
          </Tab>
          <Tab
            eventKey="search"
            title={
              <>
                <img
                  height="30"
                  width="30"
                  src={search}
                  alt=""
                  onClick={() =>
                    handleShowModal(
                      "Recherche",
                      <RechercheAvis />,
                      "Recherche",
                      "md"
                    )
                  }
                />
                <br />
                Recherche avancée
              </>
            }
          >
            <Row sm={7}>
              <Col sm={12} className="content">
                <div className="d-flex justify-content-between">
                  <div className="d-flex justify-content-between">
                    <Button className="Button" variant="secondary">
                      Exporter Reporting incident
                    </Button>
                    &nbsp;
                    <Button className="Button" variant="secondary">
                      Exporter Plan d'action incident
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mt-3">
              <Title
                text={`Liste des avis fermés, clotûrés ou annulés (${notOpenAvis.length})`}
              />
            </Row>
            <Row sm={12}>
              <Col sm={12} className="content">
                <Modal
                  show={showModal}
                  onHide={handleHideModal}
                  dialogClassName="custom-modal"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Recherche d'avis</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <RechercheAvis onSearch={handleSearchSubmit} />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      className="Button"
                      variant="danger"
                      onClick={handleHideModal}
                    >
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
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
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
                      <button
                        onClick={() =>
                          handleShowModal(
                            "Recherche d'avis fermés, clôturés ou annulés",
                            <RechercheAvis onSearch={handleSearchSubmit} />,
                            "Recherche",
                            "md"
                          )
                        }
                        className="btn btn-primary"
                      >
                        <FaSearch />
                      </button>
                    </span>

                    {histo === "Aucune recherche récente" ? (
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
                        {histo}
                      </div>
                    ) : (
                      <div className="d-flex align-items-center">
                        <div>
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
                              &times;
                            </button>
                          </span>
                        </div>
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
                          {histo}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {isLoadingNotOpen ? (
                  <div className="d-flex justify-content-center align-item-center mt-2">
                    Chargement des données...
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
                      {notOpenAvis.map((item) => (
                        <tr
                          key={item.id}
                          onMouseEnter={(e) => handleMouseEnter(e, item)}
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
                          <td>
                            {(item.etat === "FERME" && "Fermé") ||
                              ((item.etat === "Annule" ||
                                item.etat === "Annulé ") &&
                                "Annulé") ||
                              item.etat}
                          </td>
                          <td className="text-center">
                            {(item.etat === "FERME" && (
                              <div className="">
                                <div className="text-center d-flex align-items-center justify-content-center">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip id="tooltip-2">
                                        Reouverture de l'avis
                                      </Tooltip>
                                    }
                                  >
                                    <Button
                                      className="Button"
                                      style={{
                                        backgroundColor: "#d74f4a",
                                      }}
                                      onClick={() =>
                                        handleShowModal(
                                          "Reouverture",
                                          <p>
                                            Etes vous sûr de vouloir re-ouvrir
                                            l'avis avec l'id{" "}
                                            <strong className="text-danger">
                                              {item.id}
                                            </strong>{" "}
                                            ?
                                          </p>,
                                          "Reouverture",
                                          "lg",
                                          item
                                        )
                                      }
                                    >
                                      <FaSync />
                                    </Button>
                                  </OverlayTrigger>
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
                                      className="Button"
                                      style={{
                                        backgroundColor: "#5ab65a",
                                      }}
                                    >
                                      <FaCog />
                                    </Button>
                                  </OverlayTrigger>
                                </div>
                              </div>
                            )) ||
                              (item.etat === "Cloturé" && (
                                <FaThumbsUp color="green" size={25} />
                              )) ||
                              ((item.etat === "Annulé" ||
                                item.etat === "Annule") && <span>&nbsp;</span>)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <div>
                  <div>
                    {notOpenAvis.length === 0 ? (
                      <span>Aucun élément à afficher</span>
                    ) : indexOfFirstItemNotOpen === 0 ? (
                      <span>
                        Affichage de l'élément 1 à {itemsPerPageNotOpen} sur{" "}
                        {notOpenAvis.length} éléments
                      </span>
                    ) : indexOfLastItemNotOpen >= notOpenAvis.length ? (
                      <span>
                        Affichage de l'élément {indexOfFirstItemNotOpen + 1} à{" "}
                        {notOpenAvis.length} sur {notOpenAvis.length} éléments
                      </span>
                    ) : (
                      <span>
                        Affichage de l'élément {indexOfFirstItemNotOpen + 1} à{" "}
                        {indexOfLastItemNotOpen} sur {notOpenAvis.length}{" "}
                        éléments
                      </span>
                    )}
                  </div>
                  <div>
                    <Pagination className="d-flex justify-content-center mt-4">
                      {currentPageNotOpen > 1 && (
                        <Pagination.Prev
                          onClick={() =>
                            handlePageChangeNotOpen(currentPageNotOpen - 1)
                          }
                        >
                          Précédent
                        </Pagination.Prev>
                      )}

                      <Pagination.Item
                        active={currentPageNotOpen === 1}
                        onClick={() => handlePageChangeNotOpen(1)}
                      >
                        1
                      </Pagination.Item>

                      {currentPageNotOpen > 4 && <Pagination.Ellipsis />}

                      {currentPageNotOpen > 3 && (
                        <Pagination.Item
                          onClick={() =>
                            handlePageChangeNotOpen(currentPageNotOpen - 2)
                          }
                        >
                          {currentPageNotOpen - 2}
                        </Pagination.Item>
                      )}
                      {currentPageNotOpen > 2 && (
                        <Pagination.Item
                          onClick={() =>
                            handlePageChangeNotOpen(currentPageNotOpen - 1)
                          }
                        >
                          {currentPageNotOpen - 1}
                        </Pagination.Item>
                      )}

                      {currentPageNotOpen !== 1 &&
                        currentPageNotOpen !== totalPagesNotOpen && (
                          <Pagination.Item active>
                            {currentPageNotOpen}
                          </Pagination.Item>
                        )}

                      {currentPageNotOpen < totalPagesNotOpen - 1 && (
                        <Pagination.Item
                          onClick={() =>
                            handlePageChangeNotOpen(currentPageNotOpen + 1)
                          }
                        >
                          {currentPageNotOpen + 1}
                        </Pagination.Item>
                      )}
                      {currentPageNotOpen < totalPagesNotOpen - 2 && (
                        <Pagination.Item
                          onClick={() =>
                            handlePageChangeNotOpen(currentPageNotOpen + 2)
                          }
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
                          onClick={() =>
                            handlePageChangeNotOpen(totalPagesNotOpen)
                          }
                        >
                          {totalPagesNotOpen}
                        </Pagination.Item>
                      )}
                      {currentPageNotOpen < totalPagesNotOpen && (
                        <Pagination.Next
                          onClick={() =>
                            handlePageChangeNotOpen(currentPageNotOpen + 1)
                          }
                        >
                          Suivant
                        </Pagination.Next>
                      )}
                    </Pagination>
                  </div>
                </div>
              </Col>
            </Row>
          </Tab>
        </Tabs>

        <Modal
          show={showModal}
          onHide={handleHideModal}
          dialogClassName="custom-modal"
          size={size}
          style={{ width: "100%", textAlign: "" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ textAlign: "center" }}>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{content}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleHideModal}>
              Fermer
            </Button>
            {operationType === "Reouverture" && (
              <Button
                variant="primary"
                onClick={() => reouvertureAvis(selectedAvis.id)}
              >
                Reouvrir
              </Button>
            )}
            {operationType === "AjouterPA" && (
              <Button variant="primary">Ajouter P.A</Button>
            )}
          </Modal.Footer>
        </Modal>
        <Modal
          show={showAddModal}
          onHide={handleHideAddModal}
          dialogClassName="custom-modal"
          size="xl"
          style={{ width: "100%", textAlign: "" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ textAlign: "center" }}>
              Ajouter un avis
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddIncident formData={formData} handleChange={handleChange} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleHideAddModal}>
              Fermer
            </Button>
            <Button variant="primary" onClick={() => handleSubmit()}>
              Ajouter
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default GestionIncident;
