import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import {
  FaArrowAltCircleDown,
  FaBars,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { getTokenFromLocalStorage } from "../../Auth/authUtils";
import Title from "../../../Card/Title/Title";
import MenuMysmc from "../Menu/MenuMysmc";
import MenuDetailsIncident from "./MenuDetails";

function DetailsIncident() {
  const [incident, setIncident] = useState(null);
  const token = getTokenFromLocalStorage();
  const location = useLocation();
  const avis = location.state?.avis;

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncident/${avis.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIncident(response.data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };
    fetchIncident();
  }, [avis, token]);

  if (!incident) {
    return <div>Aucun Incident</div>;
  }

  return (
    <div>
      <MenuMysmc />
      <Container className="body" style={{ fontSize: "14px" }}>
        <Row>
          <Col md={8} sm={8}>
            <Row>
              <Col sm={12}>
                <Card
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    color: "#148C8A",
                    border: "2px solid #148C8A"
                  }}
                >
                  <FaBars />
                  <p style={{ marginBottom: "10px" }}>
                    Details de l'avis N°{incident.numAvis}
                  </p>
                  <FaArrowAltCircleDown />
                </Card>
              </Col>
              <Col sm={7}>
                <Title text="Prévisalusation de l'avis" />
                <div className="table-responsive">
                  <Table className="table table-bordered table-striped">
                    <tbody>
                      <tr style={{textAlign: "center"}}>
                        <th colSpan={2}
                        style={{ backgroundColor: "#EA7714", color: "white" }}
                        >
                            {incident.titre}
                        </th>
                      </tr>
                      <tr>
                        <th className="styled-table-td">Date</th>
                        <th>
                          {new Date(incident.dateCreation).toLocaleDateString(
                            "fr-FR"
                          )}
                        </th>
                      </tr>
                      <tr>
                        <th className="styled-table-td">Objet</th>
                        <th
                          style={{ backgroundColor: "#EA7714", color: "white" }}
                        >
                          <strong>{incident.objet}</strong>
                        </th>
                      </tr>
                      <tr>
                        <th className="styled-table-td">Date Début</th>
                        <th>
                          {incident.dateDebut &&
                            new Date(incident.dateDebut).toLocaleDateString(
                              "fr-FR",
                              {
                                day: "numeric",
                                month: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                              }
                            )}
                        </th>
                      </tr>
                      <tr>
                        <th className="styled-table-td">Date Détection</th>
                        <th>
                          {incident.dateDetection &&
                            new Date(incident.dateDetection).toLocaleDateString(
                              "fr-FR",
                              {
                                day: "numeric",
                                month: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                              }
                            )}
                        </th>
                      </tr>
                      <tr>
                        <th className="styled-table-td">
                          Date Fin prévisionnelle
                        </th>
                        <th>
                          {incident.dateFinPrevisionnelle &&
                            new Date(
                              incident.dateFinPrevisionnelle
                            ).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
                            })}
                        </th>
                      </tr>
                      {incident.applicationSis &&
                        incident.applicationSis[0] && (
                          <tr>
                            <th className="styled-table-td">
                              Service Impactés
                            </th>
                            <th
                              style={{
                                backgroundColor: "#EA7714",
                                color: "white",
                              }}
                            >
                              <strong>{incident.applicationSis[0].nom}</strong>
                            </th>
                          </tr>
                        )}
                      <tr>
                        <th className="styled-table-td">Impacts</th>
                        <th>{incident.impact}</th>
                      </tr>
                      <tr>
                        <th className="styled-table-td">Causes Problables</th>
                        <th>{incident.causes}</th>
                      </tr>
                      <tr>
                        <th className="styled-table-td">Observations</th>
                        <th>{incident.observations}</th>
                      </tr>
                      <tr>
                        <th className="styled-table-td">Ticket EasyVista</th>
                        <th>{incident.numTicketEZV}</th>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
              <Col sm={5}>
                <Title text="Indicateurs clés" />
                <div className="table-responsive">
                  <Table className="table table-bordered table-striped">
                    <tbody>
                      <tr>
                        <th>Diffusion</th>
                        <th className="">
                          {incident.delaiDetection == "Hors Delai" ? (
                            <span className="d-flex align-items-center">
                              {incident.delaiDetection} &nbsp;
                              <FaThumbsDown style={{ color: "red" }} />
                            </span>
                          ) : (
                            <span className="d-flex align-items-center">
                              {incident.delaiDetection} &nbsp;
                              <FaThumbsUp style={{ color: "green" }} />
                            </span>
                          )}
                        </th>
                      </tr>
                      <tr>
                        <th>Traitement</th>
                        <th>{incident.delaiTraitement}</th>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <Title text="Infos Complémentaires" />
                <div className="table-responsive">
                  <Table className="table table-bordered table-striped">
                    <tbody>
                      <tr>
                        <th>N° Avis</th>
                        <th>{incident.numAvis}</th>
                      </tr>
                      <tr>
                        <th>Type Avis</th>
                        <th>{incident.typeAvisIncident.nom}</th>
                      </tr>
                      <tr>
                        <th
                          style={{ backgroundColor: "#EA7714", color: "white" }}
                        >
                          Etat
                        </th>
                        <th
                          style={{ backgroundColor: "#EA7714", color: "white" }}
                        >
                          {incident.etat}
                        </th>
                      </tr>
                      <tr>
                        <th>Liste Validation</th>
                        <th>EPD</th>
                      </tr>
                      <tr>
                        <th>Liste Diffusion</th>
                        <th>EPD</th>
                      </tr>
                      <tr>
                        <th>Origine Cause</th>
                        <th>{incident.typeCauseIncident.intitule}</th>
                      </tr>
                      <tr>
                        <th>Crée par</th>
                        <th>{incident.user}</th>
                      </tr>
                      <tr>
                        <th>Modifié par</th>
                        <th>{incident.updateBy}</th>
                      </tr>
                      <tr>
                        <th style={{ backgroundColor: "#FADBD8" }}>
                          Date diffusion
                        </th>
                        <th style={{ backgroundColor: "#FADBD8" }}>
                          {incident.dateDiffusion &&
                            new Date(incident.dateDiffusion).toLocaleDateString(
                              "fr-FR",
                              {
                                day: "numeric",
                                month: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                              }
                            )}
                        </th>
                      </tr>
                      <tr>
                        <th style={{ backgroundColor: "#FADBD8" }}>
                          Diffusé par
                        </th>
                        <th style={{ backgroundColor: "#FADBD8" }}>
                          {incident.diffusePar}
                        </th>
                      </tr>
                      {incident.dateDemandeFermeture && (
                        <tr>
                          <th style={{ backgroundColor: "#D6EAF8" }}>
                            Demande Demande Fermeture
                          </th>
                          <th style={{ backgroundColor: "#D6EAF8" }}>
                            {incident.dateDemandeFermeture}
                          </th>
                        </tr>
                      )}
                      {incident.demandeFermeturePar && (
                        <tr>
                          <th style={{ backgroundColor: "#D6EAF8" }}>
                            Demande Fermeture
                          </th>
                          <th style={{ backgroundColor: "#D6EAF8" }}>
                            {incident.demandeFermeturePar}
                          </th>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={4} sm={4}>
          {/* Passer au composant MenuDetails le type d'etat pour personnaliser le menu selon l'etat */}
            <MenuDetailsIncident avis= {incident} />
          </Col>
        </Row>
        <Row>
          <Col
            md={12}
            sm={12}
            sx={{ marginTop: "5px" }}
            className="text-center"
          >
            {/* <Button
              style={{
                backgroundColor: "#C9302C",
                borderColor: "#C9302C",
                width: "100px",
              }}
              onClick={() => window.history.back()}
            >
              Retour
            </Button> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DetailsIncident;
