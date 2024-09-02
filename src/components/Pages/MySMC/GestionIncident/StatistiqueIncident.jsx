import React, { useEffect, useState } from 'react';
import useAuth from '../../Auth/useAuth';
import Header from '../../../Header/Header';
import { FaList, FaSearch, FaHome, FaPaperclip } from "react-icons/fa";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import Title from '../../../Card/Title/Title';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { InputLabel, TextField, Grid } from '@mui/material';
import Taux from '../../../Card/Taux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./StatistiqueIncident.css";
import axios from 'axios';
import { getTokenFromLocalStorage } from '../../Auth/authUtils';

const ajoutAvisItemsMenu = [
  { label: "Lister les avis d'incidents", link: "/mysmc/gestionincident", icon: FaList },
  { label: "Rechercher avis", link: "/gestionincident/rechercheavis", icon: FaSearch },
];
const gestionIncidentItemsNavigate = [
  { label: "Gestion incidents", link: "/mysmc/gestionincident", icon: ReportProblemIcon },
  { label: "Gestion Probleme", link: "/mysmc/gestionprobleme", icon: ReportProblemIcon },
  { label: "Etat Supervision", link: "/mysmc/etatsupervision", icon: RiDashboard3Line },
  { label: "Consignes Orchestrées", link: "#", icon: FaPaperclip },
  { label: "Suivi Activités ", link: "/mysmc/suivisactivites", icon: IoStatsChart },
  { label: "Page d'accueil", link: "/mysmc", icon: FaHome },
];

// Composant CustomTooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
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
  const [currentForm, setCurrentForm] = useState("");
  const [etat, setEtat] = useState(false);
  const [loading, setLoding] = useState(false);
  const [text, setText] = useState("Information : Merci d'effectuer une recherche au préalable pour afficher les avis");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");

  const handleMenuClick = (link) => {
    setCurrentForm(link);
    console.log(link);
  };

  const [tauxNotificationAvis, setTauxNotificationAvis] = useState(null);
  const [tauxDetectionAvis, setTauxDetectionAvis] = useState(null);
  const [tauxTraitement4H, setTauxTraitement4H] = useState(null);
  const [tauxTraitement24H, setTauxTraitement24H] = useState(null);
  const[totalAvisIncidents,setTotalAvisIncidents] = useState(null);
  const [totalAvisFermes, setTotalAvisFermes] = useState(null);
  const [totalAvisOuverts, setTotalAvisOuverts] = useState(null);
  const [totalAvisAnnules, setTotalAvisAnnules] = useState(null);
  const [totalAvisClosDetectionDelai, setTotalAvisClosDetectionDelai] = useState(null);
  const [totalAvisClosNotificationOnDelayCustom, setTotalAvisClosNotificationOnDelayCustom] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncident/statistique/search?dateDebut=${dateDebut}&dateFin=${dateFin}`, config);
        setTauxNotificationAvis(response.data.tauxNotificationAvis);
        setTauxDetectionAvis(response.data.tauxDetectionAvis);
        setTauxTraitement4H(response.data.tauxTraitement4H);
        setTauxTraitement24H(response.data.tauxTraitement24H);
        setTotalAvisIncidents(response.data.totalAvisIncidents);
        setTotalAvisFermes(response.data.totalAvisFermes);
        setTotalAvisOuverts(response.data.totalAvisOuverts);
        setTotalAvisAnnules(response.data.totalAvisAnnules);
        setTotalAvisClosDetectionDelai(response.data.totalAvisClosDetectionDelai);
        setTotalAvisClosNotificationOnDelayCustom(response.data.totalAvisClosNotificationOnDelayCustom);
        console.log(response.data.tauxNotificationAvis);
      } catch (error) {
        setError(`Erreur: ${error.message}`);
        setLoding(false);
      }
    };

    fetchData();
  }, [token, dateDebut, dateFin]);

  const handlesearcclick = () => {
    const datedebut = document.getElementById("dateDebut").value;
    const datefin = document.getElementById("dateFin").value;
    setDateDebut(datedebut);
    setDateFin(datefin);
    setText(`Resultat de la dernière recherche :  Date Fin : ${datefin} | Date début : ${datedebut}`);
    setEtat(true);
    setLoding(true);
  };

  const data = [
    { name: "Incidents", value: totalAvisIncidents },
    { name: "Fermés", value: totalAvisFermes },
    { name: "Ouverts", value: totalAvisOuverts },
    { name: "Annulés", value: totalAvisAnnules },
    { name: "Détection", value: totalAvisClosDetectionDelai },
    { name: "Notification", value: totalAvisClosNotificationOnDelayCustom },
  ];

  return (
    <div className="dashboard">
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
    </div>
  );
}

export default StatistiqueIncident;
