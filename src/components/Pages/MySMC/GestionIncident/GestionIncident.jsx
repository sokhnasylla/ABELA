import { Button, Col, Container, Row, Table, Modal  } from 'react-bootstrap'
import MenuMysmc from '../Menu/MenuMysmc'
import Get from '../../../API/Get'
import Title from '../../../Card/Title/Title'
import { Link } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'
import React, {useEffect, useState} from 'react'
import useAuth from '../../Auth/useAuth'
import { getTokenFromLocalStorage } from '../../Auth/authUtils';
import axios from 'axios';
import { Grid,Select,MenuItem, InputLabel,TextField } from '@mui/material';
import RechercheAvis from './RechercheAvis'

function GestionIncident() { 
  useAuth()
  const [nombre, setNombre] = React.useState('10');
  const [currentForm, setCurrentForm] = useState("")
  const [showModal, setShowModal] = useState(false);


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
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
     
  return (
    <div>
      <MenuMysmc/>
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
                <br /> 
              </div>
            </Col>
      </Row>
      <hr />
      <Row>  
          <Col sm={8} className='content'>
            {/* Button to open the modal */}
            <Button variant="primary" onClick={handleShow}>Rechercher</Button>
            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Recherche d'avis</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <RechercheAvis />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
          <Col sm={8} className='content'>
            <Title text="Liste des avis d'incidents / d'information en cours" />
            <Get url="http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncidents" columns={columns} />
          </Col>
        </Row>
  </Container>
    </div>
   )
 }
 
 export default GestionIncident