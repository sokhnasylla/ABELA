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

function AdvancedSearchModal({ show, handleClose, handleAdvancedSearch }) {
    const [advancedSearchFields, setAdvancedSearchFields] = useState({
        field1: '',
        field2: '',
        // Ajoutez d'autres champs ici
    });

    const handleInputChange = (e) => {
        setAdvancedSearchFields({
            ...advancedSearchFields,
            [e.target.name]: e.target.value,
        });
    };

    const handleSearch = () => {
        handleAdvancedSearch(advancedSearchFields);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Recherche Avancée</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formField1">
                        <Form.Label>Champ 1</Form.Label>
                        <Form.Control
                            type="text"
                            name="field1"
                            value={advancedSearchFields.field1}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formField2">
                        <Form.Label>Champ 2</Form.Label>
                        <Form.Control
                            type="text"
                            name="field2"
                            value={advancedSearchFields.field2}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    {/* Ajoutez d'autres champs ici */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Annuler
                </Button>
                <Button variant="primary" onClick={handleSearch}>
                    Rechercher
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function GestionProbleme() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showScanner, setShowScanner] = useState(false);
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    const handleShowScanner = () => setShowScanner(true);
    const handleCloseScanner = () => setShowScanner(false);
    const handleShowAdvancedSearch = () => setShowAdvancedSearch(true);
    const handleCloseAdvancedSearch = () => setShowAdvancedSearch(false);

    const handleAdvancedSearch = (fields) => {
        console.log('Recherche avancée avec les champs :', fields);
        // Ajoutez ici la logique pour filtrer les données selon les champs
    };

    const CelluleAction = ({ id }) => (
        <div>
            <Link to={`/mysmc/gestionprobleme/details/${id}`}>
                <Button
                    variant="info"
                    style={{ backgroundColor: "#FF6600", padding: "1px 5px", lineHeight: "1.2", borderRadius: "3px" }}
                    title="Voir les détails du problème"
                >
                    <FaEye color='white' />
                </Button>
            </Link>
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
            sortable: true,
            cell: row => <CelluleAction id={row.id} />
        }
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
                            <Button style={{ backgroundColor: '#FF6600', borderColor: '#FF6600' }}   onClick={handleShowAdvancedSearch}>
                                <FaFilter /> Recherche Avancé
                            </Button>
            
                            <ScannerProbleme show={showScanner} handleClose={handleCloseScanner} />
                            

                            {/* Groupe pour la barre de recherche avec icône */}
                            <InputGroup style={{ width: '200px' }}>
                                <FormControl
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                
                            </InputGroup>
                        </div>

                        {/* Passer le terme de recherche à Get */}
                        <Get 
                            url="http://localhost:8082/abela-mysmc/api/v1/gestionproblemes/problemes" 
                            columns={columns}
                            searchTerm={searchTerm} // Ajoute cette ligne pour passer searchTerm à Get
                        />
                    </Col>
                </Row>
            </Container>

            {/* Modal pour la recherche avancée */}
            <AdvancedSearchModal
                show={showAdvancedSearch}
                handleClose={handleCloseAdvancedSearch}
                handleAdvancedSearch={handleAdvancedSearch}
            />
        </div>
    );
}

export default GestionProbleme;
