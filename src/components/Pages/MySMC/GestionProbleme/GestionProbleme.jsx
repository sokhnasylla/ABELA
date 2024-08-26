import React, { useState } from 'react';
import { Row, Col, Button, Container, FormControl } from 'react-bootstrap';
import MenuMysmc from '../Menu/MenuMysmc';
import Title from '../../../Card/Title/Title';
import { Link } from 'react-router-dom';
import { FaEye, FaPlus } from 'react-icons/fa';
import { FaQrcode } from 'react-icons/fa'; // Import the scan icon
import Get from '../../../API/Get';
import ScannerProbleme from './ScannerProbleme';
import './gestionProbleme.css';

function GestionProbleme() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showScanner, setShowScanner] = useState(false);

    const handleShowScanner = () => setShowScanner(true);
    const handleCloseScanner = () => setShowScanner(false);

    // Composant de cellule personnalisé pour la colonne "Action"
    const CelluleAction = ({ id }) => (
        <div>
            <Link to={`/mysmc/gestionprobleme/details/${id}`}>
                <Button
                    variant="info"
                    style={{ backgroundColor: "#31B0D5", padding: "1px 5px", lineHeight: "1.2", borderRadius: "3px" }}
                    title="Voir les détails du problème"
                >
                    <FaEye color='white' />
                </Button>
            </Link>
        </div>
    );

    const columns = [
        { name: 'N°Probleme', selector: 'numProbleme', sortable: true },
        { name: 'Application', selector: 'application', sortable: true },
        {
            name: 'Date Création',
            selector: 'dateCreation',
            sortable: true,
            cell: row => row.dateCreation ? <span>{new Date(row.dateCreation).toLocaleDateString('fr-FR')}</span> : <span>N/A</span>
        },
        { name: 'Etat', selector: 'etat', sortable: true },
        { name: 'Action', sortable: true, cell: row => <CelluleAction id={row.id} /> },
    ];

    return (
        <div>
            <MenuMysmc />
            <Container fluid >
                <Row>
                    <Col sm={8} className='content'>
                        <Title text="Liste des problèmes" />
                        
                        {/* Bouton d'ajout */}
                        <div className="d-flex justify-content-between mb-2 mt-4">
                        <Button style={{ backgroundColor: '#FF6600', borderColor: '#FF6600' }} onClick={handleShowScanner}>
                            <FaQrcode /> Scanner un problème
                        </Button>
            
                             <ScannerProbleme show={showScanner} handleClose={handleCloseScanner} />

                            
                            {/* Barre de recherche */}
                            <FormControl
                                type="text"
                                placeholder="Rechercher..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: '200px' }}
                            />
                        </div>

                        {/* Passer le terme de recherche à Get */}
                        <Get 
                            url="http://localhost:8082/abela-mysmc/api/v1/gestionproblemes/problemes" 
                            columns={columns} 
                            searchTerm={searchTerm}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default GestionProbleme;
