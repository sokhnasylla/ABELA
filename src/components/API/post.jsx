import axios from 'axios';

const post = async (userData,url) => {
    const response = await axios.post(url, userData);
    return response.data; 
  };
export default post;