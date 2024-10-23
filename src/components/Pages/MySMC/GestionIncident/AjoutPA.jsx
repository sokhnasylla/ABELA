import React, { useEffect, useState } from "react";
import MenuMysmc from "../Menu/MenuMysmc";
import DetailsIncident from "./DetailsIncident";
import { useLocation } from "react-router-dom";
import {
  Row,
  Container,
  Col,
  Button,
  Alert,
  Modal,
  Pagination,
} from "react-bootstrap";
import { FaList, FaMinus, FaPlus } from "react-icons/fa";
import { getTokenDecode, getTokenFromLocalStorage } from "../../Auth/authUtils";
import { abelaURL } from "../../../../config/global.constant";
import axios from "axios";
import { FaPencil } from "react-icons/fa6";

function AjoutPA() {
  const avis = JSON.parse(localStorage.getItem("avis"));
  const [planAction, setPlanAction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [alertMessage, setAlertMessage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [operationType, setOperationType] = useState("");
  const [size, setSize] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const token = getTokenFromLocalStorage();
  const location = useLocation();
  const user = getTokenDecode().sub;
  const [viewMode, setViewMode] = useState(false);
  const [rows, setRows] = useState([
    {
      intitule: "",
      createdBy: user,
      delai: "",
      commentaire: "",
      type: "",
      porteur: "",
      ticketSuper: "",
      avisIncident: { id: avis.id || null },
    },
  ]);

  const fetchData = async (url, setter) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(url, config);

      if (response.status !== 200) {
        throw new Error("Error fetching PA");
      }

      setter(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching PA: ", error);
      localStorage.setItem(
        "alertMessage",
        "Erreur lors de la récupération des plans d'action"
      );
      localStorage.setItem("alertType", "danger");
    }
  };

  useEffect(() => {
    fetchData(`${abelaURL}/planactionincident/avis/${avis.id}`, setPlanAction);
  }, []);

  useEffect(() => {
    const message = localStorage.getItem("alertMessage");
    const type = localStorage.getItem("alertType");

    if (message) {
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
  }, [location.state]);

  const handleShowModal = (title, content, operationType, size, avis) => {
    setTitle(title);
    setContent(content);
    setOperationType(operationType);
    setSize(size);
    setShowModal(true);
  };

  const handleHideModal = () => setShowModal(false);

  const switchView = () => {
    setViewMode(true);
    setShowModal(false);
  };
  const switchEdition = () => {
    setViewMode(false);
    setShowModal(false);
  };

  const handleChangeRows = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addRow = () => {
    const newRow = {
      intitule: "",
      createdBy: user,
      delai: "",
      commentaire: "",
      type: "",
      porteur: "",
      ticketSuper: "",
      avisIncident: { id: avis.id || null },
    };

    setRows((prevRows) => {
      const updatedRows = [...prevRows, newRow];
      return updatedRows;
    });
  };

  const deleteRow = () => {
    if (rows.length > 1) {
      const newRows = [...rows];
      newRows.pop();
      setRows(newRows);
    }
  };

  const ajoutPA = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = rows;
      console.log(formData);

      const response = await axios.post(
        `${abelaURL}/planactionincident`,
        formData,
        config
      );

      console.log(response);

      if (response.status !== 200) {
        throw new Error("Error adding PA");
      }

      localStorage.setItem("alertMessage", "Plan d'action ajouté avec succès");
      localStorage.setItem("alertType", "success");
    } catch (error) {
      console.error("Error adding PA: ", error);
      localStorage.setItem(
        "alertMessage",
        "Erreur lors de l'ajout du plan d'action"
      );
      localStorage.setItem("alertType", "danger");
    } finally {
      window.location.reload();
    }
  };

  const handleCloturerAvis = async () => {
    try {
      const response = await fetch(
        `${abelaURL}/avisIncident/${avis.id}/cloture`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Erreur lors de la cloture");

      // Check if the response is plain text
      const contentType = response.headers.get("content-type");
      let result;
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = await response.text();
        console.log(result);
      }
      setShowModal(false);
      localStorage.setItem("alertMessage", "Avis cloturé avec succès");
      localStorage.setItem("alertType", "success");
      window.location.reload();
      return result;
    } catch (err) {
      localStorage.setItem(
        "alertMessage",
        "Erreur lors de la cloture de l'avis"
      );
      localStorage.setItem("alertType", "danger");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(
      `${abelaURL}/planactionincident/avis/${avis.id}?pageNumber=${page}&pageSize=${itemsPerPage}`,
      setPlanAction
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return (
    <div>
      <MenuMysmc />
      <Container className="body">
        <Col>
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
          <div className="mt-3">
            <Row>
              <div className="d-flex justify-content-between mb-3">
                {!viewMode ? (
                  <div>
                    <Button
                      onClick={() =>
                        handleShowModal(
                          "Confirmation de l'opération en cours",
                          "Vous êtes sur le point de quitter le mode view. Etes-vous sûr de bien vouloir effectué cette opération?",
                          "SwitchView",
                          "md"
                        )
                      }
                      style={{
                        backgroundColor: "#5cb85c",
                        color: "#fff",
                        flexGrow: 1,
                        textAlign: "center",
                      }}
                      className="d-flex align-items-center"
                    >
                      <FaList /> &nbsp; Switcher en mode view
                    </Button>
                  </div>
                ) : (
                  <div className="d-flex">
                    <Button
                      style={{
                        backgroundColor: "#5cb85c",
                        color: "#fff",
                        flexGrow: 1,
                        textAlign: "center",
                      }}
                      onClick={() =>
                        handleShowModal(
                          "Confirmation de l'opération en cours",
                          "Vous êtes sur le point de quitter le mode view. Etes-vous sûr de bien vouloir effectué cette opération?",
                          "SwitchEdition",
                          "md"
                        )
                      }
                      className="d-flex align-items-center"
                    >
                      <FaPencil /> &nbsp; Switcher en mode edition
                    </Button>{" "}
                    &nbsp;
                    <Button
                      variant="danger"
                      className="d-flex align-items-center"
                      onClick={() =>
                        handleShowModal(
                          "Cloture d'avis en cours",
                          "Vous êtes sur le point de cloturer cet avis. Etes-vous sûr de bien vouloir effectué cette opération?",
                          "Cloture",
                          "md"
                        )
                      }
                    >
                      <FaList /> &nbsp; Cloturer cet avis
                    </Button>
                  </div>
                )}
                {!viewMode && (
                  <div>
                    {rows.length > 1 && (
                      <Button variant="danger" onClick={deleteRow}>
                        <FaMinus />
                      </Button>
                    )}
                    &nbsp;
                    <Button variant="primary" onClick={addRow}>
                      <FaPlus />
                    </Button>
                  </div>
                )}
              </div>
            </Row>
            <Row>
              <div>
                {!viewMode ? (
                  <form onSubmit={ajoutPA}>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Type - Porteur - Ref. Super</th>
                          <th>Intitule</th>
                          <th>Commentaire</th>
                          <th>Delai</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, index) => (
                          <tr key={index} style={{ height: "180px" }}>
                            <td>
                              <div className="form-group">
                                <select
                                  id={`type-${index}`}
                                  className="form-select"
                                  style={{ cursor: "pointer" }}
                                  value={row.type}
                                  onChange={(e) =>
                                    handleChangeRows(
                                      index,
                                      "type",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">Choisir Type P.A</option>
                                  <option value="curatif">Curatif</option>
                                  <option value="preventif">Préventif</option>
                                </select>
                              </div>
                              <div className="form-group mt-3">
                                <input
                                  id={`ticketSuper-${index}`}
                                  type="text"
                                  placeholder="Indiquer Ticket Super"
                                  className="form-control"
                                  value={row.ticketSuper}
                                  onChange={(e) =>
                                    handleChangeRows(
                                      index,
                                      "ticketSuper",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="form-group mt-3">
                                <input
                                  id={`porteur-${index}`}
                                  type="text"
                                  placeholder="Indiquer Porteur P.A"
                                  className="form-control"
                                  value={row.porteur}
                                  onChange={(e) =>
                                    handleChangeRows(
                                      index,
                                      "porteur",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </td>
                            <td>
                              <div className="form-group">
                                <textarea
                                  id={`intitule-${index}`}
                                  rows={6}
                                  placeholder="Plan d'action"
                                  className="form-control"
                                  value={row.intitule}
                                  onChange={(e) =>
                                    handleChangeRows(
                                      index,
                                      "intitule",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </td>
                            <td>
                              <div className="form-group">
                                <textarea
                                  id={`commentaire-${index}`}
                                  rows={6}
                                  placeholder="Commentaire"
                                  className="form-control"
                                  value={row.commentaire}
                                  onChange={(e) =>
                                    handleChangeRows(
                                      index,
                                      "commentaire",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </td>
                            <td>
                              <div className="form-group">
                                <input
                                  id={`delai-${index}`}
                                  type="date"
                                  className="form-control"
                                  value={row.delai}
                                  onChange={(e) =>
                                    handleChangeRows(
                                      index,
                                      "delai",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                      {rows.length === 1 ? (
                        <Button variant="primary" type="submit">
                          Enregistrer un P.A
                        </Button>
                      ) : (
                        <Button variant="primary" type="submit">
                          Enregistrer des P.A
                        </Button>
                      )}
                    </div>
                  </form>
                ) : (
                  <div>
                    <table className="table table-bordered">
                      <thead>
                        <th>Type</th>
                        <th>Intitule</th>
                        <th>Commentaire</th>
                        <th>Etat</th>
                        <th>Porteur</th>
                        <th>Delai</th>
                        <th>Date Cloture</th>
                        <th>Action</th>
                      </thead>
                      <tbody>
                        {planAction.map((item) => (
                          <tr key={item.id}>
                            <td>{item.type}</td>
                            <td>{item.intitule}</td>
                            <td>{item.commentaire}</td>
                            <td>{item.etat}</td>
                            <td>{item.porteur}</td>
                            <td>{item.delai}</td>
                            <td>{item.dateCloture}</td>
                            <td>
                              <Button variant="primary" onClick={() => handleShowModal(
                                "Confirmation de l'opération en cours",
                                "",
                                "Edition",
                                "lg",
                              )}>
                                Editer
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div>
                      {totalElements === 0 ? (
                        <span>Aucun élément à afficher</span>
                      ) : indexOfFirstItem === 0 ? (
                        <span>
                          Affichage de l'élément 1 à {itemsPerPage} sur{" "}
                          {totalElements} éléments
                        </span>
                      ) : indexOfLastItem >= totalElements ? (
                        <span>
                          Affichage de l'élément {indexOfFirstItem + 1} à{" "}
                          {totalElements} sur {totalElements} éléments
                        </span>
                      ) : (
                        <span>
                          Affichage de l'élément {indexOfFirstItem + 1} à{" "}
                          {indexOfLastItem} sur {totalElements} éléments
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
                          <Pagination.Item active>
                            {currentPage}
                          </Pagination.Item>
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

                        {currentPage < totalPages - 3 && (
                          <Pagination.Ellipsis />
                        )}

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
                )}
              </div>
            </Row>
          </div>
        </Col>
      </Container>
      <Row>
        <DetailsIncident isPA={true} />
      </Row>
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
            Non
          </Button>
          {operationType === "SwitchView" ? (
            <Button variant="primary" onClick={switchView}>
              Oui
            </Button>
          ) : operationType === "SwitchEdition" ? (
            <Button variant="primary" onClick={switchEdition}>
              Oui
            </Button>
          ) : operationType === "Cloture" ? (
            <Button variant="primary" onClick={handleCloturerAvis}>
              Oui
            </Button>
          ) : operationType === "Edition" ? (
            <Button variant="primary" onClick={switchEdition}>
              Oui
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AjoutPA;
