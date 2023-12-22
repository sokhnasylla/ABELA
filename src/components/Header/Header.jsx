import React from 'react'
import { Nav } from 'react-bootstrap'
import './header.css'
import {FaUser}from "react-icons/fa"
function Header() {
  return (
    <div className='myhead'>
       <div>
        <p>Dalal ak Jamm</p>
       </div>
       <Nav variant='tabs'>
          <Nav.Item>
            <Nav.Link href='/home'>Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link><FaUser/> Paterne</Nav.Link>
          </Nav.Item>
       </Nav>

    </div>
  )
}

export default Header