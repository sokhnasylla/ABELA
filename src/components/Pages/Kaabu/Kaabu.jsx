import React,{useState} from 'react'
import useAuth from '../Auth/useAuth';
import Header from '../../Header/Header'
import { Row,Col, Container } from 'react-bootstrap';
import MenuPersoGesIncident from '../MySMC/GestionIncident/MenuPersoGesIncident';
import Title from '../../Card/Title/Title';
import Get from '../../API/Get';
import { FaSearch, FaHome} from "react-icons/fa";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import { FaUserGroup } from 'react-icons/fa6';
import NavigatePerso from '../MySMC/GestionIncident/NavigatePerso';

const kaabuItemsMenus=[

    {label:"Espace Client",link:"/kaabu/espace/client",icon:FaUserGroup},
    {label:"Espace Vendeur",link:"/kaabu/espace/vendeur",icon:FaUserGroup},
   
];

function Kaabu() {
    useAuth()
    const [currentForm, setCurrentForm] = useState("")
  
    const handleMenuClick = (link)=>{
      setCurrentForm(link);
      console.log(link);
    }
    const gestionIncidentItemsNavigate = [
      { label: "Gestion Incidents", link: "/mysmc/gestionincident", icon: ReportProblemIcon },
      { label: "Gestion Probleme", link: "/mysmc/gestionprobleme", icon: ReportProblemIcon },
      { label: "Etat Supervision", link: "/mysmc/etatsupervision", icon: RiDashboard3Line },
      { label: "Consignes Orchestrées", link: "#" },
      { label: "Suivi Activités ", link: "/mysmc/suivisactivites", icon: IoStatsChart },
      { label: "Page d'acceuil", link: "/mysmc", icon: FaHome },
  ];
    const columns = [
      { name: 'Date Création', selector: 'dateCreation', sortable: true },
      { name: 'N°Avis', selector: 'numAvis', sortable: true },
      { name: 'Titre', selector: 'titre', sortable: true },
      { name: 'Etat', selector: 'etat', sortable: true },
  ];
  
  return (
    <div>
      <Header/>
      <br />
      <Container>
      <Row>
        <Col sm={8} style={{ marginTop: "-3%" }}>
          <Title text="Kaabu-Simplissimo-Reseau"/>
          <br />
          <Get url="http://localhost:8082/ABELA-MYSMC/api/gestionIncidents/avisIncidents/encours"  columns={columns} showTable={true} />
        </Col>
        <Col  sm={4}>
        <MenuPersoGesIncident propsMenuItems={kaabuItemsMenus} onItemClick={handleMenuClick} />
        </Col>
      </Row>
      <Row>
        <Col>
        </Col>
        <Col sm={4}>
          <NavigatePerso propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick}/>
        </Col>
      </Row>
      </Container>
        
        
        {/* <div>
        {currentForm === "verifnumsimplissimo" ?<FormVerifNum/> : null}
        {currentForm === "veriflogsimplissimo" ?<FormVerifLogin/> : null}
        {currentForm === "verifnumhlr" ?<FormVerifNumHlr/> : null}
        {currentForm === "veriflogkaabu" ?<FormVerifLogKaabu/> : null}
      </div> */}

    </div>
  )
}

export default Kaabu;