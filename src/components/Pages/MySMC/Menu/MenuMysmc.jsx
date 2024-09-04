import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./menumysmc.css";
import SubMenu from '../../../Card/Submenu/SubMenu';
import status from "../../../../assets/status.png";
import problem from "../../../../assets/problem.jpg";
import analytic from "../../../../assets/analytics.png";
import diagram from "../../../../assets/diagram.png";
import homemysmc from "../../../../assets/homemysmc.png";

function MenuMysmc() {
  return (
    <Navbar className='menusmc'>
      <Container>
        <Navbar.Brand as={Link} to="/mysmc/gestionincident" className='Ad'>
          <SubMenu text="Gestion Incidents" image={status} />
        </Navbar.Brand>
        <Navbar.Brand as={Link} to="/mysmc/gestionprobleme" className='Ad'>
          <SubMenu text="Gestion Probléme" image={problem} />
        </Navbar.Brand>
        <Navbar.Brand as={Link} to="/mysmc/etatsupervision" className='Ad'>
          <SubMenu text="Etat Supervision" image={analytic} />
        </Navbar.Brand>
        <Navbar.Brand as={Link} to="/mysmc/suivisactivites" className='Ad'>
          <SubMenu text="Suivi activités" image={diagram} />
        </Navbar.Brand>
         <Navbar.Brand as={Link} to="/mysmc/" className='Ad'>
          <SubMenu text="HomeMysmc" image={homemysmc}/>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default MenuMysmc;
