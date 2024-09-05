import React from 'react'
import { Button, Card ,Nav, Row} from 'react-bootstrap'
import { FaArrowCircleDown, FaBars, FaInfoCircle, FaList, FaQuestionCircle, FaThumbsUp } from 'react-icons/fa'
import GestionIncident from './GestionIncident'

function MenuDetailsIncident() {
  return (
    <Row>
        <Card 
            style={{ display: 'flex',
            flexDirection:"row",
            alignItems: 'center',
            justifyContent: 'space-around' ,
            padding:"1Opx",color:"#148C8A",
            border:"2px solid #148C8A",
            }}
        >
            <FaBars/>
            <p style={{marginBottom: '10px' }}>Menu Personnalisé</p>
            <FaArrowCircleDown/>
        </Card>
        <Nav className="flex-column justify-content-between navigation">
        <Nav className="flex-column justify-content-between navigation">
        <Card
            style={{ display: 'flex',
            flexDirection:"row",
            alignItems: 'center',
            justifyContent: 'space-around' ,
            height:"60px"
            }}>
          <Nav.Link className='text-white' 
                    href='/mysmc/gestionincident'
                    style={{ textAlign: "center",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
            <FaList />
            <button className='btn' style={{backgroundColor: "#5cb85c", color:"#fff"}} onClick={GestionIncident}>Retour à la liste avis</button>
            <FaInfoCircle/>
          </Nav.Link>
        </Card>
      </Nav>
      
        </Nav>
    </Row>
  )
}

export default MenuDetailsIncident