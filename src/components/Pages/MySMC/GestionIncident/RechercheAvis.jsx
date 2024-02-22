import React,{useState} from 'react'
import Header from '../../../Header/Header'
import useAuth from '../../Auth/useAuth'
import MenuPersoGesIncident from './MenuPersoGesIncident'
import NavigatePerso from './NavigatePerso'
import { FaList,FaSearch,FaHome,FaChartLine } from "react-icons/fa";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import { Container,Row,Col,Button } from 'react-bootstrap'
import Title from '../../../Card/Title/Title'
import { InputLabel,TextField,Grid } from '@mui/material'


const ajoutAvisItemsMenu =[
    {label: " Lister les avis d'incidents", link: "/mysmc/gestionincident",icon:FaList},
    { label: " Rechercher avis", link: "/gestionincident/rechercheavis",icon:FaSearch},
    { label: " Statistique avis d'incidents", link: "/gestionincident/statistique",icon:FaChartLine, }
    ];
    const gestionIncidentItemsNavigate =[
      {label: " Gestion Incidents", link: "/mysmc/gestionincident",icon:ReportProblemIcon},
      { label: " Gestion Probleme", link: "/mysmc/gestionprobleme",icon:ReportProblemIcon},
      { label: " Etat Supervision", link: "/mysmc/etatsupervision", icon:RiDashboard3Line},
      { label: " Consignes Orchestrées", link: "#"},
      { label: " Suivi Activités ", link: "/mysmc/suivisactivites", icon:IoStatsChart},
      { label: " Page d'acceuil", link: "/mysmc",icon: FaHome },
      ];

function RechercheAvis() {
    useAuth()
    const [currentForm, setCurrentForm] = useState("")
    const handleMenuClick = (link)=>{
        setCurrentForm(link);
        console.log(link);
      }
  return (
    <div id='home'>
        <div>
         <Header/>
         </div>   
    <div>
        <div style={{position:"relative",top:"120%"}}>
        <MenuPersoGesIncident  propsMenuItems={ajoutAvisItemsMenu} onItemClick={handleMenuClick}  />
        </div>
        <div>
        <NavigatePerso propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick}  />
        </div>
    </div>
    <Container>
        <div id='title'>
        <Row>
         <Col xs={9} className='content'>
          <Title text="Recherche des avis"/>
         </Col> 
         </Row>
        </div>
        <br />
        <div style={{display:"flex"}}>
         <div className='mb-4' >
             <InputLabel sx={{marginLeft:"6%"}} id="demo-simple-select-label">Numéro avis</InputLabel>&nbsp;
             <TextField variant='outlined'  size='small' placeholder='Ex:XXX' sx={{width:"130px",marginRight:"35px"}}/>
             </div>
             <div className='mb-4' >
             <InputLabel sx={{marginLeft:"6%"}} id="demo-simple-select-label">Date début</InputLabel>&nbsp;
             <TextField variant='outlined'  size='small' type='date' sx={{marginRight:"35px"}}/>
             </div>
             <div className='mb-4' >
             <InputLabel sx={{marginLeft:"6%"}} id="demo-simple-select-label">Date Fin</InputLabel>&nbsp;
             <TextField variant='outlined'  size='small' type='date' sx={{marginRight:"35px"}}/>
             </div>
             <div className='mb-4' >
             <InputLabel sx={{marginLeft:"6%"}} id="demo-simple-select-label">Application</InputLabel>&nbsp;
             <TextField variant='outlined'  size='small'placeholder='Ex:OrangeMoney' sx={{width:"170px",marginRight:"27px"}}/>
             </div>
             <div  className='mb-4' id='search' >
              <Button style={{ backgroundColor:" #C9302C", borderColor: " #C9302C"}}><FaSearch/></Button>
             </div>

            </div>
            <div className='col-xs-12 col-sm-6 col-md-4' style={{position:"absolute",width:"66%"}}>
              <Grid >
                  <h5 className=' alert alert-info' style={{fontSize:"14px",fontFamily:"inherit",fontWeight:"500",color:"#31708F"}}>
                      Information : Merci d'effectuer une recherche au préalable pour afficher les avis
                  </h5>
              </Grid>
          </div>

             
        <div>

        </div>
    </Container>
    </div>
  
   
     
  )
}

export default RechercheAvis