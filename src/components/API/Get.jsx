import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

function Get({ url, columns, searchTerm }) {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [url]);

    // Filtrage des données en fonction de searchTerm si searchTerm est fourni
    const filteredData = searchTerm
        ? data.filter(item =>
            item.numProbleme.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.application.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.etat.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : data;

    return (
        <DataTable
            fixedHeaderScrollHeight="200px"
            style={{height:"200px"}}
            columns={columns}
            data={filteredData} // Utilisation des données filtrées
            pagination
        />
    );
}

export default Get;
