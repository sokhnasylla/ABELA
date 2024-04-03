import React, { useState } from 'react'
import { IoIosWarning} from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { Col, Container, Row,Button } from 'react-bootstrap'
import Header from '../../../Header/Header'
import Title from '../../../Card/Title/Title'
import Get from '../../../API/Get'
import { FaPlusCircle, FaSearch, FaHome} from 'react-icons/fa';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import NavigatePerso from '../GestionIncident/NavigatePerso';
import MenuPersoGesProbleme from './MenuPersoGesProbleme'
import { FaPaperclip } from "react-icons/fa6";
import { Link } from 'react-router-dom'; // Importer le composant Link

// Composant de cellule personnalisé pour la colonne "Action"
const CelluleAction = ({ id }) => (
  <div>
    {/* Votre bouton avec le composant fourni */}
    <Link to={`/mysmc/gestionprobleme/details/${id}`}> {/* Rediriger vers "/details/id" au clic */}
      <Button variant="info" 
          style={{backgroundColor: "#31B0D5",padding:"1px 5px",lineHeight:"1.2",borderRadius:"3px"}}
          title="Voir les détails du problème"
        
          >
        <FaEye color='white' />
      </Button>
    </Link>
  </div>
);




const GestionProbleme = () =>{

  

  const [currentForm, setCurrentForm] = useState("")

  const handleMenuClick = (link)=>{
    setCurrentForm(link);
    console.log(link);
  }

  const gestionProblemeItemsMenu =[
    {label: "Scanner un probleme", link: "/mysmc/gestionprobleme/scannerprobleme",icon:FaPlusCircle},
    { label: "Rechercher probleme", link: "/mysmc/gestionprobleme/rechercherprobleme",icon:FaSearch},
    ];

    const gestionIncidentItemsNavigate =[
      {label: " Gestion Incidents", link: "/mysmc/gestionincident",icon:IoIosWarning},
      { label: " Gestion Probleme", link: "/mysmc/gestionprobleme",icon:IoIosWarning},
      { label: " Etat Supervision", link: "/mysmc/etatsupervision", icon:RiDashboard3Line},
      { label: " Consignes Orchestrées", link: "#",icon:FaPaperclip},
      { label: " Suivi Activités ", link: "/mysmc/suivisactivites", icon:IoStatsChart},
      { label: " Page d'acceuil", link: "/mysmc",icon: FaHome },
      ];


  const columns = [
    // Définissez les colonnes de votre DataTable
    { name: 'N°Probleme', selector: 'id', sortable: true },
    { name: 'Application', selector: 'application', sortable: true },
    { name: 'Date Création',
      selector: 'dateCreation',
      sortable: true ,
      cell: row => row.dateCreation ? <span>{new Date(row.dateCreation).toLocaleDateString('fr-FR')}</span> : <span>N/A</span> },
    { name: 'Etat', selector: 'etat', sortable: true },
    { name: 'Action', sortable: true, cell: row => <CelluleAction id={row.id} /> },

  ];


  return (
    <div>

      <Header/>
      <Container>
        <Row>
            <Col sm={8} className='content'>
              <Title text="Liste des problémes en cours"/>
              <Get url="http://localhost:8082/ABELA-MYSMC/api/gestionproblemes/problemes/encours" columns={columns} />
            </Col> 
            <Col sm={4} style={{marginTop:"3%"}}>
               <MenuPersoGesProbleme propsMenuItems={ gestionProblemeItemsMenu} onItemClick={handleMenuClick}/>
            </Col>
        </Row>

        <Row style={{marginTop:"5%"}}>
            <Col sm={8} className='content'>
              <Title text="Les problémes clotûrés ou annulés récemment"/>
              <Get url="http://localhost:8082/ABELA-MYSMC/api/gestionproblemes/problemes/clos" columns={columns} />
            </Col> 
            <Col sm={4}>
            <NavigatePerso propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick}  />
            </Col>
        </Row>
      </Container>

       
    </div>
  )
}

export default GestionProbleme