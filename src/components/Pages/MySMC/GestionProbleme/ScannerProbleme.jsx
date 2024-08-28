import React, { useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { InputLabel, TextField } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import Title from '../../../Card/Title/Title';

function ScannerProbleme({  show, handleClose, onScan }) {
      const handleScanComplete = () => {
        const scanResults = [ /*... résultats du scan ...*/ ];
        onScan(scanResults);
        handleClose();
    };
    return (
        <Modal show={show} onHide={handleClose} size="md">
            <Modal.Header closeButton>
            
                
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Row>
                        <Col className='content'>
                            <Title text="Scan des applications à problème" />
                            <div style={{ display: "flex", marginTop: "2%", alignItems: "center" }}>
                                <div className='mb-4' style={{ margin: 0 }}>
                                    <InputLabel sx={{ marginLeft: "0" }} id="demo-simple-select-label">Date début</InputLabel>&nbsp;
                                    <TextField variant='outlined' size='small' type='date' sx={{ width: "150px", marginRight: "10px" }} />
                                </div>
                                <div className='mb-4' style={{ margin: 0 }}>
                                    <InputLabel sx={{ marginLeft: "0" }} id="demo-simple-select-label">Date Fin</InputLabel>&nbsp;
                                    <TextField variant='outlined' size='small' type='date' sx={{ width: "150px", marginRight: "10px" }} />
                                </div>
                                <div className='mb-4' id='search' style={{ margin: 0 }}>
                                    <Button style={{ backgroundColor: "#FF6600", borderColor: "#FF6600", width: "50px" }}>
                                        <FaSearch />
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Quitter
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ScannerProbleme;
