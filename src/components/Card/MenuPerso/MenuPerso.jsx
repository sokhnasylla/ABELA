import React from 'react'
import {Nav,Card} from 'react-bootstrap'
import "./menuPerso.css"
import { FaBars ,FaArrowCircleDown,FaPaperclip} from "react-icons/fa";


function MenuPerso({propsMenuItems}) {
  console.log("VOILA LES PROPS ", {propsMenuItems});
  return (
    <div className='menuPerso float-end'>
      <Card className='entete'><p><FaBars/>Menu Personnalisé<FaArrowCircleDown/></p></Card>
        <Nav defaultActiveKey="/home" className="flex-column justify-content-beetween navigation">
          {/* SUPPORT TECHNIQUE */}
          {propsMenuItems.map((item, index) =>(
           <Card className='success' key={index}> <Nav.Link className='text-white' href= {item.link} ><FaPaperclip/>{item.label}</Nav.Link></Card>
          ))}
        </Nav>
    </div>
  )
}

export default MenuPerso