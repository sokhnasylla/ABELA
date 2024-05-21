import httpClient from "../../../config/interceptor.config";


const selfserviceUrl = 'abela-selfservice/api/v1';

export default function getAllInfoUser(identifiant) {
    return httpClient.get(selfserviceUrl + '/kaabu/verification-user/'+identifiant).then(response => response ? response.data : null);
}