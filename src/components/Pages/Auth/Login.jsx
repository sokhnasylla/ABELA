import React ,{useState}from 'react'
import "./login.css"
import
{
    Form,Button,Row,CardHeader
} from "react-bootstrap"
import { Navigate, useLocation } from 'react-router-dom'
import axios from "axios"
import { storeTokenInLocalStorage ,getTokenFromLocalStorage} from './authUtils'




function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedSuccess, setLoggedSuccess] = useState(false);
 

 
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password
      });
    
      setLoggedSuccess(true);
      storeTokenInLocalStorage(response.data.token);
     

    } catch (error) {
      console.error('Erreur lors de la connexion', error);
    }
  };
  if(isLoggedSuccess){

   
    return <Navigate to="/home"/>
  }

  return (
    <div id='login'>
    
      <Row className='myform'>
        <CardHeader><p>Veuillez vous authentifier SVP</p></CardHeader>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nom d'utilisateur</Form.Label>
            <Form.Control
              type="email"
              placeholder="Veuillez saisir votre mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Veuillez saisir votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formButton" id='buttons' >
            <Button
              variant='success'
              className='button submit'
              type="submit"
            >
              Connexion
            </Button>
            <Button variant='danger' className='button'>Annuler</Button>
          </Form.Group>
          <Button variant="primary" className='AuthAD'>
            Authentification AD
          </Button>
        </Form>
      </Row>
    </div>
  );
}

export default Login;
