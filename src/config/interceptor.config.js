
import axios, { HttpStatusCode } from 'axios';
import { getTokenFromLocalStorage } from '../components/Pages/Auth/authUtils';
import { AlertService } from '../utils/alert.service';
import { CODE_TIMEOUT } from './global.constant';
import { redirect } from 'react-router-dom';

// Créez une instance Axios avec une configuration de base
const httpClient = axios.create({
  timeout: 10000, // 10 secondes
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
      console.log("INTERCEPTOR:::: ERROR::: ", error);
      if (error.code === CODE_TIMEOUT) {
        console.log('Timeout de la requête !');
        alertService.showConfirmAlert({ title: 'Timeout de la requête !!!' });
      }
      if (error.response && error.response.status===HttpStatusCode.Forbidden) {
        alertService.showConfirmAlert({ title: 'Votre connexion au serveur a expiré. Veuillez vous reconnecter.' });
        // TODO redirection vers la page de connexion
        return redirect("/");
      } else {
        alertService.showNotificationAlertError(error.message || 'Une erreur s\'est produite');
      }
      return Promise.reject(error);
    }
  );

export default httpClient;
