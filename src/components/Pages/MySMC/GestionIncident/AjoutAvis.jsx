import React,{useState} from 'react'
import useAuth from '../../Auth/useAuth'
import Header from '../../../Header/Header'
import { Container,Row,Col,Table } from 'react-bootstrap'
import Title from '../../../Card/Title/Title'
import './ajoutavis.css'
import { FaList,FaSearch,FaHome } from "react-icons/fa";
import StackedLineChartTwoToneIcon from '@mui/icons-material/StackedLineChartTwoTone';
import MenuPersoGesIncident from './MenuPersoGesIncident'
import NavigatePerso from './NavigatePerso'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import '../../../Pages/MySMC/Menu/menumysmc.css'
import Titleges from './Titleges'
import {Card, CardContent, TextField, InputLabel,Select,MenuItem} from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import { Button } from 'react-bootstrap'


const ajoutAvisItemsMenu =[
  {label: " Lister les avis d'incidents", link: "/mysmc/gestionincident",icon:FaList},
  { label: " Rechercher avis", link: "/gestionincident/rechercheavis",icon:FaSearch},
  { label: " Statistique avis d'incidents", link: "/gestionincident/statistique",icon:StackedLineChartTwoToneIcon}
  ];
  const gestionIncidentItemsNavigate =[
    {label: " Gestion Incidents", link: "/mysmc/gestionincident",icon:ReportProblemIcon},
    { label: " Gestion Probleme", link: "/mysmc/gestionprobleme",icon:ReportProblemIcon},
    { label: " Etat Supervision", link: "/mysmc/etatsupervision", icon:RiDashboard3Line},
    { label: " Consignes Orchestrées", link: "#"},
    { label: " Suivi Activités ", link: "/mysmc/suivisactivites", icon:IoStatsChart},
    { label: " Page d'acceuil", link: "/mysmc",icon: FaHome },
    ];
   
