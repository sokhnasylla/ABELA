import React, { useEffect, useState } from "react";
import Title from "../../../Card/Title/Title";
import periode from "../../../../assets/periode.png";
import {
  Row,
  Col,
  Button,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap"; // Add OverlayTrigger and Tooltip
import { Grid } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip, // Rename Recharts Tooltip to avoid conflict
  ResponsiveContainer,
} from "recharts";
import "./StatistiqueIncident.css";
import axios from "axios";
import { getTokenFromLocalStorage } from "../../Auth/authUtils";
import RechercheStatistiques from "./RechercheStatistiques";
import { abelaURL } from "../../../../config/global.constant";

// Composant CustomTooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <p className="label">{`${label}`}</p>
        <p className="intro">{`${payload[0].value} incidents`}</p>
      </div>
    );
  }
  return null;
};

function StatistiqueIncident() {
  const token = getTokenFromLocalStorage();
  const [error, setError] = useState(null);
  const [showStatModal, setShowStatModal] = useState(false);
  const now = new Date();
  const period = now.toLocaleDateString("FR", {
    month: "long",
    year: "numeric",
  });
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    .toISOString()
    .split("T")[0];

  const [histo, setHisto] = useState(period);
  const [dateDebut, setDateDebut] = useState(start);
  const [dateFin, setDateFin] = useState(end);
  const [dataUrl, setDataUrl] = useState(
    `${abelaURL}/avisIncident/statistique/search?dateDebut=${dateDebut}&dateFin=${dateFin}`
  );

  const handleStatsSubmit = (url, histo) => {
    setDataUrl(url);
    setHisto(histo);
    setShowStatModal(false);
  };

  const [tauxNotificationAvis, setTauxNotificationAvis] = useState(0);
  const [tauxDetectionAvis, setTauxDetectionAvis] = useState(0);
  const [tauxTraitement4H, setTauxTraitement4H] = useState(0);
  const [tauxTraitement24H, setTauxTraitement24H] = useState(0);
  const [totalAvisIncidents, setTotalAvisIncidents] = useState(0);
  const [totalAvisFermes, setTotalAvisFermes] = useState(0);
  const [totalAvisOuverts, setTotalAvisOuverts] = useState(0);
  const [totalAvisAnnules, setTotalAvisAnnules] = useState(0);
  const [totalAvisClosDetectionDelai, setTotalAvisClosDetectionDelai] =
    useState(0);
  const [
    totalAvisClosNotificationOnDelayCustom,
    setTotalAvisClosNotificationOnDelayCustom,
  ] = useState(0);
  const handleStatClose = () => setShowStatModal(false);
  const handleStatShow = () => setShowStatModal(true);
  const reinitHisto = () => {
    setDateDebut(start);
    setDateFin(end);
    setDataUrl(
      `${abelaURL}/avisIncident/statistique/search?dateDebut=${dateDebut}&dateFin=${dateFin}`
    );
    setShowStatModal(false);
    setHisto(period);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(dataUrl, config);
        setTauxNotificationAvis(response.data.tauxNotificationAvis || 0);
        setTauxDetectionAvis(response.data.tauxDetectionAvis || 0);
        setTauxTraitement4H(response.data.tauxTraitement4H || 0);
        setTauxTraitement24H(response.data.tauxTraitement24H || 0);
        setTotalAvisIncidents(response.data.totalAvisIncidents || 0);
        setTotalAvisFermes(response.data.totalAvisFermes || 0);
        setTotalAvisOuverts(response.data.totalAvisOuverts || 0);
        setTotalAvisAnnules(response.data.totalAvisAnnules || 0);
        setTotalAvisClosDetectionDelai(
          response.data.totalAvisClosDetectionDelai || 0
        );
        setTotalAvisClosNotificationOnDelayCustom(
          response.data.totalAvisClosNotificationOnDelayCustom || 0
        );
      } catch (error) {
        setError(`Erreur: ${error.message}`);
      }
    };
    fetchData();
  }, [token, dateDebut, dateFin, dataUrl]);

  const data = [
    { name: "Incidents", value: totalAvisIncidents },
    { name: "Fermés", value: totalAvisFermes },
    { name: "Ouverts", value: totalAvisOuverts },
    { name: "Annulés", value: totalAvisAnnules },
    { name: "Détection", value: totalAvisClosDetectionDelai },
    { name: "Notification", value: totalAvisClosNotificationOnDelayCustom },
  ];

  return (
    <div>
      <Title
        text={`Gestion des avis d'incidents - Indicateurs de la période : ${histo}`}
      />
      <div className="mt-4 d-flex align-items-center mb-4">
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip>
              Sélectionnez une période pour afficher les statistiques
              d'incidents
            </Tooltip>
          }
        >
          <img
            height="40"
            width="40"
            src={periode}
            style={{ cursor: "pointer" }}
            alt=""
            onClick={handleStatShow}
          />
        </OverlayTrigger>
        &nbsp;
        {dataUrl !==
          `${abelaURL}/avisIncident/statistique/search?dateDebut=${start}&dateFin=${end}` && (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                Réinitialiser la période pour afficher les statistiques par
                défaut
              </Tooltip>
            }
          >
            <Button variant="danger" onClick={reinitHisto}>
              &times;
            </Button>
          </OverlayTrigger>
        )}
      </div>
      <Row className="mb-4">
        <Col
          xs={12}
          sm={6}
          md={3}
          className="d-flex justify-content-center mb-3"
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            style={{
              backgroundColor: "#F2DEDE",
              border: "1px solid #F2DEDE",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <div
              style={{ fontSize: "15px", fontWeight: "bold", color: "#a94442" }}
            >
              {tauxNotificationAvis !== null
                ? `${tauxNotificationAvis.toFixed(2)} %`
                : "0 %"}
            </div>
            <div>Notification Avis</div>
          </Grid>
        </Col>

        <Col
          xs={12}
          sm={6}
          md={3}
          className="d-flex justify-content-center mb-3"
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            style={{
              backgroundColor: "#D9EDF7",
              border: "1px solid #D9EDF7",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <div
              style={{ fontSize: "15px", fontWeight: "bold", color: "#31708f" }}
            >
              {tauxDetectionAvis !== null
                ? `${tauxDetectionAvis.toFixed(2)} %`
                : "0 %"}
            </div>
            <div>Détection Avis</div>
          </Grid>
        </Col>

        <Col
          xs={12}
          sm={6}
          md={3}
          className="d-flex justify-content-center mb-3"
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            style={{
              backgroundColor: "#FCF8E3",
              border: "1px solid #FCF8E3",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <div
              style={{ fontSize: "15px", fontWeight: "bold", color: "#8a6d3b" }}
            >
              {tauxTraitement4H !== null
                ? `${tauxTraitement4H.toFixed(2)} %`
                : "0 %"}
            </div>
            <div>Traitement 4H</div>
          </Grid>
        </Col>

        <Col
          xs={12}
          sm={6}
          md={3}
          className="d-flex justify-content-center mb-3"
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            style={{
              backgroundColor: "#DFF0D8",
              border: "1px solid #DFF0D8",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <div
              style={{ fontSize: "15px", fontWeight: "bold", color: "#3c763d" }}
            >
              {tauxTraitement24H !== null
                ? `${tauxTraitement24H.toFixed(2)} %`
                : "0 %"}
            </div>
            <div>Traitement 24H</div>
          </Grid>
        </Col>
      </Row>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <RechartsTooltip content={<CustomTooltip />} />
          <Bar dataKey="value" fill="#FFA500" />
        </BarChart>
      </ResponsiveContainer>
      <Modal
        show={showStatModal}
        onHide={handleStatClose}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Statistiques</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RechercheStatistiques onSearch={handleStatsSubmit} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleStatClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StatistiqueIncident;
