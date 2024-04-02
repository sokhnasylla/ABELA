import React,{useState} from 'react'
import useAuth from '../Auth/useAuth';
import Header from '../../Header/Header'
import MenuPersoEtatSup from '../MySMC/EtatSupervision/MenuPersoEtatSup';
import FormVerifNum from './FormVerifNum';
import FormVerifLogin from './FormVerifLogin';
import FormVerifNumHlr from './FormVerifNumHlr';
import FormVerifLogKaabu from './FormVerifLogKaabu';
import MenuPerso from '../../Card/MenuPerso/MenuPerso';
import { Row,Col, Container } from 'react-bootstrap';
import MenuPersoGesProbleme from '../MySMC/GestionProbleme/MenuPersoGesProbleme';
import MenuPersoGesIncident from '../MySMC/GestionIncident/MenuPersoGesIncident';

const kaabuItemsMenus=[

    {label:"Espace Client",link:"verifnumsimplissimo"},
    {label:"Espace Vendeur",link:"veriflogsimplissimo"},
   
];

function Kaabu() {
    useAuth()
    const [currentForm, setCurrentForm] = useState("")
  
    const handleMenuClick = (link)=>{
      setCurrentForm(link);
      console.log(link);
    }
  
  
  return (
    <div>
      <Header/>
      <br />
      <Container>
      <Row>
        <Col sm={8}>
        </Col>

        <Col  sm={4}>
        <MenuPersoGesIncident propsMenuItems={kaabuItemsMenus} onItemClick={handleMenuClick} />
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

export default Kaabu