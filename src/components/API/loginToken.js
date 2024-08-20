import axios from 'axios';

const loginAndGetToken = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:8000/api/login", {
      email,
      password,
    });

    // Vérifiez la structure de votre réponse et récupérez le token
    const authToken = response.data.token;

    // console.log('Token récupéré:', authToken);
    return authToken; // Retournez le token si nécessaire
  } catch (error) {
    console.error('Erreur lors de la connexion', error);
    throw error; // Remontez l'erreur pour gérer les erreurs côté appelant si nécessaire
  }
};

// Exemple d'utilisation :
// Remplacez "votreEmail" et "votreMotDePasse" par les véritables informations de connexion
// loginAndGetToken("votreEmail@example.com", "votreMotDePasse")
//   .then((token) => {
//     // Faites quelque chose avec le token, par exemple, stockez-le dans l'état de votre composant
//     console.log('Token à utiliser:', token);
//   })
//   .catch((error) => {
//     // Gérez les erreurs, par exemple, affichez un message d'erreur à l'utilisateur
//     console.error('Erreur lors de la connexion:', error);
//   });

export {loginAndGetToken}