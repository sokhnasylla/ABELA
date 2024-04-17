import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Button, Row, Col, Modal, OverlayTrigger, Tooltip, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { clearTokenFromLocalStorage, getTokenFromLocalStorage } from '../Pages/Auth/authUtils';
import { MdOutlineManageHistory } from "react-icons/md";
import { BsBrowserEdge } from "react-icons/bs";
import { FaStreetView, FaChevronLeft, FaChevronRight,FaMobile, FaNetworkWired } from "react-icons/fa";
import { GrSystem } from "react-icons/gr";
import { Dashboard } from '@mui/icons-material';
import AppsIcon from '@mui/icons-material/Apps';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { jwtDecode } from 'jwt-decode';
import { FaHome } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [menuItems] = useState([
    { text: "Support Technique", icon: <MdOutlineManageHistory style={{ color: '#FF6600', fontSize: '24px' }} />, route: '/support' },
    { text: "Iris", icon: <BsBrowserEdge style={{ color: '#FF6600', fontSize: '24px' }} />, route: '/iris' },
    { text: "Kaabu", icon: <FaStreetView style={{ color: '#FF6600', fontSize: '24px' }} />, route: '/kaabu' },
    { text: "Maxit", icon: <FaMobile style={{ color: '#FF6600', fontSize: '24px' }} />, route: '/maxit' },
    { text: "Network", icon: <FaNetworkWired style={{ color: '#FF6600', fontSize: '24px' }} />, route: '/network' },
    { text: "Mysmc", icon: <GrSystem style={{ color: '#FF6600', fontSize: '24px' }} />, route: '/mysmc' },
    { text: "Dashboard Admin", icon: <Dashboard style={{ color: '#FF6600', fontSize: '24px' }} />, route: '/admin' },
    // Ajoutez d'autres éléments du menu ici au besoin
  ]);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const token =getTokenFromLocalStorage();
  const [myuser,setMyuser] =useState("Moi")

  useEffect(() => {
    if(token){
      const decode = jwtDecode(token);
      setMyuser(decode.sub);
    }
  }, [token]);

  const handleMenuItemClick = (route) => {
    navigate(route);
  };

  const handleLogout = () => {
    clearTokenFromLocalStorage();
    navigate('/');
  };

  const totalPages = Math.ceil(menuItems.length / itemsPerPage);

  const renderMenuItems = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, menuItems.length);
    const itemsToRender = menuItems.slice(startIndex, endIndex);

    return itemsToRender.map((menuItem, index) => (
      <Col key={index} xs={12} md={4} className="mb-3">
        <SubMenuListItem {...menuItem} onClick={() => handleMenuItemClick(menuItem.route)} />
      </Col>
    ));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(totalPages - 1, prevPage + 1));
  };

  return (
    <div className="myhead">
      <Container fluid>
        <Row className="align-items-center">
          <Col>
            <div>
              <h5>Dalal ak Jamm</h5>
            </div>
          </Col>
          <Col className="d-flex justify-content-end align-items-center" id='menu'>
            <Col xs="auto">
              <Navbar variant='tabs'>
                <Nav className='me-auto'>
                  <Nav.Link href='/home' style={{ fontSize: '8px' }}>
                  <HomeIcon/>
                  </Nav.Link>
                </Nav>
              </Navbar>
            </Col>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip" color='red'>Applications disponibles</Tooltip>}
            >
              <Button variant="secondary"  onClick={() => setShowModal(true)} style={{ background: 'none', border: 'none', position: 'relative' }}>
                <AppsIcon style={{ color: 'white' }} />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip">{myuser}</Tooltip>}>
                <Dropdown>
              <Dropdown.Toggle variant="custom" id="dropdown-basic" className="profile-toggle">
                {/* <span style={{ marginLeft:"2px" }}>{myuser}</span> */}
                <PersonIcon/>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/monprofil">Mon Profil</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Deconnexion</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            </OverlayTrigger>
          
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Body style={{ minHeight: '170px' }}>
                <Row>
                  {renderMenuItems()}
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="light" onClick={handlePreviousPage} disabled={currentPage === 0} style={{ marginRight: 'auto' }}>
                  <FaChevronLeft style={{ color: '#FF6600' }} />
                </Button>
                <Button variant="light" onClick={handleNextPage} disabled={currentPage === totalPages - 1} style={{ marginLeft: 'auto' }}>
                  <FaChevronRight style={{ color: '#FF6600' }} />
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </ Container>
    </div>
  );
}

function SubMenuListItem({ text, icon, onClick }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={onClick}>
      <OverlayTrigger placement="top" overlay={<Tooltip>{text}</Tooltip>}>
        <span>{icon}</span>
      </OverlayTrigger>
      <span>{text}</span>
    </div>
  );
}

export default Header;
