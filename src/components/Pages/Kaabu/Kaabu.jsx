import React,{Component} from 'react'
import { Container,Row,Col, Button } from 'react-bootstrap'
import Title from '../../Card/Title/Title';
import { FaUserGroup } from 'react-icons/fa6';
import { Stack, Autocomplete, InputLabel, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import FormKaabu from './FormKaabu';
import FormSimplissimo from './FormSimplissimo';
import {getAllInfoUserService, searchAutocomplateLoginService} from './kaabu.service';
import { AlertService } from '../../../utils/alert.service';
import FormNetwork from './FormNetwork';
import DeviceCard from './FormOTAP';



class Kaabu extends Component {

 alertService = new AlertService();

  
  kaabuItemsMenus=[
      {label:"Espace Client",link:"/kaabu/espace/client",icon:FaUserGroup},
      {label:"Espace Vendeur",link:"/kaabu/espace/vendeur",icon:FaUserGroup}, 
  ];
  



  state = {
    data: null,
    loading: false,
    searchLoading: false,
    search: "",
    userSearch: [],
    errorMessage: "",
    device: null,
    deviceLoading: false
  };

  
  handleSearchClick = () => {
    this.setState({
      loading: true,
      data: null,
     });
    const identifiant = this.state.search
    console.log("RECHERCHE KAABU ::: ", identifiant);
      if (!identifiant || identifiant.trim() === "") {
        this.setState({
          loading: false,
         });
        return;
      }
      getAllInfoUserService(identifiant).then((result) => {
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

  onChangeAutocomplete(selectedLogin) {
    this.setState({search: selectedLogin})
  }

  searchLogin(search) {
    this.setState({
      searchLoading: true,
      userSearch: [],
      search: search
     });
    if (!search || search.trim() === "" || search.length === 1) {
      this.setState({
        searchLoading: false,
        userSearch: []
       });
      return;
    }
    searchAutocomplateLoginService(search).then((result) => {
      if(result) {
        if (result.success) {
          console.log("----------------RESP---------", result);
          this.setState({
            userSearch: result.data,
           });
        } else {
          //this.alertService.showNotificationAlertError(result.message || 'Une erreur s\'est produite');
        }
      }
    })
    .finally(() => {
      this.setState({
        searchLoading: false,
       });
    });
  }


  render() {
    console.log("render------------VALUE--------------", this.state.userSearch);
    return (
        <div id='home'>
            {/* <Header /> */}
            <Container style={{marginBottom: "100px"}} className='body'>
                <Row>
                    <Col sm={12}>
                        <Title text="Espace Kaabu Mobile" />
                        <br />
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <div style={{width: "49%"}}>
                                <InputLabel style={{fontSize: "14px", fontWeight: "700", color: "#000", marginBottom: "3px" }} >Identifiant</InputLabel>
                              <Stack >
                                <Autocomplete 
                                  options={this.state.userSearch} 
                                  getOptionLabel={(option) => option || ""}
                                  renderInput={(params) => (
                                    <TextField 
                                      onChange={(event) => this.searchLogin(event.target.value)}  
                                      {...params} 
                                      label="login, msisdn"
                                      InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                          <React.Fragment>
                                            {this.state.searchLoading ? <CircularProgress color="primary" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                          </React.Fragment>
                                        ),
                                      }} 
                                      id='identifiant' 
                                      variant='outlined' 
                                      size='small' 
                                      placeholder='login, msisdn...' 
                                      sx={{ width: "100%", maxWidth: "100%"}} />)}
                                  value={this.state.search}
                                  onChange={(event, newValue) => this.onChangeAutocomplete(newValue)}
                                  freeSolo
                                />
                                {/* {!this.state.userSearch==null && (<p style={{fontSize: "80%", color: "red", paddingLeft: "12px"}}>errorMessage</p>)} */}
                              </Stack>
                            </div>
                            <div>
                                <Button onClick={this.handleSearchClick} style={{ height: "40px", fontWeight: 'bold', marginTop: "21px", width: "140px", backgroundColor: "#FF6600", borderColor: " #FF6600" }}>Rechercher</Button>
                            </div>
                        </div>
                        {this.state.loading && (
                            <div style={{ marginTop: "50px", width: "100%", justifyContent: "space-around", display: "inline-flex"}}>
                              <CircularProgress color="warning" size={100} />
                            </div>
                        )}
                    </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    {(this.state.data) && (
                      <div >
                        <FormKaabu userkaabu={this.state.data.userKaabu} />
                      </div>
                    )}
                  </Col>
                  <Col sm={6}>
                    {(this.state.data) && (
                      <div>
                        <FormSimplissimo simplissimo={this.state.data.userSimplissimo}/>
                        {this.state.data.userKaabu && (<DeviceCard username={this.state.data.userKaabu.username} telephone={this.state.data.userKaabu.telephone} latitude={this.state.data.userKaabu.latitudeLastTransaction} longitude={this.state.data.userKaabu.longitudeLastTransaction} />)}
                        <FormNetwork clientNetwork={this.state.data.clientNetwork} />
                      </div>
                    )}
                  </Col>
                </Row>
                {/* <Row>
                  <MapsWidget2 lat={parseFloat(this.state.latitude)} lng={parseFloat(this.state.longitude)}/>
                </Row> */}
            </Container>
        </div>
    );
  }

}

export default Kaabu;