import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

function Get({ url, columns, token }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await  axios.get(url, config);

        setData(response.data);
        console.log(data.length);
      } catch (error) {
        setError(`Erreur: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token]);

  return (
    <div>
      {loading && <p>Chargement...</p>}
      {error && <p>{error}</p>}
      {data.length > 0 && (
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          striped
          dense
        />
      )}
    </div>
  );
}

export default Get;
