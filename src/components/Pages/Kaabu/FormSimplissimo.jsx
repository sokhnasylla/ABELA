import React from 'react';
import { Card, Table } from 'react-bootstrap';
import "../MySMC/GestionIncident/ajoutavis.css"

function FormSimplissimo({ simplissimo }) {
  if (!simplissimo || simplissimo.length === 0) {
    return <div></div>;
  }

  return (
    <Card style={{ top: "15px"}}>
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
              <td style={{ backgroundColor: simplissimo.statut === "Actif" ? "green" : "transparent",
               color: simplissimo.statut === "Actif" ? "white" : "black", 
               fontWeight: simplissimo.statut === "Actif" ? "bold" : "normal" }}>
                {simplissimo.statut}
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default FormSimplissimo;
