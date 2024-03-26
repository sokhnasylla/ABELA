import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import "./menumysmc.css"
import SubMenu from '../../../Card/Submenu/SubMenu'
import status from "../../../../assets/status.png"
import problem from "../../../../assets/problem.jpg"
import analytic from "../../../../assets/analytics.png"
import diagram from "../../../../assets/diagram.png"
import gear from "../../../../assets/gear.png"

function MenuMysmc() {
  return (
    <Navbar className='menusmc'>
        <Container>
          <Navbar.Brand href="/mysmc/gestionincident" className='Ad'>
              <SubMenu text="Gestion Incidents" image={status} className/>
          </Navbar.Brand>
          <Navbar.Brand href="/mysmc/gestionprobleme" className='Ad'>
              <SubMenu text="Gestion Probléme" image={problem}/>
          </Navbar.Brand>
          <Navbar.Brand href="/mysmc/etatsupervision" className='Ad'>
              <SubMenu text="Etat Supervision" image={analytic}/>
          </Navbar.Brand>
          <Navbar.Brand href="/mysmc/suivisactivites" className='Ad'>
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