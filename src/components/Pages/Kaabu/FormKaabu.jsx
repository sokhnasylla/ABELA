import { green } from '@mui/material/colors';
import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";



function getStatusText(status) {
  switch (status) {
      case "0":
          return { text: "Activer", backgroundColor: "#40E0D0", color: "white" };
      case "-1":
          return { text: "Désactiver", backgroundColor: "#DC143C", color: "white" };
      case "1":
          return { text: "Suspendre", backgroundColor: "#DC143C", color: "white" };
      case "2":
          return { text: "Cloturer", backgroundColor: "#DC143C", color: "white" };
      default:
          return { text: "Inconnu", backgroundColor: "black", color: "white" };
  }
}

function FormKaabu({ userkaabu }) {

  console.log("------KAABU----------", userkaabu);
  return (
    <Card>
      <Card.Header style={{backgroundColor: "#F0F8FF"}} className="text-center fs-4">Kaabu</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          {userkaabu && (<tbody>
            <tr>
              <th style={{ width: "300px"}}>Prénom:</th>
              <td>{userkaabu.prenom}</td>
            </tr>
            <tr>
              <th>Nom:</th>
              <td>{userkaabu.nom}</td>
            </tr>
            <tr>
              <th>Login:</th>
              <td>{userkaabu.username}</td>
            </tr>
            <tr>
              <th>Statut:</th>
              <td style={{ backgroundColor: userkaabu.status ? getStatusText(userkaabu.status).backgroundColor : "", color: "white",fontWeight:"bold" }}>
                {userkaabu.status && getStatusText(userkaabu.status).text}
              </td>
            </tr>
            <tr>
              <th>Numéro Vendeur:</th>
              <td>
              {userkaabu.telephone}
              </td>
            </tr>
            <tr>
              <th>Contact:</th>
              <td>
                {userkaabu.contact} 
                {userkaabu.telephone === userkaabu.contact ? (
                  <FaCheckCircle style={{float: "right", color: "#40E0D0", fontSize:'125%'}}/>
                ) : (
                  <FaTimesCircle style={{float: "right", color: "#DC143C", fontSize:'125%'}}/>
                )}
              </td>
            </tr>

            <tr>
              <th>TypeUser:</th>
              <td>{userkaabu.typeuser}</td>
            </tr>
            <tr>
              <th>Date Création:</th>
              <td>
                {new Date(userkaabu.dateCreation).toLocaleDateString(
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
              <td style={{ backgroundColor: userkaabu.role === "Vendeur" ? "#40E0D0" : "#DC143C",
               color: userkaabu.role === "Vendeur" ? "white" : "white", 
               fontWeight: userkaabu.role === "Vendeur" ? "bold" : "bold" }}>
                {userkaabu.role}
              </td>
            </tr>
            <tr>
              <th>Profil:</th>
              <td>
                <ul>
                  {userkaabu.profils.map((profil, index) => (
                    <li key={index}>{profil}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <th>Opérations:</th>
              <td>
                <ul>
                  {userkaabu.operations.map((operation, index) => (
                    <li key={index}>{operation}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <th>Versions Disponibles:</th>
              <td>
                <ul>
                  {userkaabu.versionsDisponible.map((version, index) => (
                    <li key={index}>{version}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <th>Version Installée:</th>
              {userkaabu.versionsInstalle ? (<td>
                {userkaabu.versionsInstalle[0] && (<ul>
                  {userkaabu.versionsInstalle.map((version, index) => (
                    <li key={index}>{version}</li>
                  ))}
                </ul>)}
                <span>{ new Date(userkaabu.dateLastTransaction).toLocaleDateString("fr-FR",{day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric",})}</span>
              </td>): "Pas de demande"}
            </tr>
          </tbody>)}
        </Table>
        {!userkaabu && (<div style={{ top: "20px"}} className="alert alert-danger" role="alert">L'utilisateur n'existe pas sur Kaabu</div>)}
      </Card.Body>
    </Card>
  );
}

export default FormKaabu;
