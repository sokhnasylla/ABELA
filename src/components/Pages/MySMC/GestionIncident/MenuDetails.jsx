import React, { useEffect, useState } from "react";
import { Button, Card, Nav, Row } from "react-bootstrap";
import {
  FaArrowCircleDown,
  FaBars,
  FaInfoCircle,
  FaList,
  FaMailchimp,
  FaPencilAlt,
  FaQuestion,
  FaThumbsUp,
  FaTimes,
} from "react-icons/fa";
import GestionIncident from "./GestionIncident";
import axios from "axios";
import { getTokenFromLocalStorage } from "../../Auth/authUtils";

function MenuDetailsIncident({ avis }) {
  const token = getTokenFromLocalStorage();

  const [incidents, setIncidents] = useState([]);

  const deleteAvis = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncident/${avis.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log('Incident supprimé:', response.data);
      alert('Incident supprimé avec succès');
    } catch (error) {
      console.error("Erreur lors de la suppression de l'incident:", error);
      alert('Erreur lors de la suppression');
    }
  };

const cancelAvis = async () => {
  try {
    const response = await axios.put(
      `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncident/${avis.id}/canceled`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Traitez la réponse, par exemple, montrez un message de succès
    console.log('Incident annulé:', response.data);
    alert('Incident annulé avec succès');
  } catch (error) {
    console.error("Erreur lors de l'annulation de l'incident:", error);
    alert("Erreur lors de l'annulation");
  }
};



  return (
    <Row>
      {/* Main Menu */}
      <Card
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",  // Ensures proper placement of items
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
                justifyContent: "space-between",  // Proper spacing for icons and text
                height: "60px",
                backgroundColor: "#337ab7",
              }}
            >
              <Nav.Link
                className="text-white"
                href="/mysmc/gestionincident"
                style={{
                  display: "flex",
                  justifyContent: "space-between",  // Ensures items are spaced correctly
                  alignItems: "center",
                  width: "100%",
                  padding: "0 10px",  // Adds padding inside the card
                }}
              >
                {/* Icon on the left */}
                <FaQuestion />
                
                {/* Button in the center */}
                <button
                  className="btn"
                  style={{ backgroundColor: "#337ab7", color: "#fff", flexGrow: 1, textAlign: "center" }}
                  onClick={GestionIncident}
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
                href="/mysmc/gestionincident"
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
                  style={{ backgroundColor: "#5cb85c", color: "#fff", flexGrow: 1, textAlign: "center" }}
                  onClick={GestionIncident}
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
                href="/mysmc/gestionincident"
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
                  style={{ backgroundColor: "#5cb85c", color: "#fff", flexGrow: 1, textAlign: "center" }}
                  onClick={GestionIncident}
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
                href="/mysmc/gestionincident"
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
                  style={{ backgroundColor: "#f0ad4e", color: "#fff", flexGrow: 1, textAlign: "center" }}
                  onClick={GestionIncident}
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
            href="/mysmc/gestionincident"
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
              style={{ backgroundColor: "#d9534f", color: "#fff", flexGrow: 1, textAlign: "center" }}
              onClick={GestionIncident}
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
            href="/mysmc/gestionincident"
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
              style={{ backgroundColor: "#d9534f", color: "#fff", flexGrow: 1, textAlign: "center" }}
              onClick={deleteAvis}
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
              style={{ backgroundColor: "#5cb85c", color: "#fff", flexGrow: 1, textAlign: "center" }}
              onClick={GestionIncident}
            >
              Retour à la liste avis
            </button>
            <FaInfoCircle />
          </Nav.Link>
        </Card>
      </Nav>
    </Row>
  );
}

export default MenuDetailsIncident;