function AjoutAvis() {
    useAuth()
    const [nature, setNature] = React.useState('SI');
    const [type, setType] = React.useState("choisir le type d'avis");
    const [service, setService] = React.useState("Application Test");
    const [valide, setValide] = React.useState("choisir la liste validation");
    const [diffusion, setDiffusion] = React.useState("choisir la liste diffusion");
    const [cause, setCause] = React.useState("Cause Retard Notification");
    const [currentForm, setCurrentForm] = useState("")

    const handleMenuClick = (link)=>{
      setCurrentForm(link);
      console.log(link);
    }
    
  
    const handleChangeNature = (event) => {
      setNature(event.target.value);
    };
    const handleChangeType = (event) => {
      setType(event.target.value);
    };
    const handleChangeService = (event) => {
      setService(event.target.value);
    };
    const handleChangeValide = (event) => {
      setValide(event.target.value);
    };
    const handleChangeDiffusion = (event) => {
      setDiffusion(event.target.value);
    };
    const handleChangeCause = (event) => {
      setCause(event.target.value);
    };


  return (
    <div id='home'>
    <Header/>
    <br />
      <Container  className='body'style={{marginLeft:"5%"}}>
        <Row>
          <Col sm={8} className='content'>
          <Title text="Gestion des avis d'incidents - Formulaire de déclaration d'avis"/>
          <br />
              <Table className="custom-table" bordered striped id='ajoutavis'>
            <thead>
              <tr>
              <th  colSpan={3} id='text'> 	<ReportProblemIcon sx={{height:"18px"}}/>Consignes obligatoires à respecter</th>
              </tr>
            </thead>
            <tbody style={{fontSize:".9em",fontWeight:"500"}} >
                      
                      <tr>
                        <td> Delai de diffusion</td>
                        <td colSpan={2}>45 minutes après détection même si les TMC ne valident pas.</td>
                      </tr>
                        
                      <tr>
                        <td>Delai de traitement</td>
                        <td  colSpan={2}>4 heures après détection - Envoyez un état d'avancement chaque 4h.</td>
                      </tr>  
            </tbody>
        </Table>
        </Col>
    <Col sm={4}>
     <MenuPersoGesIncident propsMenuItems={ajoutAvisItemsMenu} onItemClick={handleMenuClick}  />
    </Col>
        </Row>
        <br />
        <Row>
          <Col sm={8}>
          <Titleges text="Correspondance avis"/>
        <Card className='form'  sx={{borderRadius:'8px',width:"45%"}}>
                 <CardContent className='p-3' sx={{padding:"0px"}}>
                   <form>
                     <div className='mb-4 align-right'>
                     <InputLabel sx={{fontSize:"14",fontFamily: "fantasy",color:"#000"}} id="demo-simple-select-label"> Objet</InputLabel>&nbsp;
                       <TextField  id='textfield' variant='outlined'  size='small' placeholder='objet avis' required/>
                     </div>
                     <div className='mb-4 align-right'>
                     <InputLabel id="demo-simple-select-label"> Nature</InputLabel>&nbsp;
                   
                     <Select
                          labelId="demo-simple-select-label"
                          id='textfield'
                          label="TYPE DE TRANSACTION"
                          onChange={handleChangeNature}
                          size='small'
                          value={nature} 
                          required
                      >
                          <MenuItem value="SI">{nature}</MenuItem>
                          <MenuItem value="DATA">DATA</MenuItem>
                          <MenuItem value="CONTENU">CONTENU</MenuItem>
                      </Select>
                     </div>
                     <div className='mb-4 align-right'>
                     <InputLabel id="demo-simple-select-label"> Type avis</InputLabel>&nbsp;
                     <Select
                          labelId="demo-simple-select-label"
                          id='textfield'
                          onChange={handleChangeType}
                          size='small'
                          value={type} 
                          required
                      >
                          <MenuItem value="choisir le type d'avis">{type}</MenuItem>
                          <MenuItem value="Normale">Normale</MenuItem>
                          <MenuItem value="Regularisation">Regularisation</MenuItem>
                          <MenuItem value="Information">Information</MenuItem>
                      </Select>
                     </div>
                     <div className='mb-4 align-right'>
                     <InputLabel id="demo-simple-select-label">Service impacté</InputLabel>&nbsp;
                     <Select
                          labelId="demo-simple-select-label"
                          id='textfield'
                          onChange={handleChangeService}
                          small
                          value={service} 
                          required
                      >
                          <MenuItem value="Application Test">{service}</MenuItem>
                          <MenuItem value="Active Directory">Active Directory</MenuItem>
                          <MenuItem value="Ascade">Ascade</MenuItem>
                          <MenuItem value="ASP">ASP</MenuItem>
                      </Select>
                     </div>
                     <div className='mb-4 align-right'>
                     <InputLabel id="demo-simple-select-label">Liste Validation</InputLabel>&nbsp;
                     <Select
                          labelId="demo-simple-select-label"
                          id='textfield'
                          onChange={handleChangeValide}
                          size='small'
                          value={valide} 
                          required
                      >
                          <MenuItem value="choisir la liste de validation">{valide}</MenuItem>
                          <MenuItem value="TestValidation">TestValidation</MenuItem>
                          <MenuItem value="Liste_Test_Deploiement">Liste_Test_Deploiement</MenuItem>
                          <MenuItem value="ListeValidationMoctar">ListeValidationMoctar</MenuItem>
                      </Select>
                     </div>
                     <div className='mb-4 align-right' >
                     <InputLabel id="demo-simple-select-label">Liste Diffusion</InputLabel>&nbsp;
                     <Select
                          labelId="demo-simple-select-label"
                          id='textfield'
                          onChange={handleChangeDiffusion}
                          small
                          value={diffusion} 
                          required
                      >
                          <MenuItem value="Choisir la liste de diffusion">{diffusion}</MenuItem>
                          <MenuItem value="Test">Test</MenuItem>
                          <MenuItem value="Liste Application">Liste Application</MenuItem>
                          <MenuItem value="Selfcare B2C/B2B">Selfcare B2C/B2B</MenuItem>
                      </Select>
                     </div>
                     <div className='mb-4 align-right'>
                     <InputLabel id="demo-simple-select-label">Date Début</InputLabel>&nbsp;
                       <TextField id='textfield' variant='outlined'  size='small'type='date' required/>
                     </div>
                     <div className='mb-4 align-right' >
                     <InputLabel id="demo-simple-select-label">Date Détection</InputLabel>&nbsp;
                       <TextField id='textfield' variant='outlined'  size='small' type='date' required/>
                     </div>
                     <div className='mb-4 align-right'>
                     <InputLabel id="demo-simple-select-label">Ticket EZV</InputLabel>&nbsp;
                       <TextField id='textfield' variant='outlined'  size='small' placeholder='Numero ticket EasyVista'/>
                     </div>
                     <div className='mb-4 align-right'>
                     <InputLabel id="demo-simple-select-label">Ticket Oceane</InputLabel>&nbsp;
                       <TextField id='textfield' variant='outlined'  size='small' placeholder='Numero ticket Oceane'/>
                     </div>
                     
                   </form>
                    </CardContent>
                  </Card>
                  <div   style={{marginLeft:"29%",position:"absolute",top:"60%",marginBottom:"10px",padding:"10px",width:"62%"}}>
                <Titleges  text="Causes et impacts" />
            </div>
                  <Card className='form'  sx={{borderRadius:'8px',marginLeft:"30%",position:"absolute",top:"77%",width:"27%"}}>
                 <CardContent className='p-3' sx={{padding:"0px"}}>
                   <form>
                     <div className='mb-4 align-right' style={{display:"flex"}}>
                     <InputLabel id="demo-simple-select-label">Impacts</InputLabel>&nbsp;
                       <TextareaAutosize  id='textfield'  variant='outlined'  size='small' placeholder='Comment les utisateurs perçoivent le dysfonctionnement' required/>
                     </div>
                     <div className='mb-4 align-right' style={{display:"flex"}}>
                     <InputLabel id="demo-simple-select-label">Cause Retard Notif.</InputLabel>&nbsp;
                   
                     <Select
                          labelId="demo-simple-select-label"
                          id='textfield'
                          onChange={handleChangeCause}
                          size='small'
                          value={cause} 
                          required
                      >
                          <MenuItem value="Cause Retard Notification">{cause}</MenuItem>
                          <MenuItem value="Non Supervisé">Non Supervisé</MenuItem>
                          <MenuItem value="Retard Diffusion">Retard Diffusion</MenuItem>
                      </Select>
                     </div>
                     <div className='mb-4 align-right' style={{display:"flex"}}>
                     <InputLabel id="demo-simple-select-label">Origine Cause</InputLabel>&nbsp;
                     <Select
                          labelId="demo-simple-select-label"
                          id='textfield'
                          onChange={handleChangeType}
                          size='small'
                          value={type} 
                          required
                      >
                          <MenuItem value="Definir une origine">{type}</MenuItem>
                          <MenuItem value="Réseau">Réseau</MenuItem>
                          <MenuItem value="Systeme">Systeme</MenuItem>
                          <MenuItem value="Base de donneés">Base de donneés</MenuItem>
                      </Select>
                     </div>
                     <div className='mb-4 align-right' style={{display:"flex"}}>
                     <InputLabel id="demo-simple-select-label">Causes Problables</InputLabel>&nbsp;
                     <TextareaAutosize   id='textfield' variant='outlined'  size='small' placeholder='(*) Demander systématiquement aux TMC(s) les causes probables
                         (*) Eviter les expressions « Investigations en Cours » ; « causes inconnues » et préférer mettre « constat : xxxxxxxx »' required/>
                     </div>
                     <div className='mb-4 align-right' style={{display:"flex"}}>
                     <InputLabel id="demo-simple-select-label">Observations</InputLabel>&nbsp;
                     <TextareaAutosize  id='textfield'  variant='outlined'  size='small' placeholder='Renseigner les observations' required/>
                     </div>
                   </form>
                    </CardContent>
                  </Card>
          </Col>
          <Col sm={4}>
          <NavigatePerso propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick}  />
          </Col>
        </Row>
        <hr />
        <div className='col-sm-12' id='bouton'> 
         <Button style={{backgroundColor:"#5cb85c",border:"#449D44",fontSize:"14px",fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif",color:"white"}}>Creation avis</Button>
          &nbsp; &nbsp;
          <Button style={{backgroundColor:"#C9302C",border:"#449D44",fontSize:"14px",fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif",color:"white"}}>Annulation avis</Button>
          </div>
          <br /><br />
          <br /> <br />
      </Container>
   </div>

  )
}

export default AjoutAvis