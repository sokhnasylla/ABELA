
import React from 'react';
import { Container, Row } from 'react-bootstrap';

function SubMenu({ text, icon: IconComponent, image }) {
  const getIconComponent = () => {
    return IconComponent ? <IconComponent className="iconsub"/> : null;
  };

  return (
    <Container>
      <Row className='d-inline-block align-top icon'>
        {getIconComponent()}  
        {image && <img src={image} alt="SubMenu" style={{ marginLeft: "30px", objectFit: "cover",height: "55px",width: "77px"}} />}
      </Row>
      <Row className='text' style={{fontSize:"14px",fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif"}}><p>{text}</p></Row>
    </Container>
  );
}

export default SubMenu;
