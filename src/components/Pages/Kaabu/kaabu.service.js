import httpClient from "../../../config/interceptor.config";


const selfserviceUrl = 'abela-selfservice/api/v1';

function getAllInfoUserService(identifiant) {
    return httpClient.get(selfserviceUrl + '/kaabu/verification-user/'+identifiant).then(response => response ? response.data : null);
}

function searchLoginService(search) {
    return httpClient.get(selfserviceUrl + '/kaabu/search-users-kaabu/'+search).then(response => response ? response.data : null);
}


function getDeviceVendeurService(msisdn) {
    return httpClient.get(selfserviceUrl + '/kaabu/get-info-device/'+msisdn).then(response => response ? response.data : null);
}


// function getDeviceImageService(id) {
//     return httpClient.get(selfserviceUrl + '/kaabu/get-device-image/'+id).then(response => response);
// }

function getDeviceImageService(id) {
    return httpClient.get(selfserviceUrl + '/kaabu/get-device-image/' + id, { responseType: 'blob' })
      .then(response => {
        console.log("------SERVICE GET IMAGE RESPONSE", response); 
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
          console.log("------RESPONSE DATA", response.data); 
          if(response.data) {
            reader.readAsDataURL(response.data);
          }
        });
      });
  }

export {getAllInfoUserService, searchLoginService, getDeviceImageService, getDeviceVendeurService}