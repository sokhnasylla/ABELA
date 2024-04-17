import React from 'react'
import { Card ,Nav} from 'react-bootstrap'
import { FaArrowCircleDown, FaBars, FaInfoCircle, FaQuestionCircle, FaThumbsUp } from 'react-icons/fa'


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
          <Card
            style={{ 
            backgroundColor: "#f0ad4e",
            transition: "background-color 0.3s",
            "::hover": { backgroundColor: "#EC971F" } // Appliquer le style au survol
            }}
          > 
            <Nav.link className='text-white'
                style={{ textAlign: "center",
                display:"flex",
                justifyContent:"space-around",
                alignItems:"center"}}
            >
                <FaQuestionCircle/>
              Demande validation avis
                <FaInfoCircle/> 
            </Nav.link>
          </Card>

          <Card
            style={{ 
            backgroundColor: "#f0ad4e",
            transition: "background-color 0.3s",
            "::hover": { backgroundColor: "#EC971F" } // Appliquer le style au survol
            }}
          > 
            <Nav.link className='text-white'
                style={{ textAlign: "center",
                display:"flex",
                justifyContent:"space-around",
                alignItems:"center"}}
            >
                <FaThumbsUp/>
                  Validation de l'avis
                <FaInfoCircle/> 
            </Nav.link>
          </Card>
        </Nav>
    </div>
  )
}

export default MenuDetailsIncident