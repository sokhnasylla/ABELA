import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap'
import './header.css'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { clearTokenFromLocalStorage } from '../Pages/Auth/authUtils';

function Header() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprime le token du local storage
    clearTokenFromLocalStorage();
    
    // Redirige vers la page de connexion
    navigate('/');
  };

  return (
    <div className='myhead'>
       <div>
        <p>Dalal ak Jamm</p>
       </div>
       <Nav variant='tabs'>
          <Nav.Item>
            <Nav.Link href='/home'>Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={handleLogout}> 
              <LockOutlinedIcon sx={{marginBottom:'8px'}}/>
             Deconnexion</Nav.Link>
          </Nav.Item>
       </Nav>

    </div>
  )
}

export default Header