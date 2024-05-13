
import React from 'react';
import { Card, Table } from 'react-bootstrap';
import "../MySMC/GestionIncident/ajoutavis.css"

function FormSimplissimo({ simplissimo }) {

  if (!simplissimo) {
    console.log("-----SIMPLISSIMO-----------", simplissimo);
    return (<div style={{ top: "20px"}} className="alert alert-danger" role="alert">L'utilisateur n'existe pas sur Simplissimo </div>);
  }

  console.log("-----SIMPLISSIMO----NOT NULL----- #D8BFD8 --", simplissimo);
  return (
    <Card style={{ top: "25px"}}>
      <Card.Header style={{backgroundColor: "#D8BFD8"}} className="text-center fs-4">Simplissimo</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <tbody>
            {simplissimo.parcUtilisateurSimplissimo && (<tr>
              <th>Prénom:</th>
              <td>{simplissimo.parcUtilisateurSimplissimo.prenom}</td>
            </tr>)}
            {simplissimo.parcUtilisateurSimplissimo && (<tr>
              <th>Nom:</th>
              <td>{simplissimo.parcUtilisateurSimplissimo.nom}</td>
            </tr>)}
            {simplissimo.parcUtilisateurSimplissimo && (<tr>
              <th style={{ width: "300px"}}>Login:</th>
              <td>{simplissimo.parcUtilisateurSimplissimo.login}</td>
            </tr>)}
            {simplissimo.parcUtilisateurSimplissimo &&(<tr>
              <th>Contact:</th>
              <td>{simplissimo.parcUtilisateurSimplissimo.contact}</td>
            </tr>)} 
            {simplissimo.parcUtilisateurSimplissimo && (<tr>
              <th>Statut:</th>
              <td style={{ backgroundColor: simplissimo.parcUtilisateurSimplissimo.statut === "Actif" ? "#40E0D0" : "transparent",
               color: simplissimo.parcUtilisateurSimplissimo.statut === "Actif" ? "white" : "black", 
               fontWeight: simplissimo.parcUtilisateurSimplissimo.statut === "Actif" ? "bold" : "normal" }}>
                {simplissimo.parcUtilisateurSimplissimo.statut}
              </td>
            </tr>)}
            {simplissimo.verificationMsisdnSimplissimo &&(<tr>
              <th style={{ width: "300px"}}>Identification:</th>
              {simplissimo.verificationMsisdnSimplissimo.isIdentified ? (<td style={{backgroundColor:"#40E0D0",color:"white",fontWeight:"bold"}}>OUI</td>)
              :(<td style={{backgroundColor:"#DC143C",color:"white",fontWeight:"bold"}}>NON</td>)}
            </tr>)} 

            {simplissimo.verificationMsisdnSimplissimo && (
              <tr>
                <th>APN NOMAD:</th>
                {simplissimo.verificationMsisdnSimplissimo.apnNomad ? (
                  <td style={{
                    backgroundColor: simplissimo.verificationMsisdnSimplissimo.apnNomad.statut === "Active" ? "#40E0D0" : "#DC143C",
                    color: simplissimo.verificationMsisdnSimplissimo.apnNomad.statut === "Active" ? "white" : "inherit",
                    fontWeight: simplissimo.verificationMsisdnSimplissimo.apnNomad.statut === "Active" ? "bold" : "normal"
                  }}>
                    {simplissimo.verificationMsisdnSimplissimo.apnNomad.statut}
                  </td>
                ) : (
                  <td></td>
                )}
              </tr>
            )}

          </tbody>
        </Table>
        {!simplissimo.parcUtilisateurSimplissimo && (<div style={{ top: "20px"}} className="alert alert-danger" role="alert">L'utilisateur n'existe pas sur Simplissimo </div>)}
      </Card.Body>
    </Card>
  );
}

export default FormSimplissimo;
