
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { getTokenFromLocalStorage } from '../components/Pages/Auth/authUtils';
import { AlertService } from '../utils/alert.service';

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
      // si timeout
      if (error.code === AxiosError.ECONNABORTED) {
        console.log('Timeout de la requête !');
        alertService.showConfirmAlert({ title: 'Timeout de la requête !!!' });
      } else if (error.response && error.response.status===HttpStatusCode.Forbidden) {
        alertService.showConfirmAlert({ title: 'Votre connexion au serveur a expiré. Veuillez vous reconnecter.' }).then(() => {
          return window.location.href = "/";
        });
      } else {
        alertService.showNotificationAlertError(error.message || 'Une erreur s\'est produite').then(() => {
          return window.location.href = "/";
        });
      }
      // return Promise.reject(error);
      return null;

    }
  );

export default httpClient;
