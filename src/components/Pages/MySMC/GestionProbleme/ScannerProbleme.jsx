import React,{useState} from 'react'
import Header from '../../../Header/Header'
import useAuth from '../../Auth/useAuth'
import MenuPersoGesIncident from '../GestionIncident/MenuPersoGesIncident'
import NavigatePerso from '../GestionIncident/NavigatePerso'
import { FaPlusCircle, FaSearch, FaHome,FaList} from 'react-icons/fa';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import { Container,Row,Col,Button } from 'react-bootstrap'
import Title from '../../../Card/Title/Title'
import {MenuItem,InputLabel,TextField,Grid,Select} from '@mui/material'
import TableGesProblemeScan from './TableGesProbleme/TableGesProblemeScan'
import MenuPersoGesProbleme from './MenuPersoGesProbleme'

const ScannerProblemeItemsMenu =[
    {label: " Lister des problemes", link: "/mysmc/gestionprobleme",icon:FaList},
    { label: " Rechercher probleme", link: "/mysmc/gestionprobleme/rechercherprobleme",icon:FaSearch},
    ];
  
  
  const gestionIncidentItemsNavigate =[
  {label: " Gestion Incidents", link: "/mysmc/gestionincident",icon:ReportProblemIcon},
  { label: " Gestion Probleme", link: "/mysmc/gestionprobleme",icon:ReportProblemIcon},
  { label: " Etat Supervision", link: "/mysmc/etatsupervision", icon:RiDashboard3Line},
  { label: " Consignes Orchestrées", link: "#"},
  { label: " Suivi Activités ", link: "/mysmc/suivisactivites", icon:IoStatsChart},
  { label: " Page d'acceuil", link: "/mysmc",icon: FaHome },
  ];
  

function ScannerProbleme() {
    useAuth()
    const [nombre, setNombre] = React.useState('10');
    const [currentForm, setCurrentForm] = useState("")
    const handleMenuClick = (link)=>{
      setCurrentForm(link);
      console.log(link);
    }
    const handleChange = (event) => {
        setNombre(event.target.value);
      };
    
  return (
    <div id='home'>
      <Header/>
      <Container>

      <Row>
         <Col sm={8} className='content'>
           <Title text="Scan des applications à problème"/>
           <div style={{display:"flex",marginTop:"2%"}}>
            <div className='mb-4' >
             <InputLabel sx={{marginLeft:"6%"}} id="demo-simple-select-label">Date début</InputLabel>&nbsp;
             <TextField variant='outlined'  size='small' type='date' sx={{width:"250px",marginRight:"35px"}}/>
             </div>
             <div className='mb-4' >
             <InputLabel sx={{marginLeft:"6%"}} id="demo-simple-select-label">Date Fin</InputLabel>&nbsp;
             <TextField variant='outlined'  size='small' type='date' sx={{width:"250px",marginRight:"35px"}}/>
             </div>
             <div  className='mb-4' id='search'>
              <Button style={{ backgroundColor:"#d9534f", borderColor: " #d9534f",width:"70px"}}><FaSearch/></Button> 
             </div>     
           </div>
          <div className='col-xs-12 col-sm-6 col-md-4' style={{position:"absolute",width:"57%"}}>
              <Grid >
                <h5 className=' alert alert-info' style={{fontSize:"14px",fontFamily:"inherit",fontWeight:"500",color:"#31708F"}}>
                Resultat de la dernière recherche : | Date Fin : init | Date début : init
                 </h5>
              </Grid>
          </div>
            <br /> <br /> <br />
            <Button style={{backgroundColor:"#5cb85c",border:"#449D44",fontSize:"14px",fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif"}}> <FaPlusCircle/> Création probléme</Button>
            <br /> <br />
       <br />
          </Col>
          <Col sm={4} style={{marginTop:"3%"}}>
               <MenuPersoGesProbleme propsMenuItems={ ScannerProblemeItemsMenu} onItemClick={handleMenuClick}/>
            </Col>
      </Row>
      </Container>
       {/* <div>
         <Header/>
        </div>
        <div  style={{position:"relative"}}>
        <MenuPersoGesIncident  propsMenuItems={ScannerProblemeItemsMenu} onItemClick={handleMenuClick}  />
        </div>
        <div style={{position:"relative",top:"30%"}}>
        <NavigatePerso propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick}  />
        </div>
        <Container>
         <div id='title'>
            <Row>
            <Col xs={9} className='content'>
            <Title text="Scan des applications à problème"/>
            </Col> 
            </Row>
         </div>
         <br />
         <div style={{display:"flex"}}>
            <div className='mb-4' >
             <InputLabel sx={{marginLeft:"6%"}} id="demo-simple-select-label">Date début</InputLabel>&nbsp;
             <TextField variant='outlined'  size='small' type='date' sx={{width:"250px",marginRight:"35px"}}/>
             </div>
             <div className='mb-4' >
             <InputLabel sx={{marginLeft:"6%"}} id="demo-simple-select-label">Date Fin</InputLabel>&nbsp;
             <TextField variant='outlined'  size='small' type='date' sx={{width:"250px",marginRight:"35px"}}/>
             </div>
             <div  className='mb-4' id='search'>
              <Button style={{ backgroundColor:"#d9534f", borderColor: " #d9534f",width:"70px"}}><FaSearch/></Button> 
             </div>     
        </div>
          <div className='col-xs-12 col-sm-6 col-md-4' style={{position:"absolute",width:"66%"}}>
              <Grid >
                <h5 className=' alert alert-info' style={{fontSize:"14px",fontFamily:"inherit",fontWeight:"500",color:"#31708F"}}>
                Resultat de la dernière recherche : | Date Fin : init | Date début : init
                 </h5>
              </Grid>
            </div>
            <br /> <br /> <br />
            <Button style={{backgroundColor:"#5cb85c",border:"#449D44",fontSize:"14px",fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif"}}> <FaPlusCircle/> Création probléme</Button>
            <br /> <br />
         <div style={{marginLeft:"2%"}}>
          <label className='=label'> Afficher</label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
            size='small'
            value={nombre} >
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="25">25</MenuItem>
                <MenuItem value="50">50</MenuItem>
                <MenuItem value="100">100</MenuItem>         
          </Select><label>elements</label>
        </div>
        <div style={{marginLeft:"40%",position:"absolute",top:"61%"}}>
       <label >Rechercher: </label> &nbsp;
       <TextField  variant='outlined' size='small'/>
       </div>
       <br />
       <TableGesProblemeScan/>
        </Container>
    </div> */}
    </div>
  )
}

export default ScannerProbleme