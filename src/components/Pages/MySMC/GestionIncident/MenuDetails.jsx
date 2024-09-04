import React from 'react'
import { Card ,Nav} from 'react-bootstrap'
import { FaArrowCircleDown, FaBars, FaInfoCircle, FaList, FaQuestionCircle, FaThumbsUp } from 'react-icons/fa'


function MenuDetailsIncident() {
  return (
    <div>
        <Card 
            style={{ display: 'flex',
            flexDirection:"row",
            alignItems: 'center',
            justifyContent: 'space-around' ,
            padding:"1Opx",color:"#148C8A",
            border:"2px solid #148C8A",
            marginTop:"16%",
            }}
        >
            <FaBars/>
            <p style={{marginBottom: '10px' }}>Menu Personnalisé</p>
            <FaArrowCircleDown/>
        </Card>
        <Nav className="flex-column justify-content-between navigation">
        <Nav className="flex-column justify-content-between navigation">
        <Card>
          <Nav.Link className='text-white' 
                    href='/mysmc/gestionincident'
                    style={{ textAlign: "center",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
            <FaList />
            Retour à la liste avis
            <FaInfoCircle/>
          </Nav.Link>
        </Card>
      </Nav>
      
        </Nav>
    </div>
  )
}

export default MenuDetailsIncident