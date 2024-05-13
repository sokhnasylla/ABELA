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

function FormNetwork({ clientNetwork }) {

  console.log("------NETWORK----------", clientNetwork);
  return (
    <Card style={{marginTop: "50px"}}>
      <Card.Header style={{backgroundColor: "silver"}} className="text-center fs-4">Network</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          {clientNetwork && (<tbody>
            <tr>
              <th style={{ width: "300px"}}>MSISDN:</th>
              <td>
                {clientNetwork.msisdn}</td>
            </tr>
            <tr>
              <th style={{ width: "300px"}}>APN NOMAD:</th>
              <td style={{ backgroundColor: clientNetwork.apnNomad ? "#40E0D0" : "#DC143C", color: "white", fontWeight: "bold" }}>
                {clientNetwork.apnNomad ? "Activé" : "Desactivé"}</td>
            </tr>
            <tr>
              <th style={{ width: "300px"}}>Données Mobile:</th>
              <td style={{ backgroundColor: clientNetwork.isDonneeMobileActif ? "#40E0D0" : "#DC143C", color: "white", fontWeight: "bold" }}>
                {clientNetwork.isDonneeMobileActif ? "Activé" : "Desactivé"}</td>
            </tr>
            <tr>
              <th>Appel Entrant:</th>
              <td style={{ backgroundColor: clientNetwork.isAppelSortantActif ? "#40E0D0" : "#DC143C", color:  "white", fontWeight: "bold" }}>
                {clientNetwork.isAppelSortantActif ? "Activé" : "Desactivé"}</td>
            </tr>
            <tr>
              <th>Appel Sortant:</th>
              <td style={{ backgroundColor: clientNetwork.isAppelEntrantActif ? "#40E0D0" : "#DC143C", color: "white", fontWeight: "bold"}}>
                {clientNetwork.isAppelEntrantActif ? "Activé" : "Desactivé"}</td>
            </tr>
            <tr>
              <th>Service USSD:</th>
              <td style={{ backgroundColor: clientNetwork.isUssdActif ? "#40E0D0" : "#DC143C", color: "white", fontWeight: "bold"}}>
                {clientNetwork.isUssdActif ? "Activé" : "Desactivé"}
              </td>
            </tr>
          </tbody>)}
        </Table>
        {!clientNetwork && (<div style={{ top: "20px"}} className="alert alert-danger" role="alert">Ce numéro n'existe pas sur HRL</div>)}
      </Card.Body>
    </Card>
  );
}

export default FormNetwork;
