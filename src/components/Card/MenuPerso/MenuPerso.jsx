import React from 'react'
import {Nav,Card} from 'react-bootstrap'
import "./menuPerso.css"
import { FaBars ,FaArrowCircleDown,FaPaperclip} from "react-icons/fa";


function MenuPerso() {
  return (
    <div className='menuPerso float-end'>
      <Card className='entete'><p><FaBars/>Menu Personnalisé<FaArrowCircleDown/></p></Card>
        <Nav defaultActiveKey="/home" className="flex-column justify-content-beetween navigation">
           <Card className='success'> <Nav.Link className='text-white' href="/support/reco_hlr_in"><FaPaperclip/>  Reconciliation HLR vs IN</Nav.Link></Card>
            <Card><Nav.Link className='text-white' eventKey="link-1"><FaPaperclip />  Reconciliation HLR vs Nessico</Nav.Link></Card>
            <Card><Nav.Link className='text-white' eventKey="link-2"><FaPaperclip /> Reconciliation IN vs Nessico</Nav.Link></Card>
        </Nav>
    </div>
  )
}

export default MenuPerso