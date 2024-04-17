import React from 'react';
import { Card, Nav } from 'react-bootstrap';
import { FaArrowCircleDown, FaBars, FaInfoCircle ,FaList} from 'react-icons/fa';
import { LuRefreshCcw } from "react-icons/lu";
import { IoIosInformationCircle } from "react-icons/io";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { TiWarning } from "react-icons/ti";
import { FaArrowCircleRight,FaPaperclip ,FaHome} from "react-icons/fa";
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";




function NavigateMysmc() {
  return (
    <div >
      <Card 
        style={{ display: 'flex',
                 flexDirection:"row",
                 alignItems: 'center',
                 justifyContent: 'space-around' ,
                 padding:"1Opx",color:"#148C8A",
                 border:"2px solid #148C8A",
                 marginTop:"16%"
                 }}>
          <FaBars />
          <p style={{marginBottom: '10px' }}>Navigation rapide</p>
        <FaArrowCircleDown />
      </Card>
      <Nav className="flex-column justify-content-between navigation">
        <Card  style={{ backgroundColor: "#337AB7",}}>
          <Nav.Link className='text-white' 
                    href='/mysmc/gestionincident'
                    style={{ textAlign: "center",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
            <TiWarning />
           Gestion incident
            <FaArrowCircleRight/>
          </Nav.Link>
        </Card>
        <Card style={{ backgroundColor: "#337AB7",}} >
           <Nav.Link className='text-white'
                     href='/mysmc/gestionprobleme' 
                    style={{ textAlign: "center",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
            <TiWarning />
           Gestion Probleme
            <FaArrowCircleRight/>
          </Nav.Link>
        </Card>
        <Card style={{ backgroundColor: "#337AB7",}} >
           <Nav.Link className='text-white' 
                     href='/mysmc/etatsupervision'
                    style={{ textAlign: "center",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
            <RiDashboard3Line />
          Etat Supervision
            <FaArrowCircleRight/>
          </Nav.Link>
        </Card>
        <Card style={{ backgroundColor: "#337AB7",}} >
           <Nav.Link className='text-white' 
                    style={{ textAlign: "center",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
            <FaPaperclip />
            Consignes Orchestrées
            <FaArrowCircleRight/>
          </Nav.Link>
        </Card>
        <Card style={{ backgroundColor: "#337AB7",}} >
           <Nav.Link className='text-white' 
                    href="/mysmc/suivisactivites"
                    style={{ textAlign: "center",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
            <IoStatsChart />
            Suivi Activités
            <FaArrowCircleRight/>
          </Nav.Link>
        </Card>
        <Card style={{ backgroundColor: "#337AB7",}} >
           <Nav.Link className='text-white' 
                    href="/mysmc"
                    style={{ textAlign: "center",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
            <FaHome />
            Page d'accueil
            <FaArrowCircleRight/>
          </Nav.Link>
        </Card>
        
      </Nav>
    </div>
  );
}

export default NavigateMysmc;
