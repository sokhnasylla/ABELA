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
    <Card style={{marginTop: "50px", borderRadius: "1px"}}>
      <Card.Header style={{backgroundColor: "silver", borderRadius: "0px"}} className="text-center fs-4">Network</Card.Header>
      <Card.Body style={{padding: "0px"}}>
        <Table striped bordered hover style={{margin: "0px"}}>
          {clientNetwork && (<tbody>
            <tr>
              <th style={{ width: "240px"}}>MSISDN:</th>
              <td>
                {clientNetwork.msisdn}</td>
            </tr>
            <tr>
              <th>APN INTERNET:</th>
              <td style={{ backgroundColor: clientNetwork.apnInternet ? "#40E0D0" : "#DC143C", color: "white", fontWeight: "bold" }}>
                {clientNetwork.apnInternet ? "Activé" : "Desactivé"}</td>
            </tr>
            <tr>
              <th>APN NOMAD:</th>
              <td style={{ backgroundColor: clientNetwork.apnNomad ? "#40E0D0" : "#DC143C", color: "white", fontWeight: "bold" }}>
                {clientNetwork.apnNomad ? "Activé" : "Desactivé"}</td>
            </tr>
            <tr>
              <th>Suspension Données Mobile:</th>
              <td style={{ backgroundColor: clientNetwork.isDonneeMobileActif ? "#DC143C" : "#40E0D0" , color: "white", fontWeight: "bold" }}>
                {clientNetwork.isDonneeMobileActif ? "Activé" : "Desactivé"}</td>
            </tr>
            <tr>
              <th>Suspension Appel Entrant:</th>
              <td style={{ backgroundColor: clientNetwork.isAppelSortantActif ?  "#DC143C" : "#40E0D0", color:  "white", fontWeight: "bold" }}>
                {clientNetwork.isAppelSortantActif ? "Activé" : "Desactivé"}</td>
            </tr>
            <tr>
              <th>Suspension Appel Sortant:</th>
              <td style={{ backgroundColor: clientNetwork.isAppelEntrantActif ? "#DC143C" : "#40E0D0", color: "white", fontWeight: "bold"}}>
                {clientNetwork.isAppelEntrantActif ? "Activé" : "Desactivé"}</td>
            </tr>
            <tr>
              <th>Suspension Service USSD:</th>
              <td style={{ backgroundColor: clientNetwork.isUssdActif ? "#DC143C" : "#40E0D0" , color: "white", fontWeight: "bold"}}>
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
