import React from 'react';
import { Card, Table } from 'react-bootstrap';

function FormKaabu(props) {
  const { vendeur } = props;
  console.log("Type de vendeur :", typeof vendeur);

  if (!vendeur || typeof vendeur !== 'object') {
    return <div>Aucune donnée à afficher</div>;
  }

  return (
    <Card style={{ width: "350px", maxWidth: "100%" }}>
      <Card.Header className="text-center fs-4">Kaabu</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <th>Date Création:</th>
              <td>{vendeur.dateCreation}</td>
            </tr>
            <tr>
              <th>Role:</th>
              <td>{vendeur.role}</td>
            </tr>
            <tr>
              <th>Date Première Connection:</th>
              <td>{vendeur.datePremierConnectionPin}</td>
            </tr>
            <tr>
              <th>Téléphone:</th>
              <td>{vendeur.telephone}</td>
            </tr>
            <tr>
              <th>Nom:</th>
              <td>{vendeur.nom}</td>
            </tr>
            <tr>
              <th>Opérations:</th>
              <td>{vendeur.operations}</td>
            </tr>
            <tr>
              <th>Contact:</th>
              <td>{vendeur.contact}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default FormKaabu;