// MenuLeft.js
import React from 'react';
import { Container, Nav, Card } from 'react-bootstrap';
import SubMenu from '../Submenu/SubMenu';
import "./menuLeft.css";

function MenuLeft({ submenu }) {
  return (
    <Container id='menuleft'>
      <Nav className="flex-column" id='mynav' activeKey="1">
        {submenu.map((item, index) => (
          <Card key={index}>
            <Nav.Link href='#' eventKey={String(index + 1)}>
              <SubMenu {...item} />
            </Nav.Link>
          </Card>
        ))}
      </Nav>
    </Container>
  );
}

export default MenuLeft;
