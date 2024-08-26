import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { InputLabel ,TextField,Grid} from '@mui/material';
import {  FaSearch } from 'react-icons/fa';
import Title from '../../../Card/Title/Title';



function ScannerProbleme({ show, handleClose }) {
    const [nombre, setNombre] = useState('10');
    const handleChange = (event) => setNombre(event.target.value);

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Scan des applications à problème</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col sm={8} className='content'>
                            <Title text="Scan des applications à problème" />
                            <div style={{ display: "flex", marginTop: "2%" }}>
                                <div className='mb-4'>
                                    <InputLabel sx={{ marginLeft: "6%" }} id="demo-simple-select-label">Date début</InputLabel>&nbsp;
                                    <TextField variant='outlined' size='small' type='date' sx={{ width: "250px", marginRight: "35px" }} />
                                </div>
                                <div className='mb-4'>
                                    <InputLabel sx={{ marginLeft: "6%" }} id="demo-simple-select-label">Date Fin</InputLabel>&nbsp;
                                    <TextField variant='outlined' size='small' type='date' sx={{ width: "250px", marginRight: "35px" }} />
                                </div>
                                <div className='mb-4' id='search'>
                                    <Button style={{ backgroundColor: "#d9534f", borderColor: "#d9534f", width: "70px" }}>
                                        <FaSearch />
                                    </Button>
                                </div>
                            </div>
                            <div className='col-xs-12 col-sm-6 col-md-4' style={{ position: "absolute", width: "57%" }}>
                                <Grid>
                                    <h5 className='alert alert-info' style={{ fontSize: "14px", fontFamily: "inherit", fontWeight: "500", color: "#31708F" }}>
                                        Résultat de la dernière recherche : | Date Fin : init | Date début : init
                                    </h5>
                                </Grid>
                            </div>
                            
                        </Col>
    
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Quitter
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ScannerProbleme;
