import httpClient from "../../../config/interceptor.config";


const selfserviceUrl = 'abela-selfservice/api/v1';

export default function getAllInfoUser(identifiant) {
    return httpClient.get(selfserviceUrl + '/kaabu/verification-user/'+identifiant).then(response => response ? response.data : null);
}



// const GetData = async (url) => {
//     const response = await httpClient.get(url);
//     if(response.data.success) {
//       setUserkaabu(response.data.data.userKaabu);
//       setSimplissimo(response.data.data.userSimplissimo)
//     }
//     return response.data; 
//   };