import React from 'react';
import { Card, Table } from 'react-bootstrap';

function FormKaabu({ userkaabu }) {
  if (userkaabu.length === 0) {
    return <div></div>;
  }

  return (
    <Card style={{ width: "350px", maxWidth: "100%" }}>
      <Card.Header className="text-center fs-4">Kaabu</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <th>Date Création:</th>
              <td>
                {new Date(userkaabu[0].dateCreation).toLocaleDateString(
                  "fr-FR",
                  {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  }
                )}
              </td>
            </tr>
            <tr>
              <th>Role:</th>
              <td>{userkaabu[0].role}</td>
            </tr>
            <tr>
              <th>Date Première Connection:</th>
              <td>{userkaabu[0].datePremierConnectionPin}</td>
            </tr>
            <tr>
              <th>Profil:</th>
              <td>{userkaabu[0].profils}</td>
            </tr>
            <tr>
              <th>TypeUser:</th>
              <td>{userkaabu[0].typeuser}</td>
            </tr>
            <tr>
              <th>Nom:</th>
              <td>{userkaabu[0].nom}</td>
            </tr>
            <tr>
              <th>Opérations:</th>
              <td>{userkaabu[0].operations}</td>
            </tr>
            <tr>
              <th>Contact:</th>
              <td>{userkaabu[0].contact}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default FormKaabu;

