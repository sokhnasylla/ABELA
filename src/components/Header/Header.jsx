import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Button, Row, Col, Modal, OverlayTrigger, Tooltip, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { clearTokenFromLocalStorage, getTokenFromLocalStorage } from '../Pages/Auth/authUtils';
import { jwtDecode } from 'jwt-decode';
import { FaStreetView, FaMobile, FaNetworkWired, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GrSystem } from "react-icons/gr";
import { BsBrowserEdge } from "react-icons/bs";
import { MdOutlineManageHistory } from "react-icons/md";
import Dashboard from '@mui/icons-material/Dashboard';
import AppsIcon from '@mui/icons-material/Apps';
import HomeIcon from '@mui/icons-material/Home';
import Sensors from '@mui/icons-material/Sensors';
import PersonIcon from '@mui/icons-material/Person';

function Header() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);
  const itemsPerPage = 12; // Nombre d'éléments par page

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      const decode = jwtDecode(token);
      setRoles(decode.roles);
    }
  }, []);

  const handleLogout = () => {
    clearTokenFromLocalStorage();
    navigate('/');
  };

  const handleMenuItemClick = (role) => {
    switch (role) {
      case 'ROLE_SUPPORT':
        navigate('/support');
        break;
      case 'ROLE_IRIS':
        navigate('/iris');
        break;
      case 'ROLE_KAABU':
        navigate('/kaabu');
        break;
      case 'ROLE_MAXIT':
        navigate('/maxit');
        break;
      case 'ROLE_NETWORK':
        navigate('/network');
        break;
      case 'ROLE_MYSMC':
        navigate('/mysmc');
        break;
      case 'ROLE_ADMIN':
        navigate('/admin');
        break;
      case 'ROLE_GAIA':
        navigate('/gaia');
        break;
      default:
        break;
    }
  };

  const renderMenuItems = () => {
    const startIndex = currentMenuIndex * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, roles.length);
    const menuItems = roles.slice(startIndex, endIndex);

    // Si la première place est vide, ignorer le premier élément
    const menuItemsToRender = menuItems.length > 0 ? menuItems.slice(1) : menuItems;

    return menuItemsToRender.map((role, index) => (
      <Col key={index} xs={12} md={4} className="mb-3">
        <SubMenuListItem role={role} onClick={handleMenuItemClick} />
      </Col>
    ));
  };

  const handlePreviousMenu = () => {
    setCurrentMenuIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNextMenu = () => {
    setCurrentMenuIndex((prevIndex) =>
      Math.min(Math.ceil(roles.length / itemsPerPage) - 1, prevIndex + 1)
    );
  };

  return (
    <div className="myhead">
      <Container>
        <Row className="align-items-center">
          <Col>
            <div>
              <h5>Dalal ak Jamm</h5>
            </div>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <Col xs="auto">
              <Navbar variant='tabs'>
                <Nav className='me-auto'>
                  <Nav.Link href='/home' style={{ fontSize: '8px' }}>
                    <HomeIcon />
                  </Nav.Link>
                </Nav>
              </Navbar>
            </Col>
            {roles.length > 0 && (
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="tooltip">Applications disponibles</Tooltip>}
              >
                <Button variant="secondary" onClick={() => setShowModal(true)} style={{ background: 'none', border: 'none', marginRight: '10px', position: 'relative' }}>
                  <AppsIcon style={{ color: 'white' }} />
                </Button>
              </OverlayTrigger>
            )}
             <Dropdown>
             <Dropdown.Toggle variant="custom" id="dropdown-basic" className="profile-toggle">
                <PersonIcon />
                Moi
              </Dropdown.Toggle>

              <Dropdown.Menu>
              <Dropdown.Item href="/monprofil">Mon Profil</Dropdown.Item> {}
                <Dropdown.Item onClick={handleLogout}>Deconnexion</Dropdown.Item>
                {}
              </Dropdown.Menu>
            </Dropdown>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Body>
                <Row>
                  {renderMenuItems()}
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="light" onClick={handlePreviousMenu} disabled={currentMenuIndex === 0} style={{ marginRight: 'auto' }}>
                  <FaChevronLeft style={{ color: '#FF6600' }} />
                </Button>
                <Button variant="light" onClick={handleNextMenu} disabled={currentMenuIndex === Math.ceil(roles.length / itemsPerPage) - 1} style={{ marginLeft: 'auto' }}>
                  <FaChevronRight style={{ color: '#FF6600' }} />
                </Button>
              </Modal.Footer>
            </Modal>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function SubMenuListItem({ role, onClick }) {
  const roleToComponent = {
    'ROLE_SUPPORT': { text: 'Support Technique', icon: <MdOutlineManageHistory style={{ color: '#FF6600', fontSize: '24px' }} /> },
    'ROLE_IRIS': { text: 'Iris', icon: <BsBrowserEdge style={{ color: '#FF6600', fontSize: '24px' }} /> },
    'ROLE_KAABU': { text: 'Kaabu', icon: <FaStreetView style={{ color: '#FF6600', fontSize: '24px' }} /> },
    'ROLE_MAXIT': { text: 'Maxit', icon: <FaMobile style={{ color: '#FF6600', fontSize: '24px' }} /> },
    'ROLE_NETWORK': { text: 'Network', icon: <FaNetworkWired style={{ color: '#FF6600', fontSize: '24px' }} /> },
    'ROLE_MYSMC': { text: 'Mysmc', icon: <GrSystem style={{ color: '#FF6600', fontSize: '24px' }} /> },
    'ROLE_ADMIN': { text: 'Dashboard Admin', icon: <Dashboard style={{ color: '#FF6600', fontSize: '24px' }} /> },
    'ROLE_GAIA': { text: 'GAIA', icon: <Sensors style={{ color: '#FF6600', fontSize: '24px' }} /> },
  };

  const roleComponent = roleToComponent[role];

  if (!roleComponent) {
    return null;
  }

  const { text, icon } = roleComponent;
  const displayText = text.length > 7 ? `${text.substring(0, 7)}...` : text;

  const overlay = text.length > 7 ? <Tooltip>{text}</Tooltip> : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => onClick(role)}>
      {overlay ? (
        <OverlayTrigger placement="top" overlay={overlay}>
          <span>{icon}</span>
        </OverlayTrigger>
      ) : (
        <span>{icon}</span>
      )}
      <span>{displayText}</span>
    </div>
  );
}

export default Header;

