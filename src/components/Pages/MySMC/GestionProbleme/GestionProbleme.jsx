import React, { useState } from 'react';
import { Row, Col, Button, Container, FormControl, InputGroup, Modal, Form } from 'react-bootstrap';
import MenuMysmc from '../Menu/MenuMysmc';
import Title from '../../../Card/Title/Title';
import { Link } from 'react-router-dom';
import { FaEye, FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import { FaQrcode } from 'react-icons/fa'; // Import the scan icon
import Get from '../../../API/Get';
import ScannerProbleme from './ScannerProbleme';
import './gestionProbleme.css';
import RechercheProbleme from './RechercheProbleme';
import DetailsProbleme from './DetailsProbleme';

function AdvancedSearchModal({ show, handleClose, handleAdvancedSearch }) {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton className="recherche-avancee-header">
                <Modal.Title  >Recherche Avancée</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RechercheProbleme />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Annuler
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function GestionProbleme() {

    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedProblemeId, setSelectedProblemeId] = useState(null);

    const handleShowDetailsModal = (id) => {
        setSelectedProblemeId(id);
        setShowDetailsModal(true);
    };

    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
        setSelectedProblemeId(null);
    };
    const [searchTerm, setSearchTerm] = useState('');
    const [showScanner, setShowScanner] = useState(false);
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [scannedResults, setScannedResults] = useState(null); // État pour les résultats du scan

    const handleShowScanner = () => setShowScanner(true);
    const handleCloseScanner = () => setShowScanner(false);
    const handleShowAdvancedSearch = () => setShowAdvancedSearch(true);
    const handleCloseAdvancedSearch = () => setShowAdvancedSearch(false);

    const handleScan = (results) => {
        setScannedResults(results); // Stocker les résultats du scan
        setShowScanner(false); // Fermer le modal après le scan
    };

    const handleAdvancedSearch = (fields) => {
        console.log('Recherche avancée avec les champs :', fields);
        // Ajoutez ici la logique pour filtrer les données selon les champs
    };

    const CelluleAction = ({ id }) => (
        <div>
            <Button
                style={{ backgroundColor: "#FF6600", padding: "1px 5px", lineHeight: "1.2", borderRadius: "3px", border: "#FF6600" }}
                title="Voir les détails du problème"
                onClick={() => handleShowDetailsModal(id)}
            >
                <FaEye color='white' />
            </Button>
        </div>
    );
    

    const columns = [
        {
            name: 'N°Probleme',
            selector: row => row.numProbleme,
            sortable: true
        },
        {
            name: 'Application',
            selector: row => row.application,
            sortable: true
        },
        {
            name: 'Date Création',
            selector: row => row.dateCreation,
            sortable: true,
            cell: row => row.dateCreation 
                ? <span>{new Date(row.dateCreation).toLocaleDateString('fr-FR')}</span> 
                : <span>N/A</span>
        },
        {
            name: 'Etat',
            selector: row => row.etat,
            sortable: true
        },
        {
            name: 'Action',
            sortable: false,
            cell: row => <CelluleAction id={row.id} />
        }
    ];

    return (
        <div>
            <MenuMysmc />
            <Container fluid>
                <Row>
                    <Col sm={10} className='content'>
                        <Title text="Liste des problèmes" />

                        <div className="d-flex justify-content-between mb-2 mt-4">
                            <Button style={{ backgroundColor: '#FF6600', borderColor: '#FF6600' }} onClick={handleShowScanner}>
                                <FaQrcode /> Scanner un problème
                            </Button>
            
                            <ScannerProbleme show={showScanner} handleClose={handleCloseScanner} onScan={handleScan} />
                            
                            <Button style={{ backgroundColor: '#FF6600', borderColor: '#FF6600' }} onClick={handleShowAdvancedSearch}>
                                <FaFilter /> Recherche Avancée
                            </Button>

                            <InputGroup style={{ width: '200px' }}>
                                <FormControl
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </InputGroup>
                        </div>

                        {scannedResults ? (
                            <Get
                                data={scannedResults} // Utiliser les résultats scannés
                                columns={columns}
                                searchTerm={searchTerm}
                            />
                        ) : (
                            <Get
                                url="http://localhost:8082/abela-mysmc/api/v1/gestionproblemes/problemes"
                                columns={columns}
                                searchTerm={searchTerm}
                            />
                        )}

                         {/* Modal pour afficher les détails du problème */}
                    <Modal
                        show={showDetailsModal}
                        onHide={handleCloseDetailsModal}
                        size="lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Détails du problème</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedProblemeId && <DetailsProbleme id={selectedProblemeId} />}
                        </Modal.Body>
                    </Modal>
          
                    </Col>
                </Row>
            </Container>

            <AdvancedSearchModal
                show={showAdvancedSearch}
                handleClose={handleCloseAdvancedSearch}
                handleAdvancedSearch={handleAdvancedSearch}
            />
        </div>
    );
}

export default GestionProbleme;
