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
} from "react-icons/fa";
import GestionIncident from "./GestionIncident";
import { getTokenFromLocalStorage } from "../../Auth/authUtils";
import { useNavigate } from "react-router-dom";

function MenuDetailsIncident({ avis }) {
  const [showFermetureModal, setShowFermetureModal] = useState(false);
  const [showAnnulerModal, setShowAnnulerModal] = useState(false);
  const token = getTokenFromLocalStorage();
  const navigate = useNavigate();

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
        throw new Error(`Response is not in JSON format: ${result}`);
      }

      if (result.length === 0)
        throw new Error("Aucun avis trouvé pour le numéro spécifié");
      return result;
    } catch (err) {
      throw new Error(err.message || "Erreur réseau");
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
        result = await response.text(); // Handle plain text response
        console.log(result); // Log or display the plain text response
      }
  
      // Refresh the page
      window.location.reload();
      return result;
    } catch (err) {
      console.error("Error:", err.message);
      alert(err.message || "Erreur réseau");
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

  return (
    <Row>
      {/* Main Menu */}
      <Card
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between", // Ensures proper placement of items
          padding: "10px",
          color: "#148C8A",
          border: "2px solid #148C8A",
        }}
      >
        {/* Icon on the left */}
        <FaBars />

        {/* Text centered */}
        <p style={{ marginBottom: "0", textAlign: "center", flexGrow: 1 }}>
          Menu Personnalisé
        </p>

        {/* Icon on the right */}
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
                justifyContent: "space-between", // Proper spacing for icons and text
                height: "60px",
                backgroundColor: "#337ab7",
              }}
            >
              <Nav.Link
                className="text-white"
                style={{
                  display: "flex",
                  justifyContent: "space-between", // Ensures items are spaced correctly
                  alignItems: "center",
                  width: "100%",
                  padding: "0 10px", // Adds padding inside the card
                }}
              >
                {/* Icon on the left */}
                <FaQuestion />

                {/* Button in the center */}
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#337ab7",
                    color: "#fff",
                    flexGrow: 1,
                    textAlign: "center",
                  }}
                >
                  Demande validation avis
                </button>

                {/* Icon on the right */}
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
                height: "60px",
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
                height: "60px",
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
                height: "60px",
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
                height: "60px",
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
                height: "60px",
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
            height: "60px",
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
    </Row>
   

    
  );
}

export default MenuDetailsIncident;
