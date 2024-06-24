import React, { Component } from 'react';
import "./home.css"
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Menu from '../../Menu/Menu';
import MenuLeft from '../../Card/MenuLeft/MenuLeft';
import { Col, Container, Row } from 'react-bootstrap';
import { data,columns } from '../../../data/tacheself';
import TableBase from '../../Card/Table/TableBase';
import Title from '../../Card/Title/Title';
import { FaHistory } from 'react-icons/fa';
import { GrCatalogOption } from 'react-icons/gr';
import { AiFillDashboard } from 'react-icons/ai'
import useAuth from '../Auth/useAuth';
import { getTokenFromLocalStorage } from '../Auth/authUtils';
import httpClient from '../../../config/interceptor.config';
import getHistorique from './home.service';


const submenu=[
  {'text':"Audit Perso","icon":FaHistory
},
  {'text':"Catalogue ABELA",'icon':GrCatalogOption
},
  {'text':"Dashboard", 'icon':AiFillDashboard}
]


// const token= getTokenFromLocalStorage();
// console.log(token);


class Home extends Component {
  state = {
    historiques: []
  };

  componentDidMount() {
    getHistorique().then((result) => {
        if(result) {
          if (result.success) {
            this.setState({ historiques: result.data });
            console.log("HISTORIQUE::: ", this.state.historiques);
          } else {
            this.alertService.showNotificationAlertError(result.message || 'Une erreur s\'est produite');
          }
        }
      })
  }
  
  ///useAuth()

  render() {
    return (
      <div id='home'>
        <Header />
        <Footer />
        <Menu />
      
        <Container className='body'>
          <Row>
            <Col className='menu'>
              <MenuLeft submenu={submenu} />
            </Col>
            <Col xs={10} className='content'>
              <Title text="20 dernieres taches integrees dans SELF" />
              <TableBase
                columns={columns}
                data={this.state.historiques}
              />
            </Col>
          </Row>
        </Container>
      
      </div>
    );
  }
}


export default Home