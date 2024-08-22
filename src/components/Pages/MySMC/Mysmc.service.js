import httpClient from "../../../config/interceptor.config";

const mysmc = 'abela-mysmc/api/v1';

function getAllProbleme() {
    return httpClient.get(mysmc+ '/gestionproblemes/problemes').then(response => response ? response.data : null);
}


export {getAllProbleme}