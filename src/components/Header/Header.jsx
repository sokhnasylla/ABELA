import React, { Component } from 'react';
import { Navbar, Container, Nav, Button, Row, Col, Modal, OverlayTrigger, Tooltip, Dropdown } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { clearTokenFromLocalStorage, getTokenDecode} from '../Pages/Auth/authUtils';
import { MdOutlineManageHistory } from "react-icons/md";
import { BsBrowserEdge } from "react-icons/bs";
import { FaStreetView, FaChevronLeft, FaChevronRight, FaMobile, FaNetworkWired } from "react-icons/fa";
import { GrSystem } from "react-icons/gr";
import { Dashboard } from '@mui/icons-material';
import AppsIcon from '@mui/icons-material/Apps';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { RoleConstants } from '../../config/role.constants';

class Header extends Component {

  roleAdmin = [
    RoleConstants.admin.code,
  ];


  roleKaabu = [
    RoleConstants.kaabu.code,
  ];

  roleSupport = [
    RoleConstants.support.code,
  ];

  roleMysmc = [
    RoleConstants.mysmc.code,
  ];

  roleMaxit = [
    RoleConstants.maxit.code,
  ];
  
  roleIris = [
    RoleConstants.iris.code,
  ];

  roleNetwork = [
    RoleConstants.network.code,
  ];

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      menuItems: [
        { text: "Support Technique", icon: <MdOutlineManageHistory style={{ color: '#FF6600', fontSize: '24px' }} />, route: '/support', roles: this.roleSupport },
        { text: "Iris", icon: <BsBrowserEdge style={{ color: '#FF6600', fontSize: '24px' }} />, route: '/iris', roles: this.roleIris },
        { text: "Kaabu", icon: <FaStreetView style={{ color: '#FF6600', fontSize: '24px' }} />, route: '/kaabu', roles: this.roleKaabu },
        { text: "Maxit", icon: <FaMobile style={{ color: '#FF6600', fontSize: '24px' }} />, route: '/maxit', roles: this.roleMaxit },
        { text: "Network", icon: <FaNetworkWired style={{ color: '#FF6600', fontSize: '24px' }} />, route: '/network', roles: this.roleNetwork },
        { text: "Mysmc", icon: <GrSystem style={{ color: '#FF6600', fontSize: '24px' }} />, route: '/mysmc', roles: this.roleMysmc },
        { text: "Dashboard Admin", icon: <Dashboard style={{ color: '#FF6600', fontSize: '24px' }} />, route: '/admin/user', roles: this.roleAdmin },
      ],
      itemsPerPage: 6,
      currentPage: 0,
      userToken: getTokenDecode(),
    };
  }

  componentDidMount() {
    // 
    console.log("-------TOKEN-------", this.state.userToken);
  }

  handleMenuItemClick = (route) => {
    this.setState({ showModal: false });
    this.props.navigate(route);
  };

  handleLogout = () => {
    clearTokenFromLocalStorage();
    this.props.navigate('/signin');
  };

  handlePreviousPage = () => {
    this.setState((prevState) => ({
      currentPage: Math.max(0, prevState.currentPage - 1)
    }));
  };

  handleNextPage = () => {
    this.setState((prevState) => ({
      currentPage: Math.min(Math.ceil(prevState.menuItems.length / prevState.itemsPerPage) - 1, prevState.currentPage + 1)
    }));
  };

  renderMenuItems = () => {
    const { menuItems, userToken, currentPage, itemsPerPage } = this.state;
    const filteredMenuItems = menuItems.filter(item => item.roles.some(role => userToken.roles.includes(role)));

    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredMenuItems.length);
    const itemsToRender = filteredMenuItems.slice(startIndex, endIndex);

    return itemsToRender.map((menuItem, index) => (
      <Col key={index} xs={12} md={4} className="mb-3">
        <SubMenuListItem {...menuItem} onClick={() => this.handleMenuItemClick(menuItem.route)} />
      </Col>
    ));
  };

  render() {
    if (this.state.isLoggedSuccess) {
      return <Navigate to="/" />;
    }

    return (
      <div className="myhead">
        <Container fluid>
          <Row className="align-items-center">
            <Col>
              <div>
                <h5 >ABELA</h5>
              </div>
            </Col>
            <Col className="d-flex justify-content-end align-items-center" id='menu'>
              <Col xs="auto">
                <Navbar variant='tabs'>
                  <Nav className='me-auto'>
                    <Link to='/' style={{ fontSize: '8px', color: "white" }}>
                    <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="tooltip" color='red'>Home ABELA</Tooltip>}>
                      <HomeIcon />
                        </OverlayTrigger>
                    </Link>
                  </Nav>
                </Navbar>
              </Col>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="tooltip" color='red'>Applications disponibles</Tooltip>}
              >
                <Button variant="secondary" onClick={() => this.setState({ showModal: true })} style={{ background: 'none', border: 'none', position: 'relative' }}>
                  <AppsIcon style={{ color: 'white' }} />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="tooltip">{this.state.userToken.sub}</Tooltip>}>
                <Dropdown>
                  <Dropdown.Toggle variant="custom" id="dropdown-basic" className="profile-toggle">
                    <PersonIcon />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/monprofil">Mon Profil</Dropdown.Item>
                    <Dropdown.Item onClick={this.handleLogout}>Deconnexion</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </OverlayTrigger>
              <Modal style={{ zIndex: '2000' }} show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                <Modal.Body style={{ minHeight: '170px' }}>
                  <Row>
                    {this.renderMenuItems()}
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="light" onClick={this.handlePreviousPage} disabled={this.state.currentPage === 0} style={{ marginRight: 'auto' }}>
                    <FaChevronLeft style={{ color: '#FF6600' }} />
                  </Button>
                  <Button variant="light" onClick={this.handleNextPage} disabled={this.state.currentPage === Math.ceil(this.state.menuItems.length / this.state.itemsPerPage) - 1} style={{ marginLeft: 'auto' }}>
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

const HeaderWithNavigate = (props) => {
  const navigate = useNavigate();
  return <Header {...props} navigate={navigate} />;
}

export default HeaderWithNavigate;
