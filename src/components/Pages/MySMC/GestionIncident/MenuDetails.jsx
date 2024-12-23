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
  FaSync,
  FaThumbsUp,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";
import { getTokenDecode, getTokenFromLocalStorage } from "../../Auth/authUtils";
import EditIncident from "./EditIncident";
import axios from "axios";
import { abelaURL } from "../../../../config/global.constant";
import { useNavigate } from "react-router-dom";

function MenuDetailsIncident({ avis, isPA }) {
  const [contenu, setContenu] = useState("");
  const [titre, setTitre] = useState("");
  const [typeTraitement, setTypeTraitement] = useState("");
  const [size, setSize] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const token = getTokenFromLocalStorage();
  const decode = getTokenDecode();
  const updateBy = decode.sub;
  const [formData, setFormData] = useState({
    objet: avis.objet || "",
    nature: avis.nature || "",
    applicationSis: avis.applicationSis || [],
    typeAvisIncident: { id: avis.typeAvisIncident?.id || "" },
    listeValidation: { id: avis.listeValidation?.id || "" },
    listeDiffusion: { id: avis.listeDiffusion?.id || "" },
    typeCauseIncident: { id: avis.typeCauseIncident?.id || "" },
    dateDebut: avis.dateDebut || "",
    dateDetection: avis.dateDetection || "",
    numTicketEZV: avis.numTicketEZV || "",
    numTicketOceane: avis.numTicketOceane || "",
    impact: avis.impact || "",
    causeRetardNotification: avis.causeRetardNotification || "",
    causeProbable: avis.causeProbable || "",
    observations: avis.observations || "",
    dateFinPrevisionnelle: avis.dateFinPrevisionnelle || "",
    dateFermeture: avis.dateFermeture || "",
    commentaire: avis.commentaire || "",
    updateBy,
  });
  const [mail, setMail] = useState({
    to: "",
    subject: "",
    message: "",
  });
  const navigate = useNavigate();

  const handleShowEditModal = () => {
    setShowEditModal(true);
  };

  const handleHideEditModal = () => {
    setShowEditModal(false);
  };

  const handleShowModal = (titre, contenu, typeTraitement, size) => {
    setTitre(titre);
    setContenu(contenu);
    setTypeTraitement(typeTraitement);
    setSize(size);
    setShowModal(true);
  };
  const handleHideModal = () => setShowModal(false);

  const handleFermertureAvis = async (avis) => {
    if (!avis.dateFermeture) {
      localStorage.setItem(
        "alertMessage",
        "Veuillez renseigner la date de fermeture"
      );
      localStorage.setItem("alertType", "danger");
      window.location.reload();
    } else {
      try {
        console.log(avis);
        const response = await fetch(
          `${abelaURL}/avisIncident/${avis.id}/closed`,
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
        setShowModal(false);
        window.location.reload();
        return result;
      } catch (err) {
        localStorage.setItem(
          "alertMessage",
          "Erreur lors de la fermeture de l'avis"
        );
        localStorage.setItem("alertType", "danger");
      }
    }
  };

  const handleSuppressionAvis = async (id) => {
    try {
      const response = await fetch(`${abelaURL}/avisIncident/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

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
      setShowModal(false);
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

  const handleValiderSubmit = async () => {
    try {
      const response = await fetch(
        `${abelaURL}/avisIncident/${avis.id}/validate`,
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
      setShowModal(false);
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

  const handleServiceChange = (selectedOptions) => {
    const selectedServices = selectedOptions.map((option) => ({
      id: option.value,
      nom: option.label,
    }));
    setFormData((prevState) => ({
      ...prevState,
      applicationSis: selectedServices,
    }));
  };

  const handleDemandeValidation = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const mailSend = {
        to: "mamadousadaw@gmail.com",
        subject: "Demande de validation",
        body: `Bonjour, \n\nNous vous informons que nous avons besoin de votre validation pour l'avis d'incident n°${avis.id}.\nRendez-vous sur le lien suivant pour valider l'avis : <a href="http://localhost:3000/mysmc/gestionincident/details/${avis.id}">Lien</a>\n\nCordialement, \n\nL'équipe SMC
        `,
      };

      console.log(mailSend);

      const response = await axios.post(
        `http://localhost:8888/api/mail/send?avisId=${avis.id}`,
        {
          to: mailSend.to,
          subject: mailSend.subject,
          body: mailSend.body,
        }
      );

      console.log(response);

      if (response.status === 200) {
        console.log("Demande de validation envoyée avec succès");
        setShowModal(false);
        localStorage.setItem(
          "alertMessage",
          "Demande de validation envoyée avec succès"
        );
        localStorage.setItem("alertType", "success");
        window.location.reload();
      } else {
        console.error("Erreur lors de la demande de validation");
      }
    } catch (error) {
      console.error("Erreur lors de la requête", error);
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
        `${abelaURL}/avisIncident/${avis.id}`,
        formData,
        config
      );

      if (response.status === 200) {
        console.log("Avis modifié avec succès");
        setShowModal(false);
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

  const handleAnnulation = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      console.log(formData);
      const response = await axios.put(
        `${abelaURL}/avisIncident/${avis.id}/canceled`,
        config
      );

      if (response.status === 200) {
        console.log("Avis annulé avec succès");
        setShowModal(false);
        localStorage.setItem("alertMessage", "Avis annulé avec succès");
        localStorage.setItem("alertType", "success");
        window.location.reload();
      } else {
        console.error("Erreur lors de l'annulation de l'avis");
      }
    } catch (error) {
      console.error("Erreur lors de la requête", error);
    }
  };

  const backToList = () => {
    navigate(`/mysmc/gestionincident`);
  };

  const backToDetails = (avis) => {
    localStorage.setItem("avis", JSON.stringify(avis));
    navigate(`/mysmc/gestionincident/details/${avis.id}`);
  };

  const gestionPA = (avis) => {
    localStorage.setItem("avis", JSON.stringify(avis));
    navigate(`/mysmc/gestionincident/ajoutPA/${avis.id}`);
  };

  return (
    <Row>
      <Card
        style={{
          flexDirection: "row",
          color: "#148C8A",
          border: "2px solid #148C8A",
        }}
        className="d-flex justify-content-between align-items-center"
      >
        <FaBars />
        <p style={{ marginBottom: "0", textAlign: "center", flexGrow: 1 }}>
          Menu Personnalisé
        </p>
        <FaArrowCircleDown />
      </Card>

      {isPA && (
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
              <FaList />

              <button
                className="btn"
                style={{
                  backgroundColor: "#d9534f",
                  color: "#fff",
                  flexGrow: 1,
                  textAlign: "center",
                }}
                onClick={() => backToDetails(avis)}
              >
                Gestion de l'avis
              </button>

              <FaInfoCircle />
            </Nav.Link>
          </Card>
        </Nav>
      )}

      {(avis.etat === "ENCOURS" || avis.etat === "REOPEN") && (
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
                  onClick={() =>
                    handleShowModal(
                      "Demande validation avis",
                      "Voulez-vous vraiment demander la validation de cet avis ?",
                      "Demande validation"
                    )
                  }
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
                  onClick={() =>
                    handleShowModal(
                      "Validation de l'avis",
                      "Vous êtes sur le point de valider l'avis. Avez -vous reçu le retour des TMCs?",
                      "Validation"
                    )
                  }
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
                  onClick={() =>
                    handleShowModal("Diffusion de l'avis", "", "Diffusion")
                  }
                >
                  Diffusion de l'avis
                </button>
                <FaInfoCircle />
              </Nav.Link>
            </Card>
          </Nav>
          {avis.etat === "REOPEN" && (
            <>
              <Nav className="flex-column justify-content-between navigation">
                <Card
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "40px",
                    backgroundColor: "#5bc0de",
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
                    <FaSync />
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "#5bc0de",
                        color: "#fff",
                        flexGrow: 1,
                        textAlign: "center",
                      }}
                      onClick={() =>
                        handleShowModal("Relance TMC", "", "Relance")
                      }
                    >
                      Relance TMC
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
                    backgroundColor: "#5bc0de",
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
                    <FaSync />
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "#5bc0de",
                        color: "#fff",
                        flexGrow: 1,
                        textAlign: "center",
                      }}
                      onClick={() =>
                        handleShowModal(
                          "Etat d'avancement",
                          "",
                          "Etat d'avancement"
                        )
                      }
                    >
                      Etat d'avancement
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
                  onClick={() => handleShowEditModal()}
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
                  onClick={() =>
                    handleShowModal(
                      "Fermeture de l'avis",
                      <>
                        Vous êtes vous êtes sur le point de fermer l'avis avec
                        l'id <strong className="text-danger">{avis.id}</strong>.
                        Êtes-vous sûr de bien vouloir effectuer cette opération?{" "}
                      </>,
                      "Fermeture"
                    )
                  }
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
                  onClick={() =>
                    handleShowModal(
                      "Suppression de l'avis",
                      <>
                        Vous êtes vous êtes sur le point de supprimer l'avis
                        avec l'id{" "}
                        <strong className="text-danger">{avis.id}</strong>.
                        Êtes-vous sûr de bien vouloir effectuer cette opération?{" "}
                      </>,
                      "Suppression"
                    )
                  }
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
              onClick={() =>
                handleShowModal(
                  "Anuulation de l'avis",
                  <>
                    Vous êtes vous êtes sur le point d'annuler l'avis avec l'id{" "}
                    <strong className="text-danger">{avis.id}</strong>.
                    Êtes-vous sûr de bien vouloir effectuer cette opération?{" "}
                  </>,
                  "Annulation"
                )
              }
            >
              Annulation de l'avis
            </button>
            <FaInfoCircle />
          </Nav.Link>
        </Card>
      </Nav>

      {!isPA &&
        (avis.etat === "Etat_avancement" || avis.etat === "CLOTURE") && (
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
                <FaList />
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#d9534f",
                    color: "#fff",
                    flexGrow: 1,
                    textAlign: "center",
                  }}
                  onClick={() => gestionPA(avis)}
                >
                  Gestion P.A
                </button>
                <FaInfoCircle />
              </Nav.Link>
            </Card>
          </Nav>
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
              onClick={() => backToList()}
            >
              Retour à la liste avis
            </button>
            <FaInfoCircle />
          </Nav.Link>
        </Card>
      </Nav>

      <Modal
        show={showModal}
        onHide={handleHideModal}
        dialogClassName="custom-modal"
        size={size}
        style={{ width: "100%", textAlign: "" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>{titre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{contenu}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleHideModal}>
            Non
          </Button>
          {typeTraitement === "Fermeture" && (
            <Button
              variant="primary"
              onClick={() => handleFermertureAvis(avis)}
            >
              Fermeture
            </Button>
          )}
          {typeTraitement === "Suppression" && (
            <Button
              variant="primary"
              onClick={() => handleSuppressionAvis(avis.id)}
            >
              Supprimer
            </Button>
          )}
          {typeTraitement === "Validation" && (
            <Button variant="primary" onClick={handleValiderSubmit}>
              Oui
            </Button>
          )}
          {typeTraitement === "Diffusion" && (
            <Button variant="primary">Diffuser</Button>
          )}
          {typeTraitement === "Relance" && (
            <Button variant="primary">Relancer</Button>
          )}
          {typeTraitement === "Etat d'avancement" && (
            <Button variant="primary">Relancer</Button>
          )}
          {typeTraitement === "Demande validation" && (
            <Button variant="primary" onClick={handleDemandeValidation}>
              Demande Validation
            </Button>
          )}
          {typeTraitement === "Annulation" && (
            <Button variant="primary" onClick={handleAnnulation}>
              Annuler
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <Modal
        show={showEditModal}
        onHide={handleHideEditModal}
        dialogClassName="custom-modal"
        size="xl"
        style={{ width: "100%", textAlign: "" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>
            Edition de l'avis
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditIncident
            avis={avis}
            formData={formData}
            handleEditChange={handleEditChange}
            handleServiceChange={handleServiceChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleHideEditModal}>
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
