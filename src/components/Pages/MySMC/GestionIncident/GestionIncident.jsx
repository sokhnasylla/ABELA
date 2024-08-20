import React, {useEffect, useState} from 'react'
import Header from '../../../Header/Header'
import useAuth from '../../Auth/useAuth'
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import Title from '../../../Card/Title/Title';
import { Grid,Select,MenuItem, InputLabel,TextField } from '@mui/material';
import "../../MySMC/Menu/menumysmc.css"
import NavigatePerso from './NavigatePerso';
import { FaPlusCircle, FaSearch, FaHome,FaChartLine,FaPaperclip, FaEye } from 'react-icons/fa';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5"
import  MenuPersoGesIncident from '../GestionIncident/MenuPersoGesIncident'
import Get from '../../../API/Get';
import { Link } from 'react-router-dom';
import { getTokenFromLocalStorage } from '../../Auth/authUtils';
import axios from 'axios';


const CelluleAction = ({id}) => (
  <div>
    <Link to={`/mysmc/gestionincident/details/${id}`}>
      <Button variant='info'
        style={{backgroundColor: "#31B0D5",padding:"1px 5px",lineHeight:"1.2",borderRadius:"3px"}}
        title="Voir les détails de l'avis">
        <FaEye color='white'/>

      </Button>
    </Link>
  </div>
);

 
 
const gestionIncidentItemsMenu =[
  {label: " Ajouter un nouvel avis", link: "/gestionincident/ajoutavis",icon:FaPlusCircle},
  { label: " Rechercher avis", link: "/gestionincident/rechercheavis",icon:FaSearch},
  { label: " Statistique avis d'incidents", link: "/gestionincident/statistique",icon:FaChartLine}
  ];
 
 
const gestionIncidentItemsNavigate =[
{label: " Gestion incidents", link: "/mysmc/gestionincident",icon:ReportProblemIcon},
{ label: " Gestion Probleme", link: "/mysmc/gestionprobleme",icon:ReportProblemIcon},
{ label: " Etat Supervision", link: "/mysmc/etatsupervision", icon:RiDashboard3Line},
{ label: " Consignes Orchestrées", link: "#",icon:FaPaperclip},
{ label: " Suivi Activités ", link: "/mysmc/suivisactivites", icon:IoStatsChart},
{ label: " Page d'acceuil", link: "/mysmc",icon: FaHome },
];
 
const columns = [
  // Définissez les colonnes de votre DataTable
  { name: 'Date Création',
    selector: row => row.dateCreation,
    sortable: true,
    cell: row => row.dateCreation ? <span>{new Date(row.dateCreation).toLocaleDateString('fr-FR')}</span> : <span>N/A</span> },
  { name: 'N°Avis', selector: row => row.numAvis, sortable: true },
  { name: 'Titre', selector: row => row.titre, sortable: true },
  { name: 'Etat', selector: row => row.etat, sortable: true },
  { name: 'Action', selector: '', sortable: true ,cell: row => <CelluleAction id = {row.id} />},
];
const GestionIncident = () =>{
    useAuth()
    const [nombre, setNombre] = React.useState('10');
    const [currentForm, setCurrentForm] = useState("")
 
    const handleMenuClick = (link)=>{
      setCurrentForm(link);
      console.log(link);
    }
    const token =getTokenFromLocalStorage();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [tauxNotificationAvis,setTauxNotificationAvis] = useState(null);
    const [tauxDetectionAvis,setTauxDetectionAvis] = useState(null);
    const[ tauxTraitement4H,setTauxTraitement4H ]= useState(null);
    const [tauxTraitement24H,setTauxTraitement24H] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get("http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/taux-notification", config);
        setTauxNotificationAvis(response.data.tauxNotificationAvis);
        setTauxDetectionAvis(response.data.tauxDetectionAvis);
        setTauxTraitement4H(response.data.tauxTraitement4H);
        setTauxTraitement24H(response.data.tauxTraitement4H);
      } catch (error) {
        setError(`Erreur: ${error.message}`);
      }
    };
 
    fetchData();
  }, [token]);
  return (
    <div>
   
   
    {/* <NavigatePerso propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick}  /> */}
    <br />
    <Container className='body'style={{marginLeft:"5%"}}>
      <Row>
        <Col sm={8} className='content'>
            <Title text="Gestion des avis d'incidents - Indicateurs du mois en cours : Janvier 2024"/>
        
  <div >
    <br />
    <div className='col-xs-12 col-sm-6 col-md-2' style={{ position: "absolute", marginLeft: "" }}>
      <Grid className='panel' sx={{ backgroundColor: "#F2DEDE", border: "#F2DEDE" }}>
        <h5 style={{ fontSize: "14px", fontFamily: "inherit", fontWeight: "500", color: "#a94442" }}>Taux notification</h5>
      </Grid>
      <center><h3>{tauxNotificationAvis}%</h3></center>
    </div>
    <div className='col-xs-12 col-sm-6 col-md-2' style={{ position: "absolute", marginLeft: "15%" }}>
      <Grid className='panel' sx={{ backgroundColor: "#DFF0D8", border: "#DFF0D8" }}>
        <h5 style={{ fontSize: "14px", fontFamily: "inherit", fontWeight: "500", color: "#3C763D" }}>Taux détection</h5>
      </Grid>
      <center><h3>{tauxDetectionAvis}%</h3></center>
    </div>
    <div className='col-xs-12 col-sm-6 col-md-2' style={{ position: "absolute", marginLeft: "30%" }}>
      <Grid className='panel' sx={{ backgroundColor: "#D9EDF7", border: "#D9EDF7" }}>
        <h5 style={{ fontSize: "14px", fontFamily: "inherit", fontWeight: "500", color: "#31708F" }}>Taux résolution 4h</h5>
      </Grid>
      <center><h3>{tauxTraitement4H}%</h3></center>
    </div>
    <div className='col-xs-12 col-sm-6 col-md-2' style={{ position: "absolute", marginLeft: "45%" }}>
      <Grid className='panel' sx={{ backgroundColor: "#D9EDF7", border: "#D9EDF7" }}>
        <h5 style={{ fontSize: "14px", fontFamily: "inherit", fontWeight: "500", color: "#31708F" }}>Taux résolution 24h</h5>
      </Grid>
      <center><h3>{tauxTraitement24H}%</h3></center>
    </div>
    <br /> <br /> <br /> <br />
  </div>


        </Col>
            <Col sm={4} style={{marginTop:"3%"}}>
            <MenuPersoGesIncident propsMenuItems={gestionIncidentItemsMenu} onItemClick={handleMenuClick}  />
            </Col>
      </Row>
       <hr />
        <Row>
        <Col sm={8} className='content'>
        <Title text="Liste des avis d'incidents / d'information en cours"/>
        <Get url="http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/encours" columns={columns} />
        </Col>
        <Col sm={4} >
        <NavigatePerso propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick}  />
        </Col>
        </Row>
        <hr />
        <Row>
        <Col sm={8} className='content'>
        <Title text="Les avis fermés, Clotûrés ou annulés récemment"/>
        <Get url="http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents/clos/ferme/annule" columns={columns} />
        </Col>
       
        </Row>
   
       </Container>
     
    </div>
 
  )
}
 
export default GestionIncident