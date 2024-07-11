import httpClient from "../../../config/interceptor.config";


const selfserviceUrl = 'abela-selfservice/api/v1';

export default function getHistorique() {
    return httpClient.get(selfserviceUrl + '/local/historique').then(response => response ? response.data : null);
}