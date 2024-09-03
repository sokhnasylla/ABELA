import httpClient from "../../../config/interceptor.config";

const mysmc = 'abela-mysmc/api/v1';
const problemes="/gestionproblemes/problemes"

function getAllProbleme() {
    return httpClient.get(mysmc+problemes).then(response => response ? response.data : null);
}

function searchProblemeByDate(dateDebut,dateFin){
    console.log(dateDebut);
    
    return httpClient.get(
        `${mysmc}${problemes}/searchedProblemeByDate?dateDebut=${dateDebut}&dateFin=${dateFin}`
    )
}

export {getAllProbleme,searchProblemeByDate}