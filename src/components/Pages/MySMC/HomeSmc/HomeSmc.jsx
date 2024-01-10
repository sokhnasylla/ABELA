import React from 'react'
import { InputLabel ,TextField,Select,MenuItem} from '@mui/material'
import { Button, Card, Col, Container,Row } from 'react-bootstrap'
import menupng from "../../../../assets/menu.png"
import MenuLeft from '../../../Card/MenuLeft/MenuLeft'
import { TfiBlackboard } from "react-icons/tfi";
import { FaLink ,FaSignal,FaPlusCircle} from "react-icons/fa";
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import Timeline from '@mui/lab/Timeline';
import TimelineItem , { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./homesmc.css"
import useAuth from '../../Auth/useAuth';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:' 55%',
  height:'70%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
 
};

const submenu=[
    {'text':"Informations","icon":TfiBlackboard
  },
    {'text':"Liens Utiles",'icon':FaLink
  },
    {'text':"Automatique reporting", 'icon':FaSignal}
  ]
  
function HomeSmc() {
  useAuth()
  const [mode, setMode] = React.useState('ATP');
    const [type, setType] = React.useState('Faible');

    const handleChange = (event) => {
      setMode(event.target.value);
    };
    const handleChanges = (event) => {
       setType(event.target.value);
      };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
   <div id='homsmc'>
        <Row>
            
            <Col >
            <fieldset>
				<legend style={{fontSize: "21px",color: "#333",borderBottom: "1px solid #e5e5e5",fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif"}}>
                    <span style={{float:"left",marginRight: "10px"}}>
                        <img src={menupng}/>
                    </span> Rubrique des informations utiles
                </legend>
			</fieldset>
            <br/>
            </Col>
        </Row>
        <Row>
            <Col>
                <MenuLeft submenu={submenu}/>
            </Col>
            <Col xs={10}>
            <Container className='blockinf' style={{borderBottom: "1px solid #e5e5e5"}}>
                <Button style={{backgroundColor:"#5cb85c",border:"#449D44",fontSize:"14px",fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif"}} onClick={handleOpen}> <FaPlusCircle/>   Partager une information</Button>
                <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
<CancelIcon sx={{ color: "#C9302C",cursor:"pointer",marginLeft:"91%",position:'fixed',top:'2px'}} onClick={handleClose}/>
          <Typography id="modal-modal-title" variant="h6" component="h6">
          <InfoIcon sx={{ color: "#148C8A" }}/> Vous souhaitez partager une information avec vos collaborateurs ?        

          </Typography>
          <hr />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           <InputLabel sx={{}}>Titre</InputLabel>
           <TextField  variant='outlined' size='small' fullWidth  placeholder='minimum 3 caratéres' required/>
           <InputLabel>Type</InputLabel>
           <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={handleChange}
                        fullWidth
                        value={mode}
                        size='small'
                        required >
                        <MenuItem value="ATP">ATP</MenuItem>
                        <MenuItem value="Supervision">Supervision</MenuItem>
                        <MenuItem value="Maintenance">Maintenance</MenuItem>
                        <MenuItem value="Nouveautés">Nouveautés</MenuItem>
                        
                      </Select>
           <InputLabel>Message</InputLabel>
           <TextField  variant='outlined'size='small'  fullWidth  placeholder='minimum 3 caratéres' required/>
           <InputLabel>Criticité</InputLabel>
           <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={handleChanges}
                        fullWidth
                        value={type}
                        size='small'
                        required>
                        <MenuItem value="Faible">Faible</MenuItem>
                        <MenuItem value="Moyen">Moyen</MenuItem>
                        <MenuItem value="Haute">Haute</MenuItem> 
                      </Select>
          </Typography>
          <br />
          <Button style={{backgroundColor:"#5cb85c",border:"#449D44",fontSize:"14px",fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif",marginLeft:"77%"}}>valider</Button>
          &nbsp;<Button style={{backgroundColor:"#C9302C",border:"#449D44",fontSize:"14px",fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif"}}>annuler</Button>
        </Box>
      </Modal>
                  
                  <hr />
               
    <Timeline   sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },height:"400px",
        overflowY:"auto",
        position:"relative",

      }}>
      <TimelineItem>
        <TimelineSeparator>
        
          <TimelineDot variant="outlined" color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{fontSize:"14px",fontFamily:"inherit"}}> <b> nouveau lien ELK</b>
        &nbsp;<span style={{backgroundColor:"#148C8A",color:"white",borderRadius: "5px",fontSize:"14px",padding:"2px"}}>Criticité : Faible</span>
        <h6 style={{color:"#ea7714",fontSize:"12px"}}>2023-05-10 19:11:47, TMP_CISSE58568</h6>
       <i > https://observability.seetlu.orange-sonatel.com/spaces/space_selector</i>
       </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{fontSize:"14px",fontFamily:"inherit"}}> <b> CONFIGURATION ANSIBLE SUR LES DEMANDES DE SUPERVISION </b>
        &nbsp;<span style={{backgroundColor:"#148C8A",color:"white",borderRadius: "5px",fontSize:"14px",padding:"2px"}}>Criticité : Haute</span>
        <h6 style={{color:"#ea7714",fontSize:"12px"}}>2023-04-26 11:08:52, FALL028018</h6>
        <i>Bonjour, Pour les nouvelles demandes de Supervision , Merci de configurer systématiquement dans MYSMC l'orchestration ansible des partitions / pour linux et C ou systéme pour windows</i>
        
        </TimelineContent>
      </TimelineItem><br />
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{fontSize:"14px",fontFamily:"inherit"}}> <b>Test </b>
        &nbsp;<span style={{backgroundColor:"#148C8A",color:"white",borderRadius: "5px",fontSize:"14px",padding:"2px"}}>Criticité : Faible</span>
        <h6 style={{color:"#ea7714",fontSize:"12px"}}>2023-04-19 08:44:18, admin</h6>
        <i>Test</i>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="primary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{fontSize:"14px",fontFamily:"inherit"}}> <b>DEPOSE MESSAGERIE PRO </b>
        &nbsp; <span style={{backgroundColor:"#148C8A",color:"white",borderRadius: "5px",fontSize:"14px",padding:"2px"}}>Criticité : Moyen</span>
        <h6 style={{color:"#ea7714",fontSize:"12px"}}>2023-03-16 10:08:33, FALL028018</h6>
        <i>Bonjour, La messagerie Pro est deposée. j'ai mis les scenarii en maintenance. Les clients sont migré sur Hostopiacloud qu'on supervise déja.</i>
        </TimelineContent>
      </TimelineItem><br />
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="primary"/>
        </TimelineSeparator>
        <TimelineContent sx={{fontSize:"14px",fontFamily:"inherit"}}> <b>BOUCLE DE DIFFUSION DES INCIDENTS SUR API MANAGEMENT OU TANGO: API MANAGEMENT-TANGO</b> 
        &nbsp;<span style={{backgroundColor:"#148C8A",color:"white",borderRadius: "5px",fontSize:"14px",padding:"2px"}}>Criticité : Haute</span>
        <h6 style={{color:"#ea7714",fontSize:"12px"}}>2023-03-08 15:47:24, FALL028018</h6>
         <i>Bonjour, Merci d'utiliser la boucle de diffusion ''API MANAGEMENT-TANGO'' pour les incidents sur API Management ou Tango</i>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="primary"/>
        </TimelineSeparator>
        <TimelineContent sx={{fontSize:"14px",fontFamily:"inherit"}}> <b>NOUVELLES APPLICATIONS PRESENTES SUR RAS ET NON SUR NEWTEST</b>
        &nbsp;<span style={{backgroundColor:"#148C8A",color:"white",borderRadius: "5px",fontSize:"14px",padding:"2px"}}>Criticité : Haute</span>
        <h6 style={{color:"#ea7714",fontSize:"12px"}}>2023-02-23 12:04:06, Diatta028833</h6>
        <i>Bonjour team, pour info, merci de trouver ci-dessous les nouvelles applications intègrées sur RAS et qui ne sont pas prèsentes sur NEWTEST (A documenter sur CONFLUENCE) ASRC GDI QREDIC QUBEOGB QUBEOSL SIGNATURE70 ET 71 SWAPCHECK TESTMICROSERVICE TIDJI YILLI NEW INFORMAT RIAKTR 3cloud SONATEL.SN SYSWIN NIFIPRD1, 2 et 3</i>
        </TimelineContent>
      </TimelineItem><br /><br />
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="primary"/>
        </TimelineSeparator>
        <TimelineContent sx={{fontSize:"14px",fontFamily:"inherit"}}> <b>IRIS devient SYSWIN </b> 
        &nbsp;<span style={{backgroundColor:"#148C8A",color:"white",borderRadius: "5px",fontSize:"14px",padding:"2px"}}>Criticité : Moyen</span>
        <h6 style={{color:"#ea7714",fontSize:"12px"}}>2023-02-22 10:42:38, Diatta028833</h6>
        <i>Bonjour chers superviseurs, pour info IRIS devient SYSWIN merci d'en tenir compte</i>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="primary"/>
        </TimelineSeparator>
        <TimelineContent sx={{fontSize:"14px",fontFamily:"inherit"}}> <b>DEMARRAGE SUPERVISION SUR RAS</b>
        &nbsp;<span style={{backgroundColor:"#148C8A",color:"white",borderRadius: "5px",fontSize:"14px",padding:"2px"}}>Criticité : Haute</span>
        <h6 style={{color:"#ea7714",fontSize:"12px"}}>2023-02-22 10:40:30, Diatta028833</h6>
        <i>Chers Superviseurs, nous vous informons que la supervision sur le nouveau outil RAS a dèmarré, merci d'en tenir compte</i>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="primary"/>
        </TimelineSeparator>
        <TimelineContent sx={{fontSize:"14px",fontFamily:"inherit"}}> <b>Déploiement Release 3.2 MySMC </b>
        &nbsp;<span style={{backgroundColor:"#148C8A",color:"white",borderRadius: "5px",fontSize:"14px",padding:"2px"}}>Criticité : Haute</span>
        <h6 style={{color:"#ea7714",fontSize:"12px"}}>2021-12-28 22:35:37, admin</h6>
        <i>La release 3.2 a été déployé. Merci de remonter tous les dysfonctionnements notés à l'équipe des intégrateurs. Merci</i>
        </TimelineContent>
      </TimelineItem>
      
    </Timeline>

               
            </Container>
            </Col>
        </Row>
   </div>
  )
}

export default HomeSmc