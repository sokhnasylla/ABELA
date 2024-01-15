import React, {useState} from 'react'
import Header from '../../../Header/Header'
import useAuth from '../../Auth/useAuth'
import { Col, Container, Row, Table } from 'react-bootstrap';
import Title from '../../../Card/Title/Title';
import { Grid,Select,MenuItem, InputLabel,TextField } from '@mui/material';
import "../../MySMC/Menu/menumysmc.css"
import MenuPerso from '../../../Card/MenuPerso/MenuPerso';
import TableGesIncident from './TableGesIncident/TableGesIncident'




const gestionIncidentItemsMenu =[
{label: " Ajouter un nouvel avis", link: "#"},
{ label: " Rechercher avis", link: "#"},
{ label: " Statistique avis d'incidents", link: "#"}
];

function GestionIncident() {
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
    <div>
    <MenuPerso propsMenuItems={gestionIncidentItemsMenu} onItemClick={handleMenuClick} />
    </div>
    <br />
    <Container className='body'style={{marginLeft:"5px"}}>
        <Row>
         <Col xs={12} className='content'>
          <Title text="Gestion des avis d'incidents - Indicateurs du mois en cours : Janvier 2024"/>
         </Col> 
         </Row>
       <br />
        <div className='col-xs-12 col-sm-6 col-md-2' style={{position:"absolute",marginLeft:"2%"}}>
         <Grid className='panel' sx={{}}>
            <h5 style={{fontSize:"14px",fontFamily:"inherit",fontWeight:"500"}}>Taux notification</h5>
         </Grid>
         <center><h2>67%</h2></center>
        </div>
        <div className='col-xs-12 col-sm-6 col-md-2' style={{position:"absolute",marginLeft:"20%"}}>
         <Grid className='panel' sx={{backgroundColor:"#DFF0D8",border:"#DFF0D8"}}>
            <h5 style={{fontSize:"14px",fontFamily:"inherit",fontWeight:"500",color:"#3C763D"}}>Taux détection</h5>
         </Grid>
         <center><h2>83%</h2></center>
        </div>
        <div className='col-xs-12 col-sm-6 col-md-2' style={{position:"absolute",marginLeft:"38%"}}>
         <Grid className='panel' sx={{backgroundColor:"#D9EDF7",border:"#D9EDF7"}}>
            <h5 style={{fontSize:"14px",fontFamily:"inherit",fontWeight:"500",color:"#31708F"}}>Taux résolution 4h</h5>
         </Grid>
         <center><h2>83%</h2></center>
        </div>
        <div className='col-xs-12 col-sm-6 col-md-2' style={{position:"absolute",marginLeft:"56%"}}>
         <Grid className='panel' sx={{backgroundColor:"#D9EDF7",border:"#D9EDF7"}}>
            <h5 style={{fontSize:"14px",fontFamily:"inherit",fontWeight:"500",color:"#31708F"}}>Taux résolution 24h</h5>
         </Grid>
         <center><h2>83%</h2></center>
        </div>
        <br /> <br /> <br /> <br />
        <div>
        <Row>
         <Col xs={12} className='content'>
          <Title text="Liste des avis d'incidents / d'information en cours"/>
         </Col> 
         </Row>
         </div>
         <br />
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
        <div style={{marginLeft:"46%",position:"absolute",top:"55%"}}>
       <label >Rechercher: </label> &nbsp;
       <TextField  variant='outlined' size='small'/>
       </div>
       <br />
       <TableGesIncident/>
       </Container>
      
    </div>
  )
}

export default GestionIncident