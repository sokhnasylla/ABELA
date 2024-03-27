import {useState,useEffect} from 'react'
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
import axios from 'axios'
import GetSelect from '../../../API/GetSelect'


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
    const [nature, setNature] = useState('SI');
    const [type, setType] = useState("choisir le type d'avis");
    const [service, setService] = useState("Application Test");
    const [valide, setValide] = useState("choisir la liste validation");
    const [diffusion, setDiffusion] = useState("choisir la liste diffusion");
    const [causeRetard, setCauseRetard] = useState("Cause Retard Notification");
    const [origine,setOrigine]=useState("Définir une origine");
    const [currentForm, setCurrentForm] = useState("")
    const [typesAvis, setTypesAvis] = useState([]); // State pour stocker les types d'avis récupérés depuis l'API
    const [selectedType, setSelectedType] = useState(""); // State pour stocker le type d'avis sélectionné dans le Select
    const [selectedOption, setSelectedOption] = useState(null);

    // Fonction pour gérer l'option sélectionnée
    const handleSelectedOption = (option) => {
        setSelectedOption(option);
    };

    
  //   useEffect(() => {
  //     axios.get('http://localhost:8082/ABELA-MYSMC/api/gestionIncidents/typeavisincidents')
  //         .then(response => {
  //             // Récupérez les données des types d'avis depuis la réponse de l'API
  //             const data = response.data;
  //             // Mettez à jour le state avec les types d'avis récupérés depuis l'API
  //             setTypesAvis(data);
  //         })
  //         .catch(error => {
  //             console.error('Erreur lors de la récupération des types d\'avis depuis l\'API', error);
  //         });
  // }, []); 

    const handleMenuClick = (link)=>{
      setCurrentForm(link);
      console.log(link);
    }
    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = () => {

      const objet=document.getElementById("objet").value
      const dateDebut=document.getElementById("dateDebut").value
      const dateDetection=document.getElementById("dateDetection").value
      const ticketEzv=document.getElementById("ticketEzv").value
      const ticketOceane= document.getElementById("ticketOceane").value
      const impact=document.getElementById("impact").value
      const causeProbable= document.getElementById("causeProbable").value;
      const observations=document.getElementById("observation").value
      // const natures= document.getElementById("natures").value

      const typeAvisIncident=[
        {
          "id":selectedType
        }
      ]

      const formData = {
          objet,
          nature,
          typeAvisIncident,
          service,
          valide,
          diffusion,
          origine,
          dateDebut,
          dateDetection,
          ticketEzv,
          ticketOceane,
          impact,
          causeRetard,
          causeProbable,
          observations,
         
          // Ajoutez d'autres champs du formulaire si nécessaire
      };

      console.log(formData);
      // console.log(dateDebut,objet,dateDetection,ticketEzv,ticketOceane,impact,causeProbable,observations,nature);

      // Effectuez la requête vers l'API ici en utilisant fetch ou Axios
      // fetch('votre/api/url', {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json',
      //         // Ajoutez des headers supplémentaires si nécessaire
      //     },
      //     body: JSON.stringify(formData)
      // })
      // .then(response => {
      //     if (response.ok) {
      //         // Gérez la réponse en cas de succès
      //         console.log('Avis créé avec succès');
      //     } else {
      //         // Gérez la réponse en cas d'erreur
      //         console.error('Erreur lors de la création de l\'avis');
      //     }
      // })
      // .catch(error => {
      //     // Gérez les erreurs de requête
      //     console.error('Erreur lors de la requête', error);
      // });
  };



   
    const handleChangeNature = (event) => {
      setNature(event.target.value);
    };
    const handleChangeType = (event) => {
      setSelectedType(event.target.value);
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
      setCauseRetard(event.target.value);
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
                  {/* <div className='mb-4 align-right'>
                    <InputLabel className="demo-simple-select-label"> Type avis</InputLabel>&nbsp;
                    <Select
                        labelId="demo-simple-select-label"
                        className='textfield'
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
                  </div> */}
                 <GetSelect apiUrl="http://localhost:8082/ABELA-MYSMC/api/gestionIncidents/typeavisincidents" handleSelectedOption={handleSelectedOption}/>
                  <div className='mb-4 align-right'>
                    <InputLabel className="demo-simple-select-label">Services impactés</InputLabel>&nbsp;
                    <Select
                      labelId="demo-simple-select-label"
                      className='textfield'
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
                    <InputLabel className="demo-simple-select-label">Liste Validation</InputLabel>&nbsp;
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
                    <InputLabel className="demo-simple-select-label">Liste Diffusion</InputLabel>&nbsp;
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
                          onChange={handleChangeCause}
                          size='small'
                          value={causeRetard} 
                          required
                            >
                                <MenuItem value="Cause Retard Notification">{causeRetard}</MenuItem>
                                <MenuItem value="Non Supervisé">Non Supervisé</MenuItem>
                                <MenuItem value="Retard Diffusion">Retard Diffusion</MenuItem>
                      </Select>
                  </div>
                  <div className='mb-4 align-right' style={{display:"flex"}}>
                    <InputLabel className="demo-simple-select-label" value={origine}>Origine Cause</InputLabel>&nbsp;
                    <Select
                      labelId="demo-simple-select-label"
                      className='textfield'
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
          <Col sm={4}>
            <NavigatePerso propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick}  />
          </Col>
        </Row>
        <hr />
        <div className='col-sm-12' id='bouton' style={{display:"flex", justifyContent:"center",marginBottom:"10px"}}> 
         <Button style={{backgroundColor:"#5cb85c",border:"#449D44",fontSize:"14px",fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif",color:"white"}}
            onClick={handleSubmit} // Appel de la fonction handleSubmit lors du clic sur le bouton 
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

export default AjoutAvis