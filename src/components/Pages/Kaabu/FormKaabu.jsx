import React,{useState} from 'react';
import { Card, Table } from 'react-bootstrap';

function FormKaabu({ vendeur}) {

    console.log(vendeur);
   
  return (
    <Card style={{width:"350px",maxWidth:"100%"}}>
      <Card.Header className="text-center fs-4">Kaabu</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <tbody>
          <tr>
                            <th>Date Création:</th>
                            <th>{vendeur.dateCreation}</th>
                        </tr>
                        <tr>
                            <th>Role:</th>
                            <th>{vendeur.role}</th>
                        </tr>
                        <tr>
                            <th>Date Première Connection:</th>
                            <th>{vendeur.datePremiereConnectionPin}</th>
                        </tr>
                        <tr>
                            <th>Téléphone:</th>
                            <th>{vendeur.telephone}</th>
                        </tr>
                        <tr>
                            <th>Nom:</th>
                            <th>{vendeur.nom}</th>
                        </tr>
                        <tr>
                            <th>Opérations:</th>
                            <th>{vendeur.operations}</th>
                        </tr>
                        <tr>
                            <th>Contact:</th>
                            <th>{vendeur.contact}</th>
                        </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default FormKaabu;
