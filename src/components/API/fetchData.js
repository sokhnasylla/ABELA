
import axios from 'axios';

const fetchData = async (url) => {
  const result = {
    data: [],
    loading: false,
    error: null,
  };

  try {
    result.loading = true;

  

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };

    const response = await axios.get(url);

    result.data = response.data;
  } catch (error) {
    result.error = `Erreur: ${error.message}`;
  } finally {
    result.loading = false;
  }

  return result;
};

export default fetchData;
