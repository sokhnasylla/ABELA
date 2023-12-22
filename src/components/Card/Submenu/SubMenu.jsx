
import React from 'react';
import { Container, Row } from 'react-bootstrap';

function SubMenu({ text, icon: IconComponent, image }) {
  const getIconComponent = () => {
    return IconComponent ? <IconComponent className="iconsub" /> : null;
  };

  return (
    <Container>
      <Row className='d-inline-block align-top icon'>
        {getIconComponent()}
        {image && <img src={image} alt="SubMenu" style={{ marginLeft: "2px", objectFit: "cover" }} />}
      </Row>
      <Row className='text'><p>{text}</p></Row>
    </Container>
  );
}

export default SubMenu;
