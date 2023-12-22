import axios from 'axios';

const GetData = async (url,token) => {
    const response = await axios.get(url,{
        headers:{
            Authorization:`Bearer ${token}`
        },
    });
    return response.data; 
  };
export default GetData;