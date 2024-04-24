import React from 'react';
import { Card, Table } from 'react-bootstrap';


function getStatusText(status) {
  switch (status) {
      case "0":
          return { text: "Activer", backgroundColor: "green", color: "white" };
      case "-1":
          return { text: "Désactiver", backgroundColor: "red", color: "white" };
      case "1":
          return { text: "Suspendre", backgroundColor: "red", color: "white" };
      case "2":
          return { text: "Cloturer", backgroundColor: "red", color: "white" };
      default:
          return { text: "Inconnu", backgroundColor: "black", color: "white" };
  }
}

function FormKaabu({ userkaabu }) {
  console.log("----------------", userkaabu);
  if (userkaabu.length === 0) {
    return <div></div>;
  }

  return (
    <Card>
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
              <td style={{ backgroundColor: userkaabu[0].role === "Vendeur" ? "green" : "red",
               color: userkaabu[0].role === "Vendeur" ? "white" : "white", 
               fontWeight: userkaabu[0].role === "Vendeur" ? "bold" : "bold" }}>
                {userkaabu[0].role}
              </td>
            </tr>
            <tr>
              <th>Profil:</th>
              <td>
                <ul>
                  {userkaabu[0].profils.map((profil, index) => (
                    <li key={index}>{profil}</li>
                  ))}
                </ul>
              </td>
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
              <td>
                <ul>
                  {userkaabu[0].operations.map((operation, index) => (
                    <li key={index}>{operation}</li>
                  ))}
                </ul>
              </td>
            </tr>

            <tr>
              <th>Contact:</th>
              <td>{userkaabu[0].contact}</td>
            </tr>
            <tr>
              <th>Statut:</th>
              <td style={{ backgroundColor: userkaabu[0].status ? getStatusText(userkaabu[0].status).backgroundColor : "", color: "white",fontWeight:"bold" }}>
                {userkaabu[0].status && getStatusText(userkaabu[0].status).text}
              </td>
            </tr>

          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default FormKaabu;
