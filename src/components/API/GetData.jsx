import axios from 'axios';
import { getTokenFromLocalStorage } from '../Pages/Auth/authUtils';

const token= getTokenFromLocalStorage();


const GetData = async (url) => {
    const response = await axios.get(url,{
        headers:{
            Authorization:`Bearer ${token}`
        },
    });
    console.log(response.data.data);

    return response.data; 
  };
export default GetData;