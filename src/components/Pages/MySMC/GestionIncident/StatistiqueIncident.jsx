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

  const [totalAvisIncidents, setTotalAvisIncidents] = useState(null);
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
    { name: "Incidents", value: 43 },
    { name: "Fermés", value: 10 },
    { name: "Ouverts", value: 36 },
    { name: "Annulés", value: 479 },
    { name: "Détection", value: 263 },
    { name: "Notification", value: 200 },
  ];

  return (
    <div className="dashboard">
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
