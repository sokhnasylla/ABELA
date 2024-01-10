import React,{useEffect,useState} from 'react'
import { Navbar,Container } from 'react-bootstrap'
import {FaWindows,FaPhoneAlt,FaStreetView ,FaMobile,FaNetworkWired } from "react-icons/fa"
import { GrSystem } from "react-icons/gr";
import { BsBrowserEdge} from "react-icons/bs";
import { MdOutlineManageHistory } from "react-icons/md";
import Dashboard from '@mui/icons-material/Dashboard';
import "./menu.css"
import SubMenu from '../Card/Submenu/SubMenu'
import { getTokenFromLocalStorage } from '../Pages/Auth/authUtils';
import { jwtDecode } from 'jwt-decode';

function Menu() {

  const [roles,setRoles]=useState([])

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {

      const decode = jwtDecode(token)
      console.log();
      setRoles(decode.roles);
      
      
    }
  }, []);

  return (
   
    <Navbar className='menu'>
    <Container>
      {/* <Navbar.Brand href="#home" className='Ad'>
       <SubMenu text='Active Directory' icon={FaWindows}/>
      </Navbar.Brand> */}
      {/* <Navbar.Brand href="#gaia" className='Ad'>
       <SubMenu text='GAIA' icon={BsBuildingGear}/>
      </Navbar.Brand> */}
      {/* <Navbar.Brand href="#infotel" className='Ad'>
       <SubMenu text='INFOTEL' icon={FaPhoneAlt}/>
      </Navbar.Brand> */}
      <Navbar.Brand href="/support" className='Ad'>
       <SubMenu text='Support Technique' icon={MdOutlineManageHistory}/>
      </Navbar.Brand>
      <Navbar.Brand href="#interco" className='Ad'>
       <SubMenu text='IRIS' icon={BsBrowserEdge}/>
      </Navbar.Brand>
      <Navbar.Brand href="#interco" className='Ad'>
       <SubMenu text='KIBARU' icon={FaStreetView}/>
      </Navbar.Brand>
      <Navbar.Brand href="/maxit" className='Ad'>
       <SubMenu text='MAXIT' icon={FaMobile}/>
      </Navbar.Brand>
      <Navbar.Brand href="/network" className='Ad'>
       <SubMenu text='NETWORK' icon={FaNetworkWired}/>
      </Navbar.Brand>
      <Navbar.Brand href="/mysmc" className='Ad'>
       <SubMenu text='MYSMC' icon={GrSystem}/>
      </Navbar.Brand>
      <Navbar.Brand href="/admin" className='Ad'>
       <SubMenu text='Dashboard Admin' icon={Dashboard}/>
      </Navbar.Brand>
    </Container>
  </Navbar>
  )
}

export default Menu