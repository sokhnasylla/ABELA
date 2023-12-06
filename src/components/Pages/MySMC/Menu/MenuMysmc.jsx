import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import "./menumysmc.css"
import SubMenu from '../../../Card/Submenu/SubMenu'
import status from "../../../../assets/status.png"
import problem from "../../../../assets/problem.png"
import analytic from "../../../../assets/analytics.png"
import diagram from "../../../../assets/diagram.png"
import gear from "../../../../assets/gear.png"

function MenuMysmc() {
  return (
    <Navbar className='menusmc'>
        <Container>
          <Navbar.Brand href="#home" className='Ad'>
              <SubMenu text="Gestion Incidents" image={status}/>
          </Navbar.Brand>
          <Navbar.Brand href="#home" className='Ad'>
              <SubMenu text="Gestion Probléme" image={problem}/>
          </Navbar.Brand>
          <Navbar.Brand href="#home" className='Ad'>
              <SubMenu text="Etat Supervision" image={analytic}/>
          </Navbar.Brand>
          <Navbar.Brand href="#home" className='Ad'>
              <SubMenu text="Suivi activités" image={diagram}/>
          </Navbar.Brand>
          <Navbar.Brand href="#home" className='Ad'>
              <SubMenu text="Dashboard Admin" image={gear}/>
          </Navbar.Brand>
        </Container>

    </Navbar>
  )
}

export default MenuMysmc