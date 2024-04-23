
import { Navigate } from 'react-router-dom'
import axios, { HttpStatusCode } from 'axios';
import { getTokenFromLocalStorage } from '../components/Pages/Auth/authUtils';
import { AlertService } from '../utils/alert.service';

// Créez une instance Axios avec une configuration de base
const httpClient = axios.create({
  baseURL: 'http://localhost:8082/',
});

// Créez une instance de votre service d'alerte
const alertService = new AlertService();


// Ajoutez un interceptor pour toutes les requêtes sortantes
httpClient.interceptors.request.use(
  function (config) {
    const token = getTokenFromLocalStorage();    
    config.headers['Content-Type'] = 'application/json';
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Ajoutez un interceptor pour toutes les reponses entrantes
httpClient.interceptors.response.use(
    function (response) {
      console.log("INTERCEPTOR:::: RESPONSE::: ", response);
      return response;
    },
    function (error) {
      if (error.response.status===HttpStatusCode.Forbidden) {
      console.log("INTERCEPTOR:::: ERROR::: ", error);
        alertService.showConfirmAlert({ title: 'Votre connexion au serveur a expiré. Veuillez vous reconnecter.' });
        // TODO redirection vers la page de connexion
      } else {
        alertService.showNotificationAlertError(error.message || 'Une erreur s\'est produite');
      }
      return Promise.reject(error);
    }
  );

export default httpClient;
