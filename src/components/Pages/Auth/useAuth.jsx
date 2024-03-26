import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTokenFromLocalStorage } from './authUtils';

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getTokenFromLocalStorage();

    if (!token) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
      navigate('/');
    }
  }, [navigate]);

  return;
};

export default useAuth;
