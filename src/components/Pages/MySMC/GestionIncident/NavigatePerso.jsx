import React from 'react'
import {Nav,Card} from 'react-bootstrap'
import { FaBars ,FaArrowCircleDown,FaPaperclip} from "react-icons/fa";
import'../../../Card/MenuPerso/menuPerso.css'
import { FaArrowCircleRight } from "react-icons/fa";




function NavigatePerso({propsMenuItems, onItemClick}) {
  const getIconComponent = (IconComponent) => {
    return IconComponent ? <IconComponent className='float-start' /> : null;
  };
  return (
    <div id='menupersogesprobleme' className='menuPerso float-end'>
      <Card className='entete'><p><FaBars/>Navigation rapide<FaArrowCircleDown/></p></Card>
      <Nav defaultActiveKey="/home" className="flex-column justify-content-beetween navigation">
        {/* SUPPORT TECHNIQUE */}
        {propsMenuItems.map((item, index) => (
          <Card className='success' key={index} style={{backgroundColor:"#337AB7"}}>
            <Nav.Link  href={item.link } className='link text-white' onClick={() => onItemClick(item.link)} style={{textAlign:"center"}}>
              {getIconComponent(item.icon) || <FaPaperclip />}
              {item.label}
              <FaArrowCircleRight className='float-end' />
            </Nav.Link>
          </Card>
        ))}
      </Nav>
    </div>
  )
}

export default NavigatePerso