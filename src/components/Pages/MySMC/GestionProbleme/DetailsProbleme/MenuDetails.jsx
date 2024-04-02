import React from 'react';
import { Card, Nav } from 'react-bootstrap';
import { FaArrowCircleDown, FaBars, FaInfoCircle ,FaList} from 'react-icons/fa';
import { LuRefreshCcw } from "react-icons/lu";
import { IoIosInformationCircle } from "react-icons/io";

function MenuDetails() {
  return (
    <div>
      <Card 
        style={{ display: 'flex',
                 flexDirection:"row",
                 alignItems: 'center',
                 justifyContent: 'space-around' ,
                 padding:"5px",color:"#148C8A",
                 border:"2px solid #148C8A"
                 }}>
          <FaBars />
          <p style={{marginBottom: '0' }}>Menu Personnalisé</p>
        <FaArrowCircleDown />
      </Card>
      <Nav className="flex-column justify-content-between navigation">
        <Card 
            style={{ 
                backgroundColor: "#f0ad4e",
                transition: "background-color 0.3s",
                "::hover": { backgroundColor: "#EC971F" } // Appliquer le style au survol
              }}
        >
          <Nav.Link className='text-white' 
                    style={{ textAlign: "center",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
            <LuRefreshCcw />
            Réouverture de l'avis
            <FaInfoCircle/>
          </Nav.Link>
        </Card>
        <Card 
        >
          <Nav.Link className='text-white' 
                    style={{ textAlign: "center",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
            <FaList />
            Retour à la liste probleme
            <FaInfoCircle/>
          </Nav.Link>
        </Card>
      </Nav>
    </div>
  );
}

export default MenuDetails;
