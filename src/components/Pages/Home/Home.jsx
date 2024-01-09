import React,{useEffect,useState} from 'react';
import "./home.css"
import Header from '../../Header/Header';
import Menu from '../../Menu/Menu';
import MenuLeft from '../../Card/MenuLeft/MenuLeft';
import { Col, Container, Row } from 'react-bootstrap';
import { data,columns } from '../../../data/tacheself';
import TableBase from '../../Card/Table/TableBase';
import Title from '../../Card/Title/Title';
import { FaHistory } from 'react-icons/fa';
import { GrCatalogOption } from 'react-icons/gr';
import { AiFillDashboard } from 'react-icons/ai'
import { getTokenFromLocalStorage } from '../Auth/authUtils';
import {jwtDecode} from 'jwt-decode'

const submenu=[
  {'text':"Audit Perso","icon":FaHistory
},
  {'text':"Catalogue ABELA",'icon':GrCatalogOption
},
  {'text':"Dashboard", 'icon':AiFillDashboard}
]


// const token= getTokenFromLocalStorage();
// console.log(token);


function Home() {


  
  return (
    <div id='home'>
        <Header/>
        <Menu/>
       <Container className='body'>
        <Row>
         <Col className='menu'>
          <MenuLeft submenu={submenu}/></Col>
         <Col xs={10} className='content'>
          <Title text="20 dernieres taches integrees dans SELF"/>
          <TableBase
          columns={columns}
          data={data}
    />
         </Col> 
        </Row>
       </Container>
     
    </div>
  )
}

export default Home