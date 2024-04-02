import React, { useState } from 'react'
import Header from '../../../../Header/Header'
import { Card, Col, Container, Row } from 'react-bootstrap'
import MenuPersoGesProbleme from '../MenuPersoGesProbleme';
import { FaPlusCircle, FaSearch, FaHome, FaBars, FaArrowCircleDown} from 'react-icons/fa';
import { LuRefreshCcw } from "react-icons/lu";
import MenuDetails from './MenuDetails';
import Title from '../../../Dashboard/Title';



function DetailsProbleme() {

  const [currentForm, setCurrentForm] = useState("")

  const handleMenuClick = (link)=>{
    setCurrentForm(link);
    console.log(link);
  }
  const gestionProblemeItemsMenu =[
    {label: "Réouverture de l'avis", link: "/mysmc/gestionprobleme/scannerprobleme",icon:LuRefreshCcw},
    { label: "Rechercher probleme", link: "/mysmc/gestionprobleme/rechercherprobleme",icon:FaSearch},
    ];
  return (
    <div>
        <Header/>
        <Container style={{marginTop:"2%"}}>
          <Row>
          <Col sm={8} className='content'>
          <Card 
        style={{ display: 'flex',
                 flexDirection:"row",
                 alignItems: 'center',
                 justifyContent: 'space-between' ,
                 padding:"5px",color:"#148C8A",
                 border:"2px solid #148C8A"
                 }}>
          <FaBars />
          <p style={{marginBottom: '0' }}>Details de problème N°P_03022023_093438</p>
        <FaArrowCircleDown />
    
         </Card>
         {/* <Row>
            <Col sm={8}>
              <Title text="Prévisalusation du problème"/>
            </Col>
            <Col sm={4}>
              <Title text="Prévisalusation du problème"/>
            </Col>

        </Row> */}

          </Col>
          <Col sm={3} >
            <MenuDetails/>
            </Col>
          </Row>

        </Container>


    </div>
  )
}

export default DetailsProbleme