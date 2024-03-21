import React from 'react';
import { Nav, Card } from 'react-bootstrap';
import { FaBars, FaArrowCircleDown, FaPaperclip, FaArrowCircleRight } from "react-icons/fa";

import "./menuperso.css"



function MenuPersoGesProbleme({ propsMenuItems, onItemClick }) {
  const getIconComponent = (IconComponent) => {
    return IconComponent ? <IconComponent className="float-start"  /> : null;
  };

  return (
    <div id ="menupersogesprobleme" className='float-end'>
      <Card className='entete '>
        <p><FaBars />Menu Personnalisé<FaArrowCircleDown /></p>
      </Card>
      <Nav defaultActiveKey="/home" className="flex-column justify-content-beetween navigation">
        {/* SUPPORT TECHNIQUE */}
        {propsMenuItems.map((item, index) => (
          <Card className='success' key={index}>
            <Nav.Link className='text-white' onClick={() => onItemClick(item.link) } style={{textAlign:"center"}}>
              {getIconComponent(item.icon) || <FaPaperclip />}
              {item.label}

            </Nav.Link>
          </Card>
        ))}
      </Nav>
    </div>
  );
}

export default MenuPersoGesProbleme;