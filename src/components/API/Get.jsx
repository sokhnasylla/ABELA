import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { getTokenFromLocalStorage } from '../Pages/Auth/authUtils';
import './Get.css'; // Importer les styles personnalisés

function Get({ url, columns, showTable = true, searchTerm }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token= getTokenFromLocalStorage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        console.log(token);
        const response = await axios.get(url,{
          headers:{
              Authorization:`Bearer ${token}`
          },
      });
        console.log(response);

        setData(response.data);

      } catch (error) {
        setError(`Erreur: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  // Filtrer les données en fonction du terme de recherche*
  console.log(data);
  
  const filteredData = data.filter(item => 
    console.log(item.numProbleme),
    
    item.numProbleme.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.application.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.dateCreation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.etat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {loading && <p>Chargement...</p>}
      {showTable ? (
        filteredData.length > 0 && (
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            highlightOnHover
            striped
            dense
          />
        )
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
export default Get