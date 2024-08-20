import React from 'react';
import { Card, Table } from 'react-bootstrap';

function FormSiplissimo({ simplissimo }) {
  if (!simplissimo) {
    return <div>Aucune donnée à afficher.</div>;
  }

  return (
    <Card style={{ width: "350px", maxWidth: "100%", marginLeft: "30px" }}>
      <Card.Header className="text-center fs-4">Simplissimo</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <th>Login:</th>
              <td>{simplissimo.login}</td>
            </tr>
            <tr>
              <th>Nom:</th>
              <td>{simplissimo.nom}</td>
            </tr>
            <tr>
              <th>Prénom:</th>
              <td>{simplissimo.prenom}</td>
            </tr>
            <tr>
              <th>Contact:</th>
              <td>{simplissimo.contact}</td>
            </tr>
            <tr>
              <th>Statut:</th>
              <td>{simplissimo.statut}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default FormSiplissimo;
