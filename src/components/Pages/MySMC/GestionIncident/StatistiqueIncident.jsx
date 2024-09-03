import React, { useEffect, useState } from "react";
import useAuth from "../../Auth/useAuth";
import Header from "../../../Header/Header";
import { FaList, FaSearch, FaHome, FaPaperclip } from "react-icons/fa";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import Title from "../../../Card/Title/Title";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { InputLabel, TextField, Grid } from "@mui/material";
import Taux from "../../../Card/Taux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./StatistiqueIncident.css";
import axios from "axios";
import { getTokenFromLocalStorage } from "../../Auth/authUtils";
import RechercheStatistiques from "./RechercheStatistiques";

const ajoutAvisItemsMenu = [
  {
    label: "Lister les avis d'incidents",
    link: "/mysmc/gestionincident",
    icon: FaList,
  },
  {
    label: "Rechercher avis",
    link: "/gestionincident/rechercheavis",
    icon: FaSearch,
  },
];
const gestionIncidentItemsNavigate = [
  {
    label: "Gestion incidents",
    link: "/mysmc/gestionincident",
    icon: ReportProblemIcon,
  },
  {
    label: "Gestion Probleme",
    link: "/mysmc/gestionprobleme",
    icon: ReportProblemIcon,
  },
  {
    label: "Etat Supervision",
    link: "/mysmc/etatsupervision",
    icon: RiDashboard3Line,
  },
  { label: "Consignes Orchestrées", link: "#", icon: FaPaperclip },
  {
    label: "Suivi Activités ",
    link: "/mysmc/suivisactivites",
    icon: IoStatsChart,
  },
  { label: "Page d'accueil", link: "/mysmc", icon: FaHome },
];

// a partir du mois en cours prendre la comme date de debut le dernier jour du mois en cours et comme date de fin le premier jour du mois en cours
const getCurrentMonthDates = () => {
  const date = new Date();
  const annee = date.getFullYear();
  const mois = date.getMonth() + 1;
  const premierJour = new Date(annee, mois - 1, 1);
  const dernierJour = new Date(annee, mois, 0);
  const dateDebut = `${dernierJour.getFullYear()}-${
    dernierJour.getMonth() + 1
  }-${dernierJour.getDate()}`;
  const dateFin = `${premierJour.getFullYear()}-${
    premierJour.getMonth() + 1
  }-${premierJour.getDate()}`;
  // const dateDebut = "2022-01-01";
  // const dateFin = "2024-09-02";
  return { dateDebut, dateFin };
};

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
  const [etat, setEtat] = useState(false);
  const [loading, setLoding] = useState(false);
  const [text, setText] = useState(
    "Information : Merci d'effectuer une recherche au préalable pour afficher les avis"
  );
  const [showStatModal, setShowStatModal] = useState(false);
  const [histo, setHisto] = useState("Aucune recherche récente.");
  const now = new Date();
  const period = now.toLocaleDateString('FR', { month: 'long', year: 'numeric' });
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    .toISOString()
    .split("T")[0];

  const [dateDebut, setDateDebut] = useState(start);
  const [dateFin, setDateFin] = useState(end);
  const [dataUrl, setDataUrl] = useState(
    `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncident/statistique/search?dateDebut=${dateDebut}&dateFin=${dateFin}`
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
      `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncident/statistique/search?dateDebut=${dateDebut}&dateFin=${dateFin}`
    );
    setShowStatModal(false);
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

  const getPeriode = (dateDebut, dateFin) => {
    const dateDebutSplit = dateDebut.split("-");
    const dateFinSplit = dateFin.split("-");
    const mois = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
    console.log(histo);
    const moisDebut = mois[parseInt(dateDebutSplit[1]) - 1];
    const moisFin = mois[parseInt(dateFinSplit[1]) - 1];
    return `Du ${dateDebutSplit[2]} ${moisDebut} ${dateDebutSplit[0]} au ${dateFinSplit[2]} ${moisFin} ${dateFinSplit[0]}`;
  };

  const getCurrentMonthAndYear = () => {
    const date = new Date();
    const mois = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
    const moisActuel = mois[date.getMonth()];
    const anneeActuelle = date.getFullYear();
    return `${moisActuel} ${anneeActuelle}`;
  };

  return (
    <div className="dashboard">
            {histo === "Aucune recherche récente." ? (
          <Title
            lg={12}
            text={`Gestion des avis d'incidents - Indicateurs du mois en cours : ${period}`}
          />
        ) : histo !== "" ? (
          // Si les dates de début et de fin sont présentes dans l'historique
          <Title
            text={`Gestion des avis d'incidents - Indicateurs de la période : ${histo}`}
          />
        ) : (
          // Si aucune date n'a été choisie, afficher un titre générique
          <Title
            text={`Gestion des avis d'incidents - Indicateurs sans période définie`}
          />
        )}
      <Button  variant="primary" onClick={handleStatShow} className="mt-5 ml-5 mb-2">
              Stats      
              </Button>
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
            {(dataUrl !== `http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncident/statistique/search?dateDebut=${start}&dateFin=${end}` ) && (
  <Button
    variant="danger"
    onClick={reinitHisto}
    className="mt-5 ml-5 mb-2"
  >
    Default
  </Button>
)}
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
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#a94442",
              }}
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
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#31708F",
              }}
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
              backgroundColor: "#DFF0D8",
              border: "1px solid #DFF0D8",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#3C763D",
              }}
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
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#3C763D",
              }}
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
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" fill="#FFA500" />
        </BarChart>
      </ResponsiveContainer>
      {histo}
    </div>
  );
}

export default StatistiqueIncident;
