
import axios from 'axios';

const fetchData = async (url, token) => {
  const result = {
    data: [],
    loading: false,
    error: null,
  };

  try {
    result.loading = true;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(url, config);

    result.data = response.data;
  } catch (error) {
    result.error = `Erreur: ${error.message}`;
  } finally {
    result.loading = false;
  }

  return result;
};

export default fetchData;
