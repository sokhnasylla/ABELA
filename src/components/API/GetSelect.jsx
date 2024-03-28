import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, MenuItem, InputLabel } from '@mui/material'; // Importez les composants nécessaires depuis '@mui/material'

function GetSelect({ apiUrl,text,onOptionChange  }) {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                const data = response.data;
                setOptions(data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données depuis l\'API', error);
            });
    }, [apiUrl]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <div className='mb-4 align-right'>
                <InputLabel className="demo-simple-select-label">{text}</InputLabel>&nbsp;
                <Select
                    labelId="demo-simple-select-label"
                    className='textfield'
                    onChange={handleChange}
                    size='small'
                    value={selectedOption}
                    required
                >
                    {options.map(option => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.nom}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        </div>
    );
}

export default GetSelect;
