import React, { useState } from 'react'
import Header from '../../../../Header/Header'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap'
import MenuPersoGesProbleme from '../MenuPersoGesProbleme';
import { FaPlusCircle, FaSearch, FaHome, FaBars, FaArrowCircleDown} from 'react-icons/fa';
import { LuRefreshCcw } from "react-icons/lu";
import MenuDetails from './MenuDetails';
import Title from '../../../Dashboard/Title';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { InputLabel, MenuItem, Select, TextField, TextareaAutosize } from '@mui/material';
import NavigatePerso from '../../GestionIncident/NavigatePerso';
import { IoStatsChart } from "react-icons/io5";
import { RiDashboard3Line } from "react-icons/ri";
import Titleges from '../../GestionIncident/Titleges';




const gestionIncidentItemsNavigate =[
  {label: " Gestion incidents", link: "/mysmc/gestionincident",icon:ReportProblemIcon},
  { label: " Gestion Probleme", link: "/mysmc/gestionprobleme",icon:ReportProblemIcon},
  { label: " Etat Supervision", link: "/mysmc/etatsupervision", icon:RiDashboard3Line},
  { label: " Consignes Orchestrées", link: "#"},
  { label: " Suivi Activités ", link: "/mysmc/suivisactivites", icon:IoStatsChart},
  { label: " Page d'acceuil", link: "/mysmc",icon: FaHome },
  ];




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
    <br />
      <Container  className='body'>
        <Row>
          <Col sm={8} className='content'>
          <Card 
        style={{ display: 'flex',
                 flexDirection:"row",
                 alignItems: 'center',
                 justifyContent: 'space-around' ,
                 color:"#148C8A",
                 border:"2px solid #148C8A",
                 marginTop:"5%"
                 }}>
          <FaBars />
          <p style={{marginBottom: '0' }}>Details de problème N°P_03022023_093438</p>
        <FaArrowCircleDown />
      </Card>

      <Row>
              <Col>
              <Titleges text="Correspondance avis"/>
                <form>
                  <div className='mb-4 align-right'>
                    <InputLabel sx={{fontSize:"14",fontFamily: "fantasy",color:"#000"}} className="demo-simple-select-label"> 
                    Objet
                    </InputLabel>&nbsp;
                    <TextField  className='textfield'  id="objet" variant='outlined'  size='small' placeholder='objet avis' required/>
                  </div>
                  <div className='mb-4 align-right'>
                    <InputLabel className="demo-simple-select-label" > 
                      Nature
                    </InputLabel>&nbsp;
                    <Select
                     id="natures"
                      labelId="demo-simple-select-label"
                      className='textfield'
                      label="TYPE DE TRANSACTION"
                      size='small'
                      required
                          >
                              <MenuItem value="SI"></MenuItem>
                              <MenuItem value="DATA">DATA</MenuItem>
                              <MenuItem value="CONTENU">CONTENU</MenuItem>
                    </Select>
                  </div>
                   <div className='mb-4 align-right'>
                    <InputLabel className="demo-simple-select-label"> Type avis</InputLabel>&nbsp;
                    <Select
                        labelId="demo-simple-select-label"
                        className='textfield'
                        size='small'
                        required
                       >
                    {/* Mappez les types d'avis dans des éléments MenuItem */}
                   
                  </Select>
               </div>
                  <div className='mb-4 align-right'>
                    <InputLabel className="demo-simple-select-label">Services impactés</InputLabel>&nbsp;
                    <Select
                      labelId="demo-simple-select-label"
                      className='textfield'
                      small
                      required
                          >
                    </Select>
                  </div>
                  <div className='mb-4 align-right'>
                    <InputLabel className="demo-simple-select-label">Liste Validation</InputLabel>&nbsp;
                    <Select
                      labelId="demo-simple-select-label"
                      id='textfield'
                      size='small'
                      required
                          >
                    </Select>
                  </div>
                  <div className='mb-4 align-right' >
                    <InputLabel className="demo-simple-select-label">Liste Diffusion</InputLabel>&nbsp;
                    <Select
                      labelId="demo-simple-select-label"
                      id='textfield'
                      small
                      required
                          >

                    </Select>
                  </div>
                  <div className='mb-4 align-right'>
                    <InputLabel className="demo-simple-select-label">Date Début</InputLabel>&nbsp;
                    <TextField className='textfield' id='dateDebut' variant='outlined'  size='small'type='date' required/>
                  </div>
                  <div className='mb-4 align-right' >
                    <InputLabel className="demo-simple-select-label" >Date Détection</InputLabel>&nbsp;
                    <TextField className='textfield' id='dateDetection' variant='outlined'  size='small' type='date' required/>
                  </div>
                  <div className='mb-4 align-right'>
                    <InputLabel className="demo-simple-select-label" >Ticket EZV</InputLabel>&nbsp;
                    <TextField className='textfield' id='ticketEzv' variant='outlined'  size='small' placeholder='Numero ticket EasyVista'/>
                  </div>
                  <div className='mb-4 align-right'>
                    <InputLabel className="demo-simple-select-label" >Ticket Oceane</InputLabel>&nbsp;
                    <TextField className='textfield' id="ticketOceane" variant='outlined'  size='small' placeholder='Numero ticket Oceane'/>
                  </div>
                        
                </form>
  
              </Col>
              <Col>
                <Titleges  text="Causes et impacts" />
                <form>
                  <div className='mb-4 align-right' style={{display:"flex"}}>
                    <InputLabel className="demo-simple-select-label">Impacts</InputLabel>&nbsp;
                    <TextareaAutosize  id="impact"className='textfield'  variant='outlined'  size='small' placeholder='Comment les utisateurs perçoivent le dysfonctionnement' required/>
                  </div>
                  <div className='mb-4 align-right' style={{display:"flex"}}>
                      <InputLabel className="demo-simple-select-label">Cause Retard Notif.</InputLabel>&nbsp;
                      <Select
                          labelId="demo-simple-select-label"
                          className='textfield'
                          size='small'
                          required
                            >
                                <MenuItem value="Cause Retard Notification"></MenuItem>
                                <MenuItem value="Non Supervisé">Non Supervisé</MenuItem>
                                <MenuItem value="Retard Diffusion">Retard Diffusion</MenuItem>
                      </Select>
                  </div>
                  <div className='mb-4 align-right' style={{display:"flex"}}>
                    <InputLabel className="demo-simple-select-label" >Origine Cause</InputLabel>&nbsp;
                    <Select
                      labelId="demo-simple-select-label"
                      className='textfield'
                      size='small'
                      required
                            >
                    </Select>
                  </div>
                  <div className='mb-4 align-right' style={{display:"flex"}}>
                    <InputLabel className="demo-simple-select-label">Causes Problables</InputLabel>&nbsp;
                    <TextareaAutosize  id='causeProbable' className='textfield' variant='outlined'  size='small' placeholder='(*) Demander systématiquement aux TMC(s) les causes probables
                      (*) Eviter les expressions « Investigations en Cours » ; « causes inconnues » et préférer mettre « constat : xxxxxxxx »' required/>
                  </div>
                  <div className='mb-4 align-right' style={{display:"flex"}}>
                    <InputLabel className="demo-simple-select-label" >Observations</InputLabel>&nbsp;
                    <TextareaAutosize id='observation' className='textfield'  variant='outlined'  size='small' placeholder='Renseigner les observations' required/>
                  </div>
                </form>
              </Col>
            </Row>
          </Col>
          <Col sm={4} style={{marginTop:"3%"}}>
           <MenuDetails/>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={8}>
         
          </Col>
          <Col sm={4}>
         
          </Col>
        </Row>
        <hr />
        <div className='col-sm-12' id='bouton' style={{display:"flex", justifyContent:"center",marginBottom:"10px"}}> 
         <Button style={{backgroundColor:"#5cb85c",border:"#449D44",fontSize:"14px",fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif",color:"white"}}
            // Appel de la fonction handleSubmit lors du clic sur le bouton 
            >
          Creation avis
          
          </Button>
          &nbsp; &nbsp;
          <Button style={{backgroundColor:"#C9302C",border:"#449D44",fontSize:"14px",fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif",color:"white"}}>Annulation avis</Button>
        </div>
  
      </Container>
   </div>

  )
}

export default DetailsProbleme