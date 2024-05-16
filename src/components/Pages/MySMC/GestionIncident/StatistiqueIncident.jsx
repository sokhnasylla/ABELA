import React,{useEffect, useState} from 'react'
import useAuth from '../../Auth/useAuth'
import Header from '../../../Header/Header'
import MenuPersoGesIncident from './MenuPersoGesIncident'
import NavigatePerso from './NavigatePerso'
import { FaList,FaSearch,FaHome,FaPaperclip } from "react-icons/fa";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import Title from '../../../Card/Title/Title'
import { Container,Row,Col,Button} from 'react-bootstrap'
import {InputLabel,TextField,Grid} from '@mui/material'
import Taux from '../../../Card/Taux'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../../Auth/authUtils'

const ajoutAvisItemsMenu =[
    {label: " Lister les avis d'incidents", link: "/mysmc/gestionincident",icon:FaList},
    { label: " Rechercher avis", link: "/gestionincident/rechercheavis",icon:FaSearch},
    ];
    const gestionIncidentItemsNavigate =[
      {label: " Gestion incidents", link: "/mysmc/gestionincident",icon:ReportProblemIcon},
      { label: " Gestion Probleme", link: "/mysmc/gestionprobleme",icon:ReportProblemIcon},
      { label: " Etat Supervision", link: "/mysmc/etatsupervision", icon:RiDashboard3Line},
      { label: " Consignes Orchestrées", link: "#",icon: FaPaperclip},
      { label: " Suivi Activités ", link: "/mysmc/suivisactivites", icon:IoStatsChart},
      { label: " Page d'acceuil", link: "/mysmc",icon: FaHome },
      ];

      
       


function StatistiqueIncident() {
    const token = getTokenFromLocalStorage();
    const [error,setError]=useState(null);
    const [currentForm, setCurrentForm] = useState("")
    const [etat,setEtat]=useState(false)
    const [loading,setLoding]=useState(false);
    const [text,setText]=useState("Information : Merci d'effectuer une recherche au préalable pour afficher les avis");
    const [dateDebut, setDateDebut] = useState(""); 
    const [dateFin, setDateFin] = useState(""); 
    const handleMenuClick = (link)=>{

        setCurrentForm(link);
        console.log(link);
      }
      
  const[totalAvisIncidents,setTotalAvisIncidents] = useState(null);
  const [totalAvisFermes,setTotalAvisFermes] = useState(null);
  const[totalAvisOuverts,setTotalAvisOuverts] = useState(null);
  const[totalAvisAnnules,setTotalAvisAnnules] = useState(null);
  const[totalAvisClosDetectionDelai,setTotalAvisClosDetectionDelai] = useState(null);
  const [totalAvisClosNotificationOnDelayCustom,setTotalAvisClosNotificationOnDelayCustom] = useState(null);
  const[tauxDetectionAvis,setTauxDetectionAvis] = useState(null);
  const[tauxNotificationAvis,setTauxNotificationAvis] = useState(null);
  const[tauxTraitement4H,setTauxTraitement4H] = useState(null);
  const[tauxTraitement24H,setTauxTraitement24H] = useState(null);

   useEffect(() => {
        const fetchData = async () => {
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            
            const response = await axios.get(`http://localhost:8082/abela-mysmc/api/v1/gestionIncidents/avisIncident/statistique/search?dateDebut=${dateDebut}&dateFin=${dateFin}`, config);            
             setTotalAvisIncidents(response.data.totalAvisIncidents);
             setTotalAvisFermes(response.data.totalAvisFermes);
             setTotalAvisOuverts(response.data.totalAvisOuverts);
             setTotalAvisAnnules(response.data.totalAvisAnnules);
             setTotalAvisClosDetectionDelai(response.data.totalAvisClosDetectionDelai);
             setTotalAvisClosNotificationOnDelayCustom(response.data.totalAvisClosNotificationOnDelayCustom);
             setTauxDetectionAvis(response.data.tauxDetectionAvis);
             setTauxNotificationAvis(response.data.tauxNotificationAvis);
             setTauxTraitement4H(response.data.tauxTraitement4H);
             setTauxTraitement24H(response.data.tauxTraitement24H);
             console.log(response.data.tauxNotificationAvis);
          } catch (error) {
            setError(`Erreur: ${error.message}`);
            setLoding(false)
          }
          
        };

        fetchData();
      }, [token, dateDebut, dateFin]);
     
  const handlesearcclick=()=>{
    const datedebut=document.getElementById("dateDebut").value
    const datefin=document.getElementById("dateFin").value
    setDateDebut(datedebut);
    setDateFin(datefin);
    setText(`Resultat de la dernière recherche :  Date Fin : ${datefin} | Date début : ${datedebut}` )
    setEtat(true)
    setLoding(true)

    
  }
  return (
<div id='home'>
     <Header/>
   
       <Container>
        <Row>
          <Col sm={8}>
          <Title text="Historique des avis"/>
          <br />
          <div style={{display:"flex"}}>
             <div className='mb-4' >
             <InputLabel sx={{marginLeft:"6%"}} id="demo-simple-select-label">Date début</InputLabel>&nbsp;
             <TextField id='dateDebut' variant='outlined'  size='small' type='date' sx={{width:"210px",marginRight:"30px"}}/>
             </div>
             <div className='mb-4' >
             <InputLabel sx={{marginLeft:"6%"}} id="demo-simple-select-label">Date Fin</InputLabel>&nbsp;
             <TextField id='dateFin'variant='outlined'  size='small' type='date' sx={{width:"210px",marginRight:"30px"}}/>
             </div>
             <div  className='mb-4' id='search'>
              <Button style={{ backgroundColor:"#d9534f", borderColor: " #d9534f",width:"210px"}} onClick={handlesearcclick}><FaSearch/>Obtenir Statistiques</Button> 
             </div>
          </div>
          <div className='col-xs-12 col-sm-6 col-md-4' style={{ width: "100%" }}>
            {(!dateDebut || !dateFin) && (
                <Grid >
                    <h5 className=' alert alert-info' style={{ fontSize: "14px", fontFamily: "inherit", fontWeight: "500", color: "#31708F" }}>
                       {text}
                    </h5>
                </Grid>
            )}
           </div>

            <hr />
          </Col>
          <Col sm={4} style={{marginTop:"3%"}}>
          <MenuPersoGesIncident  propsMenuItems={ajoutAvisItemsMenu} onItemClick={handleMenuClick}  />
          </Col>
        </Row>
        <Row style={{margin:"10px 10px"}}>
          <Col sm={8}>

            {etat && dateDebut && dateFin && loading &&(
              <div>
                    <Row>
              <Col>
              <Taux taux={totalAvisIncidents} text="Total des avis Incidents" background="#337ab7" color="white"/>
              </Col>
              <Col >
              <Taux taux={totalAvisFermes} text="Total des avis Fermés" background="#337ab7" color="white"/>
              </Col>
              <Col >
               <Taux taux={totalAvisOuverts} text="Total des avis ouverts" background="#337ab7" color="white"/>
              </Col>
            </Row>
             <Row style={{marginTop:"10px"}}>
              <Col>
              <Taux taux={totalAvisAnnules} text="Taux avis annulés" background="#337ab7" color="white"/>
              </Col>
              <Col >
              <Taux taux={totalAvisClosDetectionDelai} text="Total avis clos avec détection dans les délais" background="#337ab7" color="white"/>
              </Col>
              <Col >
               <Taux taux={totalAvisClosNotificationOnDelayCustom} text="Total avis clos avec notification dans les délais" background="#337ab7" color="white"/>
              </Col>
             </Row>
             <Row style={{marginTop:"10px"}}>
              <Col>
              <Taux taux={tauxNotificationAvis ? `${tauxNotificationAvis.toFixed()}%` : 'N/A'} text="Taux Notification incidents" background="#DFF0D8" color="#3c763d"/>
              </Col>
              <Col >
              <Taux taux={tauxDetectionAvis ? `${tauxDetectionAvis.toFixed()}%` : 'N/A'} text="Taux Detection incidents" background="#DFF0D8" color="#3c763d"/>
              </Col>
              <Col >
               <Taux taux={tauxTraitement4H ? `${tauxTraitement4H.toFixed()}%` : 'N/A'} text="Taux Traitement 4h" background="#DFF0D8" color="#3c763d"/>
              </Col>
             </Row>
             <Row style={{marginTop:"10px"}}>
             <Col >
               <Taux taux={tauxTraitement24H ? `${tauxTraitement24H.toFixed()}%`: 'N/A'} text="Taux Traitement 24h" background="#DFF0D8" color="#3c763d"/>
              </Col>
             </Row>
              </div>
            )}
        
          </Col>
          <Col sm={4}>
          <NavigatePerso  propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick} />
          </Col>
        </Row>
        
       </Container>
 </div>
  )
}

export default StatistiqueIncident