import React,{Component} from 'react'
import Header from '../../Header/Header'
import { Container,Row,Col, Button } from 'react-bootstrap'
import MenuPersoGesIncident from '../MySMC/GestionIncident/MenuPersoGesIncident';
import Title from '../../Card/Title/Title';
import { FaHome, FaPaperclip} from "react-icons/fa";
import "../MySMC/GestionIncident/ajoutavis.css"
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { RiDashboard3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import { FaUserGroup } from 'react-icons/fa6';
import NavigatePerso from '../MySMC/GestionIncident/NavigatePerso';
import { InputLabel, TextField } from '@mui/material';
import FormKaabu from './FormKaabu';
import FormSimplissimo from './FormSimplissimo';
import getAllInfoUser from './kaabu.service';
import { AlertService } from '../../../utils/alert.service';
import FormNetwork from './FormNetwork';


class Kaabu extends Component {

 alertService = new AlertService();

  gestionIncidentItemsNavigate = [
    { label: "Gestion Incidents", link: "/mysmc/gestionincident", icon: ReportProblemIcon },
    { label: "Gestion Probleme", link: "/mysmc/gestionprobleme", icon: ReportProblemIcon },
    { label: "Etat Supervision", link: "/mysmc/etatsupervision", icon: RiDashboard3Line },
    { label: "Consignes Orchestrées", link: "#",icon: FaPaperclip },
    { label: "Suivi Activités ", link: "/mysmc/suivisactivites", icon: IoStatsChart },
    { label: "Page d'acceuil", link: "/mysmc", icon: FaHome },
  ];

  kaabuItemsMenus=[
      {label:"Espace Client",link:"/kaabu/espace/client",icon:FaUserGroup},
      {label:"Espace Vendeur",link:"/kaabu/espace/vendeur",icon:FaUserGroup}, 
  ];

  state = {
    data: null,
    loading: false
  };

  
  handleSearchClick = () => {
    this.setState({
      loading: true,
      data: null,
     });
    const identifiant = document.getElementById('identifiant').value;
      if (!identifiant || identifiant.trim() === "") {
        this.setState({
          loading: false,
         });
        return;
      }
      getAllInfoUser(identifiant).then((result) => {
        if(result) {
          if (result.success) {
            this.setState({
              data: result.data,
             });
          } else {
            this.alertService.showNotificationAlertError(result.message || 'Une erreur s\'est produite');
          }
        }
      })
      .finally(() => {
        this.setState({
          loading: false,
         });
      });
  }

  render() {
    return (
        <div id='home'>
            <Header />
            <Container className='body'>
                <Row>
                    <Col sm={8}>
                        <Title text="Espace Kaabu Mobile" />
                        <br />
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <div>
                                <InputLabel id="demo-simple-select-label">Identifiant</InputLabel>
                                <TextField id='identifiant' variant='outlined' size='small' placeholder='Login, Msisdn...' sx={{ width: "500px", maxWidth: "100%"}} />
                            </div>
                            <div>
                                <Button onClick={this.handleSearchClick} style={{ height: "40px", marginTop: "21px", width: "140px", backgroundColor: "#FF6600", borderColor: " #FF6600" }}>Rechercher</Button>
                            </div>
                        </div>
                        {this.state.loading && (
                            <div style={{ marginTop: "10px" }}>Chargement en cours...</div>
                        )}
                    </Col>
                    <Col sm={4} style={{ marginTop: "40px" }}>
                        <MenuPersoGesIncident propsMenuItems={this.kaabuItemsMenus} onItemClick={() => { }} />
                    </Col>
                </Row>
                <Row>
                  <Col sm={8}>
                          {(this.state.data) && (
                              <div>
                                  <br />
                                  <div >
                                      <FormKaabu userkaabu={this.state.data.userKaabu} />
                                      <FormSimplissimo simplissimo={this.state.data.userSimplissimo}/>
                                      <FormNetwork clientNetwork={this.state.data.clientNetwork} />
                                  </div>
                                  <br />
                              </div>
                          )}
                  </Col>
                  <Col sm={4} style={{ marginTop: "3%" }}>
                    <NavigatePerso propsMenuItems={this.gestionIncidentItemsNavigate} onItemClick={() => { }} />
                  </Col>
                </Row>
            </Container>
        </div>
    );
  }














  //   useAuth()
  //   const [currentForm, setCurrentForm] = useState("")
  
  //   const handleMenuClick = (link)=>{
  //     setCurrentForm(link);
  //     console.log(link);
  //   }
  //   const gestionIncidentItemsNavigate = [
  //     { label: "Gestion Incidents", link: "/mysmc/gestionincident", icon: ReportProblemIcon },
  //     { label: "Gestion Probleme", link: "/mysmc/gestionprobleme", icon: ReportProblemIcon },
  //     { label: "Etat Supervision", link: "/mysmc/etatsupervision", icon: RiDashboard3Line },
  //     { label: "Consignes Orchestrées", link: "#",icon:FaPaperclip},
  //     { label: "Suivi Activités ", link: "/mysmc/suivisactivites", icon: IoStatsChart },
  //     { label: "Page d'acceuil", link: "/mysmc", icon: FaHome },
  // ];
  //   const columns = [
  //     { name: 'Date Création', selector: 'dateCreation', sortable: true },
  //     { name: 'N°Avis', selector: 'numAvis', sortable: true },
  //     { name: 'Titre', selector: 'titre', sortable: true },
  //     { name: 'Etat', selector: 'etat', sortable: true },
  // ];
  
  // return (
  //   <div>
  //     <Header/>
  //     <br /><br />
  //     <Container className='body'>
  //     <Row>
  //       <Col>
  //       </Col>
  //       <Col  sm={4}>
  //       <MenuPersoGesIncident propsMenuItems={kaabuItemsMenus} onItemClick={handleMenuClick} />
  //       </Col>
  //     </Row>
  //     <Row>
  //       <Col>
  //       </Col>
  //       <Col sm={4}>
  //         <NavigatePerso propsMenuItems={gestionIncidentItemsNavigate} onItemClick={handleMenuClick}/>
  //       </Col>
  //     </Row>
  //     </Container>
        
        
  //       {/* <div>
  //       {currentForm === "verifnumsimplissimo" ?<FormVerifNum/> : null}
  //       {currentForm === "veriflogsimplissimo" ?<FormVerifLogin/> : null}
  //       {currentForm === "verifnumhlr" ?<FormVerifNumHlr/> : null}
  //       {currentForm === "veriflogkaabu" ?<FormVerifLogKaabu/> : null}
  //     </div> */}

  //   </div>
  // )

}

export default Kaabu;