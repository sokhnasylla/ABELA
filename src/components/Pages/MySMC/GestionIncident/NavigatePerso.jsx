import React from 'react'
import {Nav,Card} from 'react-bootstrap'
import { FaBars ,FaArrowCircleDown,FaPaperclip} from "react-icons/fa";
import'../../../Card/MenuPerso/menuPerso.css'

const handleClick =()=>{
 alert("Cliqué");
}

function NavigatePerso({propsMenuItems, onItemClick}) {
  const getIconComponent = (IconComponent) => {
    return IconComponent ? <IconComponent /> : null;
  };
  return (
    <div className='menuPerso float-end' style={{position:"absolute",top:"48%",marginLeft:"78%"}}>
      <Card className='entete'><p><FaBars/>Navigation rapide<FaArrowCircleDown/></p></Card>
      <Nav defaultActiveKey="/home" className="flex-column justify-content-beetween navigation">
        {/* SUPPORT TECHNIQUE */}
        {propsMenuItems.map((item, index) => (
          <Card className='success' key={index} style={{backgroundColor:"#337AB7"}}>
            <Nav.Link  href={item.link } className='text-white' onClick={() => onItemClick(item.link)}>
              {getIconComponent(item.icon) || <FaPaperclip />}
              {item.label}
            </Nav.Link>
          </Card>
        ))}
      </Nav>
    </div>
  )
}

export default NavigatePerso