import React,{useState} from 'react'
import Header from '../../Header/Header';
import { FaUserGroup } from 'react-icons/fa6';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Title from '../../Card/Title/Title';
import MenuPersoGesIncident from '../MySMC/GestionIncident/MenuPersoGesIncident';
import { InputLabel, TextField } from '@mui/material';
import { FaSearch,FaHome } from 'react-icons/fa';
import Get from '../../API/Get';
import NavigatePerso from '../MySMC/GestionIncident/NavigatePerso';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";

function EspaceVendeur() {
    const gestionIncidentItemsNavigate = [
        { label: "Gestion Incidents", link: "/mysmc/gestionincident", icon: ReportProblemIcon },
        { label: "Gestion Probleme", link: "/mysmc/gestionprobleme", icon: ReportProblemIcon },
        { label: "Etat Supervision", link: "/mysmc/etatsupervision", icon: RiDashboard3Line },
        { label: "Consignes Orchestrées", link: "#" },
        { label: "Suivi Activités ", link: "/mysmc/suivisactivites", icon: IoStatsChart },
        { label: "Page d'acceuil", link: "/mysmc", icon: FaHome },
    ];
        const [currentForm, setCurrentForm] = useState("");
        const [url, setUrl] = useState("");
        const [data, setData] = useState([]);
        const [noData, setNoData] = useState(false);


        const handleMenuClick = (link)=>{
            setCurrentForm(link);
            console.log(link);
        }
        const kaabuItemsMenus=[
            {label:"Espace Client",link:"/kaabu/espace/client",icon:FaUserGroup},
            {label:"Espace Vendeur",link:"/kaabu/espace/vendeur",icon:FaUserGroup},  
        ];
        const columns = [
            { name: 'Date Création', selector: 'dateCreation', sortable: true },
            { name: 'N°Avis', selector: 'numAvis', sortable: true },
            { name: 'Titre', selector: 'titre', sortable: true },
            { name: 'Etat', selector: 'etat', sortable: true },
        ];
    const handleSearchClick = (link) =>{};
  return (
    <div id='home'>
        <Header/>
       <Container>
        <Row>
            <Col sm={8}>
                <Title text="Vérification par numéro ou login"/>
                <br />
                 <div style={{display:"flex"}}>
                 <div className='mb-3'>
                 <InputLabel sx={{ }} id="demo-simple-select-label">Identifiant</InputLabel>
                 <TextField id='identifiant' variant='outlined' size='small' placeholder='Ex:MISSDN/LOGIN' sx={{ width: "500px"}} />
                 </div>
                 <div className='mb-3' id='search' style={{marginLeft:"25%"}} >
                 <Button onClick={handleSearchClick} style={{ backgroundColor: " #C9302C", borderColor: " #C9302C" }}><FaSearch /></Button>
                 </div>
                 </div>
            </Col>
            <Col sm={4} style={{marginTop:"40px"}}>
                <MenuPersoGesIncident propsMenuItems={kaabuItemsMenus} onItemClick={handleMenuClick}/>
            </Col>
        </Row>
        <Row>
              <Col sm={8}>
                    {url && (
                         <div>
                           <Title text="Informations du client"/>
                            {data.length > 0 ? (
                            <Get url={url} columns={columns} showTable={true} />
                             ) : ( 
                            <table className="table">
                            <thead>
                            <tr>
                            {columns.map((column, index) => (
                            <th key={index}>{column.name}</th>
                            ))}
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                            <td colSpan={columns.length}>Aucune donnée disponible pour cette recherche.</td>
                            </tr>
                            </tbody>
                            </table>
                            )}
                            </div>
                      )}
              </Col>
              <Col sm={4} style={{ marginTop: "3%" }}>
                <NavigatePerso propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick}/>
                <Get columns={columns} showTable={true}/>
              </Col>
            </Row>
       </Container>
    </div>
  )
}

export default EspaceVendeur