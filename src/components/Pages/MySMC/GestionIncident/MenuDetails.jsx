import React, { useState } from "react";
import { Button, Card, Modal, Nav, Row } from "react-bootstrap";
import {
  FaArrowCircleDown,
  FaBars,
  FaEnvelope,
  FaInfoCircle,
  FaList,
  FaPencilAlt,
  FaQuestion,
  FaThumbsUp,
  FaTimes,
  FaTrashAlt
} from "react-icons/fa";
import { getTokenDecode, getTokenFromLocalStorage } from "../../Auth/authUtils";
import EditIncident from "./EditIncident";
import axios from "axios";

function MenuDetailsIncident({ avis }) {
  const [showFermetureModal, setShowFermetureModal] = useState(false);
  const [showAnnulerModal, setShowAnnulerModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [showDemandeValidationModal, setShowDemandeValidationModal] =
    useState(false);
  const [showDiffusionModal, setShowDiffusionModal] = useState(false);
  const token = getTokenFromLocalStorage();
  const decode = getTokenDecode();
  const updateBy = decode.sub;
  const [formData, setFormData] = useState({
    objet: avis.objet || "",
    nature: avis.nature || "",
    typeAvisIncident: { id: avis.typeAvisIncident?.id || "" },
    applicationSis: avis.applicationSis || [],
    listValidation:{ id: avis.listValidation?.id || "" },
    listDiffusion: { id: avis.listDiffusion.id || "" } ,
    dateDebut: avis.dateDebut || "",
    dateDetection: avis.dateDetection || "",
    ticketEzv: avis.ticketEzv || "",
    ticketOceane: avis.ticketOceane || "",
    impact: avis.impact || "",
    causeRetardNotification: avis.causeRetardNotification || "",
    typeCauseIncident: { id: avis.typeCauseIncident?.id || "" },
    causeProbable: avis.causeProbable || "",
    observations: avis.observations || "",
    dateFermeture: avis.dateFermeture || "",
    updateBy,
  });

  const handleFermertureAvis = async (id) => {
    try {
      console.log(id);
      const response = await fetch(
        `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncident/${id}/closed`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Erreur lors de la recherche");

      const contentType = response.headers.get("content-type");
      let result;
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = await response.text();
        console.log(result);
      }
      localStorage.setItem("alertMessage", "Avis fermé avec succès");
      localStorage.setItem("alertType", "success");
      setShowFermetureModal(false);
      window.location.reload();
      return result;
    } catch (err) {
      localStorage.setItem(
        "alertMessage",
        "Erreur lors de la fermeture de l'avis"
      );
      localStorage.setItem("alertType", "danger");
    }
  };

  const handleSuppressionAvis = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncident/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      // Check if the response is plain text
      const contentType = response.headers.get("content-type");
      let result;
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = await response.text();
        console.log(result);
      }
      setShowAnnulerModal(false);
      localStorage.setItem("alertMessage", "Avis supprimé avec succès");
      localStorage.setItem("alertType", "success");
      window.location.reload();
      return result;
    } catch (err) {
      localStorage.setItem(
        "alertMessage",
        "Erreur lors de la suppression de l'avis"
      );
      localStorage.setItem("alertType", "danger");
    }
  };

  const handleValiderSubmit = async (id) => {
    try {
      const response = await fetch(
        // `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncident/${id}/validated`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Erreur lors de la validation");

      // Check if the response is plain text
      const contentType = response.headers.get("content-type");
      let result;
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = await response.text();
        console.log(result);
      }
      setShowValidationModal(false);
      localStorage.setItem("alertMessage", "Avis validé avec succès");
      localStorage.setItem("alertType", "success");
      window.location.reload();
      return result;
    } catch (err) {
      localStorage.setItem(
        "alertMessage",
        "Erreur lors de la validation de l'avis"
      );
      localStorage.setItem("alertType", "danger");
    }
  };

  const handleFermetureShow = () => {
    setShowFermetureModal(true);
  };
  const handleFermetureClose = () => {
    setShowFermetureModal(false);
  };

  const handleAnnulerShow = () => {
    setShowAnnulerModal(true);
  };
  const handleAnnulerClose = () => {
    setShowAnnulerModal(false);
  };

  const handleEditClose = () => setShowEditModal(false);
  const handleEditShow = () => setShowEditModal(true);

  const handleValidationShow = () => {
    setShowValidationModal(true);
  };
  const handleValidationClose = () => {
    setShowValidationModal(false);
  };

  const handleDemandeValidationShow = () => {
    setShowDemandeValidationModal(true);
  };
  const handleDemandeValidationClose = () => {
    setShowDemandeValidationModal(false);
  };

  const handleDiffusionShow = () => setShowDiffusionModal(true);
  const handleDiffusionClose = () => setShowDiffusionModal(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("id")) {
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

  const handleEditSubmit = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      console.log(formData);
      const response = await axios.put(
        `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncident/${avis.id}`,
        formData,
        config
      );

      if (response.status === 200) {
        console.log("Avis modifié avec succès");
        setShowEditModal(false);
        localStorage.setItem("alertMessage", "Avis modifié avec succès");
        localStorage.setItem("alertType", "success");
        window.location.reload();
      } else {
        console.error("Erreur lors de la création de l'avis");
      }
    } catch (error) {
      console.error("Erreur lors de la requête", error);
    }
  };

  return (
    <Row>
      <Card
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#148C8A",
          border: "2px solid #148C8A",
        }}
      >
        <FaBars />
        <p style={{ marginBottom: "0", textAlign: "center", flexGrow: 1 }}>
          Menu Personnalisé
        </p>
        <FaArrowCircleDown />
      </Card>

      {avis.etat === "ENCOURS" && (
        <>
          <Nav className="flex-column justify-content-between navigation">
            <Card
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: "40px",
                backgroundColor: "#337ab7",
              }}
            >
              <Nav.Link
                className="text-white"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "0 10px",
                }}
              >
                <FaQuestion />

                <button
                  className="btn"
                  style={{
                    backgroundColor: "#337ab7",
                    color: "#fff",
                    flexGrow: 1,
                    textAlign: "center",
                  }}
                  onClick={handleDemandeValidationShow}
                >
                  Demande validation
                </button>

                <FaInfoCircle />
              </Nav.Link>
            </Card>
          </Nav>

          <Nav className="flex-column justify-content-between navigation">
            <Card
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: "40px",
                backgroundColor: "#5cb85c",
              }}
            >
              <Nav.Link
                className="text-white"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "0 10px",
                }}
              >
                <FaThumbsUp />
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#5cb85c",
                    color: "#fff",
                    flexGrow: 1,
                    textAlign: "center",
                  }}
                  onClick={handleValidationShow}
                >
                  Validation de l'avis
                </button>
                <FaInfoCircle />
              </Nav.Link>
            </Card>
          </Nav>
          <Nav className="flex-column justify-content-between navigation">
            <Card
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: "40px",
                backgroundColor: "#5cb85c",
              }}
            >
              <Nav.Link
                className="text-white"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "0 10px",
                }}
              >
                <FaEnvelope />
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#5cb85c",
                    color: "#fff",
                    flexGrow: 1,
                    textAlign: "center",
                  }}
                  onClick={handleDiffusionShow}
                >
                  Diffusion de l'avis
                </button>
                <FaInfoCircle />
              </Nav.Link>
            </Card>
          </Nav>
          <Nav className="flex-column justify-content-between navigation">
            <Card
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: "40px",
                backgroundColor: "#f0ad4e",
              }}
            >
              <Nav.Link
                className="text-white"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "0 10px",
                }}
              >
                <FaPencilAlt />
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#f0ad4e",
                    color: "#fff",
                    flexGrow: 1,
                    textAlign: "center",
                  }}
                  onClick={handleEditShow}
                >
                  Edition de l'avis
                </button>
                <FaInfoCircle />
              </Nav.Link>
            </Card>
          </Nav>
          <Nav className="flex-column justify-content-between navigation">
            <Card
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: "40px",
                backgroundColor: "#d9534f",
              }}
            >
              <Nav.Link
                className="text-white"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "0 10px",
                }}
              >
                <FaTimes />
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#d9534f",
                    color: "#fff",
                    flexGrow: 1,
                    textAlign: "center",
                  }}
                  onClick={handleFermetureShow}
                >
                  Fermeture de l'avis
                </button>
                <FaInfoCircle />
              </Nav.Link>
            </Card>
          </Nav>
          <Nav className="flex-column justify-content-between navigation">
            <Card
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: "40px",
                backgroundColor: "#d9534f",
              }}
            >
              <Nav.Link
                className="text-white"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "0 10px",
                }}
              >
                <FaTrashAlt />
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#d9534f",
                    color: "#fff",
                    flexGrow: 1,
                    textAlign: "center",
                  }}
                  onClick={handleAnnulerShow}
                >
                  Suppression de l'avis
                </button>
                <FaInfoCircle />
              </Nav.Link>
            </Card>
          </Nav>
        </>
      )}

      <Nav className="flex-column justify-content-between navigation">
        <Card
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: "40px",
          }}
        >
          <Nav.Link
            className="text-white"
            href="/mysmc/gestionincident"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "0 10px",
            }}
          >
            <FaList />
            <button
              className="btn"
              style={{
                backgroundColor: "#5cb85c",
                color: "#fff",
                flexGrow: 1,
                textAlign: "center",
              }}
            >
              Retour à la liste avis
            </button>
            <FaInfoCircle />
          </Nav.Link>
        </Card>
      </Nav>

      {/* Suppression Modal */}
      <Modal
        show={showAnnulerModal}
        onHide={handleAnnulerClose}
        dialogClassName="custom-modal"
        size="lg"
        style={{ width: "100%", textAlign: "" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de la suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Vous êtes vous êtes sur le point de supprimer l'avis avec l'id{" "}
            <strong className="text-danger">{avis.id}</strong>. Êtes-vous sûr de
            bien vouloir effectuer cette opération?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleAnnulerClose}>
            Non
          </Button>
          <Button
            variant="success"
            onClick={() => handleSuppressionAvis(avis.id)}
          >
            Oui
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Fermeture Modal */}
      <Modal
        show={showFermetureModal}
        onHide={handleFermetureClose}
        dialogClassName="custom-modal"
        size="lg"
        style={{ width: "100%", textAlign: "" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>
            Confirmation de la fermeture
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Vous êtes vous êtes sur le point de fermer l'avis avec l'id{" "}
            <strong className="text-danger">{avis.id}</strong>. Êtes-vous sûr de
            bien vouloir effectuer cette opération?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleFermetureClose}>
            Non
          </Button>
          <Button
            variant="success"
            onClick={() => handleFermertureAvis(avis.id)}
          >
            Oui
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={handleEditClose}
        dialogClassName="custom-modal"
        size="xl"
        style={{ width: "100%", textAlign: "" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>
            Modifier un avis incident
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditIncident
            avis={avis}
            formData={formData}
            handleEditChange={handleEditChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleEditClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Validation Modal */}
      <Modal
        show={showValidationModal}
        onHide={handleValidationClose}
        dialogClassName="custom-modal"
        size="xl"
        style={{ width: "100%", textAlign: "" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>
            Validation d'un avis incident
          </Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleValidationClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleValiderSubmit}>
            Valider
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Diffusion Modal */}
      <Modal
        show={showDiffusionModal}
        onHide={handleDiffusionClose}
        dialogClassName="custom-modal"
        size="xl"
        style={{ width: "100%", textAlign: "" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>
            Diffusion d'un avis incident
          </Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDiffusionClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Demande validation Modal */}
      <Modal
        show={showDemandeValidationModal}
        onHide={handleDemandeValidationClose}
        dialogClassName="custom-modal"
        size="xl"
        style={{ width: "100%", textAlign: "" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>
            Demande de validation d'un avis incident
          </Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDemandeValidationClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}

export default MenuDetailsIncident;
