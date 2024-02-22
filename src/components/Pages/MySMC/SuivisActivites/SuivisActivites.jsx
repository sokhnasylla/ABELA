import React,{useState} from 'react'
import { Container, Navbar,Col,Row } from 'react-bootstrap'
import "../Menu/menumysmc.css"
import useAuth from '../../Auth/useAuth'
import Header from '../../../Header/Header'
import SubMenu from '../../../Card/Submenu/SubMenu'
import process from "../../../../assets/process.png"
import analytic from "../../../../assets/analytics.png"
import dashboard from '../../../../assets/dashboard.png'
import NavigatePersoEtatSup from '../EtatSupervision/NavigatePersoEtatSup'
import {  FaHome} from 'react-icons/fa';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import Title from '../../../Card/Title/Title'

const gestionIncidentItemsNavigate =[
    {label: " Gestion Incidents", link: "/mysmc/gestionincident",icon:ReportProblemIcon},
    { label: " Gestion Probleme", link: "/mysmc/gestionprobleme",icon:ReportProblemIcon},
    { label: " Etat Supervision", link: "/mysmc/etatsupervision", icon:RiDashboard3Line},
    { label: " Consignes Orchestrées", link: "#"},
    { label: " Suivi Activités ", link: "/mysmc/suivisactivites", icon:IoStatsChart},
    { label: " Page d'acceuil", link: "/mysmc",icon: FaHome },
    ];


function SuivisActivites() {
    useAuth()
    const [currentForm, setCurrentForm] = useState("")

    const handleMenuClick = (link)=>{
      setCurrentForm(link);
      console.log(link);
      
    }
   
    const [checked, setChecked] = React.useState(true);

    const handleChanges = (event) => {
      setChecked(event.target.checked);
    };
  return (
    <div id='home'>
        <div>
            <Header/>
        </div>
        <div style={{position:"relative"}}>
        <NavigatePersoEtatSup propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick}  />
        </div>
        <Container>
        <div id='title'>
              <Row>
              <Col xs={10} className='content'>
              <Title text="Base de connaissance alarmes"/>
              </Col> 
              </Row>
        </div>
        <br />
    <Navbar className='menusmc'>
        <Container>
          <Navbar.Brand href="/suivisactivites/anatest" className='Ad'>
              <SubMenu text="Ana Test" image={analytic} className/>
          </Navbar.Brand>
          <Navbar.Brand href="" className='Ad'>
              <SubMenu text="Scenario Book" image={process}/>
          </Navbar.Brand>
          <Navbar.Brand href="" className='Ad'>
              <SubMenu text="Sur Dashbord" image={dashboard}/>
          </Navbar.Brand>
          <Navbar.Brand href="" className='Ad'>
              <SubMenu text="Ana Test RAS" image={analytic}/>
          </Navbar.Brand>
        </Container>
    </Navbar>
    </Container>

    </div>
  )
  
}

export default SuivisActivites